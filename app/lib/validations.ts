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
export const zodEmail = z
    .string()
    .email("incorrectEmail")
    .optional()
    .or(z.literal(""))

export const zodEmailRequired = z
    .string()
    .email("incorrectEmail")
    .min(1, "This field is required")

/**
 * phone number
 */
export const zodPhoneNumber = z
    .string()
    .min(1, "This field is required")
    .min(11, "incorrectPhoneNumber")
    .max(11, "incorrectPhoneNumber")
