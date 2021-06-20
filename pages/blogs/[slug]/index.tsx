import { GetServerSideProps } from 'next';
import React from 'react';
import Layout from '../../../components/Layout/Layout';
import { BlogCardInterface } from '../../../types/blogType';
import { API_URL } from '../../../utils/urls';
import ReactMarkdown from 'react-markdown';


interface IProps {
    blogDetail: BlogCardInterface
}


export default function Blog({ blogDetail }: IProps) {
    console.log(blogDetail.blog_detail)
    return (
        <Layout>
            <div className="container mx-auto">
                <div className="prose dark:text-white">
                    <ReactMarkdown children={blogDetail.blog_detail} />
                </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = ctx.params.slug as string
    const [blogDetail] = await fetch(`${API_URL}/blogs?blog_title=${encodeURI(slug)}`).then((res) => res.json())

    return {
        props: {
            blogDetail
        }
    }
}