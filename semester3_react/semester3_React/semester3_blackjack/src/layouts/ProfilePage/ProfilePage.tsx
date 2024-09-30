import { AdminPage } from './components/AdminPage';
import { CustomerPage } from './components/CustomerPage';
import TokenManager from '../Utils/API_Calls/JWT/TokenManager';

export const ProfilePage = () => {
  const user = TokenManager.getUser();
  const userType = user?.userType;

  return(
    <div style={{ minHeight:"73.2vh" }}>
      {userType === 'Admin' ? 
      <AdminPage /> 
      :
      <CustomerPage/>}
    </div>
  );
};

