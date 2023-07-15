import './teamMember.scss'

const TeamMember = ({memberData}) =>{
    const { imgUrl, name, role } = memberData
    return(
        <li className="team-member-container">
            <div className="img-bg-container">
                {(imgUrl === '' || imgUrl === null || imgUrl === undefined) ? <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="about" className="about-img" /> : <img src={imgUrl} alt="about" className="about-img" />} 
            </div>
            <div className="member-details">
                {name !== '' ? <h1 className="member-name">{name}</h1> : <h1 className="member-name">- - NA - -</h1>}
                {role !== '' ? <p className="member-role">{role}</p> : <p className="member-role">- - NA - -</p>} 
            </div>
        </li>
    )
}

export default TeamMember