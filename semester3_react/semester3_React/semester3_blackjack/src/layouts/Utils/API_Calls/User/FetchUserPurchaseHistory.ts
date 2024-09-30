import { useState, useEffect } from 'react';
import TokenManager from '../JWT/TokenManager';
import PurchaseHistoryResponse from '../../../../models/PurchaseHistoryResponse';
import { Localhost } from '../Localhost';

export const useFetchPurchaseHistory = (userId: number): PurchaseHistoryResponse[] => {
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryResponse[]>([]);

    useEffect(() => {
        const fetchPurchaseHistory = async () => {
            const baseUrl = `${Localhost}/api/purchasehistory/user/${userId}`;
            const token = TokenManager.getAccessToken();

            const headers: HeadersInit = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            try {
                const response = await fetch(baseUrl, { headers });

                if (!response.ok) {
                    throw new Error('Failed to fetch purchase history');
                }

                const purchaseHistoryData: PurchaseHistoryResponse[] = await response.json();
                setPurchaseHistory(purchaseHistoryData);
            } catch (error) {
                console.error(`Error occurred: ${error}`);
            }
        };

        fetchPurchaseHistory();
    }, [userId]);

    return purchaseHistory;
};
