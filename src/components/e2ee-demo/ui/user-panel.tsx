'use client';

import { UserIcon } from 'lucide-react';
import { useE2EE } from '../provider';
import KeyGenerationButton from './generate-key-button';
import KeyStatus from './key-status';
import MessagesList from './message-list';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function UserPanel({ userName }: { userName: string }) {
    const { currentUser, setCurrentUser } = useE2EE();
    const isActive = currentUser === userName;
    const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

    return (
        <div
            className={cn(
                `rounded-lg p-6 border transition-colors h-full overflow-hidden flex flex-col`,
                isActive && userName === 'john' && 'border-blue-400',
                isActive && userName === 'alice' && 'border-pink-400'
            )}
        >
            <div className="flex items-center justify-between mb-4 shrink-0">
                <h1
                    className={cn(
                        `text-xl font-bold flex items-center gap-2 rounded-lg`,
                        userName === 'alice' ? 'text-pink-500' : 'text-blue-500'
                    )}
                >
                    <UserIcon className="size-5" />
                    {displayName}
                </h1>
                <Button
                    onClick={() => setCurrentUser(userName)}
                    className={cn(
                        `px-4 py-2 border bg-transparent`,
                        userName === 'john' &&
                            'border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white',
                        userName === 'alice' &&
                            'border-pink-500 hover:bg-pink-500 text-pink-500 hover:text-white',
                        isActive && userName === 'john' && 'opacity-100 bg-blue-500 text-white',
                        isActive && userName === 'alice' && 'opacity-100 bg-pink-500 text-white'
                    )}
                >
                    {isActive ? `Active as ${displayName}` : `Switch to ${displayName}`}
                </Button>
            </div>

            <div className="mb-4 shrink-0">
                <KeyGenerationButton userName={userName} />
            </div>

            <div className="shrink-0">
                <KeyStatus userName={userName} />
            </div>
            <MessagesList userName={userName} />
        </div>
    );
}
