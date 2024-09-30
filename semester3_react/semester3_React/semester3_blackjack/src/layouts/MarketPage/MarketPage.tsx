import TokenManager from "../Utils/API_Calls/JWT/TokenManager";
import CreateItemButton from "./components/CreateItemButton";
import { Search } from "./components/Search";

export const MarketPage = () => {
    const user = TokenManager.getUser();
    const userType = user?.userType;
  
    return(
        <div style={{ minHeight:"73.2vh"}}>
        {userType === 'Admin' && <CreateItemButton />}
        <Search/>
      </div>
    );
};
