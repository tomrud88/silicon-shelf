import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="w-full">
      {/* First Container */}
      <section className="max-w-[1440px] h-[1850px] mx-auto px-10 pb-20 flex flex-col gap-[100px]">
        {/* Category Carousel */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-[1360px] h-[488px] flex items-center justify-center">
            {/* Ad Banner */}
            <div className="w-[1360px] h-[452px] rounded-md border border-gray-200 py-20 px-[120px] flex gap-2.5 items-center justify-between overflow-hidden relative">
              {/* Left Arrow */}
              <button className="absolute left-0 w-11 h-[74px] py-1 px-[7px] bg-[#F29145] hover:bg-[#E08034] rounded-r-md flex items-center justify-center transition-all z-10">
                <img src="/shape-left.svg" alt="Previous" className="w-2 h-4" />
              </button>
              <div className="w-[433px] h-[240px] flex flex-col gap-10">
                <div className="w-[433px] h-[146px] flex flex-col gap-6">
                  <h2 className="w-[102px] h-11 font-medium text-[32px] leading-[44px] tracking-tight text-[#FCFCFC]">
                    Mouse
                  </h2>
                  <p className="w-[433px] h-[78px] font-normal text-base leading-[26px] tracking-normal text-[#E7E7E7]">
                    Explore our diverse selection of electronic mice for sale,
                    featuring cutting-edge technology, ergonomic designs, and
                    unbeatable prices. Shop now!
                  </p>
                </div>
                <Button
                  variant="stroke"
                  size="xl"
                  rightIcon={<ArrowRightIcon />}
                  className="w-[211px] h-[54px]"
                >
                  Explore category
                </Button>
              </div>

              {/* Mouse Image */}
              <img
                src="/mouse-img.png"
                alt="Mouse"
                className="w-[582.61px] h-[472.68px]"
                style={{ transform: "rotate(-2.55deg)" }}
              />

              {/* Right Arrow */}
              <button className="absolute right-0 w-11 h-[74px] py-1 px-[7px] bg-[#F29145] hover:bg-[#E08034] rounded-l-md flex items-center justify-center transition-all z-10">
                <img
                  src="/shape-left.svg"
                  alt="Next"
                  className="w-2 h-4 rotate-180"
                />
              </button>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="w-[124px] h-3 flex gap-4">
            <div className="w-3 h-3 rounded-full bg-[#F29145]"></div>
            <div className="w-3 h-3 rounded-full bg-[#383B42]"></div>
            <div className="w-3 h-3 rounded-full bg-[#383B42]"></div>
            <div className="w-3 h-3 rounded-full bg-[#383B42]"></div>
            <div className="w-3 h-3 rounded-full bg-[#383B42]"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
