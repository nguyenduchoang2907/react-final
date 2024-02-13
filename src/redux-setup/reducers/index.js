import { combineReducers } from "redux";
import cartReducer from "./cart";

// Kết hợp các reducer lại với nhau thành một rootReducer
export default combineReducers({
    Cart : cartReducer,// Gắn reducer của giỏ hàng vào phần trạng thái "Cart"
})