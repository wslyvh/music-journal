export default {
  extra: {
    SEED_PROFILE: process.env.SEED_PROFILE ?? false,

    SUPABASE_URL: process.env.SUPABASE_URL ?? "",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? "",
  },
};
