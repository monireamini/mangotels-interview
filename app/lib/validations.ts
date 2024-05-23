import * as z from "zod"

/**
 * boolean
 */
export const zodBoolean = z.boolean()


/**
 * number
 */
export const zodNumber = z.number().min(1).max(10)

/**
 * string
 */
export const zodNotRequiredString = z.string()
export const zodString = z.string().min(1, "required")
export const zodStringTitle = z
    .string()
    .min(1, "required")
    .min(3, "titleMin2")
export const zodStringShopName = z
    .string()
    .min(1, "required")
    .min(5, "titleMin5")

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
    .min(1, "required")

/**
 * phone number
 */
export const zodPhoneNumber = z
    .string()
    .min(1, "required")
    .min(11, "incorrectPhoneNumber")
    .max(11, "incorrectPhoneNumber")
