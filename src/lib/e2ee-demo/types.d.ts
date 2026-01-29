interface Message {
    from: string;
    encrypted: ArrayBuffer;
    decrypted: string | null;
    timestamp: number;
}

interface User {
    privateKey: CryptoKey | null;
    publicKey: CryptoKey | null;
    messages: Message[];
}

interface E2EEContextType {
    users: Record<string, User>;
    currentUser: string;
    step: string;
    setCurrentUser: (user: string) => void;
    generateKeyPair: (userName: string) => Promise<void>;
    sendMessage: (message: string, sender: string, recipient: string) => Promise<void>;
    decryptMessage: (userName: string, index: number) => Promise<void>;
}
