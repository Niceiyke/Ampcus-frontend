'use client'
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AiOutlineMenu } from 'react-icons/ai';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import Link from 'next/link';

function Navbar() {
    const { refreshToken } = useAuth()


    //const refresh: JwtPayload = jwtDecode(refreshToken?refreshToken:'')
    let isExpired: boolean

{/*    if (refresh) {

        isExpired = dayjs.unix(refresh?.exp).diff(dayjs()) < 1
    }
    else {
        isExpired = true
    } */}

    isExpired = false

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className='navbar hidden md:flex justify-between items-center'>
                <h1>
                    <Link href='/dashboard'>AMPUCS</Link>
                </h1>
                {!isExpired ? (
                    <div className=''>
                        <Link href='/dashboard' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Home
                        </Link>
                        <Link href='/profile' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Profile
                        </Link>
                        <Link href='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            About
                        </Link>
                        <Link href='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Info
                        </Link>
                        <Link href='/logout' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Logout
                        </Link>
                    </div>
                ) : (
                    <div className=''>
                        <Link href='/' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Home
                        </Link>
                        <Link href='/login' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Login
                        </Link>
                        <Link href='/register' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Register
                        </Link>
                        <Link href='#' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                            Info
                        </Link>
                    </div>
                )}
            </nav>

            {/* Mobile Responsive Menu */}
            <div className='md:hidden flex justify-end items-center' onClick={toggleMobileMenu}>
                <AiOutlineMenu />
            </div>

            {/* Mobile Navigation Links */}
            {isMobileMenuOpen && (
                <div className='md:hidden'>
                    {/* Include your mobile navigation links here */}
                    <Link href='/' className='block p-2 hover:bg-primary-bg hover:text-gray-800'>
                        Home
                    </Link>
                    <Link href='/dashboard' className='block p-2 hover:bg-primary-bg hover:text-gray-800'>
                        Dashboard
                    </Link>
                    <Link href='/profile' className='block p-2 hover:bg-primary-bg hover:text-gray-800'>
                        Profile
                    </Link>
                    <Link href='/logout' className='p-2 hover:bg-primary-bg hover:text-gray-800'>
                        Logout
                    </Link>
                    {/* Add other mobile navigation links as needed */}
                </div>
            )}
        </>
    );
}

export default Navbar;
