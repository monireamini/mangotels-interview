"use client"

import React, {useMemo} from "react";
import {useController, useForm} from "react-hook-form";
import * as z from "zod"
import {v4} from "uuid"
import {zodGuests, zodNumber, zodNumberAdults, zodString} from "@/app/lib/validations";
import {zodResolver} from "@hookform/resolvers/zod";
import {parseDate} from "@internationalized/date";
import {DateValue, RangeValue} from "@nextui-org/react";
import {Button} from "@/app/ui/button";
import {Guest, Reservation, ReservationStatus, RoomType} from "@/app/lib/definitions";
import {ButtonLink} from "@/app/ui/button-link";
import {calculateReservationRate, getAvailableRoomTypes} from "@/app/lib/utils";
import {useDispatch, useSelector} from "react-redux";
import {useFieldError} from "@/app/hooks/use-field-error";
import {GuestsForm} from "@/app/ui/forms/guests-form";
import {CREATE_RESERVATION, UPDATE_RESERVATION} from "@/app/redux/reducers/reservations-slice";
import {useRouter} from "next/navigation";
import {CREATE_GUEST} from "@/app/redux/reducers/guests-slice";
import {RootState} from "@/app/redux/store";
import {DatePicker} from "@/app/ui/form-fields/date-picker";
import {GuestsDropdown} from "@/app/ui/form-fields/guests-dropdown";
import {RoomTypeDropdown} from "@/app/ui/form-fields/room-type-dropdown";
import {TotalRate} from "@/app/ui/form-fields/total-rate";

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

    const {field: arrival} = useController<any>({
        control,
        defaultValue: initialValue?.arrivalDate || "",
        name: "arrival"
    })
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
        router.push('/')
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
        router.push('/')
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-10">
                <form className="max-w-[280px]">
                    {/* Arrival and departure date picker */}
                    <DatePicker
                        hasInitialValue={!!initialValue}
                        error={arrivalError}
                        defaultValue={initialValue ? {
                            start: parseDate(arrival.value),
                            end: parseDate(departure.value)
                        } : undefined}
                        onChange={handleChangeDate}
                    />

                    {/* Guests */}
                    <GuestsDropdown
                        adultsField={adults}
                        childrenField={children}
                        roomTypeIdField={roomTypeId}
                        error={adultsError}
                    />

                    {/* Room type*/}
                    <RoomTypeDropdown
                        roomTypeIdField={roomTypeId}
                        error={roomTypeError}
                        availableRoomTypes={availableRoomTypes}
                    />

                    {/* Total calculated rate */}
                    <TotalRate value={initialValue?.totalRate || totalRate}/>
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
