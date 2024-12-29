import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItem } from "../store/actions";
import InventoryManager from "../components/InventoryManager";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalValue,
    sortField,
    sortOrder,
    filterCategory,
    filterPriceRange,
    filterStock,
    inventoryInfo,
  } = useSelector((state) => state.inventory);

  useEffect(() => {
    const handleFetchItems = () => {
      dispatch(
        fetchAllItem(
          filterCategory,
          filterPriceRange,
          sortField,
          sortOrder,
          filterStock
        )
      );
    };

    handleFetchItems();
  }, [
    filterCategory,
    filterPriceRange,
    sortField,
    sortOrder,
    filterStock,
    dispatch,
  ]);

  return (
    <div className="max-w mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Inventory Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(inventoryInfo).map(([name, value]) => (
          <div
            key={name}
            className="bg-gray-100 p-4 rounded-lg shadow-md text-center"
          >
            <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
            <div className="flex justify-center items-center">
              Items : <p className="text-gray-700">{value?.total}</p>
            </div>
            <div className="flex justify-center items-center">
              Total Value : <p className="text-gray-700">{value?.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-2 text-xl font-semibold mb-2">
        Total Value: <span className="text-green-600">{totalValue}</span>
      </h2>
      <InventoryManager />
    </div>
  );
};

export default Dashboard;
