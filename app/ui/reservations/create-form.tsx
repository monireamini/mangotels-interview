"use client"

import React, {useMemo} from "react";
import {useController, useForm} from "react-hook-form";
import * as z from "zod"
import {v4} from "uuid"
import {zodGuests, zodNumber, zodNumberAdults, zodString} from "@/app/lib/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import {DateValue, RangeValue} from "@nextui-org/react";
import {
    CurrencyDollarIcon,
    MinusCircleIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline";
import {DateRangePicker, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {Button} from "@/app/ui/button";
import {Guest, Reservation, ReservationStatus, RoomType} from "@/app/lib/definitions";
import {ButtonLink} from "@/app/ui/button-link";
import {calculateReservationRate, getAvailableRoomTypes} from "@/app/lib/utils";
import {useDispatch, useSelector} from "react-redux";
import {roomTypes} from "@/app/lib/placeholder-data";
import {useFieldError} from "@/app/hooks/use-field-error";
import {GuestsForm} from "@/app/ui/reservations/guests-form";
import {CREATE_RESERVATION, UPDATE_RESERVATION} from "@/app/redux/reducers/reservations-slice";
import {useRouter} from "next/navigation";
import {CREATE_GUEST} from "@/app/redux/reducers/guests-slice";
import {RootState} from "@/app/redux/store";

export default function CreateReservationForm({initialValue}: { initialValue?: Reservation }) {
    const router = useRouter()

    const {items: initialGuests} = useSelector((store: RootState) => store.guests)

    const schema = z.object({
        arrival: zodString,
        departure: zodString,
        adults: zodNumberAdults,
        children: zodNumber,
        roomTypeId: zodString,
        guests: zodGuests
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<typeof schema>({
        resolver: zodResolver(schema),
    })

    const {field: arrival} = useController<any>({control, defaultValue: initialValue?.arrivalDate || "", name: "arrival"})
    const {field: departure} = useController<any>({
        control,
        defaultValue: initialValue?.departureDate || "",
        name: "departure"
    })
    const {field: adults} = useController<any>({control, defaultValue: initialValue?.adults || 0, name: "adults"})
    const {field: children} = useController<any>({control, defaultValue: initialValue?.children || 0, name: "children"})
    const {field: roomTypeId} = useController<any>({
        control,
        defaultValue: initialValue?.roomTypeId || undefined,
        name: "roomTypeId"
    })
    const {field: guests} = useController<any>({
        control,
        defaultValue: initialValue?.guestIds ? initialValue?.guestIds.map((guestId) => initialGuests.find((item: Guest) => item.id === guestId)) : [],
        name: "guests"
    })

    const arrivalError = useFieldError({errors, name: "arrival"})
    const adultsError = useFieldError({errors, name: "adults"})
    const roomTypeError = useFieldError({errors, name: "roomTypeId"})

    // currently support reservation from now until two months later for keeping availability mock data in small size
    const currentDate = today(getLocalTimeZone());
    const twoMonthsLater = currentDate.add({months: 2})

    const {items: availabilityData} = useSelector((store: RootState) => store.roomAvailability)

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

    const dispatch = useDispatch()

    function handleCreateReservation(data: any) {
        if (data.adults + data.children !== data.guests.length) return

        const {guests, arrival, departure, ...rest} = data

        const reservationData = {
            ...rest,
            id: v4(),
            guestIds: data.guests.map((guest: Guest) => guest.id),
            arrivalDate: arrival,
            departureDate: departure,
            status: ReservationStatus.Confirmed,
            totalRate,
        }
        for (const guest of guests) {
            dispatch(CREATE_GUEST(guest))
        }
        dispatch(CREATE_RESERVATION(reservationData))
        router.push('/reservations')
    }

    function handleUpdateReservation(data: any) {
        if (data.adults + data.children !== data.guests.length) return

        const {guests, arrival, departure, ...rest} = data

        const reservationData = {
            ...rest,
            id: initialValue?.id,
            guestIds: data.guests.map((guest: Guest) => guest.id),
            arrivalDate: arrival,
            departureDate: departure,
            status: ReservationStatus.Confirmed,
            totalRate: initialValue?.totalRate || totalRate,
        }

        for (const guest of guests) {
            dispatch(CREATE_GUEST(guest))
        }

        dispatch(UPDATE_RESERVATION(reservationData))
        router.push('/reservations')

    }

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-10">
                <form className="max-w-[280px]">
                    {/* Arrival and departure dates*/}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-medium">
                            Arrival and Departure dates
                        </label>
                        <div className="md:hidden flex w-full flex-wrap md:flex-nowrap gap-4">
                            <DateRangePicker
                                visibleMonths={1}
                                minValue={initialValue ? undefined : currentDate}
                                maxValue={initialValue ? undefined : twoMonthsLater}
                                onChange={handleChangeDate}
                                defaultValue={initialValue ? {start: parseDate(arrival.value), end: parseDate(departure.value)} : undefined}
                                className="peer block w-full text-sm outline-2"
                                classNames={{inputWrapper: "bg-white pr-5 rounded-md border border-gray-200"}}
                            />
                        </div>
                        <div className="hidden md:flex w-full flex-wrap md:flex-nowrap gap-4">
                            <DateRangePicker
                                visibleMonths={2}
                                minValue={initialValue ? undefined : currentDate}
                                maxValue={initialValue ? undefined : twoMonthsLater}
                                onChange={handleChangeDate}
                                defaultValue={initialValue ? {start: parseDate(arrival.value), end: parseDate(departure.value)} : undefined}
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

                        <Dropdown classNames={{content: "rounded-md"}}>
                            <DropdownTrigger>
                                <button
                                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 bg-white text-gray-500 text-left px-4"
                                >
                                    {adults.value + children.value ? `Guests: ${adults.value + children.value}` : `Set guests`}
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu closeOnSelect={false}>
                                <DropdownItem key="adults">
                                    <div className="flex flex-row justify-between align-middle">
                                        <p className="mr-10">Adults (Age +13)</p>
                                        <div className="flex flex-row align-middle">
                                            <MinusCircleIcon className="w-5 h-5 text-gray-400"
                                                             onClick={handleDecrementAdults}/>
                                            <p className="w-[24px] text-center">{adults.value}</p>
                                            <PlusCircleIcon className="w-5 h-5 text-gray-400"
                                                            onClick={handleIncrementAdults}/>
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
                                    <p>{initialValue?.totalRate || totalRate}</p>
                                </div>
                                <CurrencyDollarIcon
                                    className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                            </div>
                        </div>
                    </div>
                </form>
                <GuestsForm
                    numOfGuests={adults.value + children.value}
                    guests={guests.value}
                    onChangeGuests={guests.onChange}
                />
            </div>

            {/* submit and cancel buttons */}
            <div className="mt-6 h-[0.5px] w-[300%] bg-gray-300"/>
            <div className="mt-6 flex justify-start gap-4">
                <ButtonLink
                    href={"/"}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    <p className="text-gray-500">Cancel</p>
                </ButtonLink>
                <Button
                    onClick={initialValue ? handleSubmit(handleUpdateReservation) : handleSubmit(handleCreateReservation)}
                >
                    {initialValue ? "Update" : "Reserve"}
                </Button>
            </div>
        </div>
    );
}
