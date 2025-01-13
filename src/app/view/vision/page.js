'use client';

import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import './vision.css';

function Vision({ userEmail }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef(null);

  // Defer rendering that depends on client-side only features
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      image_url: '',
      image_base64: '',
    },
    validationSchema: Yup.object({
      image_url: Yup.string()
        .url('Image URL is invalid')
        .required('Image URL is required when no image is captured'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const payload = capturedImage
          ? { base64_image: values.image_base64 }
          : { image_url: values.image_url };

        const res = await fetch('/api/vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
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

  // Only render after the component is mounted (to prevent SSR mismatches)
  if (!mounted) {
    return <div className="gameboy-container">Loading...</div>;
  }

  return (
    <div className="gameboy-container">
      <header className="gameboy-header">
        <h1 className="gameboy-title">EcoDex Vision</h1>
      </header>

      <section className="screen">
        {isFullScreen ? (
          <img
            src={capturedImage}
            alt="Full-Screen Captured"
            className="full-screen-image"
            onClick={() => setIsFullScreen(false)}
          />
        ) : cameraMode ? (
          <video ref={videoRef} className="video-feed" />
        ) : capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured"
            className="image-preview"
            onClick={() => setIsFullScreen(true)}
          />
        ) : formik.values.image_url ? (
          <img
            src={formik.values.image_url}
            alt="URL Preview"
            className="image-preview"
          />
        ) : (
          <p className="screen-text">Waiting for URL or Camera...</p>
        )}
      </section>

      <section className="form-section">
        <form onSubmit={formik.handleSubmit} className="form-container">
          {!cameraMode && !capturedImage && (
            <textarea
              name="image_url"
              placeholder="Enter image URL"
              value={formik.values.image_url || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="textarea"
            />
          )}

          <button type="button" onClick={() => setCameraMode(!cameraMode)} className="start-button">
            {cameraMode ? 'Close Camera' : 'Open Camera'}
          </button>

          {cameraMode && (
            <button type="button" onClick={() => handleCapture()} className="start-button">
              Capture Image
            </button>
          )}

          <button type="submit" disabled={loading || !formik.isValid} className="start-button">
            {loading ? <FaSpinner className="spinner" /> : 'Analyze'}
          </button>
        </form>
      </section>

      {error && (
        <section className="error-section">
          <div className="error-container">
            <FaExclamationCircle /> {error}
          </div>
        </section>
      )}

      {response && (
        <section className="response-container">
          <h2>Response:</h2>
          <p>{response.content}</p>
        </section>
      )}
    </div>
  );
}

export default Vision;