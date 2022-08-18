// logic
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'store';

// components
import App from 'App';

// styles
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
