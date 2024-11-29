import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken, removeToken, setToken } from "@/utils/token";
import { CONFIG } from "@/utils/config";
import { Account, AccountProfileData } from "@/types";

export function useAuth() {
  const queryClient = useQueryClient();

  const accountQuery = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) return null;

      const res = await fetch(`${CONFIG.API_URL}/account`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch account");
      const { data } = await res.json();
      return data as Account;
    },
    retry: false,
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
    accountQuery: accountQuery,
    isAuthenticated: !!accountQuery.data,
    requestCodeMutation,
    loginMutation,
    profileMutation,
    logoutMutation,
    deleteMutation,
  };
}
