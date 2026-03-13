import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

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
        { status: 400 },
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
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    });
    return NextResponse.json(
      {
        error: "Internal server error",
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 },
    );
  }
}
