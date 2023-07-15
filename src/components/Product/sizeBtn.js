import { useEffect } from "react"
import { useSelector } from "react-redux"

const SizeBtn = ({BtnTxt, setActiveSize, setOutOfStock, active}) => {
    const classProp = (active !== BtnTxt) ? 'size-btn' : 'size-btn active'
    const urlArray = window.location.href.split('/')
    

    return(
        <button type="button" className={classProp} onClick={() =>  setActiveSize(BtnTxt)}>{BtnTxt}</button>
    )
}

export default SizeBtn