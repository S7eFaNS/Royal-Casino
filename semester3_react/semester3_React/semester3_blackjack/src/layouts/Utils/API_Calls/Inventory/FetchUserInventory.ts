/* eslint-disable @typescript-eslint/no-explicit-any */
import TokenManager from '../JWT/TokenManager';
import SkinModel from '../../../../models/SkinModel';
import { Localhost } from '../Localhost';
export interface UserId {
    userId: number | null;
  }
  export const useFetchUserInventory = ({ userId }: UserId) => {
    const fetchUserInventory = async () => {
      const baseUrl = `${Localhost}/api/inventory/user/${userId}`;
      const token = TokenManager.getAccessToken();
  
      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      try {
        const response = await fetch(baseUrl, {
          method: 'GET',
          headers: headers,
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user inventory');
        }
  
        const responseData = await response.json();
  
        return responseData.map((item: any) => ({
          id: item.skinId,
          name: item.name,
          price: item.price,
          description: item.description,
          img: item.img,
        })) as SkinModel[];
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
  
    return { fetchUserInventory };
  };