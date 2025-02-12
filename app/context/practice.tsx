import { PracticeData } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useInstrument } from "@/hooks/useInstrument";

interface PracticeContext {
  current: PracticeData;
  setPractice: (data: PracticeData) => void;
  clear: () => void;
}

export const PracticeContext = createContext<PracticeContext | undefined>(
  undefined
);

export const usePracticeContext = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error("usePractice must be used within a PracticeProvider");
  }

  return context;
};

export function PracticeProvider(props: PropsWithChildren) {
  const instrument = useInstrument();
  const defaultState = {
    type: instrument ?? "",
    duration: 0,
    goals: "",
    notes: "",
    rating: 0,
    resource: "",
  };
  const [current, setCurrent] = useState<PracticeData>(defaultState);

  function setPractice(data: PracticeData) {
    setCurrent({
      ...current,
      goals: data.goals,
      notes: data.notes,
      data: data.data,
      rating: data.rating,
      resource: data.resource,
    });
  }

  function clear() {
    setCurrent(defaultState);
  }

  return (
    <PracticeContext.Provider
      value={{
        current,
        setPractice,
        clear,
      }}
    >
      {props.children}
    </PracticeContext.Provider>
  );
}
