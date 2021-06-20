import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { BlogCardInterface } from '../../types/blogType';
import Moment from 'react-moment';


export default function BlogCard({ blog_title, blog_backgroundimage, admin_user, categories, published_at }: BlogCardInterface) {
    return (
        <Link href={`/blogs/${blog_title}`} >
            <div className="group cursor-pointer">
                <div className="relative">
                    <Image src={blog_backgroundimage.url} layout="intrinsic"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-xl group-hover:scale-125 transform transition-3 w-full"
                        height={436}
                        width={500}
                        alt={blog_title}
                    />
                    <div className="absolute w-full h-full bottom-0 bg-gradient-to-t  from-gray-900  flex flex-col justify-end">
                        <div className="absolute h-2/6 w-full text-center bottom-0 text-white p-4 flex flex-col">
                            <div className="flex flex-wrap justify-center gap-2">
                                {categories.map((cat) => {
                                    return (
                                        <span className="bg-bgDarkSecondary text-white font-semibold py-1 px-2 rounded-2xl text-sm" key={cat.category_name}>
                                            <Link href={`/categories/${cat.category_name}`} >
                                                {cat.category_name}
                                            </Link>
                                        </span>
                                    )
                                })}

                            </div>
                            <div className="font-bold">
                                <h2>{blog_title}</h2>
                            </div>
                            <div className="text-xs font-light mt-2 text-gray-300 flex justify-center gap-4">
                                <span>{admin_user.username}</span>

                                <span>
                                    <Moment format="DD/MM/YYYY">
                                        {published_at}
                                    </Moment>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}