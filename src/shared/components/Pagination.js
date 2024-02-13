import { useLocation, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Pagination = ({ pages }) => {
    
    // Destructure các thuộc tính phan trang
    const { limit, total, currentPage, next, prev, hasNext, hasPrev } = pages;

    const [searchParams, setSearchParams] = useSearchParams();

    // Sử dụng hook useLocation để lấy thông tin về địa chỉ URL hiện tại
    const { pathname, search } = useLocation();

    // Tính toán số trang dựa trên tổng số sản phẩm và số lượng sản phẩm trên mỗi trang
    const totalPages = Math.ceil(total / limit);


    const formatUrl = (page) => {
    // Kiểm tra xem có query parameter 'keyword' không
    if(searchParams.get('keyword')) return `${pathname}?keyword=${searchParams.get('keyword')}&page=${page}`;
        // Nếu có, thêm 'keyword' và 'page' vào URL
        return`${pathname}?page=${page}`
    }

    const renderPagesHtml = (delta = 2) => {
        let pagesHtml = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                i === currentPage ||
                (i >= left && i <= right)
            ) pagesHtml.push(i);
            else if (
                i === left - 1 ||
                i === right + 1
            ) pagesHtml.push("...");
        }
        return pagesHtml;
    }

    return (
        <ul className="pagination">
            {
                hasPrev && <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li>
            }
            {
                renderPagesHtml().map((value) => 
                    <li className={`page-item + ${currentPage===value && "active"}`} >
                        {
                            value==="..." 
                            ? <span className="page-link">{value}</span>
                            : <Link className="page-link" to={formatUrl(value)}>{value}</Link>
                        }
                    </li>
                )
            }
            {
                hasNext && <li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang sau</Link></li>
            }
        </ul>
    )
}

export default Pagination;