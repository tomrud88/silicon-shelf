import { ReactNode } from "react";

interface CategoryCardProps {
  icon: ReactNode;
  name: string;
}

export default function CategoryCard({ icon, name }: CategoryCardProps) {
  return (
    <div className="w-[220px] h-[190px] rounded-md border border-[#616674] bg-[#262626] p-3 flex flex-col items-center justify-center gap-6">
      {icon}
      <h3 className="font-medium text-xl leading-[30px] tracking-[-0.01em] text-[#FCFCFC]">
        {name}
      </h3>
    </div>
  );
}
