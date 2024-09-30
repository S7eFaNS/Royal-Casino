import React, { useState } from 'react';
import { useFetchAllUsers } from '../../Utils/API_Calls/User/FetchAllUsers';
import UserModel from '../../../models/UserModel';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import "../User.css";
import { editUserFetch } from '../../Utils/API_Calls/User/FetchEditUser';
import { deleteUserFetch } from '../../Utils/API_Calls/User/FetchDeleteUser';
import { SpinnerLoading } from '../../Utils/Features/SpinnerLoading';

export const UserList: React.FC = () => {
  const { users, isLoading, httpError } = useFetchAllUsers();
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState<UserModel | null>(null);

  if (isLoading) {
    return <SpinnerLoading />;
}

  if (httpError) {
    return <p>Error: {httpError}</p>;
  }

  const handleEdit = () => {
    if (selectedUser) {
      setShowEditModal(true); 
      setEditedUser(selectedUser); 
    }
  };

  const handleClose = () => {
    setShowEditModal(false);
    setEditedUser(null); 
  };


  const handleSaveChanges = async () => {
    if (editedUser) {
      const updatedUser = await editUserFetch(editedUser.id, editedUser);
      if (updatedUser) {
        window.location.reload();
      } else {
        console.error('Failed to update user');
      }
      setShowEditModal(false); 
      setEditedUser(null); 
    }
  };

  
  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUserFetch(selectedUser.id);
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };
  
  const handleUserClick = (user: UserModel) => {
    setSelectedUser(user);
  };

  return (
    <div className="p-4 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User List</h2>
          <div>
            <button
              className={`btn ${selectedUser ? 'btn-primary me-2' : 'btn-secondary'}`}
              onClick={handleEdit}
              disabled={!selectedUser}
            >
              Edit
            </button>
            <button
              className={`btn ${selectedUser ? 'btn-danger' : 'btn-secondary'}`}
              onClick={handleDelete}
              disabled={!selectedUser}
            >
              Delete
            </button>
          </div>
      </div>
      <Table responsive striped bordered hover className="mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: UserModel) => (
            <tr
              key={user.id}
              className={selectedUser?.id === user.id ? 'selected-row' : ''}
              onClick={() => handleUserClick(user)}
            >
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.balance}</td>
              <td className="p-2">{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={editedUser?.name || ''}
                onChange={(e) => {
                  if (editedUser) {
                    setEditedUser({ ...editedUser, name: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="editEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={editedUser?.email || ''}
                onChange={(e) => {
                  if (editedUser) {
                    setEditedUser({ ...editedUser, email: e.target.value });
                  }
                }}
              />
            </Form.Group>
            <Form.Group controlId="editBalance">
            <Form.Label>Balance</Form.Label>
            <Form.Control
                type="number"
                placeholder="Enter balance"
                value={editedUser?.balance || ''}
                onChange={(e) => {
                  if (editedUser) {
                    const newBalance = parseFloat(e.target.value);
                    setEditedUser({ ...editedUser, balance: newBalance });
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
