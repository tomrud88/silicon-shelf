import { prisma } from "@/lib/prisma";
import MouseIcon from "@/components/icons/MouseIcon";
import MonitorIcon from "@/components/icons/MonitorIcon";
import HeadphoneIcon from "@/components/icons/HeadphoneIcon";
import KeyboardIcon from "@/components/icons/KeyboardIcon";
import WebcamIcon from "@/components/icons/WebcamIcon";
import IconCard from "@/components/features/IconCard";
import type { ReactElement } from "react";

export default async function CategoriesSection() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const iconMap: { [key: string]: ReactElement } = {
    Mouse: <MouseIcon />,
    Monitor: <MonitorIcon />,
    Headphone: <HeadphoneIcon />,
    Keyboard: <KeyboardIcon />,
    Webcam: <WebcamIcon />,
  };

  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <h2 className="w-full max-w-[1360px] h-10 font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
          Category
        </h2>
        <div className="w-full max-w-[1360px] grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 justify-items-center md:justify-items-stretch opacity-100">
          {categories.slice(0, 5).map((category) => (
            <IconCard
              key={category.id}
              icon={iconMap[category.name] || <MouseIcon />}
              name={category.name}
              categoryId={category.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
