import React, { useState } from 'react';
import "./Form.css"
import { Title } from '../Title/Title';

export const Form = ({ onSubmit, children, styleElement, title, classes = [] }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className={`form${classes !== [] && ` ${classes}`}`} style={styleElement}>
      {title && <Title title={title} styleElement={{ marginBottom: '1rem', fontSize: "24px" }} />}
      {children}
    </form>
  );
};

