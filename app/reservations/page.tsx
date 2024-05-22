import ReservationsTable from "@/app/ui/reservations/table";
import {initialReservations} from "@/app/lib/mock-data";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <p className="text-xl md:text-3xl text-gray-700">
                <strong>Hotel Reservation</strong>
            </p>
            <div className="mt-4 flex grow bg-gray-50 rounded-lg px-6 py-10">
                <ReservationsTable reservations={initialReservations}/>
            </div>
        </main>
    );
}
