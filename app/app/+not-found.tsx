import { router, Stack } from "expo-router";
import { ScreenLayout } from "@/components/screen-layout";
import { Button } from "@/components/button";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenLayout
        title="Page not found"
        className="items-center justify-center"
      >
        <Button text="Go Back" onPress={() => router.push("/")} />
      </ScreenLayout>
    </>
  );
}
