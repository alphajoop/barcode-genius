import React from 'react';
import '../css/History.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const History = ({ history, removeBarcodeFromHistory, exportAsCSV, exportAsJSON }) => {
    return (
        <div className="container">
            <h1 className="text-center mt-5 history-title">Historique des codes-barres</h1>
            {history.length > 0 ? (
                <div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary mx-2" onClick={exportAsCSV}>
                            Exporter en CSV
                        </button>
                        <button className="btn btn-primary mx-2" onClick={exportAsJSON}>
                            Exporter en JSON
                        </button>
                    </div>
                    <ul className="list-group mt-3">
                        {history.map((barcode, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {barcode.code}
                                <button className="btn btn-danger" onClick={() => removeBarcodeFromHistory(barcode)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="mt-3">Aucun code-barre dans l'historique</p>
            )}
        </div>
    );
};

export default History;