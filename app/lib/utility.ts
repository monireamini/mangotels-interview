import {rooms, roomTypes} from "@/app/lib/mock-data";
import {AvailabilityData, RoomType} from "@/app/lib/types";
import {addDays, differenceInDays, format, fromUnixTime} from "date-fns";

export const serverDateToTimestamp = ({date}: { date: string }) => {
    return new Date(date).getTime() / 1000
}

export function formatUnix({timestamp, formatString = "yyyy/MM/dd"}: {
    timestamp: number
    formatString?: string
}) {
    return format(fromUnixTime(timestamp), formatString)
}

export function getAvailableRoomTypes({arrivalDate, departureDate, adults, children}: {
    arrivalDate: string,
    departureDate: string,
    adults: number,
    children: number
}) {
    const availableRoomTypes: RoomType[] = [];

    const numGuests = adults + children

    if (numGuests === 0 || !arrivalDate || !departureDate || !adults) return availableRoomTypes

    // Filter out room types with insufficient maximum occupancy
    const eligibleRoomTypes = roomTypes.filter(
        (roomType) => roomType.maxOccupancy >= numGuests
    );

    // @fixme: store availability data in redux store and use it here not generating every time
    const availabilityData: AvailabilityData[] = generateAvailabilityData("2024-05-23", "2024-05-28")
    console.log('availabilityData: ', availabilityData)

    console.log('eligibleRoomTypes: ', eligibleRoomTypes)

    // Check availability for each eligible room type
    for (const roomType of eligibleRoomTypes) {
        let isAvailable = false;

        // Check if there is at least one available room for the current room type
        for (const room of rooms.filter((room) => room.roomTypeId === roomType.id)) {
            let isRoomAvailable = true;

            // Check availability for each day between arrival and departure
            const numDays = differenceInDays(
                new Date(departureDate),
                new Date(arrivalDate)
            );
            for (let i = 0; i <= numDays; i++) {
                const currentDate = addDays(new Date(arrivalDate), i).toISOString().slice(0, 10);
                const availability = availabilityData.find(
                    (data) => data.roomId === room.id && data.date === currentDate
                );

                if (!availability || !availability.available) {
                    isRoomAvailable = false;
                    break;
                }
            }

            if (isRoomAvailable) {
                isAvailable = true;
                break;
            }
        }

        // If there is at least one available room for the current room type, add it to the list
        if (isAvailable) {
            availableRoomTypes.push(roomType);
        }
    }

    return availableRoomTypes;
}

const generateAvailabilityData = (startDate: string, endDate: string): AvailabilityData[] => {
    const availabilityData: AvailabilityData[] = [];

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

const data = generateAvailabilityData("2024-05-23", "2024-07-23")
