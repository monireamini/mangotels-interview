import {roomTypes} from "@/app/lib/placeholder-data";
import {Room} from "@/app/lib/definitions";
import {getAvailableRoomTypes} from "@/app/lib/utils";

const rooms: Room[] = [
    {id: '1', roomNumber: 101, roomTypeId: roomTypes[0].id}, // Standard Room: max occupancy 2
    {id: '2', roomNumber: 201, roomTypeId: roomTypes[1].id} // Deluxe Room: max occupancy 4
]

const roomAvailability = [
    {roomId: '1', date: '2024/05/24', available: true},
    {roomId: '1', date: '2024/05/25', available: true},
    {roomId: '2', date: '2024/05/24', available: false}, // Not available
    {roomId: '2', date: '2024/05/25', available: true},
];

describe('getAvailableRoomTypes', () => {
    it('should return available room types for valid input', () => {
        const availableRoomTypes = getAvailableRoomTypes({
            arrivalDate: '2024/05/24',
            departureDate: '2024/05/25',
            adults: 1,
            children: 0,
            rooms,
            roomAvailability
        })

        // Ensure the correct room types are returned
        expect(availableRoomTypes.length).toEqual(1);
        expect(availableRoomTypes[0].id).toEqual(roomTypes[0].id);
    });

    it('should return empty array if number of guests is more than room max occupancy', () => {
        const availableRoomTypes = getAvailableRoomTypes({
            arrivalDate: '2024/05/24',
            departureDate: '2024/05/25',
            adults: 4,
            children: 1,
            rooms,
            roomAvailability
        });

        expect(availableRoomTypes).toEqual([]);
    });

    it('should return empty array if no guests provided', () => {
        const availableRoomTypes = getAvailableRoomTypes({
            arrivalDate: '2024/05/24',
            departureDate: '2024/05/25',
            adults: 0,
            children: 0,
            rooms,
            roomAvailability
        });

        expect(availableRoomTypes).toEqual([]);
    });

    it('should return empty array if arrival or departure date is missing', () => {
        const availableRoomTypes = getAvailableRoomTypes({
            arrivalDate: '',
            departureDate: '2024/05/25',
            adults: 1,
            children: 0,
            rooms,
            roomAvailability
        });

        expect(availableRoomTypes).toEqual([]);
    });
});
