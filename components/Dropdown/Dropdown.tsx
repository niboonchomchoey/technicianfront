import React, { useRef, FC } from 'react';
import useDetectOutsideClick from '../../hooks/detectOutsideClick';
import Link from 'next/link'
import ArrowDown from '../Svg/Arrow-down';
import ArrowRight from '../Svg/Arrow-right';


interface MenuInterface {
    menuName: string
    subMenus: {
        subMenuName: string
        subMenuLink: string
    }[]
}

const Dropdown: FC<MenuInterface> = ({ menuName, subMenus }) => {
    const dropdownRef = useRef<HTMLUListElement>(null)

    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
    const onMenuClick = () => setIsActive(!isActive)

    return (
        <li onClick={onMenuClick} className="relative cursor-pointer">
            <div className="flex dark:text-white">
                {menuName} {isActive ? <ArrowDown /> : <ArrowRight />}
            </div>

            <ul ref={dropdownRef} className={`${isActive ? 'flex flex-col' : 'hidden'} dark:bg-bgDarkSecondary dark:text-white rounded-3xl absolute top-8 right-0 z-10 w-28 p-4`}>
                {subMenus.map((sub) => {
                    return (
                        <li key={sub.subMenuName} className="dark:hover:text-primary ">
                            <Link href={`/${sub.subMenuLink}`}>
                                <a>{sub.subMenuName}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

export default Dropdown