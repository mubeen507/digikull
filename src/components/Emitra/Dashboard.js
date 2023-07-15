import React from 'react'
import profilePhoto from '../../images/HRILogo.png'
const Dashboard = () => {
  return (
    <div>
      <div className='e-user-details'>
        <div className='e-user-left'>
          <img src={profilePhoto}></img>
        </div>
        <div className='e-user-right'></div>
      </div>
    </div>
  )
}

export default Dashboard