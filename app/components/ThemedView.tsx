import { StyleSheet, View, type ViewProps } from "react-native";

export function ThemedView({ style, ...rest }: ViewProps) {
  return <View style={[styles.container, style]} {...rest} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 20,
  },
});
