import React from 'react';
import {DateRangePicker, DateValue, RangeValue} from "@nextui-org/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export const DatePicker = ({hasInitialValue, error, defaultValue, onChange}: {
    hasInitialValue: boolean,
    error: string,
    defaultValue: any
    onChange: (value: RangeValue<DateValue>) => void
}) => {

    // currently support reservation from now until two months later for keeping availability mock data in small size
    const currentDate = today(getLocalTimeZone());
    const twoMonthsLater = currentDate.add({months: 2})

    return (
        <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
                Arrival and Departure dates
            </label>
            <div className="md:hidden flex w-full flex-wrap md:flex-nowrap gap-4">
                <DateRangePicker
                    visibleMonths={1}
                    minValue={hasInitialValue ? undefined : currentDate}
                    maxValue={hasInitialValue ? undefined : twoMonthsLater}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    className="peer block w-full text-sm outline-2"
                    classNames={{inputWrapper: "bg-white pr-5 rounded-md border border-gray-200"}}
                />
            </div>
            <div className="hidden md:flex w-full flex-wrap md:flex-nowrap gap-4">
                <DateRangePicker
                    visibleMonths={2}
                    minValue={hasInitialValue ? undefined : currentDate}
                    maxValue={hasInitialValue ? undefined : twoMonthsLater}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    className="peer block w-full text-sm outline-2"
                    classNames={{inputWrapper: "bg-white pr-5 rounded-md border border-gray-200"}}
                />
            </div>
            <p className="mt-1 ml-1 block text-xs font-medium text-red-500">
                {error}
            </p>
        </div>
    )
}