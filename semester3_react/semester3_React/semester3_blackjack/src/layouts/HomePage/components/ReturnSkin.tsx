/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import SkinModel from "../../../models/SkinModel";
import { fetchBuyForInventory } from "../../Utils/API_Calls/Inventory/FetchBuyForInventory";
import { Button } from "react-bootstrap";
import TokenManager from "../../Utils/API_Calls/JWT/TokenManager";
import { useBalance } from "../../Utils/Features/BalanceContext";
import { fetchUserData } from "../../Utils/API_Calls/User/UserApiBalance";


export const ReturnSkin : React.FC<{skin : SkinModel}> = (props) => {
    const user = TokenManager.getUser();
    const userId = user?.userId
    const { setBalance } = useBalance();


    const handleBuyClick = async (userId:number, skinId:number) => {
        try {
          const response = await fetchBuyForInventory(userId, skinId);
          
          const updatedBalance = await fetchUserData(user?.userId || 0);
          setBalance(updatedBalance ?? null);

          toast.success('Purchase successful' + response, {theme: "colored", position: "bottom-right", autoClose:1500});
        } catch (error : any) {
          toast.error('Error while purchasing: ' + error.message, {theme: "colored"});
        }
      };

    return (
            <div className="col-xs-6 col-sm col-md-4 col-lg-3 mb-3">
                <div className="text-center">
                    <img
                    src={props.skin.img}
                    width="250vh"
                    height="250vh"
                    />
                    <h6 className="mt-2" >{props.skin.name}</h6>
                    <p>{`${props.skin.price}$`}</p>
                    <Button style={{backgroundColor:'#4f1098', color:'white'}}
                      onClick={() => {
                        if (userId !== null) {
                          handleBuyClick(userId, props.skin.id);
                        } else {
                            toast.error('Error while purchasing: ', {theme: "colored"});
                        }
                      }}
                    >
                      Buy
                    </Button>
                </div>
            </div>
    );
}