import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getToken() {
  return await AsyncStorage.getItem("token");
}

export async function setToken(token: string) {
  queryClient.setQueryData(["auth-token"], token);
  return await AsyncStorage.setItem("token", token);
}

export async function removeToken() {
  return await AsyncStorage.removeItem("token");
}
