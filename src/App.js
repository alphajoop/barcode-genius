import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/App.css';
import BarcodeGenerator from "./components/BarcodeGenerator";

function App() {
    return (
        <div>
            <h1 className="text-center mt-5">Générateur de codes-barres</h1>
            <BarcodeGenerator />
        </div>
    );
}

export default App;