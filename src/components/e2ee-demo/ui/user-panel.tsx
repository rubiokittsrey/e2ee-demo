'use client';

import { Users } from 'lucide-react';
import { useE2EE } from '../provider';
import KeyGenerationButton from './generate-key-button';
import KeyStatus from './key-status';
import MessagesList from './message-list';
import { Button } from '@/components/ui/button';

export default function UserPanel({ userName }: { userName: string }) {
    const { currentUser, setCurrentUser } = useE2EE();
    const isActive = currentUser === userName;
    const color = userName === 'alice' ? 'pink' : 'blue';
    const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

    return (
        <div
            className={`bg-white rounded-lg shadow-lg p-6 border-2 ${isActive ? `border-${color}-400` : 'border-gray-200'}`}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-bold text-${color}-600 flex items-center gap-2`}>
                    <Users size={24} />
                    {displayName}
                </h2>
                <Button
                    onClick={() => setCurrentUser(userName)}
                    className={`px-4 py-2 rounded ${isActive ? `bg-${color}-500 text-white` : 'bg-gray-200'}`}
                >
                    Switch to {displayName}
                </Button>
            </div>

            <div className="mb-4">
                <KeyGenerationButton userName={userName} />
            </div>

            <KeyStatus userName={userName} />
            <MessagesList userName={userName} />
        </div>
    );
}
