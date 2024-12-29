import { toast } from "react-toastify";
import axios from "axios";

export const GET_ALL_ITEM = "GET_ALL_ITEM";
export const SET_LOADING = "SET_LOADING";
export const SET_FILTER_CATEGORY = "SET_FILTER_CATEGORY";
export const SET_FILTER_STOCK = "SET_FILTER_STOCK";
export const SET_FILTER_PRICE_RANGE = "SET_FILTER_PRICE_RANGE";
export const SET_SORT_FIELD = "SET_SORT_FIELD";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const fetchAllItem =
  (filterCategory, filterPriceRange, sortField, sortOrder, filterStock) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const params = {};
      if (filterCategory) {
        params.category = filterCategory;
      }
      if (filterPriceRange && filterPriceRange?.max) {
        params.price_lt = filterPriceRange.max;
      }
      if (filterPriceRange && filterPriceRange?.min) {
        params.price_gt = filterPriceRange.min;
      }
      if (sortField) {
        params.sortField = sortField;
      }
      if (sortOrder) {
        params.sortOrder = sortOrder;
      }
      if (filterStock) {
        params.stock = filterStock;
      }

      await api.get("/inventory", { params }).then((res) => {
        dispatch(getAllItems(res?.data));
        dispatch(setLoading(false));
      });
    } catch (err) {
      console.error({ err });
      toast.error(err?.response?.data?.message || err?.message);
      dispatch(setLoading(false));
    }
  };

export const editItemById = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await api.put(`/inventory/${data._id}`, data).then((res) => {
      console.log({ res });
      toast.success(res?.data?.message);
      dispatch(fetchAllItem());
    });
  } catch (err) {
    console.error({ err });
    dispatch(setLoading(false));
  }
};

export const createItem = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await api.post("/inventory/create", data).then((res) => {
      toast.success(res?.data?.message);
      dispatch(fetchAllItem());
    });
  } catch (err) {
    console.error({ err });
    dispatch(setLoading(false));
  }
};

export const deleteItem = (data) => async (dispatch) => {
  try {
    const { _id } = data;
    dispatch(setLoading(true));
    await api.delete(`/inventory/${_id}`).then((res) => {
      toast.success(res?.data?.message);
      dispatch(fetchAllItem());
    });
  } catch (err) {
    console.error({ err });
    dispatch(setLoading(false));
  }
};

export const getAllItems = (id) => ({
  type: GET_ALL_ITEM,
  payload: id,
});

export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
});

// ============ filter ===============

export const setFilterCategory = (data) => ({
  type: SET_FILTER_CATEGORY,
  payload: data,
});

export const setFilterPriceRange = (data) => ({
  type: SET_FILTER_PRICE_RANGE,
  payload: data,
});

export const setFilterStock = (data) => ({
  type: SET_FILTER_STOCK,
  payload: data,
});

// =================== sort===============

export const setSortField = (data) => ({
  type: SET_SORT_FIELD,
  payload: data,
});

export const setSortOrderBy = (data) => ({
  type: SET_SORT_ORDER,
  payload: data,
});
