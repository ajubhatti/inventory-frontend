import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  setFilterCategory,
  setFilterPriceRange,
  setFilterStock,
  setSortField,
  setSortOrderBy,
} from "../store/actions";
import InventoryForm from "./InventoryForm";
import FilterComponent from "./FilterComponent";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InventoryManager = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading } = useSelector((state) => state.inventory);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    dispatch(deleteItem(item));
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleFilter = (filterCriteria) => {
    const { category, priceRange, sortBy, sortOrder, stock } = filterCriteria;
    category && dispatch(setFilterCategory(category));
    priceRange && dispatch(setFilterPriceRange(priceRange));
    sortOrder && dispatch(setSortOrderBy(sortOrder));
    sortBy && dispatch(setSortField(sortBy));
    stock && dispatch(setFilterStock(stock));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory_report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Item Name", "Category", "Price", "Quantity"];
    const tableRows = [];

    filteredItems.forEach((item) => {
      const itemData = [
        item.id,
        item.name,
        item.category,
        item.price,
        item.quantity,
      ];
      tableRows.push(itemData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Inventory Report", 14, 15);
    doc.save("inventory_report.pdf");
  };

  return (
    <div className="p-6">
      <button
        onClick={handleAddItem}
        className="bg-green-500 text-white p-2 rounded mb-4"
      >
        Add New Item
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <InventoryForm
            existingItem={selectedItem}
            onClose={handleCloseForm}
          />
        </div>
      )}

      <div className="pt-6">
        <FilterComponent onFilter={handleFilter} />
        <div className="mb-2">
          <button
            onClick={exportToPDF}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Export to PDF
          </button>
          <button
            onClick={exportToExcel}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Export to Excel
          </button>
        </div>
        {loading && <p>Loading...</p>}
        <div className="overflow-x-auto" id="printableArea">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Item Name</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{item?.id}</td>
                  <td className="py-3 px-6">{item?.name}</td>
                  <td className="py-3 px-6">{item?.category}</td>
                  <td className="py-3 px-6">${item?.price}</td>
                  <td className="py-3 px-6">
                    {item.quantity <= 5 ? (
                      <span className="font-bold">
                        {item?.quantity} - Low Quantity
                      </span>
                    ) : (
                      item?.quantity
                    )}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleEditItem(item)}
                      className="bg-blue-500 m-1 text-white p-1 rounded hover:bg-red-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="bg-red-500 m-1 text-white p-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
