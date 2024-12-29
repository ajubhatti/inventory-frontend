import { useState } from "react";

const FilterComponent = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("id");
  const [stock, setStock] = useState("");

  const handleReset = () => {
    setCategory("");
    setPriceRange({ min: "", max: "" });
    setSortOrder("desc");
    setSortBy("id");
    setStock("");
    handleApply();
  };

  const handleApply = () => {
    onFilter({
      category,
      priceRange,
      sortOrder,
      sortBy,
      stock,
    });
  };

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Filter Items</h2>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Grocery">Grocery</option>
          <option value="Clothing">Clothing</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: e.target.value })
          }
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: e.target.value })
          }
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
        >
          <option value="id">Sort by Id</option>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Filter
        </button>
        <button
          onClick={() => handleReset()}
          className="bg-green-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
