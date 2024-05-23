import {Guest, Reservation, ReservationStatus, Room, RoomType} from "@/app/lib/types";

// @todo: keep this list in redux store and update the list after creating, editing or cancelling a reservation
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
        adults: 2,
        children: 2,
        arrivalDate: "2024-05-25",
        departureDate: "2024-05-30",
        totalRate: 1250,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 4,
        guestIds: [11, 12],
        roomTypeId: 1,
        adults: 2,
        children: 0,
        arrivalDate: "2024-06-01",
        departureDate: "2024-06-05",
        totalRate: 400,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 5,
        guestIds: [1, 4, 7],
        roomTypeId: 2,
        adults: 3,
        children: 0,
        arrivalDate: "2024-06-03",
        departureDate: "2024-06-07",
        totalRate: 750,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 6,
        guestIds: [2, 5, 8],
        roomTypeId: 3,
        adults: 2,
        children: 1,
        arrivalDate: "2024-06-10",
        departureDate: "2024-06-15",
        totalRate: 1375,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 7,
        guestIds: [3, 6, 9, 12],
        roomTypeId: 4,
        adults: 4,
        children: 0,
        arrivalDate: "2024-06-12",
        departureDate: "2024-06-17",
        totalRate: 2500,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 8,
        guestIds: [10, 11],
        roomTypeId: 2,
        adults: 2,
        children: 0,
        arrivalDate: "2024-06-15",
        departureDate: "2024-06-20",
        totalRate: 750,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 9,
        guestIds: [1],
        roomTypeId: 1,
        adults: 1,
        children: 0,
        arrivalDate: "2024-06-18",
        departureDate: "2024-06-22",
        totalRate: 400,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 10,
        guestIds: [2, 3, 4, 5],
        roomTypeId: 3,
        adults: 3,
        children: 1,
        arrivalDate: "2024-06-20",
        departureDate: "2024-06-25",
        totalRate: 1625,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 11,
        guestIds: [6, 7],
        roomTypeId: 2,
        adults: 2,
        children: 0,
        arrivalDate: "2024-06-22",
        departureDate: "2024-06-27",
        totalRate: 750,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 12,
        guestIds: [8],
        roomTypeId: 1,
        adults: 1,
        children: 0,
        arrivalDate: "2024-06-25",
        departureDate: "2024-06-29",
        totalRate: 400,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 13,
        guestIds: [9, 10, 11],
        roomTypeId: 3,
        adults: 2,
        children: 1,
        arrivalDate: "2024-06-28",
        departureDate: "2024-07-03",
        totalRate: 1375,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 14,
        guestIds: [1, 2, 3, 4],
        roomTypeId: 4,
        adults: 4,
        children: 0,
        arrivalDate: "2024-07-01",
        departureDate: "2024-07-06",
        totalRate: 2500,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 15,
        guestIds: [5, 6],
        roomTypeId: 2,
        adults: 2,
        children: 0,
        arrivalDate: "2024-07-03",
        departureDate: "2024-07-08",
        totalRate: 750,
        status: ReservationStatus.Confirmed,
    },
    {
        id: 16,
        guestIds: [7],
        roomTypeId: 1,
        adults: 1,
        children: 0,
        arrivalDate: "2024-07-06",
        departureDate: "2024-07-10",
        totalRate: 400,
        status: ReservationStatus.Confirmed,
    },
];

export const initialGuests: Guest[] = [
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
    {
        id: 9,
        name: "William Brown",
        email: "william.brown@example.com",
        phone: "9876543210",
    },
    {
        id: 10,
        name: "Olivia Garcia",
        email: "olivia.garcia@example.com",
        phone: "0123456789",
    },
    {
        id: 11,
        name: "James Martinez",
        email: "james.martinez@example.com",
        phone: "5555555555",
    },
    {
        id: 12,
        name: "Sophia Rodriguez",
        email: "sophia.rodriguez@example.com",
        phone: "1111111111",
    },
];

export const roomTypes: RoomType[] = [
    {
        id: 1,
        name: "Standard Room",
        baseRate: 100,
        maxOccupancy: 2,
    },
    {
        id: 2,
        name: "Deluxe Room",
        baseRate: 150,
        maxOccupancy: 4,
    },
    {
        id: 3,
        name: "Suite",
        baseRate: 250,
        maxOccupancy: 6,
    },
    {
        id: 4,
        name: "Presidential Suite",
        baseRate: 500,
        maxOccupancy: 8,
    },
];

export const rooms: Room[] = [
    {
        id: 1,
        roomTypeId: 1, // Standard Room
        roomNumber: 101,
    },
    {
        id: 2,
        roomTypeId: 1, // Standard Room
        roomNumber: 102,
    },
    {
        id: 3,
        roomTypeId: 2, // Deluxe Room
        roomNumber: 201,
    },
    {
        id: 4,
        roomTypeId: 2, // Deluxe Room
        roomNumber: 202,
    },
    {
        id: 5,
        roomTypeId: 3, // Suite
        roomNumber: 301,
    },
    {
        id: 6,
        roomTypeId: 4, // Presidential Suite
        roomNumber: 401,
    },
];

export const weekdayRates = {
    1: 1.1, // Monday
    2: 1.1, // Tuesday
    3: 1.2, // Wednesday
    4: 1.2, // Thursday
    5: 1.3, // Friday
    6: 1.5, // Saturday
    0: 1.5, // Sunday
};

