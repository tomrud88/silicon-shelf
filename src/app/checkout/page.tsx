"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ShieldCrossIcon from "@/components/icons/ShieldCrossIcon";
import ApplePayIcon from "@/components/icons/ApplePayIcon";
import { useCart } from "@/contexts/CartContext";
import CheckoutProductCard from "@/components/features/checkout/CheckoutProductCard";
import AddressSection from "@/components/features/checkout/AddressSection";
import OrderSummary from "@/components/features/checkout/OrderSummary";

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
      console.log("Sending order data:", orderData);
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log("API response:", response.status, data);

      if (!response.ok) {
        console.error("Order creation failed:", data);
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
                  <CheckoutProductCard
                    key={item.id}
                    item={item}
                    isProtected={protectionStates[item.id] || false}
                    onToggleProtection={() => toggleProtection(item.id)}
                  />
                ))}
              </div>

              {/* Address Section */}
              <AddressSection
                addressTab={addressTab}
                setAddressTab={setAddressTab}
                existingAddress={existingAddress}
                newAddressForm={newAddressForm}
                setNewAddressForm={setNewAddressForm}
                mainAddress={mainAddress}
                setMainAddress={setMainAddress}
                onSaveAddress={handleSaveAddress}
              />

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
                    <ApplePayIcon className="h-[30px]" />

                    {/* Text */}
                    <span className="font-['Inter'] font-medium text-[18px] leading-[28px] tracking-[0%] text-[#FCFCFC] whitespace-nowrap">
                      Apple Pay
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Container - Order Summary */}
            <OrderSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              protectionCost={protectionCost}
              shippingCost={shippingCost}
              insuranceCost={insuranceCost}
              serviceFee={serviceFee}
              finalTotal={finalTotal}
              isLoading={isLoading}
              onCheckout={handleCheckout}
              hasItems={cartItems.length > 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}
