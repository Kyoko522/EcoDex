"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useRouter } from 'next/router';  // Import useRouter from Next.js
import { FaSpinner } from "react-icons/fa";

const Image = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [base64Image, setBase64Image] = useState("");  // State to store base64 image string
    const router = useRouter();  // Use Next.js useRouter hook

    // Function to convert image file to base64 string
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result);  // Store base64 string in state
        };
        if (file) {
            reader.readAsDataURL(file);  // Read the file as Data URL
        }
    };

    const formik = useFormik({
        initialValues: {
            image_url: "",  // For base64 image data
        },
        validationSchema: Yup.object({
            image_url: Yup.string().required("Image is required"),  // Validation for base64 image
        }),
        onSubmit: async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",  // Model info from the API documentation
                        messages: [
                            {
                                role: "user",
                                content: [
                                    { type: "text", text: "What’s in this image?" },
                                    { type: "image_url", image_url: { url: base64Image } },  // Send base64 string
                                ]
                            }
                        ],
                        max_tokens: 300
                    }),
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch the response');
                }

                const data = await res.json();
                setLoading(false);

                // Navigate to the /image page and pass base64Image and response via query parameters
                router.push({
                    pathname: '/image',
                    query: {
                        base64Image: base64Image,
                        response: JSON.stringify(data)  // You may need to stringify response if it's an object
                    },
                });
            } catch (error) {
                setError(error.message);  // Handle error if fetch fails
                setLoading(false);
            }
        },
    });

    return (
        <div>
            <h1>Image Analyzer</h1>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="file"
                    name="image_file"
                    accept="image/*"
                    onChange={handleImageUpload}  // Handle image file selection
                />
                <button type="submit" disabled={loading || !base64Image}>
                    {loading ? <FaSpinner className="spin" /> : "Submit"}
                </button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};

export default Image;