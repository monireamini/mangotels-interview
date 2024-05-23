import React from 'react';
import {Button} from "@/app/ui/button";
import * as z from "zod";
import { v4 } from "uuid";
import {zodEmailRequired, zodGuestName, zodPhoneNumber} from "@/app/lib/validations";
import {useController, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldError} from "@/app/hooks/use-field-error";
import {Chip} from '@nextui-org/react';

export const GuestsForm = ({numOfGuests, guests, onChangeGuests}: {
    numOfGuests: number,
    guests: any[],
    onChangeGuests: (arr: any[]) => void
}) => {

    const schema = z.object({
        name: zodGuestName,
        email: zodEmailRequired,
        phone: zodPhoneNumber
    })

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<typeof schema>({
        resolver: zodResolver(schema),
    })

    const {field: name} = useController({control, defaultValue: "", name: "name"})
    const {field: email} = useController({control, defaultValue: "", name: "email"})
    const {field: phone} = useController({control, defaultValue: "", name: "phone"})

    const nameError = useFieldError({errors, name: "name"})
    const emailError = useFieldError({errors, name: "email"})
    const phoneError = useFieldError({errors, name: "phone"})


    function handleAddGuest(data: typeof schema) {
        onChangeGuests([...guests, {id: v4(), ...data}])
        reset({name: "", email: "", phone: ""})
    }

    if (numOfGuests === 0) return null

    return (
        <form className="max-w-[280px]">
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                    Guests Info
                </label>

                <div className="flex flex-row flex-wrap">
                    {guests.map((guest: any) => (
                        <Chip key={guest.id} className="mr-1 mb-2" color="primary">{guest.name}</Chip>
                    ))}
                </div>
                {guests.length < numOfGuests && (
                    <>
                        <input
                            id="name"
                            name="name"
                            type="string"
                            placeholder="Name"
                            value={name.value}
                            onChange={e => name.onChange(e.target.value)}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <p className="mb-2 mt-1 ml-1 block text-xs font-medium text-red-500">
                            {nameError}
                        </p>

                        <input
                            id="email"
                            name="email"
                            type="string"
                            placeholder="Email"
                            value={email.value}
                            onChange={e => email.onChange(e.target.value)}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <p className="mb-2 mt-1 ml-1 block text-xs font-medium text-red-500">
                            {emailError}
                        </p>

                        <input
                            id="phone"
                            name="phone"
                            type="number"
                            placeholder="Phone number"
                            value={phone.value}
                            maxLength={11}
                            onChange={e => phone.onChange(e.target.value)}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <p className="mb-2 mt-1 ml-1 block text-xs font-medium text-red-500">
                            {phoneError}
                        </p>

                        <Button
                            onClick={handleSubmit(handleAddGuest)}
                            className="mt-3 w-full justify-center"
                        >
                            Add
                        </Button>
                    </>
                )}
            </div>
        </form>
    )
}