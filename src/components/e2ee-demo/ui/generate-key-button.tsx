import { Key } from 'lucide-react';
import { useE2EE } from '../provider';
import { Button } from '@/components/ui/button';

export default function KeyGenerationButton({ userName }: { userName: string }) {
    const { users, generateKeyPair } = useE2EE();
    const hasKeys = users[userName].publicKey !== null;
    const color = userName === 'alice' ? 'pink' : 'blue';

    return (
        <Button
            onClick={() => generateKeyPair(userName)}
            className={`w-full bg-${color}-500 hover:bg-${color}-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2`}
            disabled={hasKeys}
        >
            <Key size={18} />
            {hasKeys ? '✓ Keys Generated' : 'Generate Keys'}
        </Button>
    );
}
