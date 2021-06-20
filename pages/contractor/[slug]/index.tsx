import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import CategorySpan from '../../../components/Categories/CategorySpan';
import Gallery from '../../../components/Gallery/Gallery';
import Layout from '../../../components/Layout/Layout';
import Locate from '../../../components/Svg/Locate';
import PhoneSVG from '../../../components/Svg/Phone';
import { ContractorsInterface } from '../../../types/contractorsType';
import { API_URL } from '../../../utils/urls';
import Link from 'next/link'
import LineSVG from '../../../components/Svg/Line';
import SiteSVG from '../../../components/Svg/Site';
import Map from '../../../components/Map/Map';
import { Socket } from 'socket.io-client';
import ChatRoomContainer from '../../../components/ChatRoom/ChatRoom';
import useCookies from '../../../hooks/useCookies';
import { useContext } from 'react';
import { ChatContext } from '../../../context/chatContext';


export default function Contractor({ contractors, socket }: { contractors: ContractorsInterface[], socket: Socket | null }) {
    const [contractor] = contractors
    const [chatClicked, setChatClicked] = useState<boolean>(false)
    const [userCookies] = useCookies('user')
    const { updateChatOpen } = useContext(ChatContext)
    const handleChatClick = ((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        updateChatOpen(true, contractor.user.email)
    })
    return (
        <Layout>
            <Gallery images={contractor.contractor_images} />
            <div className="bg-bgLightSecondary dark:bg-bgDarkPrimary dark:text-white">
                <div className="container mx-auto">
                    <div className="py-12 grid grid-flow-col gap-4">
                        <div className="col-span-2 flex flex-col gap-6">
                            <div className="bg-white dark:bg-bgDarkSecondary p-10 shadow-sm flex flex-col gap-2">
                                <h3 className="text-2xl font-bold text0">{contractor.contractor_name}</h3>
                                <div className="flex items-center gap-1">
                                    <div className="h-4 w-4 text-gray-400">
                                        <Locate />
                                    </div>
                                    <p className="text-gray-400 font-light text-sm">{contractor.contractor_address}</p>
                                </div>
                                <p className="text-gray-600 font-light">{contractor.contractor_description}</p>
                            </div>
                            <div className="bg-white dark:bg-bgDarkSecondary p-10 shadow-sm flex flex-col gap-2">
                                <h4 className="font-medium text-xl">ประเภทช่าง</h4>
                                <div className="flex flex-wrap gap-4">
                                    {contractor.categories.map((category) => (
                                        <CategorySpan category_name={category.category_name} category_svg={category.category_svg} key={category.category_name} />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white dark:bg-bgDarkSecondary p-10 shadow-sm flex flex-col gap-2">
                                <h4 className="font-medium text-xl">แผนที่</h4>
                                <div>
                                    <Map contractors={contractors} />
                                </div>

                            </div>
                        </div>
                        <div className="row-span-3 bg-white dark:bg-bgDarkSecondary p-10 shadow-sm ">

                            <h4 className="font-medium text-xl">{contractor.user.email}</h4>
                            {contractor.contractor_website &&
                                <div>
                                    <Link href={`${contractor.contractor_website}`}>
                                        <div className="flex gap-1 items-center">
                                            <div className="h-6 w-6 dark:text-white">
                                                <SiteSVG />
                                            </div>
                                            <span>{contractor.contractor_website}</span>
                                        </div>

                                    </Link>
                                </div>

                            }
                            {contractor.contractor_telephone &&
                                <div>

                                    <Link href={`tel:${contractor.contractor_telephone}`}>
                                        <div className="flex gap-1 items-center">
                                            <div className="h-6 w-6 dark:text-white">
                                                <PhoneSVG />
                                            </div>
                                            <span>{contractor.contractor_telephone}</span>
                                        </div>

                                    </Link>
                                </div>

                            }
                            {contractor.contractor_line &&
                                <div>

                                    <Link href={`${contractor.contractor_line}`}>
                                        <div className="flex gap-1 items-center">
                                            <div className="h-6 w-6 dark:text-white">
                                                <LineSVG />
                                            </div>
                                            <span>{contractor.contractor_line}</span>
                                        </div>

                                    </Link>
                                </div>

                            }
                            {
                                userCookies && userCookies.user.email !== contractor.user.email &&
                                <div>
                                    <button onClick={handleChatClick}>Chat</button>

                                </div>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = ctx.params.slug as string
    const contractors = await fetch(`${API_URL}/contractors?contractor_name=${encodeURI(slug)}`).then((res) => res.json())

    return {
        props: {
            contractors
        }
    }
}