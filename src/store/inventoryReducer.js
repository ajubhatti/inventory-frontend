import {
  GET_ALL_ITEM,
  SET_FILTER_CATEGORY,
  SET_FILTER_STOCK,
  SET_FILTER_PRICE_RANGE,
  SET_SORT_FIELD,
  SET_SORT_ORDER,
} from "./actions";

const initialState = {
  loading: false,
  totalValue: 0,
  categoryCounts: {},
  items: [],
  item: {},
  sortField: "id",
  sortOrder: "desc",
  filteredItems: [],
  inventoryInfo: {},
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ITEM:
      return {
        ...state,
        items: action?.payload?.allItems,
        totalValue: action?.payload?.totalValue,
        inventoryInfo: action?.payload?.inventoryInfo,
        filteredItems: action?.payload?.filteredData,
      };

    case SET_FILTER_CATEGORY:
      return { ...state, filterCategory: action.payload };

    case SET_FILTER_PRICE_RANGE:
      return { ...state, filterPriceRange: action.payload };

    case SET_FILTER_STOCK:
      return { ...state, filterStock: action.payload };

    case SET_SORT_FIELD:
      return { ...state, sortField: action.payload };

    case SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };

    default:
      return state;
  }
};

export default inventoryReducer;
