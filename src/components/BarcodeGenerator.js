import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BarcodeGenerator = () => {
    const [barcodeType, setBarcodeType] = useState('QRCode');
    const [barcodeValue, setBarcodeValue] = useState('');
    const barcodeRef = useRef(null);

    const handleBarcodeTypeChange = (e) => {
        setBarcodeType(e.target.value);
    };

    const handleInputChange = (e) => {
        setBarcodeValue(e.target.value);
    };

    const handleDownloadClick = () => {
        const barcodeElement = barcodeRef.current;

        if (barcodeElement) {
            html2canvas(barcodeElement)
                .then((canvas) => {
                    const dataUrl = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'barcode.png';
                    link.click();
                })
                .catch((error) => {
                    console.error('Erreur lors de la génération de l\'image', error);
                });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <select className="form-select mb-3" value={barcodeType} onChange={handleBarcodeTypeChange} >
                        <option value="CODE128">Code 128</option>
                        <option value="QRCode">QR Code</option>
                    </select>
                    <input className="form-control mb-3" type="text" value={barcodeValue} onChange={handleInputChange} />
                    {barcodeType === 'QRCode' && barcodeValue && (
                        <div className="text-center" ref={barcodeRef}>
                            <QRCode value={barcodeValue} size={180} />
                        </div>
                    )}
                    {barcodeType === 'CODE128' && barcodeValue && (
                        <div className="text-center" ref={barcodeRef}>
                            <Barcode value={barcodeValue} />
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
                </div>
            </div>
        </div>
    );
};

export default BarcodeGenerator;