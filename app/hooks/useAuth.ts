import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken, removeToken, setToken } from "@/utils/token";
import { CONFIG } from "@/utils/config";
import { Account, AccountProfileData } from "@/types";
import { useAuthToken } from "./useToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "account";

export function useAuth() {
  const queryClient = useQueryClient();
  const { data: token } = useAuthToken();

  async function fetchAccount() {
    console.log("fetching account", !!token);
    if (!token) return null;

    try {
      console.log("fetching account from storage");
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        console.log("returning account from storage");
        return JSON.parse(stored);
      }

      console.log("fetching account from api");
      const res = await fetch(`${CONFIG.API_URL}/account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.log("failed to fetch account from api");
        return null;
      }

      const { data } = await res.json();
      console.log("storing account in storage");
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log("returning account from api");
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }

  const accountQuery = useQuery({
    queryKey: ["account", token],
    enabled: !!token,
    queryFn: fetchAccount,
  });

  const requestCodeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(`${CONFIG.API_URL}/account/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, appId: CONFIG.APP_ID }),
      });
      if (!res.ok) throw new Error("Failed to request code");
      return true;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, token }: { email: string; token: string }) => {
      const res = await fetch(`${CONFIG.API_URL}/account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: email,
          token,
          appId: CONFIG.APP_ID,
        }),
      });

      if (!res.ok) throw new Error("Login failed");
      const { data } = await res.json();
      await setToken(data.token);
      queryClient.setQueryData(["auth-token"], data.token);
      return data.account;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["account"], data);
    },
  });

  const profileMutation = useMutation({
    mutationFn: async (profile: AccountProfileData) => {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`${CONFIG.API_URL}/account/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to update account profile");

      const { data } = await res.json();
      return data;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await removeToken();
      queryClient.clear();
      return true;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`${CONFIG.API_URL}/account`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete account");

      await removeToken();
      queryClient.clear();
      return true;
    },
  });

  return {
    account: accountQuery.data,
    accountLoading: accountQuery.isLoading,
    accountError: accountQuery.error,
    requestCodeMutation,
    loginMutation,
    profileMutation,
    logoutMutation,
    deleteMutation,
  };
}
