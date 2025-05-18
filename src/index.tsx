/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";
import { AppStorageImpl } from "./store/AppStorageImpl.ts";

const root = document.getElementById("root");

render(() => {
    const appStorage = new AppStorageImpl(localStorage);

    return <App appStorage={appStorage} />;
}, root!);
