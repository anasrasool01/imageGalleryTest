import React, { useState, useRef } from 'react';
import './ImageUploader.css'

function ImageUploader({ fetchImages }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState([]);
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setSelectedImage(file);
    };

    const UploadImage = async () => {
        try {
            let formData = new FormData();
            formData.append("image", image);

            const response = await fetch("http://localhost:3001/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const responseData = await response.json();
            console.log("Uploaded image details:", responseData);
            fetchImages();

            if (inputRef.current) {
                inputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className='image-uploader'>

            <h1>This Is What I want </h1>
            <p>To Store and get Information</p>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef}
                className='input-image'
            />
            <button onClick={UploadImage} className='btn-image'>Upload Image</button>
        </div>
    );
}

export default ImageUploader;