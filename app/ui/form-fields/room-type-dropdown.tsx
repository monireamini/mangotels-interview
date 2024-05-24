import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {roomTypes} from "@/app/lib/placeholder-data";
import {RoomType} from "@/app/lib/definitions";
import {FieldValues} from "react-hook-form";

export const RoomTypeDropdown = ({roomTypeIdField: roomTypeId, error, availableRoomTypes}: {
    roomTypeIdField: FieldValues,
    error: string
    availableRoomTypes: RoomType[]
}) => {
    return (
        <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
                Room type
            </label>

            <Dropdown classNames={{content: "rounded-md"}}>
                <DropdownTrigger>
                    <p
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 text-sm outline-2 bg-white text-gray-500 text-left px-4 h-[36px]"
                    >
                        {roomTypes.find((item) => item.id == roomTypeId.value)?.name || "Choose room type"}
                    </p>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={[roomTypeId.value]}
                >
                    {availableRoomTypes.map((roomType: RoomType) => {
                        function handleChangeRoomTypeId() {
                            roomTypeId.onChange(roomType.id)
                        }

                        return (
                            <DropdownItem key={roomType.id} onClick={handleChangeRoomTypeId}>
                                <p className="w-[212px]">{roomType.name}</p>
                            </DropdownItem>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>
            <p className="mt-1 ml-1 block text-xs font-medium text-red-500">
                {error}
            </p>
        </div>
    )
}