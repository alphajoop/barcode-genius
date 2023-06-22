import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import '../css/BarcodeGenerator.css';

const BarcodeGenerator = ({ addBarcodeToHistory }) => {
    const [barcodeType, setBarcodeType] = useState('QRCode');
    const [barcodeValue, setBarcodeValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const barcodeRef = useRef(null);

    const handleBarcodeTypeChange = (e) => {
        setBarcodeType(e.target.value);
    };

    const handleInputChange = (e) => {
        setBarcodeValue(e.target.value);
    };

    const handleDownloadClick = () => {
        const barcodeElement = barcodeRef.current;

        if (!barcodeValue) {
            setErrorMessage('Veuillez saisir une valeur pour générer un code-barres.');
            return;
        }

        if (barcodeElement) {
            const canvasOptions = {
                backgroundColor: 'rgba(0, 0, 0, 0)', // Définissez un fond transparent (RGBA avec une transparence de 0)
            };

            html2canvas(barcodeElement, canvasOptions)
                .then((canvas) => {
                    const dataUrl = canvas.toDataURL('image/png');
                    const timestamp = new Date().toLocaleString().replace(/[\s:]+/g, '-');
                    const fileName = `barcode_${timestamp}.png`;
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = fileName;
                    link.click();

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
                    <select className="form-select mb-3" value={barcodeType} onChange={handleBarcodeTypeChange}>
                        <option value="QRCode">QR Code</option>
                        <option value="CODE128">Code 128</option>
                    </select>
                    <input
                        className="form-control mb-3"
                        type="text"
                        value={barcodeValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />

                    <div className="barcode-container" ref={barcodeRef}>
                        {barcodeType === 'QRCode' && barcodeValue && (
                            <QRCode value={barcodeValue} size={180} />
                        )}
                        {barcodeType === 'CODE128' && barcodeValue && (
                            <Barcode value={barcodeValue} />
                        )}
                    </div>

                    {!barcodeValue && (
                        <div className="text-center mt-3">
                            <p>Veuillez saisir une valeur pour générer un code-barres.</p>
                        </div>
                    )}

                    {barcodeValue && (
                        <div className="text-center mt-3">
                            <button className="btn btn-primary" onClick={handleDownloadClick}>
                                <i className="fas fa-download"></i>
                                <span>Télécharger</span>
                            </button>
                        </div>
                    )}

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