import {roomTypes, weekdayRates} from "@/app/lib/placeholder-data";
import {AvailabilityItem, Room, RoomType} from "@/app/lib/definitions";
import {differenceInDays, format, fromUnixTime} from "date-fns";

export const dateStringToTimestamp = ({date}: { date: string }) => {
    return new Date(date).getTime() / 1000
}

export function formatUnix({timestamp, formatString = "yyyy/MM/dd"}: {
    timestamp: number
    formatString?: string
}) {
    return format(fromUnixTime(timestamp), formatString)
}

function checkRoomAvailability({roomId, roomAvailability, arrival, departure}: {
    roomId: string,
    roomAvailability: AvailabilityItem[],
    arrival: string,
    departure: string
}): boolean {
    const thisRoomAvailability = roomAvailability.filter((item) => item.roomId === roomId)
    const arrivalTimestamp = dateStringToTimestamp({date: arrival})
    const numDays = differenceInDays(
        new Date(departure),
        new Date(arrival)
    );

    for (let i = 0; i < numDays; i++) {
        const checkTimestamp = arrivalTimestamp + i * 24 * 60 * 60
        const checkDate = formatUnix({timestamp: checkTimestamp})
        const availability = thisRoomAvailability.find((item) => item.date === checkDate)
        if (!availability?.available) {
            return false
        }
    }

    return true
}

function isRoomTypeAvailable({rooms, roomType, roomAvailability, arrivalDate, departureDate}: {
    rooms: Room[],
    roomType: RoomType,
    roomAvailability: AvailabilityItem[],
    arrivalDate: string
    departureDate: string
}): boolean {

    let oneRoomIsAvailable = false;

    for (const room of rooms.filter((room) => room.roomTypeId === roomType.id)) {
        const roomIsAvailable = checkRoomAvailability({
            roomId: room.id,
            roomAvailability,
            arrival: arrivalDate,
            departure: departureDate
        })

        if (roomIsAvailable) {
            oneRoomIsAvailable = true
            break
        }
    }

    return oneRoomIsAvailable
}

export function getAvailableRoomTypes({arrivalDate, departureDate, adults, children, rooms, roomAvailability}: {
    arrivalDate: string,
    departureDate: string,
    adults: number,
    children: number,
    rooms: Room[]
    roomAvailability: AvailabilityItem[]
}) {
    const availableRoomTypes: RoomType[] = [];

    const numGuests = adults + children

    if (numGuests === 0 || !arrivalDate || !departureDate || !adults) return availableRoomTypes

    // Filter out room types with insufficient maximum occupancy
    const eligibleRoomTypes = roomTypes.filter(
        (roomType) => roomType.maxOccupancy >= numGuests
    );

    // Check availability for each eligible room type
    for (const roomType of eligibleRoomTypes) {
        const atLeastOneAvailableRoom = isRoomTypeAvailable({
            rooms,
            roomType,
            roomAvailability,
            arrivalDate,
            departureDate
        })
        if (atLeastOneAvailableRoom) availableRoomTypes.push(roomType)
    }

    return availableRoomTypes;
}

export const generateAvailabilityData = (rooms: Room[], startDate: string, endDate: string): AvailabilityItem[] => {
    const availabilityData: AvailabilityItem[] = [];

    const startTimestamp = dateStringToTimestamp({date: startDate});
    const endTimestamp = dateStringToTimestamp({date: endDate});

    for (const room of rooms) {
        let date = startTimestamp;
        while (date <= endTimestamp) {
            // Simulate availability data
            const available = Math.random() < 0.9; // 90% chance of being available

            availabilityData.push({
                roomId: room.id,
                date: formatUnix({timestamp: date}),
                available,
            });

            date = date + 24 * 60 * 60 // Increment by 1 day
        }
    }

    return availabilityData;
};

export function calculateReservationRate(roomTypeId: string, arrival: string, departure: string): number {
    const roomType = roomTypes.find((type) => type.id === roomTypeId);
    if (!roomType || !arrival || !departure) return 0

    const nights = differenceInDays(
        new Date(departure),
        new Date(arrival)
    );

    let totalRate = 0;

    for (let i = 0; i < nights; i++) {
        const date = new Date(arrival);
        date.setDate(date.getDate() + i);
        const dayOfWeek: number = date.getDay();

        const baseRate = roomType.baseRate;
        const weekdayRate = weekdayRates[dayOfWeek];
        const nightlyRate = baseRate * weekdayRate;

        totalRate += nightlyRate;
    }

    return totalRate;
}
