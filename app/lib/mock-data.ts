import {Guest, Reservation, ReservationStatus, Room, RoomType} from "@/app/lib/types";

export const initialReservations: Reservation[] = [
    {
        id: "a7c9e9f8-f9c4-4f9e-8b8d-b8d7c8e9f8a7",
        guestIds: ["b6d7e8f9-a0b1-4c2d-9e3f-4c5d6e7f8a9b", "c5d6e7f8-a9b0-4c1d-8e2f-3c4d5e6f7a8b", "d4e5f6a7-b8c9-4d0e-9f1f-2c3d4e5f6a7b"],
        roomTypeId: "e3f4a5b6-c7d8-4e9f-8f0f-1c2d3e4f5a6b",
        adults: 2,
        children: 1,
        arrivalDate: "2024-05-20",
        departureDate: "2024-05-24",
        totalRate: 550,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "f2a3b4c5-d6e7-4f8f-9f9f-0c1d2e3f4a5b",
        guestIds: ["a1b2c3d4-e5f6-4a7b-8c9d-9c0d1e2f3a4b"],
        roomTypeId: "b0c1d2e3-f4a5-4b6c-7d8e-8c9d0e1f2a3b",
        adults: 1,
        children: 0,
        arrivalDate: "2024-05-22",
        departureDate: "2024-05-25",
        totalRate: 675,
        status: ReservationStatus.Cancelled,
    },
    {
        id: "c9d0e1f2-a3b4-4c5d-6e7f-7c8d9e0f1a2b",
        guestIds: ["d8e9f0a1-b2c3-4d4e-5f6a-6c7d8e9f0a1b", "e7f8a9b0-c1d2-4e3f-4a5b-5c6d7e8f9a0b", "f6a7b8c9-d0e1-4f2f-3b4c-4c5d6e7f8a9b", "a5b6c7d8-e9f0-4a1b-2c3d-3c4d5e6f7a8b"],
        roomTypeId: "b4c5d6e7-f8a9-4b0c-1d2e-2c3d4e5f6a7b",
        adults: 2,
        children: 2,
        arrivalDate: "2024-05-25",
        departureDate: "2024-05-30",
        totalRate: 1250,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "c3d4e5f6-a7b8-4c9d-0e1f-1c2d3e4f5a6b",
        guestIds: ["d2e3f4a5-b6c7-4d8e-9f0a-0c1d2e3f4a5b", "e1f2a3b4-c5d6-4e7f-8a9b-9c0d1e2f3a4b"],
        roomTypeId: "f0a1b2c3-d4e5-4f6a-7b8c-8c9d0e1f2a3b",
        adults: 2,
        children: 0,
        arrivalDate: "2024-06-01",
        departureDate: "2024-06-05",
        totalRate: 400,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "a9b0c1d2-e3f4-4a5b-6c7d-7c8d9e0f1a2b",
        guestIds: ["b8c9d0e1-f2a3-4b4c-5d6e-6c7d8e9f0a1b", "c7d8e9f0-a1b2-4c3d-4e5f-5c6d7e8f9a0b", "d6e7f8a9-b0c1-4d2e-3f4a-4c5d6e7f8a9b"],
        roomTypeId: "e5f6a7b8-c9d0-4e1f-2a3b-3c4d5e6f7a8b",
        adults: 3,
        children: 0,
        arrivalDate: "2024-06-03",
        departureDate: "2024-06-07",
        totalRate: 750,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "f4a5b6c7-d8e9-4f0a-1b2c-2c3d4e5f6a7b",
        guestIds: ["a3b4c5d6-e7f8-4a9b-0c1d-1c2d3e4f5a6b", "b2c3d4e5-f6a7-4b8c-9d0e-0c1d2e3f4a5b", "c1d2e3f4-a5b6-4c7d-8e9f-9c0d1e2f3a4b"],
        roomTypeId: "d0e1f2a3-b4c5-4d6e-7f8a-8c9d0e1f2a3b",
        adults: 2,
        children: 1,
        arrivalDate: "2024-06-10",
        departureDate: "2024-06-15",
        totalRate: 1375,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "e9f0a1b2-c3d4-4e5f-6a7b-7c8d9e0f1a2b",
        guestIds: ["f8a9b0c1-d2e3-4f4a-5b6c-6c7d8e9f0a1b", "a7c9e9f8-f9c4-4f9e-8b8d-b8d7c8e9f8a7", "b6d7e8f9-a0b1-4c2d-9e3f-4c5d6e7f8a9b", "c5d6e7f8-a9b0-4c1d-8e2f-3c4d5e6f7a8b"],
        roomTypeId: "d4e5f6a7-b8c9-4d0e-9f1f-2c3d4e5f6a7b",
        adults: 4,
        children: 0,
        arrivalDate: "2024-06-12",
        departureDate: "2024-06-17",
        totalRate: 2500,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "f8a9b0c1-d2e3-4f4a-5b6c-6c7d8e9f0a1b",
        guestIds: ["d2e3f4a5-b6c7-4d8e-9f0a-0c1d2e3f4a5b", "e1f2a3b4-c5d6-4e7f-8a9b-9c0d1e2f3a4b"],
        roomTypeId: "b0c1d2e3-f4a5-4b6c-7d8e-8c9d0e1f2a3b",
        adults: 2,
        children: 0,
        arrivalDate: "2024-06-15",
        departureDate: "2024-06-20",
        totalRate: 750,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "a7c9e9f8-f9c4-4f9e-8b8d-b8d7c8e9f8a7",
        guestIds: ["b6d7e8f9-a0b1-4c2d-9e3f-4c5d6e7f8a9b"],
        roomTypeId: "e3f4a5b6-c7d8-4e9f-8f0f-1c2d3e4f5a6b",
        adults: 1,
        children: 0,
        arrivalDate: "2024-06-18",
        departureDate: "2024-06-22",
        totalRate: 400,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "b6d7e8f9-a0b1-4c2d-9e3f-4c5d6e7f8a9b",
        guestIds: ["c5d6e7f8-a9b0-4c1d-8e2f-3c4d5e6f7a8b", "d4e5f6a7-b8c9-4d0e-9f1f-2c3d4e5f6a7b", "a1b2c3d4-e5f6-4a7b-8c9d-9c0d1e2f3a4b", "d8e9f0a1-b2c3-4d4e-5f6a-6c7d8e9f0a1b"],
        roomTypeId: "b4c5d6e7-f8a9-4b0c-1d2e-2c3d4e5f6a7b",
        adults: 3,
        children: 1,
        arrivalDate: "2024-06-20",
        departureDate: "2024-06-25",
        totalRate: 1625,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "c5d6e7f8-a9b0-4c1d-8e2f-3c4d5e6f7a8b",
        guestIds: ["e7f8a9b0-c1d2-4e3f-4a5b-5c6d7e8f9a0b", "f6a7b8c9-d0e1-4f2f-3b4c-4c5d6e7f8a9b"],
        roomTypeId: "b0c1d2e3-f4a5-4b6c-7d8e-8c9d0e1f2a3b",
        adults: 2,
        children: 0,
        arrivalDate: "2024-06-22",
        departureDate: "2024-06-27",
        totalRate: 750,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "d4e5f6a7-b8c9-4d0e-9f1f-2c3d4e5f6a7b",
        guestIds: ["a5b6c7d8-e9f0-4a1b-2c3d-3c4d5e6f7a8b"],
        roomTypeId: "e3f4a5b6-c7d8-4e9f-8f0f-1c2d3e4f5a6b",
        adults: 1,
        children: 0,
        arrivalDate: "2024-06-25",
        departureDate: "2024-06-29",
        totalRate: 400,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "e3f4a5b6-c7d8-4e9f-8f0f-1c2d3e4f5a6b",
        guestIds: ["d2e3f4a5-b6c7-4d8e-9f0a-0c1d2e3f4a5b", "e1f2a3b4-c5d6-4e7f-8a9b-9c0d1e2f3a4b", "f0a1b2c3-d4e5-4f6a-7b8c-8c9d0e1f2a3b"],
        roomTypeId: "b4c5d6e7-f8a9-4b0c-1d2e-2c3d4e5f6a7b",
        adults: 2,
        children: 1,
        arrivalDate: "2024-06-28",
        departureDate: "2024-07-03",
        totalRate: 1375,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "b0c1d2e3-f4a5-4b6c-7d8e-8c9d0e1f2a3b",
        guestIds: ["b6d7e8f9-a0b1-4c2d-9e3f-4c5d6e7f8a9b", "c5d6e7f8-a9b0-4c1d-8e2f-3c4d5e6f7a8b", "d4e5f6a7-b8c9-4d0e-9f1f-2c3d4e5f6a7b", "a1b2c3d4-e5f6-4a7b-8c9d-9c0d1e2f3a4b"],
        roomTypeId: "d4e5f6a7-b8c9-4d0e-9f1f-2c3d4e5f6a7b",
        adults: 4,
        children: 0,
        arrivalDate: "2024-07-01",
        departureDate: "2024-07-06",
        totalRate: 2500,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "b4c5d6e7-f8a9-4b0c-1d2e-2c3d4e5f6a7b",
        guestIds: ["d8e9f0a1-b2c3-4d4e-5f6a-6c7d8e9f0a1b", "e7f8a9b0-c1d2-4e3f-4a5b-5c6d7e8f9a0b"],
        roomTypeId: "b0c1d2e3-f4a5-4b6c-7d8e-8c9d0e1f2a3b",
        adults: 2,
        children: 0,
        arrivalDate: "2024-07-03",
        departureDate: "2024-07-08",
        totalRate: 750,
        status: ReservationStatus.Confirmed,
    },
    {
        id: "f0a1b2c3-d4e5-4f6a-7b8c-8c9d0e1f2a3b",
        guestIds: ["f6a7b8c9-d0e1-4f2f-3b4c-4c5d6e7f8a9b"],
        roomTypeId: "e3f4a5b6-c7d8-4e9f-8f0f-1c2d3e4f5a6b",
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
        id: "b6d7e8f9-a0b1-4c2d-9e3f-4c5d6e7f8a9b",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
    },
    {
        id: "c5d6e7f8-a9b0-4c1d-8e2f-3c4d5e6f7a8b",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
    },
    {
        id: "d4e5f6a7-b8c9-4d0e-9f1f-2c3d4e5f6a7b",
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        phone: "5551234567",
    },
    {
        id: "a1b2c3d4-e5f6-4a7b-8c9d-9c0d1e2f3a4b",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        phone: "7778889999",
    },
    {
        id: "d8e9f0a1-b2c3-4d4e-5f6a-6c7d8e9f0a1b",
        name: "David Wilson",
        email: "david.wilson@example.com",
        phone: "1112223333",
    },
    {
        id: "e7f8a9b0-c1d2-4e3f-4a5b-5c6d7e8f9a0b",
        name: "Sarah Thompson",
        email: "sarah.thompson@example.com",
        phone: "4445556666",
    },
    {
        id: "f6a7b8c9-d0e1-4f2f-3b4c-4c5d6e7f8a9b",
        name: "Robert Anderson",
        email: "robert.anderson@example.com",
        phone: "7778889999",
    },
    {
        id: "a5b6c7d8-e9f0-4a1b-2c3d-3c4d5e6f7a8b",
        name: "Jessica Taylor",
        email: "jessica.taylor@example.com",
        phone: "1112223333",
    },
    {
        id: "d2e3f4a5-b6c7-4d8e-9f0a-0c1d2e3f4a5b",
        name: "William Brown",
        email: "william.brown@example.com",
        phone: "9876543210",
    },
    {
        id: "e1f2a3b4-c5d6-4e7f-8a9b-9c0d1e2f3a4b",
        name: "Olivia Garcia",
        email: "olivia.garcia@example.com",
        phone: "0123456789",
    },
    {
        id: "f0a1b2c3-d4e5-4f6a-7b8c-8c9d0e1f2a3b",
        name: "James Martinez",
        email: "james.martinez@example.com",
        phone: "5555555555",
    },
    {
        id: "a3b4c5d6-e7f8-4a9b-0c1d-1c2d3e4f5a6b",
        name: "Sophia Rodriguez",
        email: "sophia.rodriguez@example.com",
        phone: "1111111111",
    },
];

export const roomTypes: RoomType[] = [
    {
        id: "e3f4a5b6-c7d8-4e9f-8f0f-1c2d3e4f5a6b",
        name: "Standard Room",
        baseRate: 100,
        maxOccupancy: 2,
    },
    {
        id: "b0c1d2e3-f4a5-4b6c-7d8e-8c9d0e1f2a3b",
        name: "Deluxe Room",
        baseRate: 150,
        maxOccupancy: 4,
    },
    {
        id: "b4c5d6e7-f8a9-4b0c-1d2e-2c3d4e5f6a7b",
        name: "Suite",
        baseRate: 250,
        maxOccupancy: 6,
    },
    {
        id: "f0a1b2c3-d4e5-4f6a-7b8c-8c9d0e1f2a3b",
        name: "Presidential Suite",
        baseRate: 500,
        maxOccupancy: 8,
    },
];

export const rooms: Room[] = [
    {
        id: "a1b2c3d4-e5f6-4a7b-8c9d-9c0d1e2f3a4b",
        roomTypeId: "e3f4a5b6-c7d8-4e9f-8f0f-1c2d3e4f5a6b", // Standard Room
        roomNumber: 101,
    },
    {
        id: "d8e9f0a1-b2c3-4d4e-5f6a-6c7d8e9f0a1b",
        roomTypeId: "e3f4a5b6-c7d8-4e9f-8f0f-1c2d3e4f5a6b", // Standard Room
        roomNumber: 102,
    },
    {
        id: "e7f8a9b0-c1d2-4e3f-4a5b-5c6d7e8f9a0b",
        roomTypeId: "b0c1d2e3-f4a5-4b6c-7d8e-8c9d0e1f2a3b", // Deluxe Room
        roomNumber: 201,
    },
    {
        id: "f6a7b8c9-d0e1-4f2f-3b4c-4c5d6e7f8a9b",
        roomTypeId: "b0c1d2e3-f4a5-4b6c-7d8e-8c9d0e1f2a3b", // Deluxe Room
        roomNumber: 202,
    },
    {
        id: "a5b6c7d8-e9f0-4a1b-2c3d-3c4d5e6f7a8b",
        roomTypeId: "b4c5d6e7-f8a9-4b0c-1d2e-2c3d4e5f6a7b", // Suite
        roomNumber: 301,
    },
    {
        id: "d2e3f4a5-b6c7-4d8e-9f0a-0c1d2e3f4a5b",
        roomTypeId: "f0a1b2c3-d4e5-4f6a-7b8c-8c9d0e1f2a3b", // Presidential Suite
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
