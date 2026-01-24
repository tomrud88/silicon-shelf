import LoginForm from "@/components/features/LoginForm";
import Logo from "@/components/icons/Logo";

export default function LoginPage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Login Container */}
      <div className="w-full max-w-[1440px] min-h-[calc(100vh-200px)] mx-auto flex items-center justify-center p-10">
        <div className="w-[448px] flex flex-col gap-[32px] items-center">
          <Logo />
          <div className="w-[448px] rounded-md border border-[#383B42] bg-[#262626] p-6 flex flex-col gap-[32px]">
            <div className="w-[400px] flex items-center border-b border-[#383B42] pb-[20px]">
              <h1 className="font-medium text-[24px] leading-[36px] tracking-[-0.01em] text-[#FCFCFC]">
                Sign in
              </h1>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
