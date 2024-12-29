import { combineReducers } from "redux";
import inventoryReducer from "./inventoryReducer";

const RootReducer = combineReducers({
  inventory: inventoryReducer,
});

export default RootReducer;
