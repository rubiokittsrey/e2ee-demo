'use client';

import { useState } from 'react';
import { useE2EE } from '../provider';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MessageComposer() {
    const { currentUser, sendMessage } = useE2EE();
    const [message, setMessage] = useState('');
    const otherUser = currentUser === 'alice' ? 'bob' : 'alice';
    const color = currentUser === 'alice' ? 'pink' : 'blue';
    const displayName = currentUser.charAt(0).toUpperCase() + currentUser.slice(1);
    const otherDisplayName = otherUser.charAt(0).toUpperCase() + otherUser.slice(1);

    const handleSend = async () => {
        await sendMessage(message, currentUser, otherUser);
        setMessage('');
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">
                Send Message as <span className={`text-${color}-600`}>{displayName}</span> to{' '}
                {otherDisplayName}
            </h3>

            <div className="flex gap-2">
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your secret message..."
                    className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button
                    onClick={handleSend}
                    className={`bg-${color}-500 hover:bg-${color}-600 text-white px-6 py-2 rounded flex items-center gap-2`}
                >
                    <Send size={18} />
                    Send Encrypted
                </Button>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2 text-sm">How it works:</h4>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
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
