import { useAuth } from "@/hooks/useAuth";
import { PracticeData } from "@/types";
import { router } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Audio } from "expo-av";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { usePracticeMutations } from "@/hooks/usePracticeMutations";

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
  const { createPractice } = usePracticeMutations();
  const defaultState = {
    type: account?.instruments?.[0] ?? "",
    duration: 0,
    notes: "",
    rating: 0,
    visibility: 1,
  };
  const [state, setState] = useState("");
  const [timer, setTimer] = useState(0);
  const [current, setCurrent] = useState<PracticeData>(defaultState);
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

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

    startRecording();
  }

  async function pause() {
    setState("PAUSED");

    await recording?.pauseAsync();
  }

  async function resume() {
    setState("RUNNING");

    await recording?.startAsync();
  }

  async function stop() {
    setState("STOPPED");

    await recording?.pauseAsync();
  }

  async function submit() {
    const uri = await stopRecording();

    const formData = new FormData();
    Object.entries(current).forEach(([key, value]) => {
      formData.append(key, value?.toString() || "");
    });
    formData.set("duration", timer.toString());

    if (uri) {
      if (Platform.OS === "web") {
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append("recording", blob, `practice-${Date.now()}.webm`);
      } else {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        formData.append("recording", {
          uri: uri,
          type: "audio/m4a",
          name: `practice-${Date.now()}.m4a`,
          size: fileInfo.exists ? fileInfo.size : 0,
        } as any);
      }
    }

    createPractice.mutate(formData, {
      onSuccess: () => {
        setState("");
        setTimer(0);
        setCurrent(defaultState);
        router.replace("/");
      },
      onError: (error) => {
        console.error("Upload failed:", error);
      },
    });
  }

  function clear() {
    setState("");
    setTimer(0);
    setCurrent(defaultState);
  }

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
      });

      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");

    try {
      await recording?.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording?.getURI();
      if (!uri) {
        console.error("No recording URI found");
        return;
      }

      return uri;
    } catch (error) {
      console.error("Failed to stop recording", error);
      setRecording(undefined);
    }
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
