import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Register Container */}
      <div className="w-full max-w-[1440px] min-h-[calc(100vh-200px)] mx-auto flex items-center justify-center p-10">
        <div className="w-[448px] flex flex-col gap-[32px] items-center">
          <img
            src="/logo.svg"
            alt="SiliconShelf"
            className="w-[210px] h-[80px]"
          />
          <div className="w-[448px] h-[936px] rounded-md border border-[#383B42] bg-[#262626] p-6 flex flex-col gap-[32px]">
            <div className="w-[400px] h-[56px] flex items-center border-b border-[#383B42] pb-[20px]">
              <h1 className="font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                Create Account
              </h1>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
