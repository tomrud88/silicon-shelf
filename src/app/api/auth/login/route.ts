import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { emailOrPhone, password } = await request.json();

    // Find user by email or mobile number
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { mobileNumber: emailOrPhone }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    // Return user data (without password)
    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          mobileNumber: user.mobileNumber,
          country: user.country,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
