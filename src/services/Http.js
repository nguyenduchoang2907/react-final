import axios from "axios";
import { BASE_API } from "../shared/constants/app";
// Tạo một instance của axios với baseURL là địa chỉ cơ sở của API

const Http = axios.create({
    baseURL: BASE_API,
});

export default Http;

// Axios là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js.
// Tạo XMLHttpRequests từ trình duyệt
// Thực hiện các http request từ node.js
// Hỗ trợ Promise API
// chặn request và response
// Chuyển đổi dữ liệu request và response
// Hủy requests
// Tự động chuyển đổi về dữ liệu JSON
// Hỗ trợ phía client để chống lại XSRF