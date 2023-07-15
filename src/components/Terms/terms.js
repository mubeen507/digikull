import { useSelector } from "react-redux"
import './terms.scss'

const Terms = () => {
    const { storeData } = useSelector(state => state.store)
    const {termsAndConditions, msmeCertificate} = storeData.settings.termsAndConditions
    return (
        <div className="bg-con">
            <img src={termsAndConditions} alt="terms" className="terms" />
        </div>
    )
}

export default Terms