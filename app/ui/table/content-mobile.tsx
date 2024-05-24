import React from 'react';
import {Guest, Reservation} from "@/app/lib/definitions";
import {roomTypes} from "@/app/lib/placeholder-data";
import {Button} from "@/app/ui/button";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/app/redux/store";

export const TableContentMobile = ({currentPageReservations, setActiveReservationId, onOpen}: {
    currentPageReservations: Reservation[], setActiveReservationId: (id: string) => void; onOpen: () => void;
}) => {

    const router = useRouter()
    const {items: initialGuests} = useSelector((store: RootState) => store.guests)


    return (
        <div className="md:hidden">
            {currentPageReservations?.map((reservation) => {
                function handleOpenModal() {
                    setActiveReservationId(reservation.id)
                    onOpen()
                }

                function handleEdit() {
                    router.push(`/update/${reservation.id}`)
                }

                return (
                    <div
                        key={reservation.id}
                        className="mb-2 w-full rounded-md bg-white p-4"
                    >
                        <div
                            className="flex items-start justify-between border-b border-gray-50 pb-4">
                            <div className="flex items-center">
                                <div className="flex items-center gap-3">
                                    <p>ID {reservation.id}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex w-full items-start justify-between border-b border-gray-50 py-5 gap-2">
                            <div className="flex w-100 flex-col">
                                <p className="text-xs">Guest name(s)</p>
                                <p className="font-medium">{reservation.guestIds.map((guestId: Guest["id"]) => initialGuests.find((guest: Guest) => guest.id === guestId)?.name || "No name").join(", ")}</p>
                            </div>
                        </div>
                        <div
                            className="flex w-full items-start justify-between border-b border-gray-50 py-5 gap-2">
                            <div className="flex w-100 flex-col">
                                <p className="text-xs">adults + children</p>
                                <p className="font-medium">
                                    {reservation.adults + " + " + reservation.children + " = " + (reservation.adults + reservation.children)}
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex w-full items-start justify-between border-b border-gray-50 py-5 gap-2">
                            <div className="flex w-1/2 flex-col">
                                <p className="text-xs">Arrival</p>
                                <p className="font-medium">{reservation.arrivalDate}</p>
                            </div>
                            <div className="flex w-1/2 flex-col">
                                <p className="text-xs">Departure</p>
                                <p className="font-medium">{reservation.departureDate}</p>
                            </div>
                        </div>
                        <div className="flex w-full items-start justify-between py-5 gap-2">
                            <div className="flex w-1/2 flex-col">
                                <p className="text-xs">Room type</p>
                                {/* todo: add a function for retrieving room type from root type id*/}
                                <p className="font-medium">{roomTypes.find((roomType) => roomType.id === reservation.roomTypeId)?.name || "Unknown room type"}</p>
                            </div>
                            <div className="flex w-1/2 flex-col">
                                <p className="text-xs">Total rate</p>
                                <p className="font-medium">${reservation.totalRate}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <Button className="mr-2" onClick={handleEdit}>Edit</Button>
                            <Button
                                className="bg-red-500 hover:bg-red-400 active:bg-red-600 focus-visible:outline-red-500"
                                onClick={handleOpenModal}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}