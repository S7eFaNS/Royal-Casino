import TokenManager from "../JWT/TokenManager";
import UserModel from "../../../../models/UserModel";
import { Localhost } from "../Localhost";

export const fetchUserData = async (userId: number): Promise<number | null> => {
  const baseUrl: string = `${Localhost}/api/user/${userId}`;

  const token = TokenManager.getAccessToken();

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(baseUrl, { headers });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const userData: UserModel = await response.json();

    return userData?.balance ?? null;
  } catch (error) {
    throw new Error(`Error occurred: ${error}`);
  }
};
