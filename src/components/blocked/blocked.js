import BlockedImg from '../../images/blocked.png'
import './blocked.scss'

const Blocked = () => {
    return (
        <div className='blocked-con'>
            <img src={BlockedImg} alt="blocked" className='blocked-img' />
            <h1 className='blocked-h'>This Website is Blocked!</h1>
            <p className='blocked-p'>due to payment status this website is temporarily blocked</p>
        </div>
    )
}

export default Blocked