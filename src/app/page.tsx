import MouseIcon from "@/components/icons/MouseIcon";
import MonitorIcon from "@/components/icons/MonitorIcon";
import HeadphoneIcon from "@/components/icons/HeadphoneIcon";
import KeyboardIcon from "@/components/icons/KeyboardIcon";
import WebcamIcon from "@/components/icons/WebcamIcon";
import CategoryCard from "@/components/CategoryCard";
import CategoryCarousel from "@/components/CategoryCarousel";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <main className="w-full">
      {/* First Container */}
      <section className="max-w-[1440px] h-[1850px] mx-auto px-10 pb-20 flex flex-col gap-[100px]">
        {/* Category Carousel */}
        <CategoryCarousel categories={categories} />

        {/* Categories Section */}
        <div className="flex flex-col items-center gap-8">
          <h2 className="w-[1360px] h-10 font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
            Category
          </h2>
          <div className="w-[1360px] h-[190px] flex justify-between opacity-100">
            <CategoryCard icon={<MouseIcon />} name="Mouse" />
            <CategoryCard icon={<MonitorIcon />} name="Monitor" />
            <CategoryCard icon={<HeadphoneIcon />} name="Headphone" />
            <CategoryCard icon={<KeyboardIcon />} name="Keyboard" />
            <CategoryCard icon={<WebcamIcon />} name="Webcam" />
          </div>
        </div>
      </section>
    </main>
  );
}
