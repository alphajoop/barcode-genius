import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import '../css/BarcodeGenerator.css';

const BarcodeGenerator = ({ addBarcodeToHistory }) => {
    const [barcodeType, setBarcodeType] = useState('QRCode');
    const [barcodeValue, setBarcodeValue] = useState('');
    const [exportFormat, setExportFormat] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const barcodeRef = useRef(null);

    const handleBarcodeTypeChange = (e) => {
        setBarcodeType(e.target.value);
    };

    const handleInputChange = (e) => {
        setBarcodeValue(e.target.value);
    };

    const handleFormatChange = (e) => {
        setExportFormat(e.target.value);
    };

    const handleDownloadClick = () => {
        const barcodeElement = barcodeRef.current;

        if (!barcodeValue) {
            setErrorMessage('Veuillez saisir une valeur pour générer un code-barres.');
            return;
        }

        if (!exportFormat) {
            setErrorMessage('Veuillez choisir un format d\'exportation.');
            return;
        }

        if (barcodeElement) {
            const canvasOptions = {
                backgroundColor: 'rgba(0, 0, 0, 0)', // Set transparent background (RGBA with transparency 0)
            };

            html2canvas(barcodeElement, canvasOptions)
                .then((canvas) => {
                    const dataUrl = canvas.toDataURL('image/png');
                    const timestamp = new Date().toLocaleString().replace(/[\s:]+/g, '-');
                    const fileName = `barcode_${timestamp}`;

                    // Export the data in the selected format
                    if (exportFormat === 'PNG') {
                        const link = document.createElement('a');
                        link.href = dataUrl;
                        link.download = `${fileName}.png`;
                        link.click();
                    } else if (exportFormat === 'CSV') {
                        const csvContent = `data:text/csv;charset=utf-8,${barcodeValue},${new Date().getTime()}`;
                        const link = document.createElement('a');
                        link.href = encodeURI(csvContent);
                        link.download = `${fileName}.csv`;
                        link.click();
                    } else if (exportFormat === 'JSON') {
                        const exportDataItem = { code: barcodeValue, timestamp: new Date().getTime() };
                        const jsonData = JSON.stringify(exportDataItem, null, 2);
                        const jsonContent = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;
                        const link = document.createElement('a');
                        link.href = jsonContent;
                        link.download = `${fileName}.json`;
                        link.click();
                    }

                    addBarcodeToHistory({
                        code: barcodeValue,
                        timestamp: new Date().getTime(),
                    });

                    setErrorMessage('');
                })
                .catch((error) => {
                    setErrorMessage('Erreur lors de la génération de l\'image');
                    console.error('Erreur lors de la génération de l\'image', error);
                });
        }
    };

    const placeholder = 'Veuillez saisir une valeur';

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    {/* Barcode type select */}
                    <select className="form-select mb-3" value={barcodeType} onChange={handleBarcodeTypeChange}>
                        <option value="QRCode">QR Code</option>
                        <option value="CODE128">Code 128</option>
                    </select>

                    {/* Barcode input */}
                    <input
                        className="form-control mb-3"
                        type="text"
                        value={barcodeValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />

                    {/* Export format select */}
                    {barcodeValue && (
                        <div>
                            <select className="form-select mb-3" value={exportFormat} onChange={handleFormatChange}>
                                <option value="">Choisir un format d'exportation</option>
                                <option value="PNG">PNG</option>
                                <option value="CSV">CSV</option>
                                <option value="JSON">JSON</option>
                            </select>
                        </div>
                    )}

                    {/* Barcode container */}
                    <div className="barcode-container" ref={barcodeRef}>
                        {barcodeType === 'QRCode' && barcodeValue && <QRCode value={barcodeValue} size={180} />}
                        {barcodeType === 'CODE128' && barcodeValue && <Barcode value={barcodeValue} />}
                    </div>

                    {/* Download button */}
                    {exportFormat && barcodeValue && ( // Added barcodeValue condition
                        <div className="text-center mt-3">
                            <button className="btn btn-primary" onClick={handleDownloadClick}>
                                <i className="fas fa-download"></i>
                                <span>Télécharger</span>
                            </button>
                        </div>
                    )}

                    {/* Error message */}
                    {!barcodeValue && (
                        <div className="text-center mt-3">
                            <p>Veuillez saisir une valeur pour générer un code-barres.</p>
                        </div>
                    )}

                    {/* Error message */}
                    {errorMessage && (
                        <div className="text-center mt-3">
                            <p className="text-danger">{errorMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BarcodeGenerator;