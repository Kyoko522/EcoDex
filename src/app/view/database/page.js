"use client";

import { useState } from "react";
import "./database.css"; // Import the CSS file

export default function Database() {
  const [message, setMessage] = useState("This is a placeholder for the Database Page!");

  return (
    <div className="container">
      <h1 className="title">EcoDex Database</h1>
      <p className="description">
        Welcome to the EcoDex database page. Here you can find a collection of analyzed plants and bugs.
      </p>

      {/* Placeholder Message */}
      <div className="message-box">
        <p>{message}</p>
      </div>

      {/* Navigation Back */}
      <a href="/" className="back-button">
        Back to Home
      </a>

      {/* Placeholder for Future Features */}
      <section className="coming-soon">
        <h2>Coming Soon!</h2>
        <p>This page will display all the data saved from your image analyses.</p>
      </section>
    </div>
  );
}