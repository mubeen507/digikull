import mee from '../../images/meesho.png' 
import aji from '../../images/ajio.png'
import int from '../../images/int.png'
import amz from '../../images/Amazon.png'
import dhu from '../../images/dhu.png'
import fli from '../../images/flipkart.png'
import './button.scss'

const Button = props => {
    const {buttonData} = props
    const { buttonIcon, buttonText, buttonUrl } = buttonData
    const url = buttonUrl.startsWith('http') ? buttonUrl : `https://${buttonUrl}` 
    let icon
    switch (buttonIcon) {
        case "AMA":
            icon = amz
            break  
        case"MEE":
            icon = mee
            break  
        case "AJI":
            icon = aji
            break  
        case "INT":
            icon = int
            break
        case "DUK":
            icon = dhu
            break  
        case "FLI":
            icon = fli
            break    
        default:
            break;
    }
    return (
        <li className={`button-container ${(url === 'https://' && 'inactive')}`} >
            {url !== 'https://' ?
                <a href={url} target="_blank" rel="noreferrer" className='link'>
                    <button type="button" className='btn'>
                        <img src={icon} alt={buttonText} className="button-icon" />
                    </button>
                </a> :
                <div className='link'>
                    <button type="button" className='btn'>
                        <img src={icon} alt={buttonText} className="button-icon" />
                    </button>
                </div> }
        </li>
    )
}

export default Button