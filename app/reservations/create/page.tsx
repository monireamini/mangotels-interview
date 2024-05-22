import Form from "@/app/ui/reservations/create-form";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <p className="text-xl md:text-3xl text-gray-700">
                <strong>Create a new Reservation</strong>
            </p>
            <div className="mt-4 flex grow bg-gray-50 rounded-lg px-6 py-10">
                <Form customers={[]} />
            </div>
        </main>
    );
}
