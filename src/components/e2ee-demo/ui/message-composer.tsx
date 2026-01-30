'use client';

import { useState } from 'react';
import { useE2EE } from '../provider';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MessageComposer() {
    const { currentUser, sendMessage } = useE2EE();
    const [message, setMessage] = useState('');
    const otherUser = currentUser === 'alice' ? 'john' : 'alice';
    const color = currentUser === 'alice' ? 'pink' : 'blue';
    const otherColor = currentUser === 'alice' ? 'blue' : 'pink';
    const displayName = currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
    const otherDisplayName = otherUser.charAt(0).toUpperCase() + otherUser.slice(1);

    const handleSend = async () => {
        await sendMessage(message, currentUser, otherUser);
        setMessage('');
    };

    return (
        <div className="rounded-lg space-y-3">
            <h3 className="text-lg mb-4">
                Sending Message as{' '}
                <span className={`text-${color}-500 font-bold`}>{displayName}</span> to{' '}
                <span className={`text-${otherColor}-500 font-bold`}>{otherDisplayName}</span>
            </h3>

            <div className="flex gap-3">
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your secret message..."
                    className="flex-1 py-5 focus-visible:ring-0"
                />
                <Button
                    disabled={message === ''}
                    onClick={handleSend}
                    className={`py-5 flex items-center gap-2`}
                >
                    <Send size={18} />
                    Send Encrypted
                </Button>
            </div>

            <div className="bg-input/50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">How it works:</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Both users generate their own key pairs (public + private)</li>
                    <li>Sender encrypts message using recipient's public key</li>
                    <li>Encrypted message is "sent" (stored for recipient)</li>
                    <li>Recipient decrypts using their private key</li>
                    <li>Nobody else can read the message, even if intercepted!</li>
                </ol>
            </div>
        </div>
    );
}
