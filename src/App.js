import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/App.css';
import BarcodeGenerator from './components/BarcodeGenerator';
import History from './components/History';
import Customization from './components/Customization';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const HISTORY_STORAGE_KEY = 'barcodeHistory';

function App() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);

        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    const addBarcodeToHistory = (barcode) => {
        const updatedHistory = [...history, barcode];
        setHistory(updatedHistory);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    };

    const removeBarcodeFromHistory = (barcode) => {
        const updatedHistory = history.filter((item) => item !== barcode);
        setHistory(updatedHistory);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    };

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <main>
                    <div className="container">
                        <Routes>
                            <Route
                                path="/"
                                element={<BarcodeGenerator addBarcodeToHistory={addBarcodeToHistory} />}
                            />
                            <Route
                                path="/history"
                                element={<History history={history} removeBarcodeFromHistory={removeBarcodeFromHistory} />}
                            />
                            <Route path="/personnalisation" element={<Customization />} />
                        </Routes>
                    </div>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;