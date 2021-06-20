import React from 'react';
import { CategoryInterface } from '../../types/categoryType';
import CategoryCard from './CategoryCard'

interface IProps {
    categories: CategoryInterface[]
}

export default function Categories({ categories }: IProps) {

    return (
        <div className="bg-white dark:bg-bgDarkPrimary my-10 dark:text-white">
            <div className="container mx-auto">
                <div className="text-center my-8">
                    <h2 className="text-3xl font-semibold">ประเภทงานช่าง</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 ">
                    {categories && categories.map((cat) => (
                        <CategoryCard key={cat.category_name} category_name={cat.category_name} category_description={cat.category_description} category_svg={cat.category_svg} />
                    ))}
                </div>

            </div>
        </div>

    )
}