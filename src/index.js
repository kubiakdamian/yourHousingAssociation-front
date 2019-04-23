import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from "./store";
import { Provider } from "react-redux";
import {addLocaleData} from "react-intl";
import en from "react-intl/locale-data/en";
import pl from "react-intl/locale-data/pl";
import de from "react-intl/locale-data/de";

addLocaleData(en);
addLocaleData(pl);
addLocaleData(de);

const AppWithStore = (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );

ReactDOM.render(AppWithStore, document.getElementById('root'));
serviceWorker.unregister();
