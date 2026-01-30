'use client';

import { Lock } from 'lucide-react';
import { useE2EE } from '../provider';
import React from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export default function Header({ className, ...props }: React.HTMLProps<'div'>) {
    return (
        <div
            className={cn(
                'bg-white rounded-lg border p-8 flex flex-col justify-between space-y-5',
                className
            )}
        >
            <div className="flex flex-col space-y-5 shrink-0">
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

            <div className="flex flex-col min-h-0 flex-1 border-t">
                <History />
            </div>

            <div className="shrink-0">
                <ThemeToggle />
            </div>
        </div>
    );
}

function History() {
    const { steps } = useE2EE();

    return (
        <div className="flex flex-col min-h-0 flex-1 pt-5">
            <h3 className="mb-5 shrink-0 text-sm">⏳ History</h3>
            <div className="h-full overflow-hidden space-y-2 overflow-y-auto p-">
                {steps.map((s, i) => (
                    <button
                        key={i}
                        className={cn(
                            'w-full justify-start font-medium text-sm p-2 px-3 rounded-sm',
                            'bg-input/75 hover:bg-input text-foreground flex cursor-pointer'
                        )}
                    >
                        <span className="opacity-40 mr-2">{`${i + 1}.`}</span>

                        <span className="min-w-0 wrap-break-words text-left">{s.message}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
