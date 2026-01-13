import { Dispatch, SetStateAction } from "react";
import CheckIcon from "@/components/icons/CheckIcon";

interface AddressSectionProps {
  addressTab: "existing" | "new";
  setAddressTab: Dispatch<SetStateAction<"existing" | "new">>;
  existingAddress: {
    address: string;
    province: string;
    city: string;
    postalCode: string;
    country: string;
  };
  newAddressForm: {
    country: string;
    province: string;
    city: string;
    postalCode: string;
    completeAddress: string;
  };
  setNewAddressForm: Dispatch<
    SetStateAction<{
      country: string;
      province: string;
      city: string;
      postalCode: string;
      completeAddress: string;
    }>
  >;
  mainAddress: boolean;
  setMainAddress: Dispatch<SetStateAction<boolean>>;
  onSaveAddress: () => Promise<void>;
}

export default function AddressSection({
  addressTab,
  setAddressTab,
  existingAddress,
  newAddressForm,
  setNewAddressForm,
  mainAddress,
  setMainAddress,
  onSaveAddress,
}: AddressSectionProps) {
  return (
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
                addressTab === "existing" ? "text-[#F29145]" : "text-[#B0B0B0]"
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
                addressTab === "new" ? "text-[#F29145]" : "text-[#B0B0B0]"
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
                  await onSaveAddress();
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
  );
}
