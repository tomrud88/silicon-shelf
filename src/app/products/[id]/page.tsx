import Image from "next/image";
import ShieldCrossIcon from "@/components/icons/ShieldCrossIcon";
import AddToCartSection from "@/components/features/AddToCartSection";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ProductDescription from "@/components/features/ProductDescription";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/products/${id}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Failed to fetch product:", {
        status: res.status,
        url,
        error: errorData,
      });
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error in getProduct:", error);
    throw error;
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  // Generate deterministic delivery date range based on product ID
  const today = new Date();
  // Use product ID hash for consistent but varied delivery estimates
  const idHash = id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const startDaysOffset = idHash % 4; // 0-3 days from now
  const deliveryDuration = (idHash % 2) + 3; // 3-4 days duration

  const startDate = new Date(today);
  startDate.setDate(today.getDate() + startDaysOffset);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + deliveryDuration);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  const deliveryEstimate = `${formatDate(startDate)} - ${formatDate(endDate)}`;

  return (
    <main className="w-full overflow-x-hidden">
      {/* Breadcrumb Container */}
      <BreadcrumbNav productName={product.name} />

      {/* Product Detail Container */}
      <div className="w-full max-w-[1440px] min-h-[628px] mx-auto flex flex-wrap gap-8 opacity-100 p-10 max-[460px]:p-0 max-[460px]:gap-4">
        {/* Product Description Container */}
        <div className="w-[889px] max-w-full min-h-[548px] flex flex-col gap-12 opacity-100">
          {/* Image + Product Info Container */}
          <div className="w-[889px] max-w-full h-auto flex flex-wrap gap-10 opacity-100">
            {/* Image Container */}
            <div className="w-[422px] max-w-full h-[472px] flex flex-col gap-8 opacity-100">
              {/* Main Image */}
              <div className="w-[422px] h-[341px] rounded-[6px] flex gap-[10px] opacity-100 p-3 border border-[#383B42] bg-[#262626]">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={398}
                  height={317}
                  className="w-full h-full object-cover rounded-[6px]"
                />
              </div>

              {/* Thumbnail Images List */}
              <div className="w-[422px] h-[99px] flex gap-4 opacity-100">
                {/* Thumbnail 1 - Active */}
                <div className="w-[130px] h-[99px] rounded-[6px] opacity-100 border-2 border-[#F29145] overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={130}
                    height={99}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail 2 */}
                <div className="w-[130px] h-[99px] rounded-[6px] opacity-100 border-2 border-transparent overflow-hidden hover:border-[#F29145] cursor-pointer transition-colors">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={130}
                    height={99}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail 3 */}
                <div className="w-[130px] h-[99px] rounded-[6px] opacity-100 border-2 border-transparent overflow-hidden hover:border-[#F29145] cursor-pointer transition-colors">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={130}
                    height={99}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Product Information Container */}
            <div className="w-[427px] h-[500px] flex flex-col gap-8 opacity-100">
              {/* Title + Badge Container */}
              <div className="w-[427px] h-24 flex flex-col gap-5 opacity-100">
                {/* Product Title */}
                <h1 className="font-['Inter'] font-medium text-[28px] leading-[40px] tracking-[-0.01em] text-[#FCFCFC]">
                  {product.name}
                </h1>

                {/* Badge */}
                <div className="w-fit h-9 rounded-[6px] flex gap-[10px] opacity-100 py-[6px] px-[10px] bg-[#E5610A]">
                  <span className="font-['Inter'] font-medium text-sm leading-6 tracking-[0%] text-[#FCFCFC]">
                    {product.category.name}
                  </span>
                </div>
              </div>

              {/* Price Container */}
              <div className="w-[427px] h-11 flex gap-4 opacity-100">
                <span className="font-['Inter'] font-medium text-[32px] leading-[44px] tracking-[-0.01em] text-[#FCFCFC]">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Description Container */}
              <ProductDescription description={product.description} />

              {/* Shipping Container */}
              <div className="w-[427px] h-[130px] flex flex-col gap-[14px] opacity-100">
                <span className="font-['Inter'] font-medium text-lg leading-[28px] tracking-[0%] text-left text-[#B0B0B0]">
                  Shipping Available
                </span>

                {/* Shipping Card Container */}
                <div className="w-[312px] h-[88px] rounded-[6px] flex gap-2 opacity-100 p-4 border border-[#FCFCFC]">
                  {/* Icon Container */}
                  <div className="w-6 h-6 flex items-center justify-center opacity-100">
                    <ShieldCrossIcon size={24} className="text-[#4ADE80]" />
                  </div>

                  {/* Text Container */}
                  <div className="w-[248px] h-14 flex flex-col gap-1 opacity-100">
                    <span className="font-['Inter'] font-medium text-base leading-[26px] tracking-[0%] text-[#FCFCFC]">
                      NexusHub Courier
                    </span>
                    <span className="font-['Inter'] font-normal text-sm leading-6 tracking-[0%] text-[#E7E7E7]">
                      Estimated arrival {deliveryEstimate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Cart Container */}
        <AddToCartSection
          productId={product.id}
          productName={product.name}
          productImage={product.imageUrl}
          categoryName={product.category.name}
          price={product.price}
          stock={product.stock}
        />

        {/* Horizontal Divider Container */}
        <div className="w-full h-auto flex gap-[10px] opacity-100">
          {/* Divider */}
          <div className="w-full h-0 border-t border-[#383B42] opacity-100"></div>
        </div>
      </div>
    </main>
  );
}
