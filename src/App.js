import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {getSubdomains} from './fetchCalls/fetchRoutes';
import LoginSheredLayout from './components/Login/LoginLayout';
import LoginBtns from './components/Login/loginBtns';
import EmailLogin from './components/Login/EmailContainer';
import SignupSheredLayout from './components/SignUp/signupSheredLayout';
import SignupBtns from './components/SignUp/signupBtns';
import EmailSignup from './components/SignUp/signupContainer';
import Wishlist from './components/Wishlist/Wishlist';
import Loader from './components/Loading';
import Cart from './components/Cart/cart'
import './App.css';
import NotFound from './components/PageNotFound/pageNotFound';
import { useSelector } from 'react-redux';
import { intlFormatDistance } from "date-fns";
import Blocked from './components/blocked/blocked';
import { getStoreData } from './fetures/store/storeSlice';
import { useDispatch } from 'react-redux';
import LandingPage from './components/Emitra/LandingPage';
import Dashboard from './components/Emitra/Dashboard';
const  SharedLayout = React.lazy(() => import('./components/SharedLayout/sharedLayout')) ;
const Product = React.lazy(() => import('./components/Product/product'));
const Profile = React.lazy(() => import('./components/Profile/profile'));
const StaticHome = React.lazy(() => import('./components/StaticHomeComponents/StaticHome'));
const Home = React.lazy(() => import('./components/Home/home'));
const PrivacyPolicy = React.lazy(() => import('./components/StaticHomeComponents/PrivacyPolicy'));
const ContactUs = React.lazy(() => import('./components/StaticHomeComponents/Home/ContactUs'));
const Terms = React.lazy(() => import('./components/Terms/terms'));
const Msme = React.lazy(() => import('./components/msme/msme'));

let landingaPage = null

const host = window.location.host; // gets the full domain of the app
const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
if (arr.length > 0) landingaPage = arr[0];

const loadingConst = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failed: 'FAILED'
}

function App() {
	const [subdomain, setSubdomain] = useState();
  const [loadingStatus, setStatus] = useState('LOADING')
  const [subdomains, setSubdomains] = useState([])
  const { storeData } = useSelector((state) => state.store)
  let validity
  if (storeData !== null) {
    const { validTill } = storeData
    validity = validTill
  }
  const dispatch = useDispatch()
  let validUntill = 'in 1 day'
  if (validity) {
      validUntill = intlFormatDistance(
        new Date(validity),
        new Date(),
        { numeric: 'always', unit: 'day'}
      ).split(" ")[2]
     }

  const getSubdomainData = async () => {
    setStatus('LOADING')
    try{
      const subdomainsresponse = await getSubdomains()
      const subdomainsArray =  subdomainsresponse.data.response.map(each => each.subdomain)
      setSubdomains(subdomainsArray)
      setStatus('SUCCESS')
    }catch(e){
      setStatus('FAILED')
    }
  }

  const getDomainDetails = async () => {
    setStatus('LOADING')
    await getSubdomainData()
		const host = window.location.host; // gets the full domain of the app
		const arr = host
			.split(".")
			.slice(0, host.includes("localhost") ? -1 : -2);
    if (arr.length > 0) { dispatch(getStoreData(arr[0])); setSubdomain(arr[0]); };
  }

  useEffect(() => {
    if (landingaPage) {
      getDomainDetails()
    }
	}, []);

  const renderFailureView = () => (
        <div className='error-container'>
            <h1 className='error-h'>Something Was Wrong Please Tryagain</h1>
            <button type="button" className='try-again-btn' onClick={getSubdomainData} >Try Again</button>
        </div>
    )

    const renderSubdomains = () => {
      if(subdomains.includes(subdomain)){
        return (
          <React.Suspense fallback={<div className='loading-container'><Loader /></div>} >
            <Routes>
              {validUntill !== 'ago' ?
                <>
                  <Route path='/' element={<SharedLayout />} >
                    <Route index element={<Home />} />
                    <Route path='product/:id' element={<Product />} />
                    <Route path='profile' element={<Profile />} />
                  </Route>
                  <Route path='/wishlist' element={<Wishlist />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/login' element={<LoginSheredLayout />}>
                    <Route index element={<EmailLogin />} />
                    {/* <Route path='email' element={<EmailLogin />} /> */}
                  </Route>
                  <Route path='/signup' element={<SignupSheredLayout />}>
                    <Route index element={<EmailSignup />} />
                    {/* <Route path='email' element={<EmailSignup />} /> */}
                  </Route>
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/msme" element={<Msme />} />
                </> : <Route path='/*' element={<Blocked />} />}
          </Routes>
        </React.Suspense>
        )
      }else{
        return (<React.Suspense fallback={<div className='loading-container'><Loader /></div>} >
                  <Routes>
                    <Route path='/' element={<NotFound />} />
                  </Routes>
                </React.Suspense>)
      }
    }

  const renderSuccessView = () => {
    return (
      renderSubdomains()
    )
  }

  const renderLoadingView = () => (
        <div className='loading-container'>
            <Loader />
        </div>
    )

  const renderStore = () => {
        switch (loadingStatus) {
            case loadingConst.loading:
                return renderLoadingView()
            case loadingConst.success:
                return renderSuccessView()
            case loadingConst.failed:
                return renderFailureView()
            default:
                break;
        }
    }

  return (
    <>
      {!landingaPage ?  
      <React.Suspense fallback={<div className='loading-container'><Loader /></div>} >
        <Routes>
            <Route path='/'>
              <Route index element={<StaticHome  />} />
              <Route path='policy' element={<PrivacyPolicy />} />
              <Route path='contactus' element={<ContactUs />} />
              <Route path='emitra' element={<LandingPage />} />
              <Route path='emitra/dashboard' element={<Dashboard />} />

            </Route>
        </Routes>
      </React.Suspense>: renderStore()}
    </>
  )
}

export default App;
