declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Public variables (accessible on client-side)
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_SITE_URL: string;

      // Private variables (server-side only)
      RESEND_API_KEY: string;
      CONTACT_FROM: string;
      CONTACT_TO: string;

      // Database
      DATABASE_URL?: string;

      // Authentication
      NEXTAUTH_SECRET?: string;
      NEXTAUTH_URL?: string;
      APP_BASE_URL: string;

      // Node environment
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
