import React from 'react';
import Image from 'next/image'
import SearchIcon from '../Svg/Search'
import { CategoryInterface } from '../../types/categoryType';
import Link from 'next/link';

function CategoryCard({ category_name, category_description, category_svg }: CategoryInterface) {
    return (
        <Link href={`/categories/${category_name}`}>
            <div className="dark:bg-bgDarkSecondary cursor-pointer flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:border-opacity-0 p-10 group transform transition-all duration-300 hover:scale-105 hover:shadow-md  bg-white hover:z-10">
                <div className="border  border-primary dark:border-darkPrimary rounded-full p-6 group-hover:bg-primary transition-3">
                    <div className="text-primary dark:text-darkPrimary group-hover:text-white transition-3">
                        <div className="w-16 h-16" dangerouslySetInnerHTML={{ __html: category_svg }}>

                        </div>

                    </div>
                </div>
                <div className="font-bold text-xl  text-center group-hover:text-primary group-hover:dark:text-darkPrimary transition-3 my-4">
                    <h2>{category_name}</h2>
                    <p className="text-sm font-light">{category_description}</p>
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard