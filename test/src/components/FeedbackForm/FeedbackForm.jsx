import React, { useState } from "react";
import "./FeedbackForm.css";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm({ ...formData, [name]: value });
  };
  const validateForm = (data) => {
    const { firstName, lastName, phone, email, comment } = data;
    const valid =
      firstName.trim() &&
      lastName.trim() &&
      phone.trim() &&
      email.includes("@") &&
      comment.length > 5;
    setIsValid(valid); 
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setSuccessMessage("Form müvəffəqiyyətlə göndərildi!");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        comment: "",
      });
      setIsValid(false);
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      setSuccessMessage("Formada səhv var. Zəhmət olmasa düzgün məlumat daxil edin.");
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Feedback Formu</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ad:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Adınızı daxil edin"
            required
          />
        </div>
        <div className="form-group">
          <label>Soyad:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Soyadınızı daxil edin"
            required
          />
        </div>
        <div className="form-group">
          <label>Telefon:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefon nömrənizi daxil edin"
            required
          />
        </div>
        <div className="form-group">
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mailinizi daxil edin"
            required
          />
        </div>
        <div className="form-group">
          <label>Şərh:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Şərhinizi yazın"
            required
          ></textarea>
        </div>
        <button type="submit" disabled={!isValid}>
          Göndər
        </button>
      </form>
    </div>
  );
}
