import { PracticeData } from "@/types";
import { router } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePracticeMutationCreate } from "@/hooks/practice/usePracticeMutationCreate";
import { useInstrument } from "@/hooks/useInstrument";

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

export function RecordingProvider(props: PropsWithChildren) {
  const createPractice = usePracticeMutationCreate();
  const instrument = useInstrument();
  const defaultState = {
    type: instrument ?? "",
    duration: 0,
    notes: "",
    rating: 0,
  };
  const [state, setState] = useState("");
  const [timer, setTimer] = useState(0);
  const [current, setCurrent] = useState<PracticeData>(defaultState);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [pausedTime, setPausedTime] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (state === "RUNNING") {
      if (!startTime) {
        setStartTime(Date.now());
      }

      interval = setInterval(() => {
        if (startTime) {
          setTimer(pausedTime + Math.floor((Date.now() - startTime) / 1000));
        }
      }, 1000);
    } else {
      setPausedTime(timer);
      setStartTime(null);
    }

    return () => clearInterval(interval);
  }, [state, startTime]);

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

  async function pause() {
    setState("PAUSED");
  }

  async function resume() {
    setState("RUNNING");
  }

  async function stop() {
    setState("STOPPED");
  }

  async function submit() {
    createPractice.mutate(
      {
        ...current,
        duration: timer,
      },
      {
        onSuccess: () => {
          setState("");
          setTimer(0);
          setCurrent(defaultState);
          router.replace("/");
        },
        onError: (error) => {
          console.error("Upload failed:", error);
        },
      }
    );
  }

  function clear() {
    setState("");
    setTimer(0);
    setStartTime(null);
    setPausedTime(0);
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
