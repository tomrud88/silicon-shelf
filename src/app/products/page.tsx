import CategoryFilter from "@/components/CategoryFilter";
import DownArrowIcon from "@/components/icons/DownArrowIcon";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import PriceFilter from "@/components/PriceFilter";
import ShowDropdown from "@/components/ShowDropdown";
import Pagination from "@/components/Pagination";
import ProductsBreadcrumb from "@/components/ProductsBreadcrumb";

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

async function getProducts(
  categoryId?: string,
  sort?: string,
  minPrice?: string,
  maxPrice?: string,
  limit?: string,
  page?: string
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
    }
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
  const { products, pagination } = await getProducts(
    params.categoryId,
    params.sort,
    params.minPrice,
    params.maxPrice,
    params.limit,
    params.page
  );
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

            {/* Product Grid */}
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
          </div>

          {/* Pagination Container */}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </div>
      </div>
    </main>
  );
}
