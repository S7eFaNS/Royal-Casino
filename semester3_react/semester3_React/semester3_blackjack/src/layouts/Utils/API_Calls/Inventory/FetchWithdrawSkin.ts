import TokenManager from '../JWT/TokenManager';
import { Localhost } from '../Localhost';

export const fetchWithdrawSkin = async (userId: number, skinId: number)=> {
    const baseUrl = `${Localhost}/api/purchasehistory/withdraw?userId=${userId}&skinId=${skinId}`;
    const token = TokenManager.getAccessToken();

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error('Failed to withdraw skin');
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error occured: ${error}`);
  }
};