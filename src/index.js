import React from 'react';
import ReactDOM from 'react-dom';
import {
    AdaptivityProvider,
    ConfigProvider
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bridge from '@vkontakte/vk-bridge';

bridge.send("VKWebAppInit", {});

ReactDOM.render(
    <ConfigProvider>
        <AdaptivityProvider>
            <App/>
        </AdaptivityProvider>
    </ConfigProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
