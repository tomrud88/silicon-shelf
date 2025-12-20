import { ReactNode } from "react";

interface IconCardProps {
  icon: ReactNode;
  name: string;
}

export default function IconCard({ icon, name }: IconCardProps) {
  return (
    <div className="w-full max-w-[180px] lg:max-w-[220px] h-[160px] lg:h-[190px] rounded-md border border-[#616674] bg-[#262626] p-2 lg:p-3 flex flex-col items-center justify-center gap-4 lg:gap-6">
      <div className="scale-75 lg:scale-100">{icon}</div>
      <h3 className="font-medium text-base lg:text-xl leading-6 lg:leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
        {name}
      </h3>
    </div>
  );
}
