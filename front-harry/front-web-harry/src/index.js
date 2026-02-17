import App from './App.jsx';
import root from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store';
import { Provider } from 'react-redux'
import { AuthProvider } from './context/AuthProvider.jsx';



// Where to render
const tag = document.getElementById('root');
const run = root.createRoot(tag);
// What to render
run.render(<Provider store={store}>,
    <BrowserRouter><AuthProvider><App /></AuthProvider></BrowserRouter></Provider>)
