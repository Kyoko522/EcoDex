"use client";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { setImageUrl } from "../../../shared";
import "./vision.css";

const Vision = () => {
  // State hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [cameraMode, setCameraMode] = useState(false); // Toggle camera
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      image_url: "", // Initial value for the URL field
    },
    validationSchema: Yup.object({
      image_url: Yup.string()
        .url("Image URL is Invalid")
        .required("Image URL is required when no image is captured"), // Ensure the URL is valid
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const payload = capturedImage
          ? { base64_image: capturedImage } // Send base64 image if captured
          : { image_url: values.image_url }; // Send URL if provided

        const res = await fetch("/api/vision", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch the response");
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

  // Toggle camera mode
  const handleCameraToggle = async () => {
    setError(null); // Clear error before toggling camera
    if (cameraMode) {
      // Turn off the camera and reset capturedImage
      setCameraMode(false);
      setCapturedImage(null); // Reset capturedImage when the camera is turned off
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    } else {
      // Turn on the camera
      setCameraMode(true);
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
    }
  };

  // Capture image
  const handleCapture = () => {
    setError(null); // Clear error before capturing image
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
    }
  };

  return (
    <div className="gameboy-container">
      {/* Navigation Buttons */}
      <section className="navigation-buttons">
        <div className="fake-buttons">
          <a href="/view/admin" className="button-a">A</a>
          <a href="/" className="button-b">B</a>
          <a className="button-c">C</a>
          <a href="./database" className="button-d">D</a>
        </div>
      </section>

      {/* Title */}
      <header className="gameboy-header">
        <h1 className="gameboy-title">EcoDex Vision</h1>
      </header>

      {/* Screen */}
      <section className="screen">
        {cameraMode ? (
          <video ref={videoRef} className="video-feed" />
        ) : capturedImage ? (
          <img src={capturedImage} alt="Captured" className="image-preview" />
        ) : formik.values.image_url ? (
          <img src={formik.values.image_url} alt="URL Preview not Found" className="image-preview" />
        ) : (
          <p className="screen-text">Waiting for URL or Camera...</p>
        )}
      </section>

      {/* Form */}
      <section className="form-section">
        <form onSubmit={formik.handleSubmit} className="form-container">
          {/* Show the URL field only when the camera is off and no image is captured */}
          {!cameraMode && !capturedImage && (
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
        </form>
      </section>

      {/* Error Message */}
      {error && (
        <section className="error-section">
          <div className="error-container">
            <FaExclamationCircle /> {error}
          </div>
        </section>
      )}

      {/* Response */}
      {response && (
        <section className="response-container">
          <h2>Response:</h2>
          <p>{response.content}</p>
        </section>
      )}
    </div>
  );
};

export default Vision;