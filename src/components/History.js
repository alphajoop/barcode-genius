import React from 'react';
import '../css/History.css';

const History = ({ history, removeBarcodeFromHistory }) => {
    return (
        <div className="container">
            <h1 className="text-center mt-5 history-title">Historique des codes-barres</h1>
            {history.length > 0 ? (
                <ul className="list-group mt-3">
                    {history.map((barcode, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {barcode.code}
                            <button className="btn btn-danger" onClick={() => removeBarcodeFromHistory(barcode)}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-3">Aucun code-barre dans l'historique</p>
            )}
        </div>
    );
};

export default History;