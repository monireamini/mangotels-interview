import Search from '@/app/ui/search';
import {Button} from "@/app/ui/button";
import {roomTypes} from "@/app/lib/placeholder-data";
import {Guest, Reservation} from "@/app/lib/definitions";
import {PlusIcon} from '@heroicons/react/24/outline';
import {ButtonLink} from "@/app/ui/button-link";
import {Modal, ModalBody, ModalContent, ModalFooter, Pagination, useDisclosure} from '@nextui-org/react';
import {ModalHeader} from "@nextui-org/modal";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CANCEL_RESERVATION} from "@/app/redux/reducers/reservations-slice";
import {useRouter} from "next/navigation";

const pageSize = 5

export default function ReservationsTable({reservations}: {
    reservations: Reservation[];
}) {

    const {items: initialGuests} = useSelector(state => state.guests)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [activeReservationId, setActiveReservationId] = useState<string | null>(null);

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const currentPageReservations = reservations.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const router = useRouter()
    return (
        <div className="w-full">
            {/* @todo: handle search */}
            <div className="flex flex-row justify-between">
                <Search placeholder="Search reservations..."/>
                <ButtonLink href="/create" className="hidden md:flex ml-2 md:ml-4">Create a new
                    reservation</ButtonLink>
                <ButtonLink href="/create" className="md:hidden ml-2 md:ml-4">
                    <PlusIcon className="h-[18px] w-[18px]"/>
                </ButtonLink>
            </div>
            <div className="mt-4 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-gray-50 md:pt-0">
                            {/* for small screens */}
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
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => {
                        function handleCancelReservation() {
                            dispatch(CANCEL_RESERVATION(activeReservationId))
                            onClose()
                        }

                        return (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Cancel a reservation</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Are you sure you want to cancel the reservation #{activeReservationId}?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        className="bg-red-500 hover:bg-red-400 active:bg-red-600 focus-visible:outline-red-500"
                                        onClick={handleCancelReservation}
                                    >
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </>
                        )
                    }}
                </ModalContent>
            </Modal>


            <div className="mt-4">
                <Pagination
                    loop
                    showControls
                    total={Math.ceil(reservations.length / pageSize)}
                    initialPage={1}
                    onChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
