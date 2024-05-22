import Image from 'next/image';
import Search from '@/app/ui/search';
import {Button} from "@/app/ui/button";

export default async function ReservationsTable({
                                                    reservations,
                                                }: {
    reservations: Reservation[];
}) {
    return (
        <div className="w-full">
            <Search placeholder="Search reservations..."/>
            <div className="mt-4 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-gray-50 md:pt-0">
                            {/* for small screens */}
                            <div className="md:hidden">
                                {reservations?.map((reservation) => (
                                    <div
                                        key={reservation.id}
                                        className="mb-2 w-full rounded-md bg-white p-4"
                                    >
                                        <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center gap-3">
                                                    <p>ID {reservation.id}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="flex w-full items-center justify-between border-b border-gray-50 py-5">
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Guest name(s)</p>
                                                <p className="font-medium">{reservation.guestIds.toString()}</p>
                                            </div>
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Number of guests (adults + children)</p>
                                                <p className="font-medium">
                                                    {reservation.adults + " + " + reservation.children + " = " + (reservation.adults + reservation.children)}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className="flex w-full items-center justify-between border-b border-gray-50 py-5">
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Arrival</p>
                                                <p className="font-medium">{reservation.arrivalDate}</p>
                                            </div>
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Departure</p>
                                                <p className="font-medium">{reservation.departureDate}</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center justify-between py-5">
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Room type</p>
                                                <p className="font-medium">{reservation.roomTypeId}</p>
                                            </div>
                                            <div className="flex w-1/2 flex-col">
                                                <p className="text-xs">Total rate</p>
                                                <p className="font-medium">${reservation.totalRate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <Button className="mr-2">Edit</Button>
                                            <Button
                                                className="bg-red-500 hover:bg-red-400 active:bg-red-600 focus-visible:outline-red-500">
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* for medium and large screens */}
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
                                        Number of guests (adults + children)
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
                                {reservations.map((reservation) => (
                                    <tr key={reservation.id} className="group text-center">
                                        <td className="whitespace-nowrap bg-white rounded-l-lg py-5 px-2 text-sm">
                                            {reservation.id}
                                        </td>
                                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm">
                                            {reservation.guestIds.toString()}
                                        </td>
                                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm">
                                            {reservation.arrivalDate}
                                        </td>
                                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm">
                                            {reservation.departureDate}
                                        </td>
                                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                                            {reservation.roomTypeId}
                                        </td>
                                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                                            {reservation.adults + " + " + reservation.children + " = " + (reservation.adults + reservation.children)}
                                        </td>
                                        <td className="whitespace-nowrap bg-white py-5 px-2 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                                            ${reservation.totalRate}
                                        </td>
                                        <td className="flex justify-center whitespace-nowrap bg-white py-5 px-2 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md rounded-r-lg">
                                            <Button className="mr-2">Edit</Button>
                                            <Button
                                                className="bg-red-500 hover:bg-red-400 active:bg-red-600 focus-visible:outline-red-500">
                                                Cancel
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
