import { Key } from 'lucide-react';
import { useE2EE } from '../provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function KeyGenerationButton({ userName }: { userName: string }) {
    const { users, generateKeyPair } = useE2EE();
    const hasKeys = users[userName].publicKey !== null;
    return (
        <Button
            onClick={() => generateKeyPair(userName)}
            className={cn(
                `w-full py-2 px-4 rounded flex items-center justify-center gap-2 text-white`,
                userName === 'alice'
                    ? 'bg-pink-500 hover:bg-pink-600'
                    : 'bg-blue-500 hover:bg-blue-600'
            )}
            disabled={hasKeys}
        >
            <Key size={18} />
            {hasKeys ? '✓ Keys Generated' : 'Generate Keys'}
        </Button>
    );
}
