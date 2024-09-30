import { useEffect, useState } from 'react';
import TokenManager from '../Utils/API_Calls/JWT/TokenManager';
import './NavbarAndFooterCSS/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useBalance } from '../Utils/Features/BalanceContext';
import { fetchUserData } from '../Utils/API_Calls/User/UserApiBalance';
import { Button, Modal } from 'react-bootstrap';
import { fetchLeaderboard } from '../Utils/API_Calls/Inventory/FetchLeaderboard';

interface User {
  user_id: number;
  userName: string;
  purchaseCount: number;
}

export const Navbar = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [errorLeaderboard, setErrorLeaderboard] = useState<string | null>(null);

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = TokenManager.getUser();
  const userType = user?.userType;

  const userId = TokenManager.getClaims()?.userId;

  const { userBalance, setBalance } = useBalance();


  useEffect(() => {
    if (TokenManager.getAccessToken()) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (TokenManager.getAccessToken()) {
        const updatedBalance = await fetchUserData(userId || 0);
        setBalance(updatedBalance ?? null);
      } else {
        setUserLoggedIn(false);
      }
    };

    fetchUserBalance();
  }, []);

  const handleLeaderboardButtonClick = async () => {
    try {
      setLoadingLeaderboard(true);
      setErrorLeaderboard(null);

      const response = await fetchLeaderboard();

      setLeaderboard(response);

      setShowLeaderboard(true);
    } catch (error) {
      setErrorLeaderboard('Error fetching leaderboard data');
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const handleLeaderboardClose = () => {
    setShowLeaderboard(false);
  };

  const logOut = () => {
    TokenManager.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color">
      <div className="container-fluid">
        <span className="navbar-brand ">Casino Royal</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blackjack">  
                BlackJack
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/market">
                Market
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/deposit">
                Deposit
              </Link>
            </li>
            <li className="nav-item" onClick={handleLeaderboardButtonClick}>
              <button className="nav-link">
                Leaderboard
              </button>
            </li>
            <Modal show={showLeaderboard} onHide={handleLeaderboardClose} >
              <Modal.Header closeButton style={{backgroundColor:"#4f1098", color:"white"}}>
                <Modal.Title>Leaderboard</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {loadingLeaderboard && <p>Loading leaderboard...</p>}
                {errorLeaderboard && <p>Error: {errorLeaderboard}</p>}
                {!loadingLeaderboard && !errorLeaderboard && (
                  <div>
                    <h3>Top 5 Users with Most Skins Withdrawn</h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Skins Withdrawn</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.map((user, index) => (
                          <tr key={user.user_id}>
                            <td>{index + 1}</td>
                            <td>{user.userName}</td>
                            <td>{user.purchaseCount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer style={{backgroundColor:"#4f1098", color:"white"}}>
                <Button variant="secondary" onClick={handleLeaderboardClose} style={{backgroundColor:"white", color:"black"}}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </ul>
          <div className="dropdown text-end navbar-nav ms-auto">
                
            {userLoggedIn ? (
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="ms-2 p-4" style={{color: 'white', fontWeight: 'bold'}}>
                Balance: ${userBalance?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </span>

                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' 
                width='16' height='16' fill='currentColor' class='bi bi-person-circle' 
                viewBox='0 0 16 16'%3E%3Cpath d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/%3E%3Cpath 
                fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 
                11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/%3E%3C/svg%3E" 
                alt="mdo" width="32" height="32" className="rounded-circle"/>

              </a>
            ) : (
              <Link type="button" className="btn btn-outline-light" to="login">
                Log in
              </Link>
            )}
            {userLoggedIn && (
              <ul className="dropdown-menu text-small dropdown-menu-end">
                <li>
                  <Link className="dropdown-item"to="/profile">
                    Profile
                  </Link>
                </li>
                {userType === 'Customer' ? (
                  <li>
                    <Link className="dropdown-item" to="/purchaseHistory">
                      Purchase History
                    </Link>
                  </li>
                ) : null}
                <li>
                  <button className="dropdown-item" onClick={logOut}>
                    Sign out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
