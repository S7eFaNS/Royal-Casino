import TokenManager from "../JWT/TokenManager";
import { Localhost } from "../Localhost";

export const placeBet = async (userId: number, betAmount: number): Promise<string | null> => {
    const baseUrl: string = `${Localhost}/api/blackjack/${userId}/placeBet?betAmount=${betAmount}`;

    const token = TokenManager.getAccessToken();

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    
    try {
        const response = await fetch(baseUrl, { method: 'POST', headers});

        if (!response.ok) {
            const errorText: string = await response.text();
            throw new Error(errorText);
        }

        const data: string = await response.text();
        return data || null;
    } catch (error : any) {
        throw new Error(error.message);
    }
}