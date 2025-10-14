import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { BASE_URL } from "./constants";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          // Here, you have access to the user's data from Google.
          console.log("Google User Profile:", profile);
          console.log("Google User Account:", account);

          const response = await fetch(`${BASE_URL}/google-auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              payload: account.access_token,
            }),
          });

          console.log(response);

          if (!response.ok) {
            console.error("Failed to sync user with backend");
            return false;
          }

          // Returning true allows the sign-in process to continue.
          return true;
        } catch (error) {
          console.error("Error during custom Google sign-in logic:", error);

          return false;
        }
      }
      // Allow other providers to sign in.
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
});
