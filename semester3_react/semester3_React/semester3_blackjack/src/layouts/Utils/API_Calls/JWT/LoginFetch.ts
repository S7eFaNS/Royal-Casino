import { useState } from "react";
import { Localhost } from "../Localhost";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    const loginUser = async (userData : any) => {
        setIsLoading(true);
        try {
            const baseUrl = `${Localhost}/api/user/auth/authenticate`;
            const response = await fetch(baseUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
      
            const data = await response.json();
            
            if (!response.ok) {
              throw new Error(data.error || 'Something went wrong');
            }

            setIsLoading(false);
            
            return { success: true, accessToken: data.accessToken}; 
        }   catch (err: any) {
            setIsLoading(false);
            setHttpError(err.message);
            return { success: false, error: err.message };
          }
    };
    return { loginUser, isLoading, httpError };

}
