import { usePostHog } from "posthog-js/react";
import { useSession } from "next-auth/react";

export interface ProductEventProps {
  product_id: string;
  product_category?: string;
  product_stage?: "idea" | "building" | "launched";
  user_id?: string;
}

export interface UserEventProps {
  user_id?: string;
  user_type?: string;
  signup_method?: "email" | "google" | "github";
}

export function useAnalytics() {
  const posthog = usePostHog();
  const { data: session } = useSession();

  // ===== EVENTOS DE CREACIÓN DE PRODUCTO =====
  const trackProductCreationStarted = (props: {
    creation_source: "dashboard" | "header_cta" | "empty_state" | "navigation";
    user_products_count?: number;
  }) => {
    posthog.capture("product_creation_started", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackProductCreationStep = (props: {
    step: "basic_info" | "description" | "media" | "links" | "tags" | "preview";
    step_number: number;
    time_on_step?: number; // segundos
    fields_completed?: string[];
  }) => {
    posthog.capture("product_creation_step", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackProductCreationAbandoned = (props: {
    last_step: string;
    total_time_spent: number; // segundos
    fields_completed: string[];
    completion_percentage: number;
  }) => {
    posthog.capture("product_creation_abandoned", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackProductPublished = (props: {
    product_id: string;
    product_category: string;
    product_stage: "idea" | "building" | "launched";
    has_images: boolean;
    has_video: boolean;
    description_length: number;
    tags_count: number;
    links_count: number;
    time_to_complete: number; // segundos desde inicio
    is_first_product: boolean;
    draft_saved_count?: number;
  }) => {
    posthog.capture("product_published", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  // ===== EVENTOS DE CLICKS A PRODUCTOS =====
  const trackProductClick = (props: {
    product_id: string;
    product_title: string;
    product_category?: string;
    click_source:
      | "feed"
      | "search"
      | "profile"
      | "category"
      | "trending"
      | "featured";
    click_position: number; // posición en la lista
    total_products_shown: number;
  }) => {
    posthog.capture("product_clicked", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackProductDetailView = (props: {
    product_id: string;
    product_category?: string;
    view_source: "direct_link" | "product_click" | "share_link" | "search";
    referrer?: string;
  }) => {
    posthog.capture("product_detail_viewed", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  // ===== EVENTOS DE VOTOS =====
  const trackProductVote = (props: {
    product_id: string;
    product_title: string;
    product_category?: string;
    vote_type: "upvote" | "downvote" | "remove_vote";
    vote_source: "product_card" | "product_detail" | "feed";
    product_current_votes?: number;
    user_has_voted_before: boolean;
  }) => {
    posthog.capture("product_voted", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackVoteAuthentication = (props: {
    product_id: string;
    intended_vote: "upvote" | "downvote";
    auth_trigger_source: "vote_button";
  }) => {
    posthog.capture("vote_auth_required", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  // ===== EVENTOS DE PERFILES DE USUARIO =====
  const trackUserProfileClick = (props: {
    viewed_user_id: string;
    viewed_user_name: string;
    click_source:
      | "product_card"
      | "product_detail"
      | "comment"
      | "search"
      | "leaderboard";
    viewer_following_viewed?: boolean;
    viewed_user_products_count?: number;
    viewed_user_followers_count?: number;
  }) => {
    posthog.capture("user_profile_clicked", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackUserProfileView = (props: {
    viewed_user_id: string;
    viewed_user_name: string;
    view_source: "profile_click" | "direct_link" | "search";
    tab_viewed?: "products" | "activity" | "about";
    is_own_profile: boolean;
  }) => {
    posthog.capture("user_profile_viewed", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackUserFollow = (props: {
    followed_user_id: string;
    followed_user_name: string;
    follow_action: "follow" | "unfollow";
    follow_source: "profile" | "product_card" | "suggestion";
    followed_user_products_count?: number;
    followed_user_followers_count?: number;
  }) => {
    posthog.capture("user_followed", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  // ===== EVENTOS EXISTENTES =====
  const trackProductView = (
    props: ProductEventProps & { view_source?: string }
  ) => {
    posthog.capture("product_viewed", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackProductLike = (props: ProductEventProps) => {
    posthog.capture("product_liked", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackProductShare = (
    props: ProductEventProps & {
      share_method: "twitter" | "linkedin" | "copy_link" | "whatsapp";
      share_source: string;
    }
  ) => {
    posthog.capture("product_shared", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackSearch = (props: {
    search_term: string;
    results_count: number;
    search_source?: string;
  }) => {
    posthog.capture("search_performed", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackUserSignup = (
    props: UserEventProps & {
      time_to_complete?: number;
      page_source?: string;
    }
  ) => {
    posthog.capture("user_signup_completed", {
      ...props,
      timestamp: new Date().toISOString(),
    });
  };

  const trackExternalLink = (props: {
    link_type: "website" | "github" | "demo" | "download";
    product_id: string;
    link_position: string;
  }) => {
    posthog.capture("external_link_clicked", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackComment = (props: {
    product_id: string;
    comment_length: number;
    has_mentions: boolean;
    comment_type?: "feedback" | "question" | "praise" | "suggestion";
  }) => {
    posthog.capture("comment_posted", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  const trackFilterUsage = (props: {
    category?: string;
    stage?: string;
    filters_count: number;
    results_count: number;
  }) => {
    posthog.capture("filters_applied", {
      ...props,
      user_id: session?.user?.id,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    // Creación de productos
    trackProductCreationStarted,
    trackProductCreationStep,
    trackProductCreationAbandoned,
    trackProductPublished,

    // Clicks a productos
    trackProductClick,
    trackProductDetailView,

    // Votos
    trackProductVote,
    trackVoteAuthentication,

    // Perfiles de usuario
    trackUserProfileClick,
    trackUserProfileView,
    trackUserFollow,

    // Eventos existentes
    trackProductView,
    trackProductLike,
    trackProductShare,
    trackSearch,
    trackUserSignup,
    trackExternalLink,
    trackComment,
    trackFilterUsage,

    // Para eventos personalizados
    track: (event: string, properties?: Record<string, any>) => {
      posthog.capture(event, {
        ...properties,
        user_id: session?.user?.id,
        timestamp: new Date().toISOString(),
      });
    },
  };
}
