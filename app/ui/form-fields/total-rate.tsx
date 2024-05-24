import React from 'react';
import {CurrencyDollarIcon} from "@heroicons/react/24/outline";

export const TotalRate = ({value}: { value: number }) => {
    return (
        <div className="mb-4">
            <label htmlFor="amount" className="handleChangeDate block text-sm font-medium">
                Total rate
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <div
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    >
                        <p>{value}</p>
                    </div>
                    <CurrencyDollarIcon
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                </div>
            </div>
        </div>
    )
}