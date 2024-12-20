"use client";
import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { setImageUrl } from '../../../shared';
import './vision.css'

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
                setImageUrl(values.image_url);
                // console.log("Image URL passed to shared.js", values.image_url);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
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
                <a href="/view/admin" className="button-a">A</a>
                <a href="/" className='button-b'>B</a>
                <a className="button-c">C</a>
                <a href="./database" className="button-d">D</a>
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
        </div>
    );
}

export default Vision;