/* eslint-disable react/prop-types */
import UserContext from './../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

function HeaderComp({ logout }) {
    const { user } = useContext(UserContext);
    console.log("desde context en header", user); // Cambia esto

    const isAuthenticated = user || localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    let headerContent;
    if (location.pathname === '/') {
        headerContent =
            <div className='flex items-center justify-between w-full'>
                <div className='font-medium'>Hola, {user ? user.firstName : 'Invitado'}</div>
                <div className='flex items-center gap-5'>
                    <div className='float-end flex-grow: 0;'>
                        {isAuthenticated && <button className='py-2 text-sm font-medium px-4 rounded-lg ml-auto bg-teal-900 text-[#CBFBF1]' onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </div>
    } else if (location.pathname === '/like_status') {
        headerContent = <h1>Like Status Page</h1>
    } else if (location.pathname.startsWith('/user_profile')) {
        headerContent =
            <div className='flex items-center justify-between w-full'>
                <div className='font-medium'>Hola, {user ? user.firstName : 'Invitado'}</div>
                <div className='flex items-center gap-5'>
                    <a href="/">Inicio</a>
                    <div className='float-end flex-grow: 0;'>
                        {isAuthenticated && <button className='py-2 text-sm font-medium px-4 rounded-lg ml-auto bg-teal-900 text-[#CBFBF1]' onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </div>
    } else {
        headerContent = <h1></h1>
    }

    return (
        <header className='w-full'>
            {headerContent}
        </header>
    );
}
export default HeaderComp;