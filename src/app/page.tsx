import MouseIcon from "@/components/icons/MouseIcon";
import MonitorIcon from "@/components/icons/MonitorIcon";
import HeadphoneIcon from "@/components/icons/HeadphoneIcon";
import KeyboardIcon from "@/components/icons/KeyboardIcon";
import WebcamIcon from "@/components/icons/WebcamIcon";
import CategoryCard from "@/components/CategoryCard";
import CategoryCarousel from "@/components/CategoryCarousel";
import RecommendationSection from "@/components/RecommendationSection";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  // Fetch recommendations from the API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const recommendationsRes = await fetch(
    `${baseUrl}/api/products/recommendations`,
    {
      cache: "no-store",
    }
  );
  const recommendations = await recommendationsRes.json();

  return (
    <main className="w-full overflow-x-hidden overflow-y-visible">
      {/* First Container */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-10 pb-20 flex flex-col gap-[100px] overflow-visible">
        {/* Category Carousel */}
        <CategoryCarousel categories={categories} />

        {/* Categories Section */}
        <div className="flex flex-col items-center gap-8">
          <h2 className="w-full max-w-[1360px] h-10 font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
            Category
          </h2>
          <div className="w-full max-w-[1360px] grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 justify-items-center md:justify-items-stretch opacity-100">
            <CategoryCard icon={<MouseIcon />} name="Mouse" />
            <CategoryCard icon={<MonitorIcon />} name="Monitor" />
            <CategoryCard icon={<HeadphoneIcon />} name="Headphone" />
            <CategoryCard icon={<KeyboardIcon />} name="Keyboard" />
            <CategoryCard icon={<WebcamIcon />} name="Webcam" />
          </div>
        </div>

        {/* Recommendation Section */}
        <RecommendationSection recommendations={recommendations} />
      </section>
    </main>
  );
}
