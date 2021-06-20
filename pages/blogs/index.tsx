import { GetServerSideProps } from 'next'
import React from 'react'
import BlogCard from '../../components/Blog/BlogCard'
import Layout from '../../components/Layout/Layout'
import { API_URL } from '../../utils/urls'


export default function Blogs(blogs) {
    return (
        <Layout>
            <div className="container mx-auto dark:text-white">
                {/* <BlogCard /> */}
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await fetch(`${API_URL}/blogs`)
    const blogs = await res.json()
    return {
        props: {
            blogs
        }
    }
}