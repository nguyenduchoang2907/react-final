import React from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-items";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
    // Trích xuất tham số tìm kiếm từ URL
    const [searchParams, setSearchParams] = useSearchParams();

     // Trích xuất tham số 'keyword' từ tham số tìm kiếm
     const keyword = searchParams.get("keyword");

    // Trạng thái để lưu trữ sản phẩm đã lấy được
    const [products, setProduct] = React.useState([]);

    // Trích xuất tham số 'page' từ tham số tìm kiếm hoặc mặc định là 1
    const page = searchParams.get("page") || 1;

    // Trạng thái để lưu trữ thông tin phân trang
    const [pages, setPages] = React.useState({
        limit: 12,
    });

    React.useEffect(() => {
        getProducts({
            params: {
                name: keyword,
                limit : 12,
                page: page
            }
        }).then(({ data }) => {
            // Cập nhật trạng thái với các sản phẩm và thông tin phân trang đã lấy được
            setPages({...pages, ...data.data.pages});
            setProduct(data.data.docs)
        });
    }, [keyword, page])

    return (
        <>
            <div>
                {/*	List Product	*/}
                <div className="products">
                    <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
                    <div className="product-list card-deck">
                        {
                            products.map((item) =>
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
export default Search;