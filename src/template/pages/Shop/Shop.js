import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import ModalAddtoCart from "../../layout/modal/ModalAddtoCart"
import ProductService from '../../../service/ProductService';
import ReactPaginate from 'react-paginate';
import './Shop.css'
function Shop() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 12;

    const [showPopup, setShowPopup] = useState(false);
    const [product_id, setProduct_id] = useState();
    const openModal = (productId) => {
        console.log(productId);
        setShowPopup(true, productId);
        setProduct_id(productId)
    }
    const closeModal = () => {
        setShowPopup(false);
    }
    useEffect(() => {
        ProductService.getAllProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const pageCount = Math.ceil(products.length / productsPerPage);
    const displayProducts = products
        .slice(pageNumber * productsPerPage, (pageNumber + 1) * productsPerPage)
        .map((product) => (
            <div className="col-lg-4" key={product.id}>
                <div className='main_home'>
                    <div className="card" style={{ width: "100%" }}>
                        <img src={product.image} className="card-img-top" alt="Product" />
                        <div className="card-body">
                            <Link to={`/detail/${product.id}`}>{product.nameProduct}</Link>
                            <p className="card-text">{product.description}</p>
                            <p className="card-text">{new Intl.NumberFormat('vn-VN').format(product.price)}<span>đ</span></p>
                            <div className="add_to_cart">
                                <button onClick={() => openModal(product.id)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalAddtoCart showPopup={showPopup} handleClose={closeModal} product_id={product_id} />
            </div>
        ));
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <>
            <div className='title_shop'>
                <hr width="35%" align="center" color='black' />
                <p>THE COLLECTION</p>
                <hr width="35%" align="center" color='black' />
            </div>
            <div className="list_product">
                <div className="row">
                    {displayProducts}
                </div>
            </div>
            <div className="pagination">
                <ReactPaginate
                    previousLabel={
                        <span
                            dangerouslySetInnerHTML={{
                                __html:
                                    '<i className="fa-regular fa-hand-point-right fa-flip-horizontal"></i>',
                            }}
                        />
                    }
                    nextLabel={
                        <span
                            dangerouslySetInnerHTML={{
                                __html: '<i className="fa-regular fa-hand-point-right"></i>',
                            }}
                        />
                    }
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination-container"}
                    previousLinkClassName={"previous-button"}
                    nextLinkClassName={"next-button"}
                    disabledClassName={"pagination-disabled"}
                    activeClassName={"pagination-active"}
                />
            </div>
        </>
    )
}
export default Shop;