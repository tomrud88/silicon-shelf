import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Sprawdź czy użytkownik jest zalogowany
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Pobierz dane użytkownika z bazy danych
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        address: true,
        apartment: true, // province
        city: true,
        postalCode: true,
        country: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      address: user.address,
      province: user.apartment, // apartment przechowuje province
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
    });
  } catch (error) {
    console.error("Error fetching user address:", error);
    return NextResponse.json(
      { error: "Failed to fetch address" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Sprawdź czy użytkownik jest zalogowany
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();

    const { address, city, postalCode, country, province } = body;

    // Walidacja wymaganych pól
    if (!address || !city || !postalCode || !country) {
      return NextResponse.json(
        { error: "Missing required address fields" },
        { status: 400 }
      );
    }

    // Zaktualizuj adres użytkownika w bazie danych
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        address,
        apartment: province || null, // Używamy apartment do przechowania province
        city,
        postalCode,
        country,
      },
    });

    return NextResponse.json({
      message: "Address saved successfully",
      user: {
        id: updatedUser.id,
        address: updatedUser.address,
        province: updatedUser.apartment,
        city: updatedUser.city,
        postalCode: updatedUser.postalCode,
        country: updatedUser.country,
      },
    });
  } catch (error) {
    console.error("Error saving address:", error);
    return NextResponse.json(
      { error: "Failed to save address" },
      { status: 500 }
    );
  }
}
