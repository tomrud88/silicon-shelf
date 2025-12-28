import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        emailOrPhone: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrPhone || !credentials?.password) {
          return null;
        }

        const emailOrPhone = credentials.emailOrPhone as string;
        const password = credentials.password as string;

        // Find user by email or mobile number
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: emailOrPhone }, { mobileNumber: emailOrPhone }],
          },
        });

        if (!user) {
          return null;
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        // Return user object
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName || ""}`.trim(),
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Return true if user is authenticated
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string | null;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
