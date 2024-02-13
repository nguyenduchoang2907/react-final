import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const [keyWord , setKeyWord] = React.useState("");

    // Xử lý sự kiện khi người dùng thay đổi từ khóa tìm kiếm
    const onChangeKeyWord = (e) => setKeyWord(e.target.value);

    const navigate = useNavigate();

    const onCLickSubmit = (e) => {
        e.preventDefault();
        navigate(`/Search?keyword=${keyWord}`);
        setKeyWord("");// Đặt lại giá trị của từ khóa về rỗng
    }

    // Sử dụng useSelector từ react-redux để lấy thông tin giỏ hàng từ store
    const totalCart = useSelector(({Cart})=>{
        // Tính tổng số lượng sản phẩm trong giỏ hàng
        return Cart.items.reduce((total, item)=>total + item.qty, 0);
    });
    
 
    return (
        <>
            {/*	Header	*/}
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
                            <h1><Link to="/"><img className="img-fluid" src="images/logo.png" /></Link></h1>
                        </div>
                        <div id="search" className="col-lg-6 col-md-6 col-sm-12">
                            <form method="GET" className="form-inline">
                                <input onChange={onChangeKeyWord} className="form-control mt-3" type="search" placeholder="Tìm kiếm" aria-label="Search" value={keyWord} />
                                <button onClick={onCLickSubmit} className="btn btn-danger mt-3" type="submit" >Tìm kiếm</button>
                            </form>
                        </div>
                        <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
                            <Link className="mt-4 mr-2" to="/Cart">giỏ hàng</Link><span className="mt-3">{totalCart}</span>
                        </div>
                    </div>
                </div>
                {/* Toggler/collapsibe Button */}
                <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
            {/*	End Header	*/}
        </>
    )
}
export default Header;