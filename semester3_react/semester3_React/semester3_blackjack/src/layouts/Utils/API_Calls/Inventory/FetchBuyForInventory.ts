import TokenManager from '../JWT/TokenManager';
import { Localhost } from '../Localhost';

export const fetchBuyForInventory = async (userId: number, skinId: number) => {
  if (!userId) {
    throw new Error('Please log in to purchase the skin');
  }

  const baseUrl = `${Localhost}/api/inventory/buy?userId=${userId}&skinId=${skinId}`;
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
      const errorText = await response.text();
      if (errorText === 'Failed to purchase skin: Insufficient balance to purchase the skin') {
        throw new Error(errorText);
      } else {
        throw new Error('Failed to purchase skin: Unknown error');
      }
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.text();
      return data;
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
};