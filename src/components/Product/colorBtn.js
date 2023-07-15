const ColorBtn = ({colorCode, active, setOutOfStock, activeSize, onClickColor}) => {
    const classProp = (active === colorCode) ? 'color-btn active' : 'color-btn'

    return(
        <button type="button" style={{backgroundColor: colorCode}} className={classProp} onClick={() => onClickColor(colorCode)}></button>
    )
}

export default ColorBtn