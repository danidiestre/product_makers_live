import { NextAuthOptions } from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { DefaultSession } from "next-auth";

// Extend NextAuth types to include our custom fields
declare module "next-auth" {
  interface User {
    banner?: string | null;
    accentColor?: number | null;
    role?: string | null;
  }

  interface Session {
    user: {
      id: string;
      banner?: string | null;
      accentColor?: number | null;
      role?: string | null;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    banner?: string | null;
    accent_color?: number | null;
    role?: string | null;
  }
}

// Interface for Discord profile
interface DiscordProfile {
  id: string;
  username: string;
  discriminator: string;
  email: string;
  avatar: string | null;
  banner: string | null;
  accent_color: number | null;
  image?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Change to JWT to fix session errors
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "identify email guilds",
        },
      },
      profile(profile: DiscordProfile) {
        // Configure avatar image
        let image_url;
        if (!profile.avatar) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}?size=128`;
        }

        // Configure banner if it exists
        let banner_url;
        if (profile.banner) {
          const format = profile.banner.startsWith("a_") ? "gif" : "png";
          banner_url = `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${format}?size=600`;
        }

        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: image_url,
          banner: banner_url || null,
          accentColor: profile.accent_color,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account, user }) {
      if (account?.provider === "discord" && user) {
        token.id = user.id;
        token.image = user.image;
        token.role = (user as any).role;

        // Save additional profile fields to the token
        if (profile) {
          token.banner = (profile as any).banner;
          token.accent_color = (profile as any).accent_color;
        }
        
        console.log('JWT callback - token:', token);
        console.log('JWT callback - user:', user);
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.banner = token.banner as string | null;
        session.user.accentColor = token.accent_color as number | null;
        session.user.role = token.role as string | null;
        
        console.log('Session callback - session:', session);
        console.log('Session callback - token:', token);
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
}; 