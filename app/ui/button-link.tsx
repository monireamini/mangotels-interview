import React from "react";
import Link from "next/link";
import clsx from 'clsx';

export function ButtonLink({href, className, children}: { href: string, className?: string, children?: React.ReactNode }) {
    return (
        <Link
            href={href}
            className={clsx(
                'flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm text-white transition-colors hover:bg-blue-400 md:text-base',
                className,
            )}
        >
            {children}
        </Link>
    );
}
