import clsx from 'clsx';
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export function ButtonLink({href, className}: { href: string, className?: string }) {
    return (
        <Link
            href={href}
            className={clsx(
                'flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base',
                className,
            )}
        >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6"/>
        </Link>
    );
}
