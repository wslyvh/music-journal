import { Account } from "@/types";
import { CONFIG } from "@/utils/config";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

interface AuthContextType {
  isLoading: boolean;
  error?: string;
  account?: Account;
  onboarded?: boolean;
  requestToken: (email: string) => Promise<boolean>;
  login: (email: string, token: string) => Promise<Account | undefined>;
  logout: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider(props: PropsWithChildren) {
  const [account, setAccount] = useState<Account | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetchAccount();
  }, []);

  async function fetchAccount() {
    try {
      const res = await fetch(`${CONFIG.API_URL}/account`, {
        credentials: "include",
      });

      if (res.ok) {
        const { data } = await res.json();
        setAccount(data);
      }
    } catch (error) {
      console.error("Error fetching account:", error);
      setError(`Unable to fetch user account`);
      setAccount(undefined);
    } finally {
      setIsLoading(false);
    }
  }

  async function requestToken(email: string, appId?: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${CONFIG.API_URL}/account/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, appId }),
        credentials: "include",
      });

      if (!res.ok) {
        setError(`Unable to request token. Error code: ${res.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error requesting token:", error);
      setError("Unable to request token");
      setAccount(undefined);
    } finally {
      setIsLoading(false);
    }

    return false;
  }

  async function login(email: string, token: string) {
    try {
      setIsLoading(true);
      const res = await fetch(`${CONFIG.API_URL}/account/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: email,
          token: token,
          appId: CONFIG.APP_ID,
        }),
        credentials: "include",
      });

      if (res.ok) {
        const { data } = await res.json();
        setAccount(data);
        return data;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Unable to login");
      setAccount(undefined);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      setIsLoading(true);
      const res = await fetch(`${CONFIG.API_URL}/account/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setAccount(undefined);
        return true;
      }
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Unable to logout");
    } finally {
      setIsLoading(false);
    }

    return false;
  }

  return (
    <AuthContext.Provider
      value={{ account, isLoading, error, requestToken, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
