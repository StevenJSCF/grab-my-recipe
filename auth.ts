import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import prisma from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true, // This is important for Vercel deployments
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, account }) {
      // When user first signs in, add their database ID to the token
      if (user) {
        token.sub = user.id; // sub is the standard JWT claim for user ID
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user ID from the token to the session
      if (token.sub) {
        session.user.id = token.sub;
      } else if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
