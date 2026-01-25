import { Suspense } from "react";
import CategoryFilter from "@/components/features/CategoryFilter";
import ProductCard from "@/components/features/ProductCard";
import PriceFilter from "@/components/features/PriceFilter";
import ProductsBreadcrumb from "@/components/layout/ProductsBreadcrumb";
import ShowDropdown from "@/components/ui/ShowDropdown";
import SortDropdown from "@/components/ui/SortDropdown";
import Pagination from "@/components/ui/Pagination";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: {
    name: string;
  };
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

const ProductGridSkeleton = () => (
  <div
    className="flex flex-col justify-between gap-12 opacity-100"
    aria-busy="true"
  >
    <div className="flex items-center justify-center py-8 mb-8">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-[#F29145] rounded-full animate-bounce" />
          <div
            className="w-3 h-3 bg-[#F29145] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-3 h-3 bg-[#F29145] rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
        <span className="text-[#F29145] font-semibold text-base">
          Loading products...
        </span>
      </div>
    </div>
    <div className="grid gap-x-6 gap-y-12 justify-items-center min-[1400px]:justify-items-stretch [grid-template-columns:repeat(1,300px)] min-[670px]:[grid-template-columns:repeat(2,300px)] min-[1400px]:[grid-template-columns:repeat(3,300px)]">
      {Array.from({ length: 9 }).map((_, idx) => (
        <div
          key={idx}
          className="w-[300px] h-[444px] rounded-[10px] border-[1.5px] border-[#383B42] bg-[#1A1C1F] p-6 flex flex-col justify-between opacity-100 animate-pulse"
        >
          <div className="w-[252px] h-[252px] rounded-[10px] bg-[#2A2C31]" />
          <div className="w-[252px] h-[116px] flex flex-col gap-4">
            <div className="h-[18px] w-24 bg-[#2A2C31] rounded" />
            <div className="h-[24px] w-full bg-[#2A2C31] rounded" />
            <div className="w-[252px] h-[50px] flex justify-between items-center">
              <div className="h-[32px] w-20 bg-[#2A2C31] rounded" />
              <div className="w-[50px] h-[50px] rounded-[10px] bg-[#2A2C31]" />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center items-center gap-4">
      <div className="h-[40px] w-32 bg-[#2A2C31] rounded animate-pulse" />
    </div>
  </div>
);

async function ProductGridSection({
  categoryId,
  sort,
  minPrice,
  maxPrice,
  limit,
  page,
}: {
  categoryId?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  limit?: string;
  page?: string;
}) {
  const { products, pagination } = await getProducts(
    categoryId,
    sort,
    minPrice,
    maxPrice,
    limit,
    page,
  );

  return (
    <div className="flex flex-col justify-between gap-12 opacity-100">
      <div className="grid gap-x-6 gap-y-12 justify-items-center min-[1400px]:justify-items-stretch [grid-template-columns:repeat(1,300px)] min-[670px]:[grid-template-columns:repeat(2,300px)] min-[1400px]:[grid-template-columns:repeat(3,300px)]">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            categoryName={product.category.name}
            productName={product.name}
            price={product.price}
          />
        ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}

async function getProducts(
  categoryId?: string,
  sort?: string,
  minPrice?: string,
  maxPrice?: string,
  limit?: string,
  page?: string,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({ limit: limit || "9" });
  if (categoryId) {
    params.append("categoryId", categoryId);
  }
  if (sort) {
    params.append("sort", sort);
  }
  if (minPrice) {
    params.append("minPrice", minPrice);
  }
  if (maxPrice) {
    params.append("maxPrice", maxPrice);
  }
  if (page) {
    params.append("page", page);
  }

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/products?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    categoryId?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    limit?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  return (
    <main className="w-full overflow-x-hidden">
      {/* Breadcrumb */}
      <ProductsBreadcrumb />

      {/* Horizontal Divider Container */}
      <div className="max-w-[1440px] h-10 mx-auto pt-10 opacity-100">
        <div className="w-full h-0 border-t border-[#383B42] opacity-100"></div>
      </div>

      {/* Products Content */}
      {/* Layout Container */}
      <div className="w-full max-w-[1441px] gap-[2px] opacity-100 mx-auto flex flex-col lg:flex-row">
        {/* Filter */}
        <div className="w-full lg:w-[363px] flex-shrink-0 flex flex-col min-[670px]:flex-row lg:flex-col gap-6 lg:gap-[52px] p-10 opacity-100">
          {/* Category Filter */}
          <CategoryFilter selectedCategoryId={params.categoryId} />

          {/* Price Filter */}
          <PriceFilter minPrice={params.minPrice} maxPrice={params.maxPrice} />
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-0 min-h-[1478px] border-l border-[#383B42] opacity-100"></div>

        {/* Products Grid */}
        <div className="flex-1 flex flex-col justify-between gap-12 p-10 opacity-100">
          {/* Filter + Product Card List Container */}
          <div className="w-full flex flex-col gap-10 opacity-100">
            {/* Filter/Sort Bar */}
            <div className="w-full h-auto flex flex-col min-[670px]:flex-row items-start min-[670px]:items-center gap-4 min-[670px]:gap-[60px] opacity-100">
              {/* Sorting Container */}
              <SortDropdown selectedSort={params.sort} />

              {/* Showing Container */}
              <ShowDropdown selectedLimit={params.limit} />
            </div>

            <Suspense
              key={`${params.categoryId}-${params.sort}-${params.minPrice}-${params.maxPrice}-${params.limit}-${params.page}`}
              fallback={<ProductGridSkeleton />}
            >
              <ProductGridSection
                categoryId={params.categoryId}
                sort={params.sort}
                minPrice={params.minPrice}
                maxPrice={params.maxPrice}
                limit={params.limit}
                page={params.page}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
