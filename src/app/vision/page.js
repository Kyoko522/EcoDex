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
        <div>
            <h1>Image Analyzer</h1>
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    name="image_url"
                    placeholder="Enter image URL"
                    value={formik.values.image_url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.image_url && formik.errors.image_url && (
                    <div>{formik.errors.image_url}</div>
                )}
                <button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                    Submit
                </button>
            </form>
           
            {response && (
                <div>
                    <h2>Response:</h2>
                    <p>{response.content}</p>
                    <h2>Message should be above this</h2>
                </div>
            )}
            {formik.values.image_url && (
                <div>
                    <img src={formik.values.image_url} alt="Submitted Image Content" />
                </div>
            )}
        </div>
    );
}

export default Vision;
