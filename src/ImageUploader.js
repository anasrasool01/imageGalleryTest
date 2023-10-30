import React, { useState, useRef } from 'react';
import './ImageUploader.css';
import { Button, message, Progress } from 'antd';

function ImageUploader({ fetchImages }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const uploadImage = async () => {
        if (!selectedImage) {
            message.error('Please select an image to upload.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", inputRef.current.files[0]);

            const response = await fetch("http://localhost:3002/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                message.success('image uploaded.');
                // console.log("Uploaded image details:", await response.text());
                fetchImages();
                setUploadProgress(100); // Set progress to 100% on success
                if (inputRef.current) {
                    inputRef.current.value = '';
                }

                // Reset progress to 0 after 2-3 seconds
                setTimeout(() => {
                    setUploadProgress(0);
                }, 2000);
                setSelectedImage(null);
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadProgress(0);
        }
    };

    return (
        <div className='image-uploader'>
            <h1>This Is What I want</h1>
            <p>To Store and get Information</p>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef}
                className='input-image'
            />

            {selectedImage && (
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="selected-image"
                />
            )}

            <Button onClick={uploadImage} className='btn-image'>Upload</Button>

            <Progress
                type="line"
                percent={uploadProgress}
                status={uploadProgress === 100 ? 'success' : 'active'}
            />
        </div>
    );
}

export default ImageUploader;