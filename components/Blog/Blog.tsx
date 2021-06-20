import React from 'react';
import { BlogCardInterface } from '../../types/blogType';
import BlogCard from './BlogCard';

interface IProps {
    blogsData: BlogCardInterface[]
}


export default function Blogs({ blogsData }: IProps) {
    return (
        <div className="my-10 container mx-auto flex flex-col ">
            <div className="flex justify-between dark:text-white">
                <h2>บทความ</h2>
                <p>อ่านต่อ</p>
            </div>
            <div className="grid grid-cols-3 gap-6 ">
                {blogsData.map(({ blog_title, blog_backgroundimage, categories, admin_user, published_at }) =>
                    <BlogCard key={blog_title} blog_title={blog_title} blog_backgroundimage={blog_backgroundimage} categories={categories} admin_user={admin_user} published_at={published_at} />
                )}
            </div>
        </div>
    )
}