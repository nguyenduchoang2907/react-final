import React from "react";
import ProductItem from "../../shared/components/product-items";
import { getCategory, getProdctCategory } from "../../services/Api";
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from "../../shared/components/Pagination";
// Định nghĩa component  Category

const Category = () => {
        // Trạng thái để lưu trữ danh sách sản phẩm cho danh mục
    const [product, setProduct] = React.useState([]);
    // Trạng thái để quản lý chi tiết phân trang
    const [pages, setPages] = React.useState({
        limit: 12,
    });
    // Hook để lấy và quản lý tham số tìm kiếm URL??????????
    const [searchParams, setSearchParams] = useSearchParams();
  // Lấy tham số 'page' từ URL, mặc định là 1 nếu không có
    const page = searchParams.get("page") || 1;
    
    // Trạng thái để lưu trữ chi tiết của một sản phẩm
    const [productItem, setProductItem] = React.useState("");

    const params = useParams();

    const id = params.id;

    // Effect hook lấy dữ liệu theo 12 sản phẩm 1 trang
    React.useEffect(() => {
        getProdctCategory(id, {
            params: {
                limit: 12,
                page : page
            }
        }).then(({ data }) => {
              // Cập nhật trạng thái với các sản phẩm và chi tiết phân trang đã lấy

            setProduct(data.data.docs);//data là kết quả của một request API, và data.docs  là một mảng chứa danh sách các sản phẩm
            setPages({ ...pages, ...data.data.pages });
            //cập nhật trạng thái của component (product và pages) dựa trên dữ liệu được trả về từ một request AP
        });
                // Lấy chi tiết của danh mục hiện tại

        getCategory(id, {}).then(({ data }) => setProductItem(data.data));
    }, [id, page])

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <h3>{`${productItem.name} (hiện có ${product.length} sản phẩm)`}</h3>
                    <div className="product-list card-deck">
                        {
                            product.map((item) =>
                                <ProductItem item={item} />
                            )
                        }
                    </div>
                </div>
                {/*	End List Product	*/}
                <div id="pagination">
                    <Pagination pages={pages}/>
                </div>
            </div>

        </>
    )
}
export default Category;