import { useEffect, useState } from "react";
import UserModel from "../../../../models/UserModel";
import TokenManager from "../JWT/TokenManager";
import { Localhost } from "../Localhost";

interface UserHookResult {
    users: UserModel[];
    isLoading: boolean;
    httpError: string | null;
  }

export const useFetchAllUsers = (): UserHookResult => {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        const baseUrl = `${Localhost}/api/user/admin/all`;
        const token = TokenManager.getAccessToken();
  
        const headers: HeadersInit = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
  
        try {
          const response = await fetch(baseUrl, { headers });
  
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
  
          const userData: UserModel[] = await response.json();
          setUsers(userData);
          setIsLoading(false);
        } catch (error : any) {
          setIsLoading(false);
          setHttpError(error.message);
        }
      };
  
      fetchUsers();
    }, []);
  
    return { users, isLoading, httpError };
  };