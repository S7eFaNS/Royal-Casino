/* eslint-disable @typescript-eslint/no-explicit-any */
import AddSkinRequest from "../../../../models/AddSkinRequest";
import TokenManager from "../JWT/TokenManager";
import { Localhost } from "../Localhost";

export const useFetchSkinsCreate = async (
    skinDetails: AddSkinRequest
): Promise<boolean> => {
    const baseUrl = `${Localhost}/api/skins/admin/create`;
    const token = TokenManager.getAccessToken();

    const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(skinDetails),
        });

        if (!response.ok) {
            throw new Error('Failed to create skin');
        }

        return true;
    } catch (error: any) {
        console.error('Creation of skin failed:', error.message);
        return false;
    }

};