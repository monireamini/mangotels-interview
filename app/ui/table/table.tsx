import Search from '@/app/ui/search';
import {Reservation} from "@/app/lib/definitions";
import {PlusIcon} from '@heroicons/react/24/outline';
import {ButtonLink} from "@/app/ui/button-link";
import {Pagination, useDisclosure} from '@nextui-org/react';
import {useState} from "react";
import {TableContentMobile} from "@/app/ui/table/content-mobile";
import {TableContentDesktop} from "@/app/ui/table/content-desktop";
import {CancelModal} from "@/app/ui/table/cancel-modal";

const pageSize = 5

export default function ReservationsTable({reservations}: {
    reservations: Reservation[];
}) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [activeReservationId, setActiveReservationId] = useState<string | null>(null);


    const [currentPage, setCurrentPage] = useState(1);

    const currentPageReservations = reservations.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="w-full">
            {/* @todo: handle search */}
            {/* table header */}
            <div className="flex flex-row justify-between">
                <Search placeholder="Search reservations..."/>
                <ButtonLink href="/create" className="hidden md:flex ml-2 md:ml-4">
                    Create a new reservation
                </ButtonLink>
                <ButtonLink href="/create" className="md:hidden ml-2 md:ml-4">
                    <PlusIcon className="h-[18px] w-[18px]"/>
                </ButtonLink>
            </div>

            {/* table content */}
            <div className="mt-4 flow-root">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-md bg-gray-50 md:pt-0">
                            <TableContentMobile
                                currentPageReservations={currentPageReservations}
                                setActiveReservationId={setActiveReservationId}
                                onOpen={onOpen}
                            />
                            <TableContentDesktop
                                currentPageReservations={currentPageReservations}
                                setActiveReservationId={setActiveReservationId}
                                onOpen={onOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* cancel modal*/}
            <CancelModal activeReservationId={activeReservationId} isOpen={isOpen} onOpenChange={onOpenChange}/>

            {/* pagination */}
            <div className="mt-4">
                <Pagination
                    loop
                    showControls
                    total={Math.ceil(reservations.length / pageSize)}
                    initialPage={1}
                    onChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
