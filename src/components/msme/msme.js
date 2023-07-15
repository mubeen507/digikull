import { useSelector } from "react-redux"
import './msme.scss'

const Msme = () => {
    const { storeData } = useSelector(state => state.store)
    const {msmeCertificate} = storeData.settings.termsAndConditions
    return (
        <div className="bg-con">
            <img src={msmeCertificate} alt="msme" className="terms" />
        </div>
    )
}

export default Msme