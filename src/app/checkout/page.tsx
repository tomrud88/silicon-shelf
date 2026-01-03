"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import CheckIcon from "@/components/icons/CheckIcon";
import ShieldCrossIcon from "@/components/icons/ShieldCrossIcon";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { cartItems, totalItems, totalPrice } = useCart();
  const [protectionStates, setProtectionStates] = useState<
    Record<string, boolean>
  >({});
  const [addressTab, setAddressTab] = useState<"existing" | "new">("existing");
  const [mainAddress, setMainAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existingAddress, setExistingAddress] = useState({
    address: "",
    province: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [newAddressForm, setNewAddressForm] = useState({
    country: "",
    province: "",
    city: "",
    postalCode: "",
    completeAddress: "",
  });

  const fetchUserAddress = async () => {
    try {
      const response = await fetch("/api/user/address");
      if (response.ok) {
        const data = await response.json();
        setExistingAddress({
          address: data.address || "",
          province: data.province || "",
          city: data.city || "",
          postalCode: data.postalCode || "",
          country: data.country || "",
        });
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    fetchUserAddress();
  }, []);

  const toggleProtection = (itemId: string) => {
    setProtectionStates((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSaveAddress = async () => {
    // Walidacja formularza
    if (
      !newAddressForm.country ||
      !newAddressForm.city ||
      !newAddressForm.postalCode ||
      !newAddressForm.completeAddress
    ) {
      alert("Please fill in all required address fields");
      return;
    }

    try {
      const response = await fetch("/api/user/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: newAddressForm.completeAddress,
          city: newAddressForm.city,
          postalCode: newAddressForm.postalCode,
          country: newAddressForm.country,
          province: newAddressForm.province,
          isMainAddress: mainAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save address");
      }

      alert("Address saved successfully!");
      // Odśwież dane existing address
      await fetchUserAddress();
      // Opcjonalnie przełącz na existing address tab
      if (mainAddress) {
        setAddressTab("existing");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to save address. Please try again."
      );
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      // Przygotuj dane zamówienia
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: addressTab === "existing" ? "existing" : "new",
        paymentMethod: "Apple Pay",
        shippingMethod: "NexusHub Courier",
        productProtection: Object.values(protectionStates).some(
          (state) => state
        ),
      };

      // Wyślij zamówienie do API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      // Sukces - przekieruj do strony potwierdzenia zamówienia
      window.location.href = `/order-confirmation/${data.orderId}`;
    } catch (error) {
      console.error("Error creating order:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to create order. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Oblicz koszty dodatkowe
  const protectionCount = Object.values(protectionStates).filter(
    (state) => state
  ).length;
  const protectionCost = protectionCount * 1; // $1 per protected item
  const shippingCost = 5;
  const insuranceCost = 6;
  const serviceFee = 0.5;
  const finalTotal =
    totalPrice + protectionCost + shippingCost + insuranceCost + serviceFee;

  return (
    <div>
      {/* Breadcrumb */}
      <BreadcrumbNav productName="Checkout" />

      {/* Main Container */}
      <div className="max-w-[1440px] w-full min-h-[1150px] gap-12 opacity-100 p-10 mx-auto">
        {cartItems.length === 0 ? (
          // Empty Cart Message
          <div className="flex flex-col items-center justify-center gap-6 min-h-[500px]">
            <div className="w-24 h-24 rounded-full bg-[#262626] border border-[#383B42] flex items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B0B0B0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h2 className="font-['Inter'] font-semibold text-[24px] leading-[36px] text-[#FCFCFC]">
                Your Checkout is Empty
              </h2>
              <p className="font-['Inter'] font-normal text-base text-[#B0B0B0]">
                No products to display. Add items to your cart to proceed with
                checkout.
              </p>
            </div>
            <Link
              href="/"
              className="px-8 py-3 rounded-[6px] bg-[#F29145] hover:bg-[#E5610A] transition-colors"
            >
              <span className="font-['Inter'] font-semibold text-base text-[#262626]">
                Continue Shopping
              </span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col min-[1400px]:flex-row gap-12 items-start">
            {/* Left Content Container */}
            <div className="w-full min-[1400px]:w-[889px] gap-10 opacity-100 flex flex-col">
              {/* Your Order Section */}
              <div className="w-[889px] max-w-full min-h-[342px] gap-4 opacity-100 flex flex-col">
                {/* Your Order Title */}
                <h2 className="font-['Inter'] font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
                  Your Order
                </h2>

                {/* Product Cards */}
                {cartItems.map((item) => (
                  <div key={item.id}>
                    {/* Checkout Product Card */}
                    <div className="w-full max-w-[889px] rounded-[6px] gap-8 opacity-100 border p-6 bg-[#262626] border-[#383B42]">
                      {/* Inner Container */}
                      <div className="w-full h-[138px] gap-8 max-[538px]:gap-4 opacity-100 flex max-[538px]:flex-col max-[538px]:h-auto">
                        {/* Image Container */}
                        <div className="w-[172px] h-[138px] max-[538px]:w-full max-[538px]:h-auto rounded-[6px] gap-[10px] opacity-100 border p-3 border-[#383B42]">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-[148px] h-[114px] max-[538px]:w-full max-[538px]:h-auto rounded-[6px] opacity-100 object-contain"
                          />
                        </div>

                        {/* Content Container */}
                        <div className="flex-1 min-w-0 h-[138px] max-[700px]:h-auto max-[700px]:min-h-[180px] gap-4 opacity-100 flex flex-col">
                          {/* Label + Badge Container */}
                          <div className="w-full h-[78px] gap-3 opacity-100 flex flex-col">
                            {/* Product Name */}
                            <div className="w-full h-[30px] opacity-100 flex items-center">
                              <span className="font-['Inter'] font-medium text-[20px] leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
                                {item.name}
                              </span>
                            </div>

                            {/* Badge */}
                            <div className="w-fit h-[36px] rounded-[6px] gap-[10px] opacity-100 py-[6px] px-[10px] bg-[#E5610A]">
                              <span className="font-['Inter'] font-medium text-[14px] leading-[24px] tracking-[0%] text-[#FDEDD7]">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Price + Quantity Container */}
                          <div className="w-full h-auto opacity-100 flex flex-col max-[700px]:items-start max-[700px]:gap-2 min-[701px]:flex-row min-[701px]:justify-between min-[701px]:items-center min-[701px]:h-[44px]">
                            {/* Price */}
                            <span className="font-['Inter'] font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                              ${item.price.toFixed(2)}
                            </span>

                            {/* Quantity Display */}
                            <div className="flex items-center gap-2">
                              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#E7E7E7]">
                                Quantity:
                              </span>
                              <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
                                {item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-full max-w-[841px] h-0 opacity-100 border-t border-[#383B42] mt-6"></div>

                      {/* Product Protection Container */}
                      <div className="w-full max-w-[841px] h-[56px] gap-1 opacity-100 mt-6">
                        {/* Inner Container */}
                        <div className="w-full max-w-[841px] h-[28px] opacity-100 flex justify-between items-center">
                          {/* Left Side - Checkbox Container */}
                          <div
                            className="w-[186px] h-[26px] gap-4 opacity-100 flex items-center cursor-pointer"
                            onClick={() => toggleProtection(item.id)}
                          >
                            {/* Checkbox */}
                            <div
                              className={`w-[26px] h-[26px] rounded-[6px] opacity-100 p-[3px] flex items-center justify-center transition-colors ${
                                protectionStates[item.id]
                                  ? "bg-[#F29145]"
                                  : "bg-[#222327] border border-[#616674]"
                              }`}
                            >
                              {protectionStates[item.id] && (
                                <CheckIcon
                                  className="text-[#262626]"
                                  size={12}
                                />
                              )}
                            </div>
                            {/* Text */}
                            <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
                              Product Protection
                            </span>
                          </div>

                          {/* Right Side - Price */}
                          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]">
                            $1
                          </span>
                        </div>

                        {/* Support Text Container */}
                        <div className="w-full max-w-[841px] h-[24px] gap-[10px] opacity-100 px-10">
                          <span className="font-['Inter'] font-normal text-[14px] leading-[24px] tracking-[0%] text-[#E7E7E7]">
                            The claim process is easy and instant, valid for 6
                            months
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address Section */}
              <div className="w-[889px] max-w-full min-h-[350px] gap-4 opacity-100 flex flex-col">
                {/* Address Title */}
                <h2 className="font-['Inter'] font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                  Address
                </h2>

                {/* Address Form Container */}
                <div className="w-full max-w-[889px] h-auto rounded-[6px] gap-8 opacity-100 p-6 border bg-[#262626] border-[#383B42] flex flex-col items-center">
                  {/* Link Container */}
                  <div className="w-full max-w-[841px] h-[40px] opacity-100 flex gap-0">
                    {/* Existing Address Container */}
                    <div
                      className="w-[420.5px] h-[40px] gap-3 opacity-100 flex flex-col items-center cursor-pointer"
                      onClick={() => setAddressTab("existing")}
                    >
                      {/* Text */}
                      <span
                        className={`font-['Inter'] font-semibold text-[18px] leading-[28px] tracking-[0%] ${
                          addressTab === "existing"
                            ? "text-[#F29145]"
                            : "text-[#B0B0B0]"
                        }`}
                      >
                        Existing Address
                      </span>
                      {/* Vector/Border */}
                      <div
                        className={`w-[420.5px] h-0 opacity-100 ${
                          addressTab === "existing"
                            ? "border-b-2 border-[#F29145]"
                            : "border-b border-[#383B42]"
                        }`}
                      ></div>
                    </div>

                    {/* New Address Container */}
                    <div
                      className="w-[420.5px] h-[40px] gap-3 opacity-100 flex flex-col items-center cursor-pointer"
                      onClick={() => setAddressTab("new")}
                    >
                      {/* Text */}
                      <span
                        className={`font-['Inter'] font-semibold text-[18px] leading-[28px] tracking-[0%] ${
                          addressTab === "new"
                            ? "text-[#F29145]"
                            : "text-[#B0B0B0]"
                        }`}
                      >
                        New Address
                      </span>
                      {/* Vector/Border */}
                      <div
                        className={`w-[420.5px] h-0 opacity-100 ${
                          addressTab === "new"
                            ? "border-b-2 border-[#F29145]"
                            : "border-b border-[#383B42]"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Address Content Container */}
                  {addressTab === "existing" ? (
                    <div className="w-full max-w-[841px] h-[178px] gap-10 opacity-100 flex flex-col">
                      {/* Complete Address Container */}
                      <div className="w-full max-w-[841px] h-[76px] gap-3 opacity-100 flex flex-col">
                        {/* Label + Badge Container */}
                        <div className="w-full max-w-[841px] h-[36px] gap-4 opacity-100 flex items-center">
                          {/* Address Text */}
                          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#E7E7E7]">
                            Address
                          </span>

                          {/* Badge */}
                          <div className="w-[112px] h-[36px] rounded-[6px] gap-[10px] opacity-100 py-[6px] px-[10px] bg-[#E5610A] flex items-center justify-center">
                            <span className="font-['Inter'] font-medium text-[14px] leading-[24px] tracking-[0%] text-[#FDEDD7]">
                              Main Address
                            </span>
                          </div>
                        </div>

                        {/* Complete Address Text */}
                        <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]">
                          {existingAddress.address || "No address saved"}
                        </span>
                      </div>

                      {/* Bottom Container */}
                      <div className="w-full max-w-[841px] h-[62px] opacity-100 flex justify-between">
                        {/* Country Container */}
                        <div className="w-[84px] h-[62px] gap-2 opacity-100 flex flex-col">
                          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#E7E7E7]">
                            Country
                          </span>
                          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]">
                            {existingAddress.country || "-"}
                          </span>
                        </div>

                        {/* Province Container */}
                        <div className="w-[84px] h-[62px] gap-2 opacity-100 flex flex-col">
                          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#E7E7E7]">
                            Province
                          </span>
                          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]">
                            {existingAddress.province || "-"}
                          </span>
                        </div>

                        {/* City Container */}
                        <div className="w-[84px] h-[62px] gap-2 opacity-100 flex flex-col">
                          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#E7E7E7]">
                            City
                          </span>
                          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]">
                            {existingAddress.city || "-"}
                          </span>
                        </div>

                        {/* Postal Code Container */}
                        <div className="w-[84px] h-[62px] gap-2 opacity-100 flex flex-col">
                          <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#E7E7E7] whitespace-nowrap">
                            Postal Code
                          </span>
                          <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC]">
                            {existingAddress.postalCode || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-[841px] h-[360px] gap-8 opacity-100 flex flex-col">
                      {/* First Row - Country and Province */}
                      <div className="w-full flex gap-8">
                        <input
                          type="text"
                          placeholder="Country"
                          value={newAddressForm.country}
                          onChange={(e) =>
                            setNewAddressForm({
                              ...newAddressForm,
                              country: e.target.value,
                            })
                          }
                          className="w-[400px] h-[54px] rounded-[6px] opacity-100 px-4 py-[14px] bg-[#262626] border border-[#616674] text-[#FCFCFC] font-['Inter'] font-medium placeholder:text-[#848A97]"
                        />
                        <input
                          type="text"
                          placeholder="Province"
                          value={newAddressForm.province}
                          onChange={(e) =>
                            setNewAddressForm({
                              ...newAddressForm,
                              province: e.target.value,
                            })
                          }
                          className="w-[400px] h-[54px] rounded-[6px] opacity-100 px-4 py-[14px] bg-[#262626] border border-[#616674] text-[#FCFCFC] font-['Inter'] font-medium placeholder:text-[#848A97]"
                        />
                      </div>

                      {/* Second Row - City and Postal Code */}
                      <div className="w-full flex gap-8">
                        <input
                          type="text"
                          placeholder="City"
                          value={newAddressForm.city}
                          onChange={(e) =>
                            setNewAddressForm({
                              ...newAddressForm,
                              city: e.target.value,
                            })
                          }
                          className="w-[400px] h-[54px] rounded-[6px] opacity-100 px-4 py-[14px] bg-[#262626] border border-[#616674] text-[#FCFCFC] font-['Inter'] font-medium placeholder:text-[#848A97]"
                        />
                        <input
                          type="text"
                          placeholder="Postal Code"
                          value={newAddressForm.postalCode}
                          onChange={(e) =>
                            setNewAddressForm({
                              ...newAddressForm,
                              postalCode: e.target.value,
                            })
                          }
                          className="w-[400px] h-[54px] rounded-[6px] opacity-100 px-4 py-[14px] bg-[#262626] border border-[#616674] text-[#FCFCFC] font-['Inter'] font-medium placeholder:text-[#848A97]"
                        />
                      </div>

                      {/* Third Row - Complete Address */}
                      <textarea
                        placeholder="Complete Address"
                        value={newAddressForm.completeAddress}
                        onChange={(e) =>
                          setNewAddressForm({
                            ...newAddressForm,
                            completeAddress: e.target.value,
                          })
                        }
                        className="w-full max-w-[841px] h-[130px] rounded-[6px] opacity-100 px-4 py-[14px] bg-[#262626] border border-[#616674] text-[#FCFCFC] font-['Inter'] font-medium placeholder:text-[#848A97] resize-none"
                      />

                      {/* Checkbox Container */}
                      <div
                        className="w-[234px] h-[26px] gap-4 opacity-100 flex items-center cursor-pointer"
                        onClick={async () => {
                          const newValue = !mainAddress;
                          setMainAddress(newValue);
                          if (newValue) {
                            await handleSaveAddress();
                          }
                        }}
                      >
                        {/* Checkbox */}
                        <div
                          className={`w-[26px] h-[26px] rounded-[6px] opacity-100 p-[3px] flex items-center justify-center transition-colors ${
                            mainAddress
                              ? "bg-[#F29145]"
                              : "bg-[#222327] border border-[#616674]"
                          }`}
                        >
                          {mainAddress && (
                            <CheckIcon className="text-[#262626]" size={12} />
                          )}
                        </div>

                        {/* Text */}
                        <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
                          Make it the main address
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Shipping Section */}
              <div className="w-[889px] max-w-full h-[128px] gap-4 opacity-100 flex flex-col">
                {/* Shipping Title */}
                <h2 className="font-['Inter'] font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                  Shipping
                </h2>

                {/* Shipping Container */}
                <div className="w-full max-w-[889px] h-[76px] rounded-[6px] opacity-100 p-6 border bg-[#262626] border-[#383B42] flex justify-between items-center">
                  {/* Shipping Info Container */}
                  <div className="w-[198px] h-[28px] gap-4 opacity-100 flex items-center">
                    {/* Shield Cross Icon */}
                    <ShieldCrossIcon className="text-[#4ADE80]" size={24} />

                    {/* Text */}
                    <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC] whitespace-nowrap">
                      NexusHub Courier
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="w-[889px] max-w-full h-[128px] gap-4 opacity-100 flex flex-col">
                {/* Payment Method Title */}
                <h2 className="font-['Inter'] font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                  Payment Method
                </h2>

                {/* Payment Method Container */}
                <div className="w-full max-w-[889px] h-[76px] rounded-[6px] opacity-100 p-6 border bg-[#262626] border-[#383B42] flex justify-between items-center">
                  {/* Payment Info Container */}
                  <div className="w-[157px] h-[30px] gap-6 opacity-100 flex items-center">
                    {/* Apple Pay Icon */}
                    <Image
                      src="/apple.svg"
                      alt="Apple Pay"
                      width={46}
                      height={30}
                      className="rounded-[4.93px] border-[0.99px] border-transparent"
                    />

                    {/* Text */}
                    <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC] whitespace-nowrap">
                      Apple Pay
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Container - Order Summary */}
            <div className="w-[423px] max-[430px]:w-[344px] h-auto rounded-[6px] gap-6 opacity-100 border p-6 bg-[#262626] border-[#383B42] flex flex-col">
              {/* Top Container */}
              <div className="w-[375px] max-[430px]:w-[296px] h-auto gap-4 opacity-100 flex flex-col">
                {/* Title */}
                <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
                  Total Product
                </span>

                {/* Price Row */}
                <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
                  {/* Left Text */}
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
                    Total Product Price ({totalItems}{" "}
                    {totalItems === 1 ? "Item" : "Items"})
                  </span>

                  {/* Right Text */}
                  <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Product Protection Row */}
                <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
                  {/* Left Text */}
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
                    Total Product Protection
                  </span>

                  {/* Right Text */}
                  <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
                    ${protectionCost.toFixed(2)}
                  </span>
                </div>

                {/* Shipping Price Row */}
                <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
                  {/* Left Text */}
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
                    Total Shipping Price
                  </span>

                  {/* Right Text */}
                  <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
                    $5
                  </span>
                </div>

                {/* Shipping Insurance Row */}
                <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
                  {/* Left Text */}
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] align-middle text-[#E7E7E7]">
                    Shipping Insurance
                  </span>

                  {/* Right Text */}
                  <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
                    $6
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-[375px] max-[430px]:w-[296px] h-0 opacity-100 border-t border-[#383B42]"></div>

              {/* Transaction Fees Container */}
              <div className="w-[375px] max-[430px]:w-[296px] h-[72px] gap-4 opacity-100 flex flex-col">
                {/* Title */}
                <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
                  Transaction Fees
                </span>

                {/* Service Fees Row */}
                <div className="w-[375px] max-[430px]:w-[296px] h-[28px] opacity-100 flex justify-between items-center">
                  {/* Left Text */}
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center align-middle text-[#E7E7E7]">
                    Service Fees
                  </span>

                  {/* Right Text */}
                  <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-center align-middle text-[#FCFCFC]">
                    $0.5
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-[375px] max-[430px]:w-[296px] h-0 opacity-100 border-t border-[#383B42]"></div>

              {/* Bottom Container */}
              <div className="w-[375px] max-[430px]:w-[296px] h-auto gap-8 opacity-100 flex flex-col">
                {/* Subtotal Row */}
                <div className="w-[375px] max-[430px]:w-[296px] h-[40px] opacity-100 flex justify-between items-center">
                  {/* Left Text */}
                  <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] align-middle text-[#FCFCFC]">
                    Subtotal
                  </span>

                  {/* Right Text */}
                  <span className="font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || cartItems.length === 0}
                  className="w-[375px] max-[430px]:w-[296px] h-[54px] rounded-[6px] gap-[14px] opacity-100 py-[14px] px-5 bg-[#F29145] hover:bg-[#E17F33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-center align-middle text-[#262626]">
                    {isLoading ? "Processing..." : "Pay Now"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
