import { useMemo } from "react"

interface FieldErrors {
    [key: string]: { message: string }
}

export const useFieldError = ({ errors, name }: { errors: FieldErrors; name: string }) => {
    return useMemo(() => errors?.[name]?.message, [errors?.[name]])
}
