import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: formData.price, // string, not number
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON", // must match test exactly
      },
      body: JSON.stringify(newPlant),
    })
      .then((r) => r.json())
      .then((data) => onAddPlant(data));

    setFormData({
      name: "",
      image: "",
      price: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Plant name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;
