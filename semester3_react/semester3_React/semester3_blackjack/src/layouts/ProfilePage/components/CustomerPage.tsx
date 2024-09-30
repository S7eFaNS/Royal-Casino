import React, { useState } from 'react';
import TokenManager from '../../Utils/API_Calls/JWT/TokenManager';
import { useFetchUser } from '../../Utils/API_Calls/User/FetchUser';
import {CustomerInventory} from "./CustomerInventory";
import { Button, Modal } from 'react-bootstrap';


export const CustomerPage: React.FC = () => {
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

      <div className="container text-center">
        <h3>Inventory</h3>
      </div>
      <div className="container-fluid">
            <CustomerInventory/>
      </div>
    </div>
  );
};
