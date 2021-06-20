import React, { useEffect } from 'react';
import Categories from '../components/Categories/Categories';
import Layout from '../components/Layout/Layout';
import Map from '../components/Map/Map'
import Blogs from '../components/Blog/Blog'
import Contractors from '../components/Contractors/Contractors'
import { GetServerSideProps } from 'next';
import { API_URL } from '../utils/urls';
import { useContext } from 'react';
import { ChatContext } from '../context/chatContext';

export default function Home({ categories, blogs, contractors }) {
  const { chatOpen, targetUserEmail, updateChatOpen } = useContext(ChatContext)
  return (
    <Layout>

      <Map contractors={contractors} />
      <Categories categories={categories} />
      <div className="dark:bg-bgDarkSecondary bg-bgLightSecondary py-10 ">
        <Contractors contractors={contractors} />
      </div>
      <div className="">
        <Blogs blogsData={blogs} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const categories = await fetch(`${API_URL}/categories`).then((res) => res.json())
  const blogs = await fetch(`${API_URL}/blogs`).then((res) => res.json())
  const contractors = await fetch(`${API_URL}/contractors`).then((res) => res.json())
  return {
    props: {
      categories,
      blogs,
      contractors,
    }
  }
}