"use client";
import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { CldImage } from 'next-cloudinary';

const Vision = () => {
    // states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [cameraMode, setCameraMode] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);

    //handle the url text field and call the api call
    const formik = useFormik({
        initialValues: {
            image_url: "",
        },
        validationSchema: Yup.object({
            image_url: Yup.string().url("Image URL is Invalid").required("Image URL is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setError(null);
            setResponse(null);
            try {
                //api call save status to res
                const res = await fetch('/api/vision', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch the response');
                }
                const data = await res.json();
                setResponse(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        },
    });


    // Toggle camera mode and start/stop video feed
    const handleCameraToggle = async () => {
        setCameraMode(!cameraMode); // Toggle camera mode
        if (!cameraMode) { //if cameraMode is false because if it's false now it was toggle from true to false
            // Start video stream
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                } catch (error) {
                    console.error("Error accessing camera:", error);
                    setError("Unable to access camera");
                }
            }
        } else {
            // Stop video stream
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        }
    };

    // Capture an image from the video stream
    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/png");
            setCapturedImage(dataUrl);  // Set captured image
            setCameraMode(false);  // Exit camera mode
        }
    };

    

    return (
        <div className="gameboy-container">
            <div className="fake-buttons">
                <a className="button-a">A</a>
                <a href="/" className='button-b'>B</a>
                <a className="button-c">C</a>
                <a href="/database" className="button-d">D</a>
                {/* <div className="button-dpad"></div> */}
            </div>
            <h1 className="gameboy-title">EcoDex Vision</h1>

            <div className="screen">
                {cameraMode ? (
                    <video ref={videoRef} className="video-feed" />
                ) : capturedImage ? (
                    <img src={capturedImage} alt="Captured" className="image-preview" />
                ) : formik.values.image_url ? (
                    <img src={formik.values.image_url} alt="URL Preview not Found" className="image-preview" />
                ) : (
                    <p className="screen-text">Waiting for URL or Camera...</p>
                )}
            </div>

            <form onSubmit={formik.handleSubmit} className="form-container">
                {/* show the url textfield when the camera mode is OFF, hide if the camera mode is ON */}
                {!cameraMode && (
                        <textarea
                            name="image_url"
                            placeholder="Enter image URL"
                            value={formik.values.image_url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="textarea"
                            type="text"
                        />
                    )}


                {formik.touched.image_url && formik.errors.image_url && !cameraMode && (
                    <div className="error-container">
                        <FaExclamationCircle /> {formik.errors.image_url}
                    </div>
                )}
                
                <button type="button" onClick={handleCameraToggle} className="start-button">
                    {cameraMode ? "Close Camera" : "Open Camera"}
                </button>

                {cameraMode && (
                    <button type="button" onClick={handleCapture} className="start-button">
                        Capture Image
                    </button>
                )}

                <button type="submit" disabled={formik.isSubmitting || !formik.isValid} className="start-button">
                    {loading ? <FaSpinner className="spinner" /> : "Analyze"}
                </button>
                {error && <div className="error-container">{error}</div>}

            </form>

            {response && (
                <div className="response-container">
                    <h2>Response:</h2>
                    <p>{response.content}</p>
                </div>
            )}

            <style jsx>{`
                .gameboy-container {
                    max-width: 600px;
                    margin: 2rem auto;
                    padding: 1.5rem;
                    background-color: #d3d3d3;
                    border: 12px solid #a8a8a8;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    font-family: Arial, sans-serif;
                    text-align: center;
                    color: #333;
                    position: relative;
                }

                .gameboy-title {
                    font-family: 'Courier New', Courier, monospace;
                    font-weight: bold;
                    color: #4b4b4b;
                    margin-bottom: 1rem;
                    font-size: 1.8rem;
                }

                .fake-buttons {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .button-a, .button-b, .button-c, .button-d{
                    width: 40px;
                    height: 40px;
                    background-color: #d84797;
                    color: white;
                    font-size: 1.2rem;
                    font-family: 'Courier New', Courier, monospace;
                    font-weight: bold;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0px 4px #b13677;
                }

                .button-dpad {
                    width: 60px;
                    height: 60px;
                    background-color: #333;
                    border-radius: 8px;
                    position: relative;
                }

                .button-dpad:before, .button-dpad:after {
                    content: "";
                    position: absolute;
                    background-color: #333;
                }

                .button-dpad:before {
                    width: 20px;
                    height: 60px;
                    top: 0;
                    left: 20px;
                }

                .button-dpad:after {
                    width: 60px;
                    height: 20px;
                    top: 20px;
                    left: 0;
                }

                .screen {
                    width: auto;
                    height: 350px;
                    background-color: black;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                    border-radius: 8px;
                    border: 4px solid #4b4b4b;
                    box-shadow: inset 0 4px #6b6b6b;
                }

                .screen-text {
                    color: #00ff00;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 1.2rem;
                }

                .image-preview, .video-feed {
                    max-width: 100%;
                    max-height: 100%;
                    border-radius: 5px;
                }

                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem;
                    background-color: #ffffff;
                    border-radius: 8px;
                }

                .textarea {
                    width: 100%;
                    padding: 0.5rem;
                    border: 2px solid #4b4b4b;
                    border-radius: 5px;
                    font-family: 'Courier New', Courier, monospace;
                }

                /* Start Button */
                .start-button {
                    background-color: #e0e0e0;
                    color: #4b4b4b;
                    padding: 0.6rem 1.2rem;
                    border: 2px solid #4b4b4b;
                    border-radius: 8px;
                    cursor: pointer;
                    font-family: 'Courier New', Courier, monospace;
                    font-weight: bold;
                    font-size: 1rem;
                    box-shadow: 0px 4px #8c8c8c;
                    transition: box-shadow 0.1s ease;
                }

                .start-button:hover {
                    box-shadow: 0px 2px #8c8c8c;
                }

                .start-button:active {
                    box-shadow: 0px 1px #8c8c8c;
                }

                .error-container,
                .response-container {
                    margin-top: 1rem;
                    padding: 0.5rem;
                    background-color: #ffffff;
                    color: #333;
                    border-radius: 8px;
                    border: 2px solid #4b4b4b;
                    font-family: 'Courier New', Courier, monospace;
                }
            `}</style>
        </div>
    );
}

export default Vision;

