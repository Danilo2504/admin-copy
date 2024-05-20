import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/src/services/auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const data = await signIn({ email, password });
        if (data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return "/";
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour --> sync token duration with JWT from backend
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
