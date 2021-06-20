import React from 'react';
import Layout from '../components/Layout/Layout';
import GoogleSvg from '../components/Svg/GoogleSvg';
import { useRouter } from 'next/router'
import { API_URL } from '../utils/urls';
export default function LoginPage() {
    const router = useRouter()
    return (
        <Layout>
            <div className="container mx-auto my-52 flex flex-col items-center ">
                <div className="flex flex-col items-center gap-6 w-96 h-96 py-10 px-6 rounded-md shadow-md border">
                    <h1 className="text-2xl font-bold dark:text-white">Log In</h1>
                    <button className="w-full bg-bgGoogle py-6 px-4 rounded-md text-white font-semibold text-lg flex justify-center items-center gap-4"
                        onClick={() => {
                            router.push(`${API_URL}/connect/google`)
                        }}
                    >
                        <div className="w-10 h-10">
                            <GoogleSvg />
                        </div>
                        เข้าสู่ระบบด้วย Google
                    </button>
                </div>

            </div>
        </Layout>
    )
}

