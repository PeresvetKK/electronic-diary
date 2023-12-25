import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store, {persistor} from './store/index.js';

import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import Loader from './components/Loader/Loader.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        {/* для использования хранилища */}
        <PersistGate loading={<Loader/>} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
);