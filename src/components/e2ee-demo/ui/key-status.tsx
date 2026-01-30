import { useE2EE } from '../provider';

export default function KeyStatus({ userName }: { userName: string }) {
    const { users } = useE2EE();

    if (!users[userName].publicKey) return null;

    return (
        <div className="text-sm text-foreground/75 mb-4 rounded">
            <p className="font-semibold">🔑 Public Key: Available</p>
            <p className="font-semibold">🔐 Private Key: Secured locally</p>
        </div>
    );
}
