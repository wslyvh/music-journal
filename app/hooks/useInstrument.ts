import { useAuth } from "./useAuth";

export function useInstrument() {
  const { account } = useAuth();
  return account?.instruments?.[0] ?? "My Instrument";
}
