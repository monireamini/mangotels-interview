"use client"

import ReservationsTable from "@/app/ui/table/table";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/redux/store";
import {Button} from "@/app/ui/button";
import {RESET_RESERVATIONS} from "@/app/redux/reducers/reservations-slice";
import {RESET_GUESTS} from "@/app/redux/reducers/guests-slice";

export default function Page() {
    const {items: reservations} = useSelector((store: RootState) => store.reservations)

    const dispatch = useDispatch();

    function handleClearLocalStorage() {
        dispatch(RESET_RESERVATIONS())
        dispatch(RESET_GUESTS())
    }

    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex flex-row items-center justify-between">
                <p className="text-xl md:text-3xl text-gray-700">
                    <strong>Hotel Reservation</strong>
                </p>

                <Button
                    onClick={handleClearLocalStorage}
                    className="w-[180px] justify-center bg-amber-500 hover:bg-amber-400 active:bg-amber-600 focus-visible:outline-amber-500"
                >
                    Reset Local Storage
                </Button>
            </div>
            <div className="mt-4 flex grow bg-gray-50 rounded-lg px-6 py-10">
                <ReservationsTable reservations={reservations}/>
            </div>
        </main>
    );
}
