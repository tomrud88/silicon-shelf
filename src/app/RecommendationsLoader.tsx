import RecommendationSection from "@/components/features/RecommendationSection";

export default async function RecommendationsLoader() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const recommendationsRes = await fetch(
    `${baseUrl}/api/products/recommendations`,
    {
      cache: "no-store",
    },
  );
  const recommendations = await recommendationsRes.json();

  return <RecommendationSection recommendations={recommendations} />;
}
