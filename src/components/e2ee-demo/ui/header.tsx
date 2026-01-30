'use client';

import { Lock } from 'lucide-react';
import { useE2EE } from '../provider';
import React from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme-toggle';

export default function Header({ className, ...props }: React.HTMLProps<'div'>) {
    const { step } = useE2EE();

    return (
        <div
            className={cn(
                'bg-white rounded-lg border p-8 flex flex-col justify-between',
                className
            )}
        >
            <div className="flex flex-col space-y-5">
                <h1 className="text-lg font-bold flex items-center gap-3">
                    <div className="bg-input p-3 rounded-full">
                        <Lock className="size-5" />
                    </div>
                    End-to-End Encryption (E2EE) Demo
                </h1>

                <p className="text-sm">
                    Experience how E2EE works: generate keys, send encrypted messages, and decrypt
                    them.
                </p>
            </div>

            {step && (
                <div className="bg-indigo-50 border border-indigo-200 rounded p-3">
                    <p className="text-indigo-700 font-medium">⚡ {step}</p>
                </div>
            )}

            <div className="">
                <ThemeToggle />
            </div>
        </div>
    );
}
