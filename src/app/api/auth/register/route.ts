import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      mobileNumber,
      password,
      country,
      firstName,
      lastName,
      address,
      apartment,
      city,
      postalCode,
    } = body;

    // Sprawdź czy użytkownik już istnieje
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hashuj hasło
    const passwordHash = await bcrypt.hash(password, 10);

    // Utwórz nowego użytkownika
    const user = await prisma.user.create({
      data: {
        email,
        mobileNumber,
        passwordHash,
        country,
        firstName: firstName || "",
        lastName: lastName || null,
        address: address || null,
        apartment: apartment || null,
        city: city || null,
        postalCode: postalCode || null,
      },
    });

    // Nie zwracaj hasła w odpowiedzi
    const { passwordHash: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
