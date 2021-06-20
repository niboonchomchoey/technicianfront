import React, { useState } from 'react';
import useDarkMode from '../../hooks/darkMode';
import Link from 'next/link'

import SearchIcon from '../Svg/Search';
import UserIcon from '../Svg/User';
import useCookies from '../../hooks/useCookies';
import MenuSVG from '../Svg/Menu';
import CloseSvg from '../Svg/Close'

import { motion } from 'framer-motion'


function DarkIcon() {
    const [dark, setDarkMode] = useDarkMode()
    return (
        <>
            {dark ?
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor"
                    onClick={() => { setDarkMode(false) }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                :
                <svg onClick={() => { setDarkMode(true) }}
                    className="w-6 h-6"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                // <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor"
                //     onClick={() => { setDarkMode(true) }}
                // >
                //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                // </svg>
            }
        </>
    )
}

export default function Nav() {
    const [onSearchClick, setOnSearchClick] = useState(false)
    const [userCookies] = useCookies('user')
    const [toggleResponsiveMenu, setToggleResponsiveMenu] = useState<boolean>(false)

    const handleOnSetToggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setToggleResponsiveMenu(prevState => !prevState)
    }
    return (
        <div className="shadow-md bg-white dark:bg-bgDarkPrimary fixed w-full z-10">
            <nav className="flex flex-col sm:flex-row sm:items-center justify-between container mx-auto py-5">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <h1 className="text-4xl tracking-wider font-black   cursor-pointer hover:text-primary dark:text-darkPrimary transition-3">Contractor</h1>
                    </Link>
                    <motion.button onClick={handleOnSetToggleMenu} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="sm:hidden dark:text-white dark:hover:text-darkPrimary">
                        {
                            toggleResponsiveMenu ? <CloseSvg /> : <MenuSVG />
                        }
                    </motion.button>
                </div>
                <div className={`flex-col ${!toggleResponsiveMenu && 'hidden'} sm:flex sm:flex-row gap-4`}>
                    <ul className="flex flex-col sm:flex-row justify-end gap-4 items-center font-bold  text-xl">
                        {/* <Dropdown menuName="ประเภท" subMenus={[{ subMenuName: 'a', subMenuLink: 'a' }, { subMenuName: 'b', subMenuLink: 'b' }]} /> */}
                        <li>
                            <Link href="/contractors" >
                                <a className="dark:text-white hover:text-primary dark:hover:text-darkPrimary transition duration-300">ช่าง</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blogs" >
                                <a className="dark:text-white hover:text-primary dark:hover:text-darkPrimary transition duration-300">บทความ</a>
                            </Link>
                        </li>

                        <li>
                            <Link href={userCookies ? '/register' : '/login'}>
                                <button className="py-3 px-4 rounded-3xl bg-primary dark:bg-darkPrimary dark:text-black  text-white font-bold hover:bg-primaryDarker dark:hover:bg-darkPrimaryDarker transition duration-300">
                                    ลงทะเบียนช่าง
                                </button>
                            </Link>
                        </li>

                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4 dark:text-white items-center">
                        {
                            userCookies && userCookies.user.email &&
                            <div className="hover:text-primary dark:hover:text-darkPrimary cursor-pointer transition-3 p-1  " >
                                {userCookies.user.username}
                            </div>
                        }

                        <div className="hover:text-primary dark:hover:text-darkPrimary cursor-pointer transition-3 p-1" onClick={() => setOnSearchClick(true)}>
                            <SearchIcon />

                        </div>
                        <div className="hover:text-primary dark:hover:text-darkPrimary  cursor-pointer transition-3 p-1">
                            <DarkIcon />
                        </div>
                    </div>
                </div>

            </nav>
            {onSearchClick &&
                <div className="h-80 w-full absolute top-0 left-0 bg-bgDarkSecondary z-10">
                    <div className="flex justify-end text-white" >
                        <span onClick={() => setOnSearchClick(false)}>X</span>
                    </div>
                    <form className=" flex flex-col justify-center items-center h-full w-9/12 mx-auto">
                        <input type="text" placeholder="ค้นหาช่าง" className="w-full bg-transparent ring-transparent focus:outline-none text-gray-200 text-3xl border-b border-gray-400" />
                    </form>
                </div>
            }
        </div>

    )
}