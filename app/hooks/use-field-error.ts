import { useMemo } from "react"

export const useFieldError = ({ errors, name }: { errors: any; name: string }) => {
    return useMemo(() => errors?.[name]?.message, [errors?.[name]])
}
