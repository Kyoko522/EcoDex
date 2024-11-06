"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FaSpinner, FaExclamationCircle } from "react-icons/fa";

const Vision = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

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
            setResponse(null);  // Clear previous response
            // api calls for ai detection and response generators
            try {
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
                setResponse(data);  // Set new response
            } catch (error) {
                setError(error.message);  // Set error message if the fetch fails
            } finally {
                setLoading(false);  // Ensure loading is set to false when the operation is complete
            }
        },
    });

    return (
        <div className="container">
            <h1>EcoDex Vision</h1>
            <form onSubmit={formik.handleSubmit} className="form-container">
        
                {/* text area for the Image URL link */}
                <textarea
                    name="image_url"
                    placeholder="Enter image URL"
                    value={formik.values.image_url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="textarea"
                    type="text"
                />
                {/* checks if the text field has been interacted with */}
                {formik.touched.image_url && formik.errors.image_url && (
                    <div className="error-container">
                        <FaExclamationCircle /> {formik.errors.image_url}
                    </div>
                )}

                {/* Submit button */}
                <button type="submit" disabled={formik.isSubmitting || !formik.isValid} className="button">
                    {loading ? <FaSpinner className="spinner" /> : "Submit"}
                </button>
            
            {/* Error message if any */}
            {error && <div className="error-container">{error}</div>}

            {/* Image Preview */}
            {formik.values.image_url && (
                <div className="image-preview">
                    <img src={formik.values.image_url} alt="Submitted Image Content" />
                </div>
            )}
            </form>
            {/* Response Display */}
            {response && (
                <div className="response-container">
                    <h2>Response:</h2>
                    <p>{response.content}</p>
                </div>
            )}

            {/* Inline CSS Styles */}
            <style jsx>{`
                .container {
                    max-width: 600px;
                    margin: 2rem auto;
                    padding: 2rem;
                    background-color: #ff3b3f;
                    color: white;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    font-family: Arial, sans-serif;
                    text-align: center;
                }

                .form-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem;
                    background-color: #fff;
                    color: #333;
                    border-radius: 8px;
                }

                .textarea {
                    width: 100%;
                    padding: 0.5rem;
                    border: 2px solid #ff3b3f;
                    border-radius: 5px;
                }

                .button {
                    background-color: #333;
                    color: #fff;
                    padding: 0.7rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.3s;
                }

                .button:hover {
                    background-color: #222;
                }

                .error-container,
                .response-container {
                    margin-top: 1rem;
                    padding: 1rem;
                    background-color: #fff;
                    color: #333;
                    border-radius: 8px;
                }

                .image-preview img {
                    max-width: 100%;
                    border: 2px solid #333;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
}

export default Vision;
