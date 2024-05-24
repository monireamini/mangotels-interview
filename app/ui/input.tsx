import React from 'react';
import {FieldValues} from "react-hook-form";

export const Input = ({field, error, placeholder}: { field: FieldValues, error: string, placeholder: string }) => {
    return (
        <>
            <input
                id={field.name}
                name={field.name}
                placeholder={placeholder}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
            <p className="mb-2 mt-1 ml-1 block text-xs font-medium text-red-500">
                {error}
            </p>
        </>
    )
}