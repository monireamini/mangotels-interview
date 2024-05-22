// @todo: use UUID for identifier fields

export interface Guest {
    /**
     * unique identifier
     */
    id: number;
    /**
     * full name of the guest
     */
    name: string;
    /**
     * email address of the guest
     */
    email: string;
    /**
     * phone number of the guest
     */
    phone: string;
}

export interface RoomType {
    /**
     * unique identifier for the room type.
     */
    id: number;

    /**
     * name or description of the room type.
     */
    name: string;

    /**
     * base rate for the room type in $
     */
    baseRate: number;

    /**
     * maximum occupancy allowed for the room type.
     */
    maxOccupancy: number;
}


export enum ReservationStatus {
    Confirmed = 'confirmed',
    Cancelled = 'cancelled',
}

export interface Reservation {
    /**
     * unique identifier
     */
    id: number;
    /**
     * identifiers list of guests
     */
    guestIds: Guest["id"][];
    /**
     * identifier of room type
     */
    roomTypeId: RoomType["id"];
    /**
     * number of adults guests
     */
    adults: number;
    /**
     * number of children guests
     */
    children: number;
    /**
     * arrival date in formatted string e.g. "2024-05-22"
     */
    arrivalDate: string;
    /**
     * departure date in formatted string e.g. "2024-05-28"
     */
    departureDate: string;
    /**
     * total price of reservation
     */
    totalRate: number;
    /**
     * status of reservation that can be either "confirmed" or "canceled"
     */
    status: ReservationStatus;
}

