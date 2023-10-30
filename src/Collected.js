import React from 'react';
import { useLocation } from 'react-router-dom';
import './Collected.css';
import Loader from './Loader';

function CollectionCollected() {
    const location = useLocation()

    return (
        <div>
            <div style={{ textAlign: "center", padding: 30 }}>
                <h1>My Collections</h1>
                <p>See Our Collected Data</p>
            </div>
            {!location.state.length ? (
                <Loader />
            ) : (
                <div className='card2'>
                    {location.state.map((image, index) => (
                        <div key={index} className='card'>
                            <div className="card-image">
                                <img src={image} alt={`Image ${index + 1}`} />
                                <span>{image.split("uploads/")[1]}</span>
                            </div>
                            <div className="card-buttons">
                            </div>
                        </div>
                    ))}
                </div>)}
        </div>
    );
}

export default CollectionCollected;