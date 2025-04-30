import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { DefaultSession } from "next-auth";

// Interfaz para el perfil de Discord
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

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      image: string;
      banner?: string;
      accentColor?: number;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
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
        // console.log("Discord Profile Raw:", profile);

        // Configurar imagen de avatar
        let image_url;
        if (!profile.avatar) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}?size=128`;
        }

        // Configurar banner si existe
        let banner_url;
        if (profile.banner) {
          const format = profile.banner.startsWith("a_") ? "gif" : "png";
          banner_url = `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${format}?size=600`;
        }

        const mappedProfile = {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: image_url,
          banner: banner_url || null,
          accentColor: profile.accent_color,
        };

        // console.log("Mapped Profile:", mappedProfile);
        return mappedProfile;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, profile, account, user }) {
      // console.log("JWT Callback - Profile:", profile);
      // console.log("JWT Callback - User:", user);
      // console.log("JWT Callback - Current Token:", token);

      if (account?.provider === "discord") {
        token.id = user.id;
        token.image = user.image;
        token.banner = (user as any).banner;
        token.accent_color = (user as any).accentColor;
      }

      // console.log("JWT Callback - Updated Token:", token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // console.log("Session Callback - Token:", token);
      // console.log("Session Callback - Initial Session:", session);

      if (session.user) {
        session.user.id = token.id || token.sub;
        session.user.image = token.picture || token.image; // Intentamos ambos campos
        session.user.banner = token.banner;
        session.user.accentColor = token.accent_color;
      }

      // console.log("Session Callback - Final Session:", session);
      return session;
    },
  },
  debug: false, // Habilitar logs de debug de NextAuth
});

export { handler as GET, handler as POST };
