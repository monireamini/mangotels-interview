"use client"

import ReservationsTable from "@/app/ui/table/table";
import {useSelector} from "react-redux";
import {RootState} from "@/app/redux/store";

export default function Page() {
    const {items: reservations} = useSelector((store: RootState) => store.reservations)

    return (
        <main className="flex min-h-screen flex-col p-6">
            <p className="text-xl md:text-3xl text-gray-700">
                <strong>Hotel Reservation</strong>
            </p>
            <div className="mt-4 flex grow bg-gray-50 rounded-lg px-6 py-10">
                <ReservationsTable reservations={reservations}/>
            </div>
        </main>
    );
}
