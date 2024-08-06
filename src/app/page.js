"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function Home() {
  const [ loading, setLoading ] = useState(false);
  const [error, setError] = useState(null);
  const [ response, setResponse ] = useState(null);
//form 
const formik = useFormik({
  initialValues: {
      image_url: "",
  },
  validationSchemes: Yup.object({
      image_url: Yup.string().url("Image URL is Invalid").required("Image URL is required"),
  }),
})
return (
  <div>
      <h1>Image</h1>
      <form>
          <textarea name = "img_url" placeholder = "Enter image URL" value = {formik.values.image_url} onChange = {formik.handleChange} onBlur = {formik.handleBlur} />
      </form>
  </div>
)
}