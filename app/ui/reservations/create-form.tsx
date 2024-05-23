"use client"

import React, {useMemo, useState} from "react";
import {DateRangePicker} from "@nextui-org/date-picker";
import {useController, useForm} from "react-hook-form";
import * as z from "zod"
import {zodNumber, zodNumberAdults, zodNumberRoomTypeId, zodString} from "@/app/lib/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {getLocalTimeZone, today} from "@internationalized/date";
import {DateValue, RangeValue} from "@nextui-org/react";
import {
    CurrencyDollarIcon,
    MinusCircleIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, User} from "@nextui-org/react";
import {Button} from "@/app/ui/button";
import {RoomType} from "@/app/lib/types";
import {ButtonLink} from "@/app/ui/button-link";
import {calculateReservationRate, getAvailableRoomTypes} from "@/app/lib/utility";
import {useSelector} from "react-redux";
import {roomTypes} from "@/app/lib/mock-data";
import {useFieldError} from "@/app/hooks/use-field-error";


export default function CreateReservationForm() {
    const schema = z.object({
        arrival: zodString,
        departure: zodString,
        adults: zodNumberAdults,
        children: zodNumber,
        roomTypeId: zodNumberRoomTypeId,
        // guests: array
    })

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<typeof schema>({
        resolver: zodResolver(schema),
    })

    // @fixme: fix TS error for name property
    const {field: arrival} = useController({control, defaultValue: "", name: "arrival"})
    const {field: departure} = useController({control, defaultValue: "", name: "departure"})
    const {field: adults} = useController({control, defaultValue: 0, name: "adults"})
    const {field: children} = useController({control, defaultValue: 0, name: "children"})
    const {field: roomTypeId} = useController({control, defaultValue: undefined, name: "roomTypeId"})

    const arrivalError = useFieldError({errors, name: "arrival"})
    const adultsError = useFieldError({errors, name: "adults"})
    const roomTypeError = useFieldError({errors, name: "roomTypeId"})

    // currently support reservation from now until two months later for keeping availability mock data in small size
    const currentDate = today(getLocalTimeZone());
    const twoMonthsLater = currentDate.add({months: 2})

    const {items: availabilityData} = useSelector(store => store.roomAvailability)

    const availableRoomTypes: RoomType[] = useMemo(() => getAvailableRoomTypes({
        arrivalDate: arrival.value,
        departureDate: departure.value,
        adults: adults.value,
        children: children.value,
        roomAvailability: availabilityData,
    }), [arrival.value, departure.value, adults.value, children.value, availabilityData])

    const totalRate = useMemo(() => calculateReservationRate(roomTypeId.value, arrival.value, departure.value), [arrival.value, departure.value, roomTypeId.value])

    function handleChangeDate(date: RangeValue<DateValue>) {
        arrival.onChange(`${date.start.year}-${String(date.start.month).padStart(2, '0')}-${String(date.start.day).padStart(2, '0')}`)
        departure.onChange(`${date.end.year}-${String(date.end.month).padStart(2, '0')}-${String(date.end.day).padStart(2, '0')}`)
        roomTypeId.onChange(undefined)
    }

    function handleDecrementAdults() {
        if (adults.value > 0) {
            adults.onChange(adults.value - 1)
            roomTypeId.onChange(undefined)
        }
    }

    function handleIncrementAdults() {
        if (adults.value + children.value < 10) {
            adults.onChange(adults.value + 1)
            roomTypeId.onChange(undefined)
        }
    }

    function handleDecrementChildren() {
        if (children.value > 0) {
            children.onChange(children.value - 1)
            roomTypeId.onChange(undefined)
        }
    }

    function handleIncrementChildren() {
        if (adults.value + children.value < 10) {
            children.onChange(children.value + 1)
            roomTypeId.onChange(undefined)
        }
    }

    function handleCreateReservation(data: typeof schema) {
        console.log('data: ', data)
        console.log('totalRate: ', totalRate)
        //
    }

    return (
        <form>
            {/* Arrival and departure dates*/}
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
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
                <p className="mt-1 ml-1 block text-xs font-medium text-red-500">
                    {arrivalError}
                </p>
            </div>

            {/* Guests */}
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                    Guests
                </label>

                {/*@todo: remove global @nextui-org/react and add only used components*/}
                {/*@todo: customize drop down menu style */}
                <Dropdown classNames={{content: "rounded-md"}}>
                    <DropdownTrigger>
                        <button
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 bg-white text-gray-500 text-left px-4"
                        >
                            {adults.value + children.value ? `Guests: ${adults.value + children.value}` : `Set guests`}
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
                <p className="mt-1 ml-1 block text-xs font-medium text-red-500">
                    {adultsError}
                </p>
            </div>

            {/* Room type*/}
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                    Room type
                </label>

                <Dropdown classNames={{content: "rounded-md"}}>
                    <DropdownTrigger>
                        <p
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 bg-white text-gray-500 text-left px-4 h-[36px]"
                        >
                            {roomTypes.find((item) => item.id == roomTypeId.value)?.name || "Choose room type"}
                        </p>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={[roomTypeId.value]}
                    >
                        {availableRoomTypes.map((roomType) => {
                            function handleChangeRoomTypeId() {
                                roomTypeId.onChange(roomType.id)
                            }

                            return (
                                <DropdownItem key={roomType.id} onClick={handleChangeRoomTypeId}>
                                    <p className="w-[212px]">{roomType.name}</p>
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </Dropdown>
                <p className="mt-1 ml-1 block text-xs font-medium text-red-500">
                    {roomTypeError}
                </p>
            </div>

            {/* Total calculated rate */}
            <div className="mb-4">
                <label htmlFor="amount" className="handleChangeDate block text-sm font-medium">
                    Total rate
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <div
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        >
                            <p>{totalRate}</p>
                        </div>
                        <CurrencyDollarIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    </div>
                </div>
            </div>

            {/* submit and cancel buttons */}
            <div className="mt-6 flex justify-between gap-4">
                <ButtonLink
                    href={"/reservations"}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    <p className="text-gray-500">Cancel</p>
                </ButtonLink>
                <Button
                    onClick={handleSubmit(handleCreateReservation)}
                    className="flex-grow justify-center"
                >
                    Next
                </Button>
            </div>
        </form>
    );
}
