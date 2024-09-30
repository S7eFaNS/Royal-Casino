import { Localhost } from "../Localhost";

export const fetchLeaderboard = async () => {
    const baseUrl = `${Localhost}/api/purchasehistory/leaderboard`;
  
    try {
      const response = await fetch(baseUrl);
  
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error occurred: ${error}`);
    }
  };
  