import './productImgTab.scss'

const ProductImgTab = (props) => {
    const {imgUrl, activeImg} = props
    const classValue = activeImg === imgUrl ? "tab-img active-img" : "tab-img"

    const onClickImg = () => {
       const {onClickActiveImg} = props
       onClickActiveImg(imgUrl)
    }

    return(
        <li onClick={onClickImg}>
            <img src={imgUrl} alt="image tab" className={classValue} />
        </li>
    )
}

export default ProductImgTab