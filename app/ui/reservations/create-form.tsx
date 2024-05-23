"use client"

import React from "react";
import {CustomerField} from '@/app/lib/definitions';
import {DateRangePicker} from "@nextui-org/date-picker";
import {useController, useForm} from "react-hook-form";
import * as z from "zod"
import {zodNumber, zodString} from "@/app/lib/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {getLocalTimeZone, today} from "@internationalized/date";
import {DateValue, RangeValue} from "@nextui-org/react";
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
    MinusCircleIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, User} from "@nextui-org/react";
import {Button} from "@/app/ui/button";


export default function Form({customers}: { customers: CustomerField[] }) {
    const schema = z.object({
        arrival: zodString,
        departure: zodString,
        adults: zodNumber,
        children: zodNumber,
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<typeof schema>({
        resolver: zodResolver(schema),
    })

    const {field: arrival} = useController({control, defaultValue: "", name: "arrival"})
    const {field: departure} = useController({control, defaultValue: "", name: "departure"})
    const {field: adults} = useController({control, defaultValue: 0, name: "adults"})
    const {field: children} = useController({control, defaultValue: 0, name: "children"})


    const currentDate = today(getLocalTimeZone());
    const twoMonthsLater = currentDate.add({months: 2})

    function handleChangeDate(date: RangeValue<DateValue>) {
        arrival.onChange(`${date.start.year}-${date.start.month}-${date.start.day}`)
        departure.onChange(`${date.start.year}-${date.start.month}-${date.start.day}`)
    }

    function handleDecrementAdults() {
        if (adults.value > 0) adults.onChange(adults.value - 1)
    }

    function handleIncrementAdults() {
        if (adults.value + children.value < 10) adults.onChange(adults.value + 1)
    }

    function handleDecrementChildren() {
        if (children.value > 0) children.onChange(children.value - 1)
    }

    function handleIncrementChildren() {
        if (adults.value + children.value < 10) children.onChange(children.value + 1)
    }

    return (
        <form>
            <div className="mb-6">
                <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                    Arrival and Departure dates
                </label>
                <div className="md:hidden flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DateRangePicker
                        visibleMonths={1}
                        minValue={currentDate}
                        maxValue={twoMonthsLater}
                        onChange={handleChangeDate}
                        className="peer block w-full text-sm outline-2"
                        classNames={{inputWrapper: "bg-white pr-5 rounded-md border border-gray-200"}}
                    />
                </div>
                <div className="hidden md:flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DateRangePicker
                        visibleMonths={2}
                        minValue={currentDate}
                        maxValue={twoMonthsLater}
                        onChange={handleChangeDate}
                        className="peer block w-full text-sm outline-2"
                        classNames={{inputWrapper: "bg-white pr-5 rounded-md border border-gray-200"}}
                    />
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                    Guests
                </label>

                {/*@todo: remove global @nextui-org/react and add only used components*/}
                {/*@todo: customize drop down menu style */}
                <Dropdown classNames={{content: "rounded-md"}}>
                    <DropdownTrigger>
                        <button
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 bg-white text-gray-500 text-left px-4"
                        >
                            {adults.value + children.value ? `Guests: ${adults.value + children.value}` : `Guests`}
                        </button>
                    </DropdownTrigger>
                    {/* @todo: remove hover effect from dropdown items */}
                    <DropdownMenu closeOnSelect={false}>
                        <DropdownItem key="adults">
                            <div className="flex flex-row justify-between align-middle">
                                <p className="mr-10">Adults (Age +13)</p>
                                <div className="flex flex-row align-middle">
                                    <MinusCircleIcon className="w-5 h-5 text-gray-400" onClick={handleDecrementAdults}/>
                                    <p className="w-[24px] text-center">{adults.value}</p>
                                    <PlusCircleIcon className="w-5 h-5 text-gray-400" onClick={handleIncrementAdults}/>
                                </div>
                            </div>
                        </DropdownItem>
                        <DropdownItem key="children">
                            <div className="flex flex-row justify-between align-middle">
                                <p className="mr-10">Children (Ages 2-12)</p>
                                <div className="flex flex-row align-middle">
                                    <MinusCircleIcon
                                        className="w-5 h-5 text-gray-400"
                                        onClick={handleDecrementChildren}
                                    />
                                    <p className="w-[24px] text-center">{children.value}</p>
                                    <PlusCircleIcon
                                        className="w-5 h-5 text-gray-400"
                                        onClick={handleIncrementChildren}
                                    />
                                </div>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            {/* Invoice Amount */}
            <div className="mb-4">
                <label htmlFor="amount" className="handleChangeDate block text-sm font-medium">
                    Choose an amount
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            placeholder="Enter USD amount"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <CurrencyDollarIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                </div>
            </div>

            <fieldset>
                <legend className="handleChangeDate block text-sm font-medium">
                    Set the invoice status
                </legend>
                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                id="pending"
                                name="status"
                                type="radio"
                                value="pending"
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                                htmlFor="pending"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                            >
                                Pending <ClockIcon className="h-4 w-4"/>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="paid"
                                name="status"
                                type="radio"
                                value="paid"
                                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                            />
                            <label
                                htmlFor="paid"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                            >
                                Paid <CheckIcon className="h-4 w-4"/>
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className="mt-6 flex justify-between gap-4">
                <Link
                    href={"/reservations"}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Reservation</Button>
            </div>
        </form>
    );
}
