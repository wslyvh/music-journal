import { useAuth } from "@/hooks/useAuth";
import { PropsWithChildren, useEffect, useState } from "react";

export default function RecordingProvider(props: PropsWithChildren) {
  const { account } = useAuth();
  const defaultState = {
    type: account?.instruments?.[0] ?? "My Instrument",
    duration: 0,
    notes: "",
    rating: "",
    visibility: 1,
  };
  const [state, setState] = useState("");
  const [time, setTime] = useState(0);
  const [current, setCurrent] = useState(defaultState);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (state === "RUNNING") {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  function start() {
    setState("RUNNING");
  }

  function pause() {
    setState("PAUSED");
  }

  function stop() {
    setState("STOPPED");
  }

  function submit() {
    //
  }

  function clear() {
    setState("");
    setCurrent(defaultState);
  }

  return <>{props.children}</>;
}
