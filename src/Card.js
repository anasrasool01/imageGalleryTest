import React, { useState } from 'react';
import './Card.css';

function Card({ image, onAddToCollection, onDelete, globalStyle }) {
    const [searchQuery, setSearchQuery] = useState('');

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

    const isMatchingSearch = image.toLowerCase().includes(searchQuery.toLowerCase());
    if (!isMatchingSearch) {
        return null;
    }

    return (
        <div className="card" style={{ ...globalStyle }}>
            <div className="card-image">
                <img src={image} alt={image.id} />
                <span>{image.split("uploads/")[1]}</span>
            </div>
            <div className="card-buttons">
                <button className='btn-card' onClick={() => onAddToCollection(image)}>Add to Collection</button>
                <button className='btn-card' onClick={() => handleDownloadClick(image)}>Download</button>
                <button className='btn-card' onClick={handleDeleteClick}>Delete</button>
                {/* <button>Settings</button> */}
            </div>
        </div>
    );
}

export default Card;