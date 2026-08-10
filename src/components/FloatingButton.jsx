import React from 'react';
import Link from 'next/link';
import { Plane } from 'lucide-react';

const FloatingButton = () => {
    return (
        <div className="w-full flex justify-center fixed bottom-4 sm:bottom-8 z-[100] pointer-events-none">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full pointer-events-auto">
                <Link
                    href="/contact"
                    className="text-[10px] bg-white text-black px-4 py-2.5 rounded-full cursor-pointer hover:bg-zinc-200 transition-colors font-medium select-none"
                >
                    Build With Us
                </Link>
                <Link
                    href="/projects"
                    aria-label="View Projects"
                    className="w-9 h-9 bg-white rounded-full text-black p-2 cursor-pointer hover:bg-zinc-200 transition-colors flex items-center justify-center select-none"
                >
                    <Plane size={20} />
                </Link>
            </div>
        </div>
    );
};

export default FloatingButton;