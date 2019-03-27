import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from "./store";
import { Provider } from "react-redux";

const AppWithStore = (
    <div>
      <Provider store={store}>
        <App store={store} />
      </Provider>
    </div>
  );

ReactDOM.render(AppWithStore, document.getElementById('root'));
serviceWorker.unregister();
