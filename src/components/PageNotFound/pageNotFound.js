import notFound from '../../images/notFound.jpg'
import './pageNotFound.scss'

const NotFound = () => {
    return (
        <div className='not-found-bg'>
            <img src={notFound} alt="not found" className="notFound" />
            <h1 className='not-f-heading'>Try any other Store..</h1>
            <p className='not-f-description'>Sorry to say we don't found any store data relevant to this URL..</p>
        </div>
    )
}

export default NotFound