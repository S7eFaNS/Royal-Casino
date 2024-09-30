import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import moneyImage from "../../images/money.avif";
import cs2 from "../../images/when-i-saw-the-new-cs2-logo-this-instantly-came-to-my-mind-v0-kenzj6pcmjpa1.webp";
import creditCard from "../../images/images.png";
import { fetchUserData } from '../Utils/API_Calls/User/UserApiBalance';
import { useBalance } from '../Utils/Features/BalanceContext';
import TokenManager from '../Utils/API_Calls/JWT/TokenManager';
import { depositMoney } from '../Utils/API_Calls/User/FetchDeposit';

export const Deposit: React.FC = () => {
    const user = TokenManager.getUser();
    const { setBalance } = useBalance();

    function handleBank(): void {
        toast.error('Bank transfer option is in progress!', {theme: "colored"});
    }

    function handleSteam(): void {
        toast.error('Steam skin deposit option is in progress!', {theme: "colored"});
    }

    async function addMoney(): Promise<void> {
        const userId = user?.userId;
    
        try {
            const depositMessage = await depositMoney(userId || 0);
    
            if (depositMessage !== null) {
                const updatedBalance = await fetchUserData(userId || 0);
                if (updatedBalance !== null) {
                    setBalance(updatedBalance);
                    toast.success('Money deposited successfully', { theme: 'colored', position: "bottom-right", autoClose:1500 });
                } else {
                    toast.error('Error updating balance - Updated balance is null', { theme: 'colored' });
                }
            } else {
                toast.error('Error depositing money - Deposit message is null', { theme: 'colored' });
            }
        } catch (error) {
            console.error('Error depositing money:', error);
            toast.error('Error depositing money - See console for details', { theme: 'colored' });
        }
    }
    
    
    

    return (
        <div style={{ minHeight: "73.2vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Row xs={1} sm={1} md={3} lg={3} xl={3} xxl={3} className="g-4">
        <Col  className="mb-3" align="center">
                <Card className="d-flex flex-column justify-content-between" style={{ width: '40vh', height: '40vh'}}>
                
                <div className="card-content">
                    <Card.Img variant="top" src={creditCard}  style={{flex:"auto", height:"5rem"}}/>
                </div>
                <div className="card-navbar" style={{backgroundColor:"#4f1098", color:"white"}}>
                    <p style={{marginBottom: "0.5rem"}}>Bank Deposit</p>
                </div>
            <Card.Footer className="card-footer">
              <Button
                className="border border-secondary"
                style={{
                    width: '75%',
                    backgroundColor: '#4f1098',
                    color: 'white',
                }}
                onClick={() => handleBank()}
                >
                deposit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      
        <Col  className="mb-3" align="center">
                <Card className="d-flex flex-column justify-content-between" style={{ width: '40vh', height: '40vh' }}>
                
                <div className="card-content">
                    <Card.Img variant="top" src={cs2} style={{flex:"auto", height:"5rem"}}/>
                </div>
                <div className="card-navbar" style={{backgroundColor:"#4f1098", color:"white"}}>
                    <p style={{marginBottom: "0.5rem"}}>Steam Deposit</p>
                </div>
            <Card.Footer className="card-footer">
              <Button
                className="border border-secondary"
                style={{
                    width: '75%',
                    backgroundColor: '#4f1098',
                    color: 'white',
                }}
                onClick={() => handleSteam()}
                >
                deposit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      
        <Col  className="mb-3" align="center">
                <Card className="d-flex flex-column justify-content-between" style={{ width: '40vh', height: '40vh' }}>
                
                <div className="card-content">
                    <Card.Img variant="top" src={moneyImage} style={{flex:"auto", height:"5rem"}}/>
                </div>
                <div className="card-navbar" style={{backgroundColor:"#4f1098", color:"white"}}>
                    <p style={{marginBottom: "0.5rem"}}>+1000$</p>
                </div>
            <Card.Footer className="card-footer">
              <Button
                className="border border-secondary"
                style={{
                    width: '75%',
                    backgroundColor: '#4f1098',
                    color: 'white',
                }}
                onClick={() => addMoney()}
                >
                deposit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        </Row>
      </div>
    );
};
