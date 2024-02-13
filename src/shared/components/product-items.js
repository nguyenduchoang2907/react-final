import { Link } from "react-router-dom";
import { getImageProduct } from "../ultils";

const ProductItem = ({ item }) => {
    const fomatPrice = (price) => {
        const roundPrice = Math.ceil(price/1000)*1000;
        return roundPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
    }

    return (
        <div className="product-item card text-center">
            <Link to={`/ProductDetails-${item._id}`}><img src={getImageProduct(item.image)} /></Link>
            <h4><Link to={`/ProductDetails-${item._id}`}>{item.name}</Link></h4>
            <p>Giá Bán: <span>{fomatPrice(item.price)}</span></p>
        </div>
    )
}

export default ProductItem;