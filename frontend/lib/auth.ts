// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "./firebase-admin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials!.email,
            credentials!.password
          );
          const user = userCredential.user;

          if (!user) return null;

          return {
            id: user.uid,
            email: user.email,
            name: user.displayName || null,
          };
        } catch (err: any) {
          console.error("Login failed:", err.message);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
