"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, ArrowUpRight } from 'lucide-react';

const FloatingButton = () => {
    const pathname = usePathname();

    // Do not show on /contact page since user is already on the contact / build page
    if (pathname === "/contact") {
        return null;
    }

    return (
        <div className="w-full flex justify-center fixed bottom-4 sm:bottom-8 z-30 pointer-events-none px-4">
            <div className="flex items-center gap-2 bg-black/80 border border-white/15 backdrop-blur-xl text-white p-1 rounded-full pointer-events-auto shadow-2xl transition-all duration-300 hover:border-emerald-500/40">
                <Link
                    href="/contact"
                    className="text-[11px] font-mono font-semibold bg-emerald-400 text-black px-4 py-2 rounded-full cursor-pointer hover:bg-emerald-300 transition-colors select-none flex items-center gap-1.5"
                >
                    Build With Us <ArrowUpRight size={13} />
                </Link>
                <Link
                    href="/projects"
                    aria-label="View Projects"
                    className="w-8 h-8 bg-zinc-900 border border-white/10 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center select-none"
                    title="View Projects"
                >
                    <Plane size={15} />
                </Link>
            </div>
        </div>
    );
};

export default FloatingButton;