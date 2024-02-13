import { ADD_TO_CART, DELETE_CART, UPDATE_CART } from "../../shared/constants/action-type";
//????????????????????? 

// Trạng thái khởi tạo cho giỏ hàng
const initState = {
    items: [],// Mảng chứa các sản phẩm trong giỏ hàng
}

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = (state, payload) => {
    const items = state.items;// Lấy danh sách sản phẩm trong giỏ hàng từ state
    let isProductExist = false;// Biến kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    items.map((item) => {
        if(item._id === payload._id){
            item.qty += payload.qty;// Nếu sản phẩm đã tồn tại, tăng số lượng lên
            isProductExist = true;// Đặt cờ là true để biết rằng sản phẩm đã tồn tại trong giỏ hàng
        }
        return item;
    })
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào
    //condition ? expression1 : expression2

    // Lưu trạng thái giỏ hàng mới vào localStorage
    const newItems = isProductExist ? items : [...items, payload];
    localStorage.setItem("cart_items",JSON.stringify(newItems));
     // Trả về trạng thái mới của giỏ hàng với sản phẩm mới được thêm vào
     return {...state, items : newItems}
}

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
const updateCart = (state, payload) => {
    const items = state.items;// Lấy danh sách sản phẩm trong giỏ hàng từ state
    const { _id, qty } = payload;// Trích xuất thông tin sản phẩm và số lượng mới từ payload

    const newItems = items.map((item) => {
        if(item._id === _id){
            item.qty = qty;// Nếu sản phẩm có ID trùng khớp, cập nhật số lượng mới
        
        }
            // Trả về trạng thái mới của giỏ hàng với số lượng sản phẩm đã cập nhật

        return item;
    })

    return {...state, items: newItems}
}
// Reducer của giỏ hàng
//Reducer được sử dụng để xác định cách thức thay đổi trạng thái của ứng dụng dựa trên hành động được gửi.

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART: return addToCart(state, action.payload);// Thêm sản phẩm vào giỏ hàng
        case UPDATE_CART: return updateCart(state, action.payload);// Cập nhật số lượng sản phẩm trong giỏ hàng
        case DELETE_CART:
                    // Xóa sản phẩm khỏi giỏ hàng

            const newItems = state.items.filter((item) => item._id !== action.payload._id); 
            return {...state, items: newItems}// Trả về trạng thái mới của giỏ hàng sau khi xóa sản phẩm
            // Trong trường hợp hành động là DELETE_CART, reducer thực hiện việc xóa sản phẩm khỏi giỏ hàng bằng cách sử dụng phương thức filter trên mảng state.items.
            // Các sản phẩm có _id không trùng khớp với _id của sản phẩm trong action.payload sẽ được giữ lại, còn lại sẽ bị loại bỏ.
            // Sau đó, trả về một đối tượng mới, sao chép state hiện tại và cập nhật thuộc tính items bằng danh sách sản phẩm mới đã được lọc.
            default: return state;
    }
}