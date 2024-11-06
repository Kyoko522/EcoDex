"use client";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function Home() {

return (
  <div>
      <h1>This is the homepage</h1>
      <p>To go to the vision page add /vision behind the url</p>
  </div>
)
}