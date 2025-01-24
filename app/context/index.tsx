import { PropsWithChildren } from "react";
import { DataProvider } from "./data";
import { ProfileProvider } from "./profile";
import { PracticeProvider } from "./practice";
import { RecordingProvider } from "./recording";

export function ContextProvider(props: PropsWithChildren) {
  return (
    <DataProvider>
      <ProfileProvider>
        <PracticeProvider>
          <RecordingProvider>{props.children}</RecordingProvider>
        </PracticeProvider>
      </ProfileProvider>
    </DataProvider>
  );
}
