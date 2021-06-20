import Link from 'next/link';
import React from 'react';
import { CategoryInterface } from '../../types/categoryType';



export default function CategorySpan({ category_name, category_svg }: CategoryInterface) {
    return (
        <Link href={`/categories/${category_name}`}>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400  cursor-pointer">
                <div dangerouslySetInnerHTML={{ __html: category_svg }} className="w-4 h-4 dark:text-gray-400   ">
                </div>
                <div>
                    <p className="text-sm font-normal hover:text-primary">{category_name}</p>
                </div>
            </div>
        </Link>
    )
}