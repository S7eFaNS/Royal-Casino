/* eslint-disable @typescript-eslint/no-explicit-any */
import SkinModel from '../../../../models/SkinModel';
import { Localhost } from '../Localhost';

export interface FetchSkinsSearchParams {
  search?: string;
}

export const useFetchSkinsSearch = ({ search }: FetchSkinsSearchParams) => {
  const fetchSkinsSearch = async () => {
    const baseUrl = `${Localhost}/api/skins/searchByName?name=${encodeURIComponent(search || '')}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch skins');
      }

      const responseData = await response.json();

      return responseData.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        img: item.img,
      })) as SkinModel[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { fetchSkinsSearch };
};
