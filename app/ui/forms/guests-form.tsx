import React from 'react';
import {Button} from "@/app/ui/button";
import * as z from "zod";
import {v4} from "uuid";
import {zodEmailRequired, zodGuestName, zodPhoneNumber} from "@/app/lib/validations";
import {useController, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFieldError} from "@/app/hooks/use-field-error";
import {Chip} from '@nextui-org/react';
import {Input} from "@/app/ui/form-fields/input";
import {CloseIcon} from "@nextui-org/shared-icons";
import {Guest} from "@/app/lib/definitions";

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

    const {field: name} = useController<any>({control, defaultValue: "", name: "name"})
    const {field: email} = useController<any>({control, defaultValue: "", name: "email"})
    const {field: phone} = useController<any>({control, defaultValue: "", name: "phone"})

    const nameError = useFieldError({errors, name: "name"})
    const emailError = useFieldError({errors, name: "email"})
    const phoneError = useFieldError({errors, name: "phone"})


    function handleAddGuest(data: typeof schema) {
        onChangeGuests([...guests, {id: v4(), ...data}])
        // @ts-ignore
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
                    {guests.map((guest: Guest) => {
                        function handleRemoveGuest() {
                            onChangeGuests(guests.filter(item => item.id !== guest.id))
                        }

                        return (
                            <Chip key={guest.id} className="mr-1 mb-2 h-[40px] pr-0 pl-3" color="primary">
                                <div className="flex flex-row center justify-between items-center">
                                    <p>{guest.name}</p>
                                    <div className="self-center p-2 ml-2 rounded-full hover:bg-red-600"
                                         onClick={handleRemoveGuest}>
                                        <CloseIcon className="w-4 h-4"/>
                                    </div>
                                </div>
                            </Chip>
                        )
                    })}
                </div>
                {guests.length < numOfGuests && (
                    <>
                        <Input field={name} error={nameError} placeholder="Name"/>
                        <Input field={email} error={emailError} placeholder="Email"/>
                        <Input field={phone} error={phoneError} placeholder="Phone number"/>

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