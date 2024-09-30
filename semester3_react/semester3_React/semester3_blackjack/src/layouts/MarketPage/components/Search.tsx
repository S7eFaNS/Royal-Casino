/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import SkinModel from "../../../models/SkinModel";
import { useFetchSkinsSearch } from "../../Utils/API_Calls/Skins/FetchSkinsSearch";
import { Button, Card, Col, Row } from "react-bootstrap";
import "../MarketPage.css";
import { fetchBuyForInventory } from "../../Utils/API_Calls/Inventory/FetchBuyForInventory";
import TokenManager from "../../Utils/API_Calls/JWT/TokenManager";
import { toast } from "react-toastify";
import { fetchUserData } from "../../Utils/API_Calls/User/UserApiBalance";
import { useBalance } from "../../Utils/Features/BalanceContext";

  export const Search: React.FC = () => {
    const user = TokenManager.getUser();
    const userId = user?.userId

    const [searchQuery, setSearchQuery] = useState('');
    const { fetchSkinsSearch } = useFetchSkinsSearch({ search: searchQuery });
    const [inventorySkins, setInventorySkins] = useState<SkinModel[]>([]);
    const { setBalance } = useBalance();


    useEffect(() => {
      const fetchData = async () => {
        try {
          const loadedSkins = await fetchSkinsSearch();
          setInventorySkins(loadedSkins);
        } catch (error) {
          toast.error("Error occured:" + error, {theme: "colored"});
        }
      };
  
      fetchData();
    }, [searchQuery]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };

    const handleBuyClick = async (userId:number, skinId:number) => {
      try {
        await fetchBuyForInventory(userId, skinId);
        
        const updatedBalance = await fetchUserData(user?.userId || 0);
        setBalance(updatedBalance ?? null);

        const updatedSkins = inventorySkins.filter((skin) => skin.id !== skinId);
        setInventorySkins(updatedSkins);
      toast.success('Skin sold successfully', {theme: "colored", position: "bottom-right", autoClose:1500});
      } catch (error : any) {
        toast.error(error.message, {theme: "colored"});
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Search skins..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="container">
          <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={3}>
            {inventorySkins.map((skin:SkinModel) => (
                <Col key={skin.id} className="mb-3" align="center">
                <Card className="circular-card">
                <div className="card-navbar" style={{backgroundColor:"#4f1098"}}>
                    <p style={{marginTop: "1rem", marginBottom: "0.5rem"}}>{skin.name}</p>
                </div>
                <div className="card-content" style={{backgroundColor:"#413e5e"}}>
                    <Card.Img variant="top" src={skin.img} alt={skin.name} style={{flex:"auto"}}/>
                </div>
                <Card.Footer className="card-footer" style={{backgroundColor:"#4f1098", color:"white"}}>
                    <div className="footer-info">
                    <p>Price: ${Number(skin.price).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                    <Button style={{backgroundColor:'#8f94fb', color:'black'}}
                      onClick={() => {
                        if (userId !== null) {
                          handleBuyClick(userId, skin.id);
                        } else {
                          console.error('User ID is invalid');
                        }
                      }}
                    >
                      Buy
                    </Button>
                    </div>
                </Card.Footer>
                </Card>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    );
  };