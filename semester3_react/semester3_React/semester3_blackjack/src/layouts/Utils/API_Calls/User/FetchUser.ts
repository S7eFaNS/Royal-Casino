import { useEffect, useState } from "react";
import TokenManager from "../JWT/TokenManager";
import UserModel from "../../../../models/UserModel";
import { Localhost } from "../Localhost";

interface UserHookResult {
  user: UserModel | null;
  isLoading: boolean;
  httpError: string | null;
}

export const useFetchUser = (userId: number): UserHookResult => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {

      const baseUrl: string = `${Localhost}/api/user/${userId}`;

      const token = TokenManager.getAccessToken();

      const headers: HeadersInit = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };

      try {
        const response = await fetch(baseUrl, { headers });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const userData: UserModel = await response.json();

        setUser(userData);
        setIsLoading(false);
      } catch (error : any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, httpError };
};