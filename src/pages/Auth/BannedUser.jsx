import { useNavigate } from 'react-router-dom'

import '../Auth/Auth.css'
import icon from '../../assets/icon.svg'

export const BannedUser = () => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/login')
    }

    return (
        <section className='auth-section'>
            <div className='auth-container-2'>
                <img className='login-logo' src={icon} alt='stack overflow' />
                <form onSubmit={handleSubmit} >
                    <h1 style={{ color: "red" }}>You have been banned!</h1>
                    <button className='auth-btn' type='submit'>Return to login page</button>
                </form>
            </div>
        </section>
    )
}
