import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {MinusCircleIcon, PlusCircleIcon} from "@heroicons/react/24/outline";
import {FieldValues} from "react-hook-form";

export const GuestsDropdown = ({adultsField: adults, childrenField: children, roomTypeIdField: roomTypeId, error}: {
    adultsField: FieldValues,
    childrenField: FieldValues
    roomTypeIdField: FieldValues
    error: string
}) => {

    function handleDecrementAdults() {
        if (adults.value > 0) {
            adults.onChange(adults.value - 1)
            roomTypeId.onChange(undefined)
        }
    }

    function handleIncrementAdults() {
        if (adults.value + children.value < 10) {
            adults.onChange(adults.value + 1)
            roomTypeId.onChange(undefined)
        }
    }

    function handleDecrementChildren() {
        if (children.value > 0) {
            children.onChange(children.value - 1)
            roomTypeId.onChange(undefined)
        }
    }

    function handleIncrementChildren() {
        if (adults.value + children.value < 10) {
            children.onChange(children.value + 1)
            roomTypeId.onChange(undefined)
        }
    }

    return (
        <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
                Guests
            </label>

            <Dropdown classNames={{content: "rounded-md"}}>
                <DropdownTrigger>
                    <button
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 bg-white text-gray-500 text-left px-4"
                    >
                        {adults.value + children.value ? `Guests: ${adults.value + children.value}` : `Set guests`}
                    </button>
                </DropdownTrigger>
                <DropdownMenu closeOnSelect={false}>
                    <DropdownItem key="adults">
                        <div className="flex flex-row justify-between align-middle">
                            <p className="mr-10">Adults (Age +13)</p>
                            <div className="flex flex-row align-middle">
                                <MinusCircleIcon className="w-5 h-5 text-gray-400"
                                                 onClick={handleDecrementAdults}/>
                                <p className="w-[24px] text-center">{adults.value}</p>
                                <PlusCircleIcon className="w-5 h-5 text-gray-400"
                                                onClick={handleIncrementAdults}/>
                            </div>
                        </div>
                    </DropdownItem>
                    <DropdownItem key="children">
                        <div className="flex flex-row justify-between align-middle">
                            <p className="mr-10">Children (Ages 2-12)</p>
                            <div className="flex flex-row align-middle">
                                <MinusCircleIcon
                                    className="w-5 h-5 text-gray-400"
                                    onClick={handleDecrementChildren}
                                />
                                <p className="w-[24px] text-center">{children.value}</p>
                                <PlusCircleIcon
                                    className="w-5 h-5 text-gray-400"
                                    onClick={handleIncrementChildren}
                                />
                            </div>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <p className="mt-1 ml-1 block text-xs font-medium text-red-500">
                {error}
            </p>
        </div>
    )
}