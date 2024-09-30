import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { BalanceProvider } from './layouts/Utils/Features/BalanceContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <BalanceProvider>
        <App />
      </BalanceProvider>
  </BrowserRouter>,
)
