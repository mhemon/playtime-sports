import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import sun from '../../../assets/icons/sun.png'
import moon from '../../../assets/icons/moon.png'
import { AttentionSeeker, Fade, Slide } from 'react-awesome-reveal';
import useAuth from '../../../hook/useAuth';
import Swal from 'sweetalert2';
import { FaSignOutAlt } from 'react-icons/fa'
import useAdmin from '../../../hook/useAdmin';
import useInstructor from '../../../hook/useInstructor';
import useCart from '../../../hook/useCart';

const Navbar = () => {
    const { user, logout, theme, setTheme } = useAuth()
    const [cart] = useCart()
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const navigate = useNavigate()

    // update state on toggle
    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        // add custom data-theme attribute to html tag required to update theme using DaisyUI
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);


    // logout
    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/')
            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: `${error.code}`,
                    text: `${error.message}`
                })
            })
    }

    const navItems = <>
        <Fade cascade duration={500}>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/instructors'>Instructors</NavLink></li>
            <li><NavLink to='/classes'>Classes</NavLink></li>
            {user && <li><NavLink to={isAdmin ? '/dashboard/manage-users' : isInstructor ? '/dashboard/my-classes' : '/dashboard/selected-classes'}>Dashboard</NavLink></li>}
            {!user && <li><NavLink to='/login'>Login</NavLink></li>}
        </Fade>
    </>
    return (
        <div className={`navbar sticky z-10 ${theme === 'dark' ? 'dark-mode bg-slate-700' : 'bg-base-100'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Fade cascade direction='left'>
                    <Link to='/' className="btn btn-ghost normal-case text-xl single-line-text">PlayTime Sports</Link>
                </Fade>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user && <>
                    <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                        <Link to={isAdmin ? '/dashboard/manage-users' : isInstructor ? '/dashboard/my-classes' : '/dashboard/selected-classes'}><div className="avatar hidden md:block">
                            <div className="relative">
                                {cart.length > 0 && (
                                    <div className="absolute -bottom-3 -left-2 transform translate-x-1/2 -translate-y-1/2">
                                        <span className="inline-flex items-center justify-center w-4 h-4 bg-red-500 text-white rounded-full text-xs">
                                            {cart.length}
                                        </span>
                                    </div>
                                )}
                                <div className="w-10 me-2 rounded-full overflow-hidden">
                                    <img src={user?.photoURL} alt="User Avatar" />
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className='tooltip tooltip-bottom' data-tip="Logout">
                        <button onClick={handleLogout} className="btn btn-square btn-ghost w-12 h-12">
                            <FaSignOutAlt size='2em' />
                        </button>
                    </div>
                </>}
                <div className='flex-none'>
                    <div className='tooltip tooltip-left' data-tip="Change Theme">
                        <button className="btn btn-square btn-ghost">
                            <label className="swap swap-rotate w-12 h-12">
                                <input type="checkbox"
                                    onChange={handleToggle}
                                    // show toggle image based on localstorage theme
                                    checked={theme === "light" ? false : true}
                                />
                                {/* light theme sun image */}
                                <img src={sun} alt="light" className="w-8 h-8 swap-on" />
                                {/* dark theme moon image */}
                                <img src={moon} alt="dark" className="w-8 h-8 swap-off" />
                            </label>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;