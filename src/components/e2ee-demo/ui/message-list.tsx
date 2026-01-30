import { useE2EE } from '../provider';
import MessageItem from './message-item';

export default function MessagesList({ userName }: { userName: string }) {
    const { users } = useE2EE();
    const messages = users[userName].messages;

    return (
        <div className="flex flex-col min-h-0 flex-1">
            <div className="border-t pt-4 flex flex-col min-h-0 flex-1">
                <h3 className="font-semibold mb-2 shrink-0">
                    Received Messages ({messages.length})
                </h3>
                <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
                    {messages.map((msg, i) => (
                        <MessageItem key={i} message={msg} index={i} userName={userName} />
                    ))}
                    {messages.length === 0 && (
                        <p className="text-gray-400 text-sm text-center py-4">No messages yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
