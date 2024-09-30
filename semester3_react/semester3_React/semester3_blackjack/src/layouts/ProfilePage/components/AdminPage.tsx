import { useFetchUser } from "../../Utils/API_Calls/User/FetchUser";
import TokenManager from "../../Utils/API_Calls/JWT/TokenManager";
import { UserList } from "./UserList";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export const AdminPage: React.FC = () => {
    const userId = TokenManager.getClaims()?.userId;
  
    const { user, isLoading, httpError } = useFetchUser(userId);
  
    const [showDetailPanel, setShowDetailPanel] = useState(false);

    const handleDetailButtonClick = () => {
      setShowDetailPanel(true);
    };
  
    const handleDetailPanelClose = () => {
      setShowDetailPanel(false);
    };

    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (httpError) {
      return <p>Error: {httpError}</p>;
    }
  
    return (
      <div>
        <div>
        <h2>Name: {user?.name}</h2>
        <Button variant="primary" onClick={handleDetailButtonClick} style={{backgroundColor:"#4f1098", color:"white"}}>
          Show Details
        </Button>

        <Modal show={showDetailPanel} onHide={handleDetailPanelClose}>
        <Modal.Header style={{backgroundColor:"#4f1098", color:"white"}}>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && (
            <div>
              <p>Id: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Balance: {user.balance}</p>
              <p>Role: {user.userType}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailPanelClose} style={{backgroundColor:"#4f1098", color:"white"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
        <UserList />
      </div>
    );
  };