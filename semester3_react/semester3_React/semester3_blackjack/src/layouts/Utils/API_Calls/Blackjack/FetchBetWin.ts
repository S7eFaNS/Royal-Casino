import TokenManager from "../JWT/TokenManager";
import { Localhost } from "../Localhost";

export const betWin = async (userId: number, betAmount: number): Promise<string | null> => {
    const baseUrl: string = `${Localhost}/api/blackjack/${userId}/win?winningAmount=${betAmount}`;

    const token = TokenManager.getAccessToken();

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(baseUrl, { method: 'POST', headers});

        if (!response.ok) {
            throw new Error("Failed to place bet");
        }

        const data: string = await response.text();
        return data || null;
    } catch (error) {
        throw new Error(`Error placing bet: ${error}`);
    }
}