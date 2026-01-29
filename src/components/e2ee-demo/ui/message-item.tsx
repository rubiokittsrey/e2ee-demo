import { Unlock } from 'lucide-react';
import { useE2EE } from '../provider';

export default function MessageItem({
    message,
    index,
    userName,
}: {
    message: Message;
    index: number;
    userName: string;
}) {
    const { decryptMessage } = useE2EE();
    const color = userName === 'alice' ? 'pink' : 'blue';

    return (
        <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-500 mb-1">From: {message.from}</p>
            {!message.decrypted ? (
                <div>
                    <p className="text-xs font-mono text-gray-400 mb-2 break-all">
                        🔒 Encrypted: {new Uint8Array(message.encrypted).slice(0, 20).join(',')}...
                    </p>
                    <button
                        onClick={() => decryptMessage(userName, index)}
                        className={`bg-${color}-500 hover:bg-${color}-600 text-white text-xs py-1 px-3 rounded flex items-center gap-1`}
                    >
                        <Unlock size={14} />
                        Decrypt
                    </button>
                </div>
            ) : (
                <p className="text-sm font-medium text-gray-800">🔓 {message.decrypted}</p>
            )}
        </div>
    );
}
