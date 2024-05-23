import * as z from "zod"

/**
 * number
 */
export const zodNumber = z.number()
export const zodNumberAdults = z.number().min(1, "At least one adult guest is required")
export const zodNumberRoomTypeId = z.number().min(1, "This field is required")

/**
 * string
 */
export const zodString = z.string().min(1, "This field is required")

/**
 * email
 */
export const zodEmailRequired = z
    .string()
    .email("Email is incorrect")
    .min(1, "This field is required")

/**
 * phone number
 */
export const zodPhoneNumber = z
    .string()
    .min(1, "This field is required")
    .min(11, "incorrectPhoneNumber")
    .max(11, "incorrectPhoneNumber")


export const zodGuestName = z.string().min(5, "Name must be at least 5 characters long")

export const zodGuest = z.object({
    name: zodGuestName,
    email: zodEmailRequired,
    phone: zodPhoneNumber,
})

export const zodGuests = z.array(zodGuest)
