import { Table } from "react-bootstrap";
import TokenManager from "../Utils/API_Calls/JWT/TokenManager";
import { useFetchPurchaseHistory } from "../Utils/API_Calls/User/FetchUserPurchaseHistory";

export const PurchaseHistory = () => {
    const user = TokenManager.getUser();
    const userId = user?.userId;

    const purchaseHistory = useFetchPurchaseHistory(userId);

    return (
        <div className="p-4 d-flex flex-column" style={{ minHeight:"73.2vh" }}>
            <div>
              <h3>Purchase History for {user?.sub}</h3>
              <Table responsive striped bordered hover className="mb-0">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((purchase) => (
                    <tr key={purchase.skinId}>
                      <td>{purchase.itemName}</td>
                      <td>${Number(purchase.itemPrice).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                      <td>{purchase.purchaseDate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
        </div>
      );
    };