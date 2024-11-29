import { useAuth } from "@/hooks/useAuth";
import { usePractice } from "@/hooks/usePractice";
import { PracticeData } from "@/types";
import { router } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface RecordingContext {
  state: string;
  timer: number;
  current: PracticeData;
  setPractice: (data: PracticeData) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  submit: () => void;
  clear: () => void;
}

export const RecordingContext = createContext<RecordingContext | undefined>(
  undefined
);

export const useRecorder = () => {
  const context = useContext(RecordingContext);
  if (!context) {
    throw new Error("useRecorder must be used within a RecordingProvider");
  }

  return context;
};

export default function RecordingProvider(props: PropsWithChildren) {
  const { account } = useAuth();
  const { createPracticeMutation } = usePractice();
  const defaultState = {
    type: account?.instruments?.[0] ?? "My Instrument",
    duration: 0,
    notes: "",
    rating: 0,
    visibility: 1,
  };
  const [state, setState] = useState("");
  const [timer, setTimer] = useState(0);
  const [current, setCurrent] = useState<PracticeData>(defaultState);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (state === "RUNNING") {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state]);

  function setPractice(data: PracticeData) {
    setCurrent({
      ...current,
      notes: data.notes,
      rating: data.rating,
    });
  }

  function start() {
    setState("RUNNING");
  }

  function pause() {
    setState("PAUSED");
  }

  function resume() {
    setState("RUNNING");
  }

  function stop() {
    setState("STOPPED");
  }

  function submit() {
    createPracticeMutation.mutate({
      ...current,
      duration: timer,
    });

    setState("");
    setTimer(0);
    setCurrent(defaultState);
    router.replace("/");
  }

  function clear() {
    setState("");
    setCurrent(defaultState);
  }

  return (
    <RecordingContext.Provider
      value={{
        state,
        timer,
        current,
        setPractice,
        start,
        pause,
        resume,
        stop,
        submit,
        clear,
      }}
    >
      {props.children}
    </RecordingContext.Provider>
  );
}
