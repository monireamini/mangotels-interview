import {rooms, roomTypes} from "@/app/lib/mock-data";
import {AvailabilityItem, RoomType} from "@/app/lib/types";
import {differenceInDays, format, fromUnixTime} from "date-fns";

export const serverDateToTimestamp = ({date}: { date: string }) => {
    return new Date(date).getTime() / 1000
}

export function formatUnix({timestamp, formatString = "yyyy/MM/dd"}: {
    timestamp: number
    formatString?: string
}) {
    return format(fromUnixTime(timestamp), formatString)
}

function roomIsAvailableWithinDates({roomId, roomAvailability, arrival, departure}: {
    roomId: number,
    roomAvailability: AvailabilityItem[],
    arrival: string,
    departure: string
}): boolean {
    const arrivalTimestamp = serverDateToTimestamp({date: arrival})
    const numDays = differenceInDays(
        new Date(departure),
        new Date(arrival)
    );

    for (let i = 0; i < numDays; i++) {
        const checkTimestamp = arrivalTimestamp + i * 24 * 60 * 60
        const checkDate = formatUnix({timestamp: checkTimestamp})
        const availability = roomAvailability.find((item) => item.date === checkDate)
        if (!availability?.available) {
            return false
        }
    }

    return true
}

function isAtLeastOneRoomAvailableOfGivenRoomType({roomType, roomAvailability, arrivalDate, departureDate}: {
    roomType: RoomType,
    roomAvailability: AvailabilityItem[],
    arrivalDate: string
    departureDate: string
}): boolean {

    let oneRoomIsAvailable = false;

    for (const room of rooms.filter((room) => room.roomTypeId === roomType.id)) {
        const roomIsAvailable = roomIsAvailableWithinDates({
            roomId: room.id,
            roomAvailability: roomAvailability.filter((item) => item.roomId === room.id),
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

export function getAvailableRoomTypes({arrivalDate, departureDate, adults, children, roomAvailability}: {
    arrivalDate: string,
    departureDate: string,
    adults: number,
    children: number,
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
        const atLeastOneAvailableRoom = isAtLeastOneRoomAvailableOfGivenRoomType({
            roomType,
            roomAvailability,
            arrivalDate,
            departureDate
        })
        if (atLeastOneAvailableRoom) availableRoomTypes.push(roomType)
    }

    return availableRoomTypes;
}

export const generateAvailabilityData = (startDate: string, endDate: string): AvailabilityItem[] => {
    const availabilityData: AvailabilityItem[] = [];

    const startTimestamp = serverDateToTimestamp({date: startDate});
    const endTimestamp = serverDateToTimestamp({date: endDate});

    for (const room of rooms) {
        let date = startTimestamp;
        while (date <= endTimestamp) {
            // Simulate availability data
            const available = Math.random() < 0.7; // 70% chance of being available

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
