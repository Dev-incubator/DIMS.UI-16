import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import store from './redux/store';
import ApiAuthProvider from './providers/ApiAuthProvider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <ThemeProvider>
      <ApiAuthProvider>
        <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthProvider>
      </ApiAuthProvider>
    </ThemeProvider>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
