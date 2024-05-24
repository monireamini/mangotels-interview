import React from 'react';
import {Guest, Reservation} from "@/app/lib/definitions";
import {roomTypes} from "@/app/lib/placeholder-data";
import {Button} from "@/app/ui/button";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/app/redux/store";

export const TableContentDesktop = ({currentPageReservations, setActiveReservationId, onOpen}: {
    currentPageReservations: Reservation[], setActiveReservationId: (id: string) => void; onOpen: () => void;
}) => {

    const router = useRouter()
    const {items: initialGuests} = useSelector((store: RootState) => store.guests)

    return (
        <table className="hidden min-w-full rounded-md text-gray-900 md:table">
            <thead className="rounded-md bg-gray-50 text-center text-sm font-normal">
            <tr>
                <th scope="col" className="py-5 px-2 font-medium">
                    Reservation ID
                </th>
                <th scope="col" className="py-5 px-2 font-medium">
                    Guest name(s)
                </th>
                <th scope="col" className="py-5 px-2 font-medium">
                    Arrival
                </th>
                <th scope="col" className="py-5 px-2 font-medium">
                    Departure
                </th>
                <th scope="col" className="py-5 px-2 font-medium">
                    Room type
                </th>
                <th scope="col" className="py-5 px-2 font-medium">
                    adults + children
                </th>
                <th scope="col" className="py-5 px-2 font-medium">
                    Total rate
                </th>
                <th scope="col" className="py-5 px-2 font-medium">
                    Actions
                </th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-gray-900">
            {currentPageReservations.map((reservation) => {
                function handleOpenModal() {
                    setActiveReservationId(reservation.id)
                    onOpen()
                }

                function handleEdit() {
                    router.push(`/update/${reservation.id}`)
                }

                return (
                    <tr key={reservation.id} className="group text-center">
                        <td className="whitespace-nowrap bg-white rounded-l-lg py-5 px-2 text-sm">
                            {reservation.id.slice(0, 10) + "..."}
                        </td>
                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm">
                            {/* @todo: define a function for retrieving guest names from guestIds */}
                            {reservation.guestIds.map((guestId: Guest["id"]) => initialGuests.find((guest: Guest) => guest.id === guestId)?.name || "No name").join(" | ")}
                        </td>
                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm">
                            {reservation.arrivalDate}
                        </td>
                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm">
                            {reservation.departureDate}
                        </td>
                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                            {roomTypes.find((roomType) => roomType.id === reservation.roomTypeId)?.name || "Unknown room type"}
                        </td>
                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                            {reservation.adults + " + " + reservation.children + " = " + (reservation.adults + reservation.children)}
                        </td>
                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                            ${reservation.totalRate}
                        </td>
                        <td className="flex justify-center whitespace-nowrap bg-white py-5 px-2 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md rounded-r-lg">
                            <Button className="mr-2" onClick={handleEdit}>Edit</Button>
                            <Button
                                className="bg-red-500 hover:bg-red-400 active:bg-red-600 focus-visible:outline-red-500"
                                onClick={handleOpenModal}
                            >
                                Cancel
                            </Button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}