import React from 'react';
import {Modal, ModalBody, ModalContent, ModalFooter, useDisclosure} from "@nextui-org/react";
import {CANCEL_RESERVATION} from "@/app/redux/reducers/reservations-slice";
import {ModalHeader} from "@nextui-org/modal";
import {Button} from "@/app/ui/button";
import {useDispatch} from "react-redux";

export const CancelModal = ({activeReservationId, isOpen, onOpenChange}: {
    activeReservationId: string | null,
    isOpen: boolean,
    onOpenChange: () => void
}) => {

    const dispatch = useDispatch();

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
            <ModalContent>
                {(onClose) => {
                    function handleCancelReservation() {
                        dispatch(CANCEL_RESERVATION(activeReservationId))
                        onClose()
                    }

                    return (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Cancel a reservation</ModalHeader>
                            <ModalBody>
                                <p>
                                    Are you sure you want to cancel the reservation #{activeReservationId}?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-red-500 hover:bg-red-400 active:bg-red-600 focus-visible:outline-red-500"
                                    onClick={handleCancelReservation}
                                >
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )
                }}
            </ModalContent>
        </Modal>
    )
}