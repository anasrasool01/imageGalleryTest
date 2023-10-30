import { Button } from 'antd';
import React from 'react';
import './Card.css';

function Card({ image, onAddToCollection, onDelete, globalStyle, cardSize }) {
    const handleDeleteClick = () => {
        let id = image.split("uploads")[1];
        onDelete(id);
    };

    const handleDownloadClick = (imgUrl) => {
        fetch(imgUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'image.jpg';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    };

    return (
        <div className="card" style={{ ...globalStyle }}>
            <div className="card-image">
                <img src={image} alt={image.id} width={50} height={50} />
                <span>{image.split("uploads/")[1]}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: 10 }}>
                <Button type="primary" size={cardSize} onClick={() => handleDownloadClick(image)}>
                    Download
                </Button>
                <Button type="primary" size={cardSize} onClick={handleDeleteClick}>
                    Delete
                </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" size={cardSize} onClick={() => onAddToCollection(image)}>
                    Add to Collection
                </Button>
            </div>
        </div>
    );
}

export default Card;