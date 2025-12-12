import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

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
      description: "Gaming and office mice",
      image: "/categories/mouse.jpg",
      exploreInfo: "Find the perfect mouse for your setup",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Logitech G502 HERO",
        description: "High performance gaming mouse with 25K DPI sensor",
        price: 79.99,
        stock: 50,
        imageUrl: "/products/logitech-g502.jpg",
        categoryId: mouseCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Razer DeathAdder V3",
        description: "Ergonomic gaming mouse with optical switches",
        price: 69.99,
        stock: 35,
        imageUrl: "/products/razer-deathadder.jpg",
        categoryId: mouseCategory.id,
        brandId: razer.id,
      },
      {
        name: "Logitech MX Master 3S",
        description: "Premium wireless mouse for productivity",
        price: 99.99,
        stock: 25,
        imageUrl: "/products/mx-master-3s.jpg",
        categoryId: mouseCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Razer Viper Ultimate",
        description: "Lightweight wireless gaming mouse",
        price: 129.99,
        stock: 20,
        imageUrl: "/products/razer-viper.jpg",
        categoryId: mouseCategory.id,
        brandId: razer.id,
      },
      {
        name: "Logitech G Pro X Superlight",
        description: "Ultra-lightweight wireless gaming mouse",
        price: 149.99,
        stock: 15,
        imageUrl: "/products/g-pro-superlight.jpg",
        categoryId: mouseCategory.id,
        brandId: logitech.id,
      },
    ],
  });

  // Category: Monitor
  const monitorCategory = await prisma.category.create({
    data: {
      name: "Monitor",
      description: "High-quality displays for work and gaming",
      image: "/categories/monitor.jpg",
      exploreInfo: "Discover monitors with stunning visuals",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Dell UltraSharp U2723DE",
        description: "27-inch 4K USB-C monitor",
        price: 599.99,
        stock: 12,
        imageUrl: "/products/dell-ultrasharp.jpg",
        categoryId: monitorCategory.id,
        brandId: dell.id,
      },
      {
        name: "Dell S2722DGM",
        description: "27-inch curved gaming monitor 165Hz",
        price: 299.99,
        stock: 18,
        imageUrl: "/products/dell-gaming.jpg",
        categoryId: monitorCategory.id,
        brandId: dell.id,
      },
      {
        name: "LG 27GP950-B",
        description: "27-inch 4K 144Hz gaming monitor",
        price: 799.99,
        stock: 8,
        imageUrl: "/products/lg-ultragear.jpg",
        categoryId: monitorCategory.id,
        brandId: null,
      },
      {
        name: "Samsung Odyssey G7",
        description: "32-inch curved 240Hz gaming monitor",
        price: 699.99,
        stock: 10,
        imageUrl: "/products/samsung-odyssey.jpg",
        categoryId: monitorCategory.id,
        brandId: null,
      },
      {
        name: "ASUS ROG Swift PG279QM",
        description: "27-inch 1440p 240Hz gaming monitor",
        price: 649.99,
        stock: 14,
        imageUrl: "/products/asus-rog.jpg",
        categoryId: monitorCategory.id,
        brandId: null,
      },
    ],
  });

  // Category: Headphone
  const headphoneCategory = await prisma.category.create({
    data: {
      name: "Headphone",
      description: "Premium headphones for gaming and music",
      image: "/categories/headphone.jpg",
      exploreInfo: "Experience immersive sound quality",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Sony WH-1000XM5",
        description: "Industry-leading noise canceling headphones",
        price: 399.99,
        stock: 30,
        imageUrl: "/products/sony-xm5.jpg",
        categoryId: headphoneCategory.id,
        brandId: sony.id,
      },
      {
        name: "Razer BlackShark V2",
        description: "Gaming headset with THX Spatial Audio",
        price: 99.99,
        stock: 40,
        imageUrl: "/products/razer-blackshark.jpg",
        categoryId: headphoneCategory.id,
        brandId: razer.id,
      },
      {
        name: "Corsair Virtuoso RGB Wireless",
        description: "High-fidelity gaming headset",
        price: 179.99,
        stock: 22,
        imageUrl: "/products/corsair-virtuoso.jpg",
        categoryId: headphoneCategory.id,
        brandId: corsair.id,
      },
      {
        name: "Logitech G Pro X",
        description: "Professional gaming headset",
        price: 129.99,
        stock: 28,
        imageUrl: "/products/logitech-pro-x.jpg",
        categoryId: headphoneCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Sony WH-CH720N",
        description: "Wireless noise canceling headphones",
        price: 149.99,
        stock: 35,
        imageUrl: "/products/sony-ch720n.jpg",
        categoryId: headphoneCategory.id,
        brandId: sony.id,
      },
    ],
  });

  // Category: Keyboard
  const keyboardCategory = await prisma.category.create({
    data: {
      name: "Keyboard",
      description: "Mechanical and gaming keyboards",
      image: "/categories/keyboard.jpg",
      exploreInfo: "Type faster with premium keyboards",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Corsair K70 RGB PRO",
        description: "Mechanical gaming keyboard with Cherry MX switches",
        price: 169.99,
        stock: 25,
        imageUrl: "/products/corsair-k70.jpg",
        categoryId: keyboardCategory.id,
        brandId: corsair.id,
      },
      {
        name: "Razer BlackWidow V3",
        description: "Mechanical gaming keyboard with green switches",
        price: 139.99,
        stock: 30,
        imageUrl: "/products/razer-blackwidow.jpg",
        categoryId: keyboardCategory.id,
        brandId: razer.id,
      },
      {
        name: "Logitech G915 TKL",
        description: "Wireless mechanical gaming keyboard",
        price: 229.99,
        stock: 15,
        imageUrl: "/products/logitech-g915.jpg",
        categoryId: keyboardCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Corsair K65 RGB Mini",
        description: "Compact 60% mechanical keyboard",
        price: 119.99,
        stock: 20,
        imageUrl: "/products/corsair-k65.jpg",
        categoryId: keyboardCategory.id,
        brandId: corsair.id,
      },
      {
        name: "Razer Huntsman Mini",
        description: "60% optical gaming keyboard",
        price: 129.99,
        stock: 18,
        imageUrl: "/products/razer-huntsman.jpg",
        categoryId: keyboardCategory.id,
        brandId: razer.id,
      },
    ],
  });

  // Category: Webcam
  const webcamCategory = await prisma.category.create({
    data: {
      name: "Webcam",
      description: "HD webcams for streaming and video calls",
      image: "/categories/webcam.jpg",
      exploreInfo: "Look your best on video calls",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Logitech C920",
        description: "Full HD 1080p webcam",
        price: 79.99,
        stock: 50,
        imageUrl: "/products/logitech-c920.jpg",
        categoryId: webcamCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Logitech StreamCam",
        description: "Full HD 1080p 60fps streaming webcam",
        price: 169.99,
        stock: 25,
        imageUrl: "/products/logitech-streamcam.jpg",
        categoryId: webcamCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Razer Kiyo Pro",
        description: "High-performance streaming webcam",
        price: 199.99,
        stock: 20,
        imageUrl: "/products/razer-kiyo.jpg",
        categoryId: webcamCategory.id,
        brandId: razer.id,
      },
      {
        name: "Logitech Brio 4K",
        description: "4K Ultra HD webcam with HDR",
        price: 199.99,
        stock: 15,
        imageUrl: "/products/logitech-brio.jpg",
        categoryId: webcamCategory.id,
        brandId: logitech.id,
      },
      {
        name: "Razer Kiyo",
        description: "Full HD streaming webcam with ring light",
        price: 99.99,
        stock: 30,
        imageUrl: "/products/razer-kiyo-base.jpg",
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
      phone: "+1234567890",
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
