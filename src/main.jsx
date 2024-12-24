

import ReactDOM from 'react-dom/client';  // Correct import for React 18+
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';  // Import Provider from react-redux
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from './store.jsx';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
