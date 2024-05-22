import {Reservation, ReservationStatus} from "@/app/lib/types";

export const initialReservations: Reservation[] = [
    {
        id: 1,
        guestIds: [1, 2, 3],
        roomTypeId: 1,
        adults: 2,
        children: 1,
        arrivalDate: "2024-05-20",
        departureDate: "2024-05-24",
        totalRate: 550,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 2,
        guestIds: [4],
        roomTypeId: 2,
        adults: 1,
        children: 0,
        arrivalDate: "2024-05-22",
        departureDate: "2024-05-25",
        totalRate: 675,
        status: ReservationStatus.Cancelled,
    },
    {
        id: 3,
        guestIds: [5, 6, 7, 8],
        roomTypeId: 3,
        adults: 4,
        children: 2,
        arrivalDate: "2024-05-25",
        departureDate: "2024-05-30",
        totalRate: 1250,
        status: ReservationStatus.Confirmed,
    },
];

export const guests: Guest[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
    },
    {
        id: 3,
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        phone: "5551234567",
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "7778889999",
    },
    {
        id: 5,
        name: "David Wilson",
        email: "david.wilson@example.com",
        phone: "1112223333",
    },
    {
        id: 6,
        name: "Sarah Thompson",
        email: "sarah.thompson@example.com",
        phone: "4445556666",
    },
    {
        id: 7,
        name: "Robert Anderson",
        email: "robert.anderson@example.com",
        phone: "7778889999",
    },
    {
        id: 8,
        name: "Jessica Taylor",
        email: "jessica.taylor@example.com",
        phone: "1112223333",
    },
];
