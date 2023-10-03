import React from 'react';
import './Collected.css';
import { useLocation } from 'react-router-dom';

function CollectionCollected() {
    const location = useLocation()
    // console.log(location.state, "state")
    return (


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
        </div>

    );
}

export default CollectionCollected;