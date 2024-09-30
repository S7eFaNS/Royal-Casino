import { jwtDecode, JwtPayload } from "jwt-decode";
interface CustomJwtPayload extends JwtPayload {
  userName?: string;
  userId?: number;
  balance: number;
  userType?: string;
}
const TokenManager = {
    getAccessToken: () => sessionStorage.getItem("accessToken"),

    getClaims: () => {
        if (!sessionStorage.getItem("claims")) {
            return undefined;
        }
        const claimsString = sessionStorage.getItem("claims");
        if (claimsString) {
          const claims = JSON.parse(claimsString);
          return claims;
        } else {
            return undefined;
        }    
      },

      setAccessToken: (token: string) => {
        sessionStorage.setItem("accessToken", token);
        return token;
      },
      

      setClaims: (token: string): CustomJwtPayload => {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
      
        const userName = decodedToken.userName;
        const userId = decodedToken.userId;
        const sub = decodedToken.sub;
        const balance = decodedToken.balance;        
        const userType = decodedToken.userType;
      
        const claims: CustomJwtPayload = { userName, userId, sub, balance, userType };
        sessionStorage.setItem("claims", JSON.stringify(claims));
      
        return claims;
      },

      getUser: () => {
        const claims = TokenManager.getClaims();
    
        if (!claims) {
          return null;
        }
    
        return {
          userName: claims.userName,
          userId: claims.userId,
          sub : claims.sub,
          balance: claims.balance,
          userType: claims.userType,
        };
      },
    
    clear: () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("claims");
    }
}

export default TokenManager;