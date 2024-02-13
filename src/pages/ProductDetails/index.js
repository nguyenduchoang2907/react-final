import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createCommnetsProduct, getCommentByProduct, getProduct } from "../../services/Api";
import { getImageProduct } from "../../shared/ultils";
import { format } from "date-fns";
import Pagination from "../../shared/components/Pagination";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/action-type";
import moment from "moment/moment";

const ProductDetails = () => {
    const id = useParams().id;

       // State để lưu trữ chi tiết sản phẩm
    const [product, setProduct] = React.useState("");

       // State để quản lý các bình luận liên quan đến sản phẩm
     const [commnet, setComment] = React.useState([]);
    // State để quản lý thông tin phân trang
    const [pages, setPages] = React.useState({
        limit : 10,
    })
    // Hook để xử lý các tham số tìm kiếm trong URL
    const [searchParams, setSearchParams] = useSearchParams();
    // State để quản lý thông tin đầu vào trong biểu mẫu bình luận

    const [inputComment, setInputComment] = React.useState([]);

    // Trang hiện tại dựa trên tham số tìm kiếm hoặc mặc định là 1
    const page = searchParams.get("page") || 1;

     // Hàm để định dạng giá thành tiền Việt
     const fomatPrice = (price) => {
        const roundPrice = Math.ceil(price / 1000) * 1000;
        return roundPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }

    // Xử lý thay đổi đầu vào trong biểu mẫu bình luận
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputComment({ ...inputComment, [name]: value });
    }

    // Xử lý gửi bình luận mới
    const onSubmitComment = (e) => {
        e.preventDefault();
        createCommnetsProduct(id, inputComment, {}).then(({ data }) => {
            if (data.status == "success") setInputComment("");
            getCommnet(id)
        });
    }

    // Hàm để lấy bình luận dựa trên sản phẩm hiện tại và trang
    const getCommnet = (id) => {
        getCommentByProduct(id, {
            params : {
                page : page
            }
        }).then(({ data }) => {
             // Cập nhật các bình luận và thông tin phân trang
             setComment(data.data.docs);
            setPages({...pages, ...data.data.pages})
        })
    }

    // Hiệu ứng để lấy chi tiết sản phẩm và bình luận khi 'id' hoặc 'page' thay đổi
    React.useEffect(() => {
        // Lấy chi tiết sản phẩm dựa trên 'id'
        getProduct(id, {}).then(({ data }) => {
            // Cập nhật chi tiết sản phẩm
            setProduct(data.data);
        });
        // Lấy bình luận cho sản phẩm và trang hiện tại
        getCommnet(id);
    }, [id, page]);

    // Hook Redux để gửi các hành động
    const dispatch = useDispatch();

    // Hook để điều hướng theo chương trình
    const navigate = useNavigate();

    // Hàm để thêm sản phẩm hiện tại vào giỏ hàng
    const addToCart = (type) => {
        if(product) {
            const {_id, name, image} = product;
            const price = Math.ceil(product.price/1000)*1000;
            // Gửi hành động 'ADD_TO_CART' với chi tiết sản phẩm
            dispatch ({
                type : ADD_TO_CART,
                payload : {
                    _id,
                    name,
                    price,
                    image,
                    qty : 1,
                }
            });
        }
        if(type==="buy-now") return navigate("/Cart");
    }

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div id="product">
                    <div id="product-head" className="row">
                        <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                            <img src={getImageProduct(product.image)} />
                        </div>
                        <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                            <h1>{product.name}</h1>
                            <ul>
                                <li><span>Bảo hành:</span> 12 Tháng</li>
                                <li><span>Đi kèm: </span> {product.accessories}</li>
                                <li><span>Tình trạng:</span> {product.status} </li>
                                <li><span>Khuyến Mại:</span> {product.promotion} </li>
                                <br />
                                <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                                <li id="price-number"> {fomatPrice(product.price)} </li>
                                <li id="status">{product.is_stock ? "Còn hàng" : "Hết hàng"}</li>
                            </ul>
                            <div id="add-cart">
                                <button onClick={()=>addToCart("buy-now")} className="btn btn-warning mr-2">
                                    Mua ngay
                                </button>

                                <button onClick={addToCart} className="btn btn-info">
                                    Thêm vào giỏ hàng
                                </button>
                            </div>

                        </div>
                    </div>
                    <div id="product-body" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Đánh giá về {product.name}</h3>
                            <p>
                                {product.details}
                            </p>
                        </div>
                    </div>
                    {/*	Comment	*/}
                    <div id="comment" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3>Bình luận sản phẩm</h3>
                            <form method="post">
                                <div className="form-group">
                                    <label>Tên:</label>
                                    <input onChange={onChangeInput} name="name" required type="text" className="form-control" value={inputComment.name || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input onChange={onChangeInput} name="email" required type="email" className="form-control" id="pwd" value={inputComment.email || ""} />
                                </div>
                                <div className="form-group">
                                    <label>Nội dung:</label>
                                    <textarea onChange={onChangeInput} name="content" required rows={8} className="form-control" defaultValue={""} value={inputComment.content || ""} />
                                </div>
                                <button onClick={onSubmitComment} type="submit" name="sbm" className="btn btn-primary">Gửi</button>
                            </form>
                        </div>
                    </div>
                    {/*	End Comment	*/}
                    {/*	Comments List	*/}
                    <div id="comments-list" className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            {
                                commnet.map((item) =>
                                    <div className="comment-item">
                                        <ul>
                                            <li><b>{item.name}</b></li>
                                            {/* <li>{format(new Date(item.updatedAt), 'yyyy-MM-dd HH:mm:ss')}</li> */}
                                            <li>{moment(new Date(item.updatedAt)).fromNow()}</li>
                                            <li>
                                                <p>{item.content}</p>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {/*	End Comments List	*/}
                </div>
                {/*	End Product	*/}
                <div id="pagination">
                    <Pagination pages={pages}/>
                </div>
            </div>

        </>
    )
}
export default ProductDetails;