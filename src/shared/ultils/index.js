import { BASE_URL } from "../constants/app"
// Hàm getImageProduct nhận vào tên của file ảnh sản phẩm và trả về đường dẫn đầy đủ tới ảnh đó

export const getImageProduct = (imgName)  => {
    return `${BASE_URL}/assets/uploads/products/${imgName}`;
}//?
