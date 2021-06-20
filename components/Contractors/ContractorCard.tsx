import React from 'react';
import Image from 'next/image'
import { ContractorsInterface } from '../../types/contractorsType';
import CategorySpan from '../Categories/CategorySpan';
import Link from 'next/link'
import Locate from '../Svg/Locate';
interface IProps {
    contractor: ContractorsInterface
}
export default function ContractorCard({ contractor }: IProps) {
    const [lastImage] = contractor.contractor_images.slice(-1)

    return (
        <Link href={`/contractor/${contractor.contractor_name}`}>
            <div className="flex flex-col h-96 group shadow-md rounded-md cursor-pointer ">
                <div className="h-1/2  relative">
                    <Image src={lastImage.url}
                        layout="fill" objectPosition="center" objectFit="cover" className="rounded-t-md overflow-hidden group-hover:scale-110 transform transition-3" />
                </div>
                <div className="bg-white dark:bg-bgDarkSecondary  flex-1 flex flex-col justify-between dark:text-white">
                    <div className="flex flex-col py-2 px-3">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-3">{contractor.contractor_name}</h3>
                        <p className="text-sm font-light text-gray-600 dark:text-gray-200">{contractor.contractor_description.slice(0, 120)}</p>
                        <div className="flex flex-wrap gap-2 my-2">
                            {contractor.categories.map((c) => (
                                <CategorySpan key={c.category_name} category_name={c.category_name} category_svg={c.category_svg} />
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-gray-300 py-2 px-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 text-gray-400">
                                <Locate />
                            </div>
                            <p className="text-gray-400 font-light text-xs">{contractor.contractor_address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}