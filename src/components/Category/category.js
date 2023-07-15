import undefined from '../../images/undefined.png'
import './category.scss'

const Category = ({categoryData, onClickCategory, activeTab}) => {
    const {categoryImg, categoryName} = categoryData
    const containerClassValue = ((activeTab === categoryName.toLowerCase()) || (activeTab === "" && categoryName === "All Categorys")) ? "category-container active" : "category-container"
    const classValue = ((activeTab === (categoryName.toLowerCase())) || (activeTab === "" && categoryName === "All Categorys")) ? "category-img active" : "category-img"
    
    const onClick = () => {
        onClickCategory(categoryName.toLowerCase())
    }

    return(
        <li className={containerClassValue} onClick={onClick}>
            {categoryImg ? <img src={categoryImg} alt="category" className={classValue} /> : <img src={undefined} alt="category" className={classValue} /> } 
            <p className="category">{categoryName.length > 12 ? `${categoryName.toUpperCase().slice(0, 12)}..` : categoryName.toUpperCase()}</p>
        </li>
    )
}

export default Category