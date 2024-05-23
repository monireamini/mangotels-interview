import {describe} from "node:test";
import {getAvailableRoomTypes} from "@/app/lib/utility";
import {expect} from "sucrase/dist/types/parser/traverser/util";

describe('getAvailableRoomTypes', () => {
    const roomTypes = [
        { id: 1, name: 'Standard', maxOccupancy: 2 },
        { id: 2, name: 'Deluxe', maxOccupancy: 4 },
        { id: 3, name: 'Suite', maxOccupancy: 6 },
    ];

    const rooms = [
        { id: 1, roomTypeId: 1 },
        { id: 2, roomTypeId: 1 },
        { id: 3, roomTypeId: 2 },
        { id: 4, roomTypeId: 2 },
        { id: 5, roomTypeId: 3 },
    ];

    const availabilityData = [
        { roomId: 1, date: '2023-06-01', available: true },
        { roomId: 1, date: '2023-06-02', available: false },
        { roomId: 2, date: '2023-06-01', available: true },
        { roomId: 2, date: '2023-06-02', available: true },
        { roomId: 3, date: '2023-06-01', available: false },
        { roomId: 3, date: '2023-06-02', available: true },
        { roomId: 4, date: '2023-06-01', available: true },
        { roomId: 4, date: '2023-06-02', available: true },
        { roomId: 5, date: '2023-06-01', available: true },
        { roomId: 5, date: '2023-06-02', available: false },
    ];

    it('should return available room types for given dates and number of guests', () => {
        const arrivalDate = '2023-06-01';
        const departureDate = '2023-06-03';
        const adults = 2;
        const children = 2;

        const availableRoomTypes = getAvailableRoomTypes(
            {
                arrivalDate,
                departureDate,
                adults,
                children,
            }
        );

        expect(availableRoomTypes).toHaveLength(2);
        expect(availableRoomTypes).toContainEqual(roomTypes[0]); // Standard
        expect(availableRoomTypes).toContainEqual(roomTypes[1]); // Deluxe
    });

    it('should return empty array if no room types are available', () => {
        const arrivalDate = '2023-06-01';
        const departureDate = '2023-06-03';
        const numGuests = 8;

        const availableRoomTypes = getAvailableRoomTypes(
            {
                arrivalDate,
                departureDate,
                adults,
                children,
            }
        );

        expect(availableRoomTypes).toHaveLength(0);
    });
});
