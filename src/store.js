import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { productsReducer } from "./reducers/productsReducer";
import { filterReducer } from "./reducers/filterReducer";
import { orderReducer } from "./reducers/orderReducer";
import { adminOrdersReducer } from "./reducers/adminOrdersReducer";
const { compose, createStore, combineReducers, applyMiddleware } = require("redux");

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        products: productsReducer,
        cart: cartReducer,
        filter: filterReducer,
        order: orderReducer,
        adminOrders: adminOrdersReducer,
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;