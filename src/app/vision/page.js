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
            setResponse(null);
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
                setResponse(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="gameboy-container">
            <div className="fake-buttons">
                <div className="button-a">A</div>
                <div className="button-b">B</div>
                <div className="button-dpad"></div>
            </div>
            <h1 className="gameboy-title">EcoDex Vision</h1>

            <div className="screen">
                {formik.values.image_url ? (
                    <img src={formik.values.image_url} alt="Image Preview" className="image-preview" />
                ) : (
                    <p className="screen-text">Waiting for URL...</p>
                )}
            </div>

            <form onSubmit={formik.handleSubmit} className="form-container">
                <textarea
                    name="image_url"
                    placeholder="Enter image URL"
                    value={formik.values.image_url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="textarea"
                    type="text"
                />
                {formik.touched.image_url && formik.errors.image_url && (
                    <div className="error-container">
                        <FaExclamationCircle /> {formik.errors.image_url}
                    </div>
                )}
                <button type="submit" className="start-button">
                    {loading ? <FaSpinner className="spinner" /> : "Camera"}
                </button>

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

                /* Fake Buttons */
                .fake-buttons {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .button-a, .button-b {
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

                /* Screen Area */
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

                .image-preview {
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

