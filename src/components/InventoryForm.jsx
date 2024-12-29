import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createItem, editItemById } from "../store/actions";
const InventoryForm = ({ existingItem, onClose }) => {
  const dispatch = useDispatch();
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const [formData, setFormData] = useState({
    id: currentTimestamp,
    name: "",
    quantity: 0,
    price: 0,
    category: "",
    warrantyPeriod: "",
    size: "",
    material: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (existingItem) {
      setFormData(existingItem);
    }
  }, [existingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingItem) {
      dispatch(editItemById(formData));
    } else {
      dispatch(createItem(formData));
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {existingItem ? "Edit Item" : "Add Item"}
      </h2>
      <input
        disabled
        type="text"
        name="Id"
        value={formData.id}
        onChange={handleChange}
        placeholder="Item Id"
        required
        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Item Name"
        required
        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Grocery">Grocery</option>
        {/* Add more categories as needed */}
      </select>

      {/* Dynamically render additional fields based on selected category */}
      {formData.category === "Electronics" && (
        <input
          type="text"
          name="warrantyPeriod"
          value={formData.warrantyPeriod}
          onChange={handleChange}
          placeholder="warranty Period"
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {formData.category === "Clothing" && (
        <>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Size"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            placeholder="Material"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}
      {formData.category === "Grocery" && (
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 m-2 rounded hover:bg-blue-600 transition duration-200"
      >
        {existingItem ? "Update Item" : "Add Item"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-300 text-gray-700 p-2 m-2 rounded hover:bg-gray-400 transition duration-200"
      >
        Cancel
      </button>
    </form>
  );
};

export default InventoryForm;
