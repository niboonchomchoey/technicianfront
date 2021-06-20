import React from 'react';
import { ContractorsInterface } from '../../types/contractorsType';
import ContractorCard from './ContractorCard';

interface IProps {
    contractors: ContractorsInterface[]
}

export default function Contractors({ contractors }: IProps) {
    return (
        <div className=" container mx-auto flex flex-col ">
            <div className="flex justify-between dark:text-white">
                <h2>ช่าง</h2>
                <p>ดูช่างทั้งหมด</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 p-4 gap-6 ">
                {contractors.map((contractor) => (
                    <ContractorCard key={contractor.contractor_name} contractor={contractor} />
                ))}
            </div>
        </div>
    )
}