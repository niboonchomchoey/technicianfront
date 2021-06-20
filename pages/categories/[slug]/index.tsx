import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../../components/Layout/Layout';
import { BlogCardInterface } from '../../../types/blogType';
import { CategoryInterface } from '../../../types/categoryType';
import { ContractorsInterface } from '../../../types/contractorsType';
import { API_URL } from '../../../utils/urls';
import Image from 'next/image'
import BlogCard from '../../../components/Blog/BlogCard';
import ContractorCard from '../../../components/Contractors/ContractorCard';
import { useContext } from 'react';
import { ChatContext } from '../../../context/chatContext';

interface IProps {
    category: CategoryInterface
    blogs: BlogCardInterface[]
    contractors: ContractorsInterface[]
}

export default function Category({ category, blogs, contractors }: IProps) {
    return (
        <Layout>
            <div className="relative h-96">
                <Image src={category.category_background.url} layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className=" group-hover:scale-125 transform transition-3 w-full"
                    alt={category.category_name}
                />
                <div className="absolute w-full h-full bottom-0 bg-gradient-to-t  from-gray-900  flex flex-col justify-end">
                    <div className="absolute h-3/6 w-full text-center bottom-0 text-white p-4 flex flex-col">
                        <h3 className="text-3xl font-bold">{category.category_name}</h3>
                        <p className="text-xl font-light">{category.category_description}</p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto my-10">
                <div className="flex justify-between">
                    <h3>บทความ</h3>
                    <p>ดูบทความทั้งหมด</p>
                </div>
                <div className="grid grid-cols-3 grid-rows-2 gap-6 ">
                    {blogs.map(({ blog_title, blog_backgroundimage, categories, admin_user, published_at }) =>
                        <BlogCard key={blog_title} blog_title={blog_title} blog_backgroundimage={blog_backgroundimage} categories={categories} admin_user={admin_user} published_at={published_at} />
                    )}
                </div>
            </div>
            <div className="container mx-auto my-10">
                <div className="flex justify-between">
                    <h3>ช่าง</h3>
                    <p>ดูช่างทั้งหมด</p>
                </div>
                <div className="grid grid-cols-4 gap-6 ">
                    {contractors.map((contractor) => (
                        <ContractorCard key={contractor.contractor_name} contractor={contractor} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = ctx.params.slug as string
    const [category] = await fetch(`${API_URL}/categories?category_name=${encodeURI(slug)}`).then((res) => res.json())
    const blogs = await fetch(`${API_URL}/blogs?categories_in=${category.id}`).then((res) => res.json())
    const contractors = await fetch(`${API_URL}/contractors?categories_in=${category.id}`).then((res) => res.json())
    return {
        props: {
            category,
            blogs,
            contractors
        }
    }
}

