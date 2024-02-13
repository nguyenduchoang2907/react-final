import React from "react";
import ProductItem from "../../shared/components/product-items";
import { getProducts } from "../../services/Api";

const Home = () => {
        // Sử dụng state để lưu trữ sản phẩm nổi bật và sản phẩm mới nhất
    const [featuredProduct, setFeaturedProduct] = React.useState([]);
    const [lastestProduct, setLastestProduct] = React.useState([]);
    // Sử dụng useEffect để gọi API
    React.useEffect(() => {
        getProducts({        // Gọi API để lấy sản phẩm nổi bật với limit là 6

            params: {
                limit: 6,
                "filter[is_featured]": true,
            }  // SetFeaturedProduct sẽ cập nhật trạng thái với danh sách sản phẩm nổi bật

        }).then(({data}) => setFeaturedProduct(data.data.docs));
        // Dependency array trống, chỉ gọi useEffect 
        getProducts({
            params: {
                limit: 6,
            }
        }).then(({ data }) => {
            setLastestProduct(data.data.docs)
        });
    }, [])
//tác dụng khi Home dc gọi sẽ gọi Api để lấy sản phẩm nổi bật và sản phẩm mới nhát.
    return (
        <>
            {/*	Feature Product	*/}
            <div className="products">
                <h3>Sản phẩm nổi bật</h3>
                <div className="product-list card-deck">
                    {
                        featuredProduct.map((item) =>
                            <ProductItem item={item} />
                        )
                    }
                </div>
            </div>
            {/*	End Feature Product	*/}
            {/*	Latest Product	*/}
            <div className="products">
                <h3>Sản phẩm mới</h3>
                <div className="product-list card-deck">
                    {
                        lastestProduct.map((item) => 
                            <ProductItem item = {item} />
// Tạo một thành phần ProductItem với các props được truyền vào là key 
// (để định danh duy nhất cho React)  và item (chứa thông tin của sản phẩm).
                        )
                    }
                </div>
            </div>
            {/*	End Latest Product	*/}
        </>
    )
}
export default Home;