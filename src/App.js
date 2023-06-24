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

    // Handler for exporting barcode data as CSV
    const exportAsCSV = () => {
        const csvContent = `data:text/csv;charset=utf-8,${getCSVContent()}`;
        const link = document.createElement('a');
        link.href = encodeURI(csvContent);
        link.download = 'barcode_history.csv';
        link.click();
    };

    // Handler for exporting barcode data as JSON
    const exportAsJSON = () => {
        const jsonData = JSON.stringify(history, null, 2);
        const jsonContent = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;
        const link = document.createElement('a');
        link.href = jsonContent;
        link.download = 'barcode_history.json';
        link.click();
    };


    // Function to get the CSV content from history data
    const getCSVContent = () => {
        let csvContent = 'Code, Timestamp\n';

        history.forEach((item) => {
            const { code, timestamp } = item;
            const formattedTimestamp = new Date(timestamp).toLocaleString();
            csvContent += `${code},${formattedTimestamp}\n`;
        });

        return csvContent;
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
                                element={
                                    <History
                                        history={history}
                                        removeBarcodeFromHistory={removeBarcodeFromHistory}
                                        exportAsCSV={exportAsCSV}
                                        exportAsJSON={exportAsJSON}
                                    />
                                }
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