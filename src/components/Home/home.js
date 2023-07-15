import { useState } from 'react';
import { useSelector } from 'react-redux';
import Category from '../Category/category'
import ProductItem from '../ProductItem/productItem'
import TeamMember from '../TeamMember/teamMember';
import { BsSearch, BsWhatsapp } from "react-icons/bs";
import Button from '../Button/button';
import noSearch from '../../images/noSearch.png'
import "./home.scss"

const Home = () => {
    const [activeTab, setActiveTab] = useState('')
    const [search, setSearch] = useState('')
    const { storeData } = useSelector((state) => state.store)
    const { categorys, products, settings } = storeData
    const visibilProducts = products.filter(each => each.productVisibility)
    const visibilCatagorys = categorys.filter(each => each.categoryVisibility)
    let activeTabProducts = []
    let searchResults = []
    let filteredCategorys
    if (search !== '') {
        searchResults = visibilProducts.filter(each => each.productName.toLowerCase().startsWith(search.toLowerCase()) || each.productCategory.toLowerCase().startsWith(search.toLowerCase()))
        filteredCategorys = visibilCatagorys.filter(each => each.categoryName.toLowerCase().startsWith(search.toLowerCase()))
    }
    else if (search === '' || visibilProducts.length !== 0) {
        activeTabProducts = visibilProducts.filter(each => each.productCategory.toLowerCase().startsWith(activeTab))
        searchResults = activeTabProducts
        filteredCategorys = visibilCatagorys
    }
    const { header, team, welcomeBanner, buttons, buttonsDiscription, buttonsImg } = settings
    const { phoneNumber, logo } = header
    let whatsappNumber = phoneNumber
    if (phoneNumber.startsWith("+")) {
        whatsappNumber = phoneNumber.slice(1)
    }
    const { bannerImages, welcomeTitle } = welcomeBanner

    const onClickCategory = (value) => {
        if (value === "all categorys") {
            setActiveTab("")
            setSearch('')
        } else {
            setActiveTab(value)
            setSearch('')
        }
    }

    return (
        <div>
            {bannerImages.length < 2 ? (<>
                {bannerImages[0] === '' || bannerImages.length === 0 ?
                    <div className='banner' style={{ backgroundImage: `url(https://res.cloudinary.com/aguruprasad/image/upload/v1670315929/woodline/product-images/Rectangle_35_f4ki6o.png)` }}>
                        <h1 className='banner-text'>{welcomeTitle}</h1>
                        <a href='#products' className='link'><button type="button" className="products-btn">Products</button></a>
                    </div>: <div className='banner' style={{ backgroundImage: `url(${bannerImages[0]})` }}>
                        <a href='#products' className='link'><button type="button" className="products-btn" style={{marginTop: '150%'}}>Products</button></a>
                    </div>}
            </>
                
            ) : (
                <div className='banner' >
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100 h-100" src={bannerImages[0]} alt="First slide"  />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={bannerImages[1]} alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100 h-100" src={bannerImages[2]} alt="Third slide" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <div className='detail'>
                        <a href='#products'><button type="button" className='btn'>Explore Products</button></a>
                    </div>
                </div>
            )}
            <div className='serch-bar-bg-container'>
                <div className='search-bar'>
                    <BsSearch className='search-icon' />
                    <input className='search' type='text' value={search} placeholder="Search for Products and Categories" onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <h1 className='categorys-heading'>Shop By Categories</h1>
            {filteredCategorys.length === 0 ? <div className='no-categorys'>- - No Categorys - -</div> : (
                <div id="products" className='categorys-container'>
                    <ul className='categorys'>
                        {filteredCategorys.map(eachCategory => <Category categoryData={eachCategory} activeTab={activeTab} onClickCategory={onClickCategory} key={eachCategory.categoryId} />)}
                    </ul>
                </div>)}
            <h1 className='categorys-heading'>Our Shop</h1>
            <div className='products-container'>
                {searchResults.length < 1 ? (
                    <div className='no-prducts-bg'>
                        <img src={noSearch} alt="no search" className='no-search-result' />
                        <h1 className='no-products-h'>
                            No Results Found
                        </h1>
                        <p className='no-products-p'>We couldn't find what you were looking for.</p>
                        <button type='button' className='search-again-btn' onClick={() => setSearch("")}>SEARCH AGAIN</button>
                    </div>
                ) : (
                    <ul className='products'>
                        {searchResults.map(eachProduct => <ProductItem productData={eachProduct} key={eachProduct.productId} />)}
                    </ul>
                )}

            </div>
            {team.length !== 0 && (
                <div className='team-bg-container'>
                    <h1 className='categorys-heading'>Meet Our Team</h1>
                    <ul className='team-container'>
                        {team.map(eachMember => <TeamMember memberData={eachMember} key={eachMember._id} />)}
                    </ul>
                </div>
            )}
            {buttons.length !== 0 && (
                <div className='btns-bg-container'>
                    <h1 className='buttons-heading'>Join the Conversation!</h1>
                    <div className='logo-buttons-container'>
                        <img src={buttonsImg ? buttonsImg : logo} alt="logo" className='buttons-container-img' />
                        <div className='description-btns-container'>
                            <p className='buttons-description'>{buttonsDiscription ? buttonsDiscription :
                                'We are a small brand dedicated to get the quality you deserve. From Our Sustainable Supply Chain, To Your Sustainable Wardrobe, We will Create Your Environmental Designs With Care.'}
                                <br /><br />
                                Now available on....
                            </p>
                            <ul className='buttons-container'>
                                {buttons.map(eachButton => <Button buttonData={eachButton} key={eachButton._id} />)}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            <a href={`https://wa.me/${whatsappNumber}`} rel="noreferrer" target='_blank' className="Whatsapp-link" ><BsWhatsapp className='Whatsapp-icon' /></a>
        </div>
    )
}

export default Home