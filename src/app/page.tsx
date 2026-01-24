import CategoryCarousel from "@/components/features/CategoryCarousel";
import BrandSection from "@/components/features/BrandSection";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import CategoriesSection from "./CategoriesSection";
import RecommendationsLoader from "./RecommendationsLoader";

export default async function Home() {
  // Only fetch categories for carousel immediately
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="w-full overflow-x-hidden overflow-y-visible">
      {/* First Container */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-10 pb-20 flex flex-col gap-[100px] overflow-visible">
        {/* Category Carousel */}
        <CategoryCarousel categories={categories} />

        {/* Categories Section with Suspense */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-8">
              <div className="h-10 w-48 bg-[#383B42] rounded animate-pulse" />
              <div className="w-full max-w-[1360px] grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-full h-[120px] bg-[#383B42] rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          }
        >
          <CategoriesSection />
        </Suspense>

        {/* Recommendation Section with Suspense */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-8">
              <div className="h-10 w-64 bg-[#383B42] rounded animate-pulse" />
              <div className="w-full max-w-[1360px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-full h-[400px] bg-[#383B42] rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          }
        >
          <RecommendationsLoader />
        </Suspense>

        {/* Brand Section */}
        <BrandSection />
      </section>
    </main>
  );
}
