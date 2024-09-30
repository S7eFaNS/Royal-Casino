import TokenManager from "../JWT/TokenManager";
import { Localhost } from "../Localhost";

export const depositMoney = async (userId: number): Promise<string | null> => {
    const baseUrl: string = `${Localhost}/api/user/${userId}/deposit`;

    const token = TokenManager.getAccessToken();

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(baseUrl, { method: 'POST', headers });

        if (!response.ok) {
            throw new Error("Failed to deposit money");
        }

        const data: string = await response.text();
        return data || null;
    } catch (error) {
        throw new Error(`Error depositing money: ${error}`);
    }
};
