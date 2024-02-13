import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createStore } from "redux";
import reducers from './reducers';
// Cấu hình persist cho redux store

const persistConfig = {
    key : "redux-store",// Key để lưu trữ trạng thái của redux store
    storage : storage,
    keyPrefix: "key"
}
// Tạo redux store với cấu hình persist

const store = createStore(persistReducer(persistConfig, reducers));
// Lưu trữ trạng thái của redux store qua thời gian
persistStore(store);
export default store;