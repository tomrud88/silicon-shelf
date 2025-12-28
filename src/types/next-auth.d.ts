import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string | null;
  }
}
