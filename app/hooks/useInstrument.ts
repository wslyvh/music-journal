import { useEffect, useState } from "react";
import { useProfile } from "./profile/useProfile";

export function useInstrument() {
  const { data: profile } = useProfile();
  const [instrument, setInstrument] = useState(profile?.instrument);

  useEffect(() => {
    setInstrument(profile?.instrument);
  }, [profile]);

  return instrument;
}
