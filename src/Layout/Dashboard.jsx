import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import useAdmin from '../hook/useAdmin';
import { ImUsers } from "react-icons/im";
import { FaHome } from 'react-icons/fa';
import { SiGoogleclassroom } from "react-icons/si";
import useInstructor from '../hook/useInstructor';
import { GiTeacher } from "react-icons/gi";
import useAuth from '../hook/useAuth';

const Dashboard = () => {
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const { user } = useAuth()
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-2">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    <GiHamburgerMenu />
                </label>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-72 h-full bg-base-200 text-base-content">
                    <div className={`avatar flex justify-center`}>
                        <div className="w-10 md:w-16 lg:w-24 rounded mb-2">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <div className='text-center mb-2 lg:mb-0'>
                        <h3 className='font-semibold'>{user?.displayName}</h3>
                        <p>{user?.email}</p>
                    </div>
                    <div className='lg:divider'></div>
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/adminhome"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/allusers"><ImUsers /> All users</NavLink></li>
                        </> : isInstructor ? <>
                            <li><NavLink to="/dashboard/instructorhome"><FaHome></FaHome> Instructor Home</NavLink></li>
                        </> : <>
                            <li><NavLink to="/dashboard/selected-classes"><SiGoogleclassroom /> Selected Classes</NavLink></li>
                            <li><NavLink to="/dashboard/enrolled-classes"><SiGoogleclassroom /> Enrolled Classes</NavLink></li>
                            <li><NavLink to="/dashboard/payment-history"><SiGoogleclassroom /> Payment History</NavLink></li>
                        </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> Home</NavLink> </li>
                    <li><NavLink to="/"><GiTeacher /> Instructors</NavLink> </li>
                    <li><NavLink to="/"><SiGoogleclassroom /> Classes</NavLink> </li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;