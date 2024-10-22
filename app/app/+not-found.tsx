import { StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView>
        <ThemedText type="title" style={{ marginBottom: 10 }}>
          Not Found (404)
        </ThemedText>

        <Link href="/" style={styles.button}>
          Go back
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
