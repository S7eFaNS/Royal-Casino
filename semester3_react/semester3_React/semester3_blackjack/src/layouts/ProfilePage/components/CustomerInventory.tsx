/* eslint-disable @typescript-eslint/no-explicit-any */
import TokenManager from "../../Utils/API_Calls/JWT/TokenManager";
import { useFetchUserInventory } from "../../Utils/API_Calls/Inventory/FetchUserInventory";
import { SpinnerLoading } from "../../Utils/Features/SpinnerLoading";
import SkinModel from "../../../models/SkinModel";
import { Button, Card, Col, Row } from "react-bootstrap";
import { fetchSellSkin } from "../../Utils/API_Calls/Inventory/FetchSellSkin";
import { useEffect, useState } from "react";
import { fetchWithdrawSkin } from "../../Utils/API_Calls/Inventory/FetchWithdrawSkin";
import { toast } from "react-toastify";
import { useBalance } from "../../Utils/Features/BalanceContext";
import { fetchUserData } from "../../Utils/API_Calls/User/UserApiBalance";

export const CustomerInventory = () => {
  const user = TokenManager.getUser();
  const { fetchUserInventory } = useFetchUserInventory({ userId: user?.userId });
  const [inventorySkins, setInventorySkins] = useState<SkinModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setBalance } = useBalance();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const loadedSkins = await fetchUserInventory();
        setInventorySkins(loadedSkins);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error("Error displaying user inventory: No skins to display", {theme: "colored"});
      }
    };

    fetchData();
  }, []);
  
  const handleSell = async (skinId: number) => {
    try {
      await fetchSellSkin(user?.userId || 0, skinId); 

      const updatedBalance = await fetchUserData(user?.userId || 0);
      setBalance(updatedBalance ?? null);
      
      const updatedSkins = inventorySkins.filter((skin) => skin.id !== skinId);
      setInventorySkins(updatedSkins);
      toast.success('Skin sold successfully', {theme: "colored", position: "bottom-right", autoClose:1500});
    } catch (error) {
      toast.error("Error selling skin:" + error, {theme: "colored"});
    }
  };

  const handleWithdraw = async (skinId: number) => {
    try {
      await fetchWithdrawSkin(user?.userId || 0, skinId); 
      const updatedSkins = inventorySkins.filter((skin) => skin.id !== skinId);
      setInventorySkins(updatedSkins);
      toast.info('Withdraw was successful', {theme: "colored", position: "bottom-right", autoClose:1500});
    } catch (error) {
      toast.error("Error withdrawing skin:" + error, {theme: "colored"});
    }
  };

  if (!user?.userId) {
    return <div>User ID not found</div>;
  }

  if (isLoading) {
    return <SpinnerLoading />;
}

  if(inventorySkins.length === 0){
    return <p style={{fontSize:"60px", fontWeight:"bold", textAlign:"center"}}>No skins owned</p>
  }

  return (
<div className="container">
          <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={3}>
            {inventorySkins.map((skin:SkinModel) => (
                <Col key={skin.id} className="mb-3" align="center">
                <Card className="d-flex flex-column justify-content-between" style={{ width: '42vh', height: '55vh' }}>
                
                <div className="card-content">
                    <Card.Img variant="top" src={skin.img} alt={skin.name} style={{flex:"auto", height:"5rem", backgroundColor:"#413e5e"}}/>
                </div>
                <div className="card-navbar" style={{backgroundColor:"#4f1098"}}>
                    <p style={{marginBottom: "0.5rem"}}>{skin.name}</p>
                </div>
                <Card.Footer className="card-footer" style={{backgroundColor:"#413e5e", color:"white"}}>
                    <div className="footer-info">
                    <p>Price: ${Number(skin.price).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                    <Button className="mx-2 border border-secondary" style={{
                                    width: '13vh',
                                    backgroundColor: '#4f1098',
                                    color: 'white',
                                }}
                                onClick={() => handleSell(skin.id)}
                                >
                      Sell
                    </Button>
                    <Button className="mx-2 border border-secondary" style={{
                                    minWidth: '13vh', 
                                    backgroundColor: '#4f1098',
                                    color: 'white',
                                }}
                                onClick={() => handleWithdraw(skin.id)}
                                >
                      Withdraw
                    </Button>
                    </div>
                </Card.Footer>
                </Card>
                </Col>
              ))
            }
          </Row>
        </div>
  );
};