import TokenManager from "../JWT/TokenManager";
import { Localhost } from "../Localhost";

export const deleteUserFetch = async (
    userId: number,    
): Promise<void> => {
    const baseUrl = `${Localhost}/api/user/admin/${userId}`;
    const token = TokenManager.getAccessToken();

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(baseUrl, {
            method: 'DELETE',
            headers,
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }

        } catch (error: any) {
            throw new Error('Failed to delete user');
        }
}