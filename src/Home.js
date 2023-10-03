import React, { useState, useEffect } from 'react';
import Card from './Card';
import ImageUploader from './ImageUploader';
import Loader from './Loader';
import { useNavigate } from "react-router-dom";
import './Home.css'
import background from './background.jpg';

function Home() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cardSize, setCardSize] = useState('medium');
    const [collectionItems, setCollectionItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleCardSizeChange = (size) => {
        setCardSize(size);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            setIsLoading(true);
            let res = await fetch('http://localhost:3001/images', {
                method: "GET"
            }).then((res) => res.json());
            setIsLoading(false);
            setImages(res);
            console.log(res, "response");
        } catch (error) {
            console.error('Error fetching images:', error);
            setIsLoading(false);
        }
    };

    const handleAddToCollection = (image) => {
        setCollectionItems((prevState) => [...prevState, image]);
    };

    console.log(collectionItems, "collectionItems");

    const deleteImages = async (imageId) => {
        console.log(imageId, "images")
        try {
            let res = await fetch(`http://localhost:3001/images${imageId}`, {
                method: "DELETE"
            });

            if (res.ok) {
                fetchImages()
                console.log("Image deleted successfully.");
            } else {
                console.error('Failed to delete image:', res.statusText);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleImageUpload = (uploadedImage) => {
        setImages([uploadedImage, ...images]);
    };

    const mediumcard = {
        width: 250,
        height: 230
    };

    const smallcard = {
        width: 150,
        height: 170
    };

    const largecard = {
        width: 350,
        height: 330,
    };

    let globalStyle;
    switch (cardSize) {
        case "small":
            globalStyle = smallcard;
            break;

        case "medium":
            globalStyle = mediumcard;
            break;
        case "large":
            globalStyle = largecard;
            break;
        default:
            break;
    }

    const filteredImages = images.filter(image =>
        image.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <img className='image-background' src={background} alt='no img'></img>

            <ImageUploader onUpload={handleImageUpload} fetchImages={fetchImages} />



            <div className='search-bar-main '>
                <input
                    type="text"
                    placeholder="Search Images"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='search-bar'
                />
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="image-grid">
                    {filteredImages.map((image) => (
                        <Card
                            image={image}
                            onAddToCollection={handleAddToCollection}
                            onDelete={deleteImages}
                            cardSize={cardSize}
                            globalStyle={globalStyle}
                        />
                    ))}
                </div>
            )}

            <div className="sizes-btn">
                <button
                    className="size-btn"
                    onClick={() => navigate('./CollectionCollected', { state: collectionItems })}
                >
                    Collections
                </button>

                <button className="size-btn" onClick={() => handleCardSizeChange("small")}>
                    Small
                </button>

                <button className="size-btn" onClick={() => handleCardSizeChange("medium")}>
                    Medium
                </button>

                <button className="size-btn" onClick={() => handleCardSizeChange("large")}>
                    Large
                </button>
            </div>
        </div>
    );
}

export default Home;
