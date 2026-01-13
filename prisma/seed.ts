import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Clear existing data
  console.log("Clearing existing data...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();
  console.log("✓ Data cleared");

  // Create Brands
  const logitech = await prisma.brand.create({
    data: {
      name: "Logitech",
      logo: "/brands/logitech.png",
    },
  });

  const dell = await prisma.brand.create({
    data: {
      name: "Dell",
      logo: "/brands/dell.png",
    },
  });

  const razer = await prisma.brand.create({
    data: {
      name: "Razer",
      logo: "/brands/razer.png",
    },
  });

  const sony = await prisma.brand.create({
    data: {
      name: "Sony",
      logo: "/brands/sony.png",
    },
  });

  const corsair = await prisma.brand.create({
    data: {
      name: "Corsair",
      logo: "/brands/corsair.png",
    },
  });

  // Category: Mouse
  const mouseCategory = await prisma.category.create({
    data: {
      name: "Mouse",
      description:
        "Premium gaming and office mice featuring cutting-edge sensors, customizable options, and ergonomic designs for competitive gaming and productivity excellence.",
      carouselImage: "https://i.ibb.co/1G9CKZGC/mouse-img.png",
      exploreInfo: "Find the perfect mouse for your setup",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Logitech G502 HERO",
        description:
          "The Logitech G502 HERO is a high-performance gaming mouse featuring an advanced 25K DPI sensor for unmatched precision. Its customizable weight system and programmable buttons make it perfect for competitive gaming. The ergonomic design ensures comfort during extended gaming sessions.",
        price: 79.99,
        stock: 50,
        imageUrl: "https://i.ibb.co/5Xy3GXc4/logitech-g502-hero.png",
        categoryId: mouseCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Razer DeathAdder V3",
        description:
          "The Razer DeathAdder V3 combines ergonomic excellence with cutting-edge optical switches. Its lightweight design and Focus Pro 30K optical sensor deliver lightning-fast response times. The comfortable grip shape fits perfectly in your hand for marathon gaming sessions.",
        price: 69.99,
        stock: 35,
        imageUrl: "https://i.ibb.co/99HqwTpF/Razer-Death-Adder-V3.png",
        categoryId: mouseCategory.id,
        brandId: razer.id,
      },
      {
        name: "Logitech MX Master 3S",
        description:
          "The Logitech MX Master 3S is the ultimate productivity mouse with its ultra-quiet clicks and electromagnetic scrolling. Its ergonomic shape supports your hand naturally, while the 8K DPI sensor works flawlessly on any surface including glass.",
        price: 99.99,
        stock: 25,
        imageUrl: "https://i.ibb.co/XPV6X0G/Logitech-MX-Master-3-S.png",
        categoryId: mouseCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Razer Viper Ultimate",
        description:
          "The Razer Viper Ultimate is an ultra-lightweight wireless gaming mouse weighing just 74 grams. Its ambidextrous design and Focus+ 20K optical sensor provide exceptional accuracy. The HyperSpeed wireless technology ensures zero-lag performance during intense gameplay.",
        price: 129.99,
        stock: 20,
        imageUrl: "https://i.ibb.co/ns28SbHs/Razer-viper-ultimate.png",
        categoryId: mouseCategory.id,
        brandId: razer.id,
      },
      {
        name: "Logitech G Pro X Superlight",
        description:
          "The Logitech G Pro X Superlight sets the standard for professional gaming mice at just 63 grams. Its HERO 25K sensor delivers pinpoint accuracy, while the symmetrical design suits all grip styles. Trusted by esports professionals worldwide for tournament-level performance.",
        price: 149.99,
        stock: 15,
        imageUrl: "https://i.ibb.co/kVBm1drv/Logitech-G-Pro-X-Superlight.png",
        categoryId: mouseCategory.id,
        brandId: logitech.id,
      },
    ],
  });

  // Category: Monitor
  const monitorCategory = await prisma.category.create({
    data: {
      name: "Monitor",
      description:
        "High-performance monitors with 4K resolution, accurate colors, and high refresh rates for immersive gaming and professional work.",
      carouselImage: "https://i.ibb.co/FqxQRk7K/monitor-big.png",
      exploreInfo: "Discover monitors with stunning visuals",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Dell UltraSharp U2723DE",
        description:
          "The Dell UltraSharp U2723DE is a stunning 27-inch 4K monitor with USB-C connectivity for seamless productivity. Its IPS Black technology delivers incredible contrast, while the built-in KVM switch lets you control multiple devices. Perfect for professionals demanding color accuracy.",
        price: 599.99,
        stock: 12,
        imageUrl: "https://i.ibb.co/7x4CFMLg/Dell-Ultra-Sharp-U2723-DE.png",
        categoryId: monitorCategory.id,
        brandId: dell.id,
      },
      {
        name: "Dell S2722DGM",
        description:
          "The Dell S2722DGM features a curved 27-inch display with a blazing 165Hz refresh rate for smooth gaming. Its VA panel provides deep blacks and vibrant colors, while AMD FreeSync Premium eliminates screen tearing during intense gaming sessions.",
        price: 299.99,
        stock: 18,
        imageUrl: "https://i.ibb.co/Q3FkZWfx/Dell-S2722-DGM.png",
        categoryId: monitorCategory.id,
        brandId: dell.id,
      },
      {
        name: "LG 27GP950-B",
        description:
          "The LG 27GP950-B combines breathtaking 4K resolution with a fast 144Hz refresh rate for ultimate gaming immersion. Its Nano IPS display covers 98% of the DCI-P3 color space, while HDMI 2.1 support makes it perfect for next-gen console gaming.",
        price: 799.99,
        stock: 8,
        imageUrl: "https://i.ibb.co/RpBjr7P2/LG-27-GP950-B.png",
        categoryId: monitorCategory.id,
        brandId: null,
      },
      {
        name: "Samsung Odyssey G7",
        description:
          "The Samsung Odyssey G7 is a 32-inch curved gaming powerhouse with an aggressive 1000R curvature and 240Hz refresh rate. Its QLED panel delivers vibrant colors and deep contrast, while G-Sync compatibility ensures buttery smooth gameplay without tearing.",
        price: 699.99,
        stock: 10,
        imageUrl: "https://i.ibb.co/PZnjh3qB/Samsung-Odyssey-G7.png",
        categoryId: monitorCategory.id,
        brandId: null,
      },
      {
        name: "ASUS ROG Swift PG279QM",
        description:
          "The ASUS ROG Swift PG279QM is built for competitive gaming with its 27-inch 1440p display and incredible 240Hz refresh rate. Fast IPS technology delivers stunning colors with minimal response time, while NVIDIA G-Sync ensures tear-free gaming at the highest level.",
        price: 649.99,
        stock: 14,
        imageUrl: "https://i.ibb.co/xq7T9TFh/mon-AOC-24g2e.png",
        categoryId: monitorCategory.id,
        brandId: null,
      },
    ],
  });

  // Category: Headphone
  const headphoneCategory = await prisma.category.create({
    data: {
      name: "Headphone",
      description:
        "Premium headphones with advanced noise cancellation, spatial audio, and crystal-clear sound for gaming, music, and all-day comfort.",
      carouselImage: "https://i.ibb.co/F4b4ZT9f/headphones-big.png",
      exploreInfo: "Experience immersive sound quality",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Sony WH-1000XM5",
        description:
          "The Sony WH-1000XM5 features industry-leading noise cancellation with eight microphones for crystal-clear calls. Its lightweight design and plush earpads provide all-day comfort, while 30-hour battery life keeps your music playing through long journeys and workdays.",
        price: 399.99,
        stock: 30,
        imageUrl: "https://i.ibb.co/KcCKwF50/Sony-WH-1000-XM5.png",
        categoryId: headphoneCategory.id,
        brandId: sony.id,
      },
      {
        name: "Razer BlackShark V2",
        description:
          "The Razer BlackShark V2 is a premium gaming headset featuring THX Spatial Audio for immersive 360-degree sound. Its Triforce titanium drivers deliver crystal-clear highs and punchy bass, while the breathable memory foam cushions ensure comfort during marathon gaming sessions.",
        price: 99.99,
        stock: 40,
        imageUrl: "https://i.ibb.co/1fxzdB49/Razer-Black-Shark-V2.png",
        categoryId: headphoneCategory.id,
        brandId: razer.id,
      },
      {
        name: "Corsair Virtuoso RGB Wireless",
        description:
          "The Corsair Virtuoso RGB Wireless combines audiophile-grade sound with gaming performance. Its custom-tuned 50mm neodymium drivers deliver exceptional audio fidelity, while the detachable broadcast-grade microphone ensures your voice is heard with pristine clarity.",
        price: 179.99,
        stock: 22,
        imageUrl: "https://i.ibb.co/Mk9DFT80/Corsair-Virtuoso-RGB-Wireless.png",
        categoryId: headphoneCategory.id,
        brandId: corsair.id,
      },
      {
        name: "Logitech G Pro X",
        description:
          "The Logitech G Pro X is designed for esports professionals with Blue VO!CE microphone technology for broadcast-quality voice comms. Its swappable ear pads and precision-tuned drivers deliver tournament-grade audio, trusted by top competitive gamers worldwide.",
        price: 129.99,
        stock: 28,
        imageUrl: "https://i.ibb.co/MxWQ36mn/Logitech-G-Pro-X.png",
        categoryId: headphoneCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Sony WH-CH720N",
        description:
          "The Sony WH-CH720N offers excellent noise cancellation at an accessible price point. Its lightweight design weighs just 192 grams, while the 35-hour battery life and quick charging ensure you're never without your music for long periods.",
        price: 149.99,
        stock: 35,
        imageUrl: "https://i.ibb.co/bg0PMQdZ/Sony-WH-CH720-N.png",
        categoryId: headphoneCategory.id,
        brandId: sony.id,
      },
    ],
  });

  // Category: Keyboard
  const keyboardCategory = await prisma.category.create({
    data: {
      name: "Keyboard",
      description:
        "Mechanical gaming keyboards with tactile switches, RGB lighting, and premium build quality for competitive gaming and productivity.",
      carouselImage: "https://i.ibb.co/M01jBQp/keyboard-big.png",
      exploreInfo: "Type faster with premium keyboards",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Corsair K70 RGB PRO",
        description:
          "The Corsair K70 RGB PRO is a premium mechanical gaming keyboard featuring genuine Cherry MX switches for reliable performance. Its durable aluminum frame ensures stability during intense gaming, while per-key RGB lighting creates stunning visual effects to match your setup.",
        price: 169.99,
        stock: 25,
        imageUrl: "https://i.ibb.co/LdNf3FJX/Corsair-K70-RGB-PRO.png",
        categoryId: keyboardCategory.id,
        brandId: corsair.id,
      },
      {
        name: "Razer BlackWidow V3",
        description:
          "The Razer BlackWidow V3 features tactile green mechanical switches with satisfying clicks. Its transparent switch housing showcases brilliant RGB lighting, while the ergonomic wrist rest provides comfort during extended typing sessions and marathon gaming nights.",
        price: 139.99,
        stock: 30,
        imageUrl: "https://i.ibb.co/wZ8YvcrS/Razer-Black-Widow-V3.png",
        categoryId: keyboardCategory.id,
        brandId: razer.id,
      },
      {
        name: "Logitech G915 TKL",
        description:
          "The Logitech G915 TKL is a wireless mechanical keyboard with ultra-low profile GL switches. Its LIGHTSPEED wireless technology provides 1ms response time, while the sleek aluminum design and 40-hour battery life make it perfect for minimalist gaming setups.",
        price: 229.99,
        stock: 15,
        imageUrl: "https://i.ibb.co/8gjSQTJ3/Logitech-G915-TKL.png",
        categoryId: keyboardCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Corsair K65 RGB Mini",
        description:
          "The Corsair K65 RGB Mini packs full-size performance into a compact 60% form factor. Its Cherry MX Speed switches deliver lightning-fast actuation, while the durable build quality and customizable RGB lighting make it ideal for space-conscious gamers.",
        price: 119.99,
        stock: 20,
        imageUrl: "https://i.ibb.co/zjWFnxr/Corsair-K65-RGB-Mini.png",
        categoryId: keyboardCategory.id,
        brandId: corsair.id,
      },
      {
        name: "Razer Huntsman Mini",
        description:
          "The Razer Huntsman Mini features revolutionary optical switches with light-based actuation for incredible speed. Its compact 60% layout saves desk space, while the PBT keycaps provide excellent durability and a premium feel for competitive gaming enthusiasts.",
        price: 129.99,
        stock: 18,
        imageUrl: "https://i.ibb.co/fbtxMvR/razer-huntsman-elite.png",
        categoryId: keyboardCategory.id,
        brandId: razer.id,
      },
    ],
  });

  // Category: Webcam
  const webcamCategory = await prisma.category.create({
    data: {
      name: "Webcam",
      description:
        "Professional webcams with Full HD and 4K resolution, autofocus, and light correction for streaming and video conferences.",
      carouselImage: "https://i.ibb.co/KxLjmxsj/webcam-big.png",
      exploreInfo: "Look your best on video calls",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Logitech C920",
        description:
          "The Logitech C920 is the gold standard for Full HD 1080p video calls and streaming. Its autofocus lens and automatic light correction ensure you always look your best, while dual stereo microphones capture clear audio for professional video conferences.",
        price: 79.99,
        stock: 50,
        imageUrl: "https://i.ibb.co/LdMmhXq7/Logitech-C920.png",
        categoryId: webcamCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Logitech StreamCam",
        description:
          "The Logitech StreamCam delivers smooth Full HD 1080p video at 60fps for professional streaming. Its smart autofocus and auto-framing keep you centered in the shot, while the versatile mounting system works in both landscape and portrait orientations.",
        price: 169.99,
        stock: 25,
        imageUrl: "https://i.ibb.co/Fk4hDJDj/Logitech-Stream-Cam.png",
        categoryId: webcamCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Razer Kiyo Pro",
        description:
          "The Razer Kiyo Pro features an adaptive light sensor that performs exceptionally in any lighting condition. Its uncompressed 1080p 60fps video and wide-angle lens ensure you're always seen clearly, making it perfect for serious content creators.",
        price: 199.99,
        stock: 20,
        imageUrl: "https://i.ibb.co/N63vzJq7/Razer-Kiyo-Pro.png",
        categoryId: webcamCategory.id,
        brandId: razer.id,
      },
      {
        name: "Logitech Brio 4K",
        description:
          "The Logitech Brio 4K delivers stunning Ultra HD video with HDR support for incredible detail and color. Its advanced optics with 5x digital zoom and multiple field-of-view options make it the ultimate choice for demanding professionals.",
        price: 199.99,
        stock: 15,
        imageUrl: "https://i.ibb.co/xKJG3x0R/Logitech-Brio-4-K.png",
        categoryId: webcamCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Razer Kiyo",
        description:
          "The Razer Kiyo features a built-in adjustable ring light that ensures perfect illumination in any environment. Its Full HD 1080p streaming capability and easy setup make it ideal for streamers who want professional results without complex lighting setups.",
        price: 99.99,
        stock: 30,
        imageUrl: "https://i.ibb.co/Fkt7dbpH/Razer-Kiyo.png",
        categoryId: webcamCategory.id,
        brandId: razer.id,
      },
    ],
  });

  const testUser = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "john@test.com",
      passwordHash: "test123", // In production, use bcrypt!
      address: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "USA",
      mobileNumber: "+1234567890",
    },
  });

  console.log("Created test user with ID:", testUser.id);

  console.log("Seeding finished successfully!");
  console.log("Created:");
  console.log("- 5 brands");
  console.log("- 5 categories (Mouse, Monitor, Headphone, Keyboard, Webcam)");
  console.log("- 25 products (5 per category)");
  console.log("- 1 test user (john@test.com)");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
