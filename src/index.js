import App from './App.jsx';
import root from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store';
import { Provider } from 'react-redux'



// Where to render
const tag = document.getElementById('root');
const run = root.createRoot(tag);
// What to render
run.render(<Provider store={store}>,
    <BrowserRouter><App /></BrowserRouter></Provider>)
