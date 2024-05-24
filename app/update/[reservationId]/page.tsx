"use client"

import CreateReservationForm from "@/app/ui/create-form";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {Reservation} from "@/app/lib/definitions";
import {RootState} from "@/app/redux/store";

export default function Page({params}: { params: { reservationId: string } }) {
    const {items: reservations} = useSelector((store: RootState) => store.reservations)

    const reservation = useMemo(() => reservations.find((reservation: Reservation) => reservation.id === params.reservationId), [params.reservationId, reservations])

    return (
        <main className="flex min-h-screen flex-col p-6">
            <p className="text-xl md:text-3xl text-gray-700">
                <strong>Update Reservation</strong>
            </p>
            <div className="mt-4 flex grow bg-gray-50 rounded-lg px-6 py-10">
                <CreateReservationForm initialValue={reservation}/>
            </div>
        </main>
    );
}
