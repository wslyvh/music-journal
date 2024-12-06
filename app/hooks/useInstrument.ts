import { useAuth } from "./useAuth";
import { useEffect, useState } from "react";

export function useInstrument() {
  const { account } = useAuth();
  const [instrument, setInstrument] = useState(account?.instruments?.[0]);

  useEffect(() => {
    setInstrument(account?.instruments?.[0]);
  }, [account]);

  return instrument;
}
