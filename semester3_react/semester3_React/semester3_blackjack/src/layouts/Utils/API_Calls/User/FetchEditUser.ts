import UserModel from "../../../../models/UserModel";
import TokenManager from "../JWT/TokenManager";
import { Localhost } from "../Localhost";

export const editUserFetch = async (
    userId: number,
    userDetails: UserModel
): Promise<UserModel | null> => {
    const baseUrl = `${Localhost}/api/user/admin/${userId}`;
    const token = TokenManager.getAccessToken();

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(baseUrl, {
            method: 'PUT',
            headers,
            body: JSON.stringify(userDetails),
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        const updatedUser: UserModel = await response.json();
        return updatedUser;
    } catch (error: any) {
        console.error('Edit user request failed:', error.message);
        return null;
    }
};