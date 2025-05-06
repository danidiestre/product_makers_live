<<<<<<< HEAD
import { NextAuthOptions, DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

// Interfaz para el perfil de Discord
=======
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
>>>>>>> f368253c235275ba2e78f01003457803e9d3b49f
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

<<<<<<< HEAD
// Extendemos los tipos de NextAuth para incluir nuestros campos personalizados
declare module "next-auth" {
  interface User {
    banner?: string | null;
    accentColor?: number | null;
    role?: Role | null;
    bio?: string | null;
    twitter?: string | null;
    github?: string | null;
    linkedin?: string | null;
    website?: string | null;
  }

  interface Session {
    user: {
      id: string;
      banner?: string | null;
      accentColor?: number | null;
      role?: Role | null;
      bio?: string | null;
      twitter?: string | null;
      github?: string | null;
      linkedin?: string | null;
      website?: string | null;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any, // Cast para resolver incompatibilidad de tipos
  session: {
    strategy: "database", // Configurar explícitamente el modo de base de datos
    maxAge: 30 * 24 * 60 * 60, // 30 días
=======
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Change to JWT to fix session errors
    maxAge: 30 * 24 * 60 * 60, // 30 days
>>>>>>> f368253c235275ba2e78f01003457803e9d3b49f
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
<<<<<<< HEAD
        // Configurar imagen de avatar
=======
        // Configure avatar image
>>>>>>> f368253c235275ba2e78f01003457803e9d3b49f
        let image_url;
        if (!profile.avatar) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}?size=128`;
        }

<<<<<<< HEAD
        // Configurar banner si existe
=======
        // Configure banner if it exists
>>>>>>> f368253c235275ba2e78f01003457803e9d3b49f
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
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, profile, account, user }) {
      if (account?.provider === "discord" && user) {
        token.id = user.id;
        token.image = user.image;
<<<<<<< HEAD

        // Guardamos campos adicionales del perfil en el token
=======
        token.role = (user as any).role;

        // Save additional profile fields to the token
>>>>>>> f368253c235275ba2e78f01003457803e9d3b49f
        if (profile) {
          token.banner = (profile as any).banner;
          token.accent_color = (profile as any).accent_color;
        }
      }
      return token;
    },
<<<<<<< HEAD
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      // Con strategy: "database", user contendrá el usuario de la base de datos
      if (session?.user && user) {
        session.user.id = user.id || "";
        session.user.banner = user.banner || null;
        session.user.accentColor = user.accentColor || null;
        session.user.role = user.role || null;
        session.user.bio = user.bio || null;
        session.user.twitter = user.twitter || null;
        session.user.github = user.github || null;
        session.user.linkedin = user.linkedin || null;
        session.user.website = user.website || null;
      }

      return session;
    },
  },
  // Cambiar a falso en producción
  debug: false,
=======
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.banner = token.banner as string | null;
        session.user.accentColor = token.accent_color as number | null;
        session.user.role = token.role as string | null;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
>>>>>>> f368253c235275ba2e78f01003457803e9d3b49f
}; 