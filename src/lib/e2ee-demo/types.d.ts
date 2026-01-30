type EncryptedMessage = {
    from: string;
    encryptedMessage: ArrayBuffer;
    encryptedKey: ArrayBuffer;
    iv: Uint8Array<ArrayBuffer>;
    decrypted: string | null;
    timestamp: number;
};

interface User {
    privateKey: CryptoKey | null;
    publicKey: CryptoKey | null;
    messages: EncryptedMessage[];
}

interface E2EEContextType {
    users: Record<string, User>;
    currentUser: string;
    steps: Step[];
    setCurrentUser: (user: string) => void;
    generateKeyPair: (userName: string) => Promise<void>;
    sendMessage: (message: string, sender: string, recipient: string) => Promise<void>;
    decryptMessage: (userName: string, index: number) => Promise<void>;
}

type StepContext =
    | 'public-private-key-generation'
    | 'aes-key-generation'
    | 'message-encryption-aes'
    | 'aes-key-encryption-rsa'
    | 'message-sent'
    | 'aes-key-decryption-rsa'
    | 'message-decryption-aes'
    | 'message-decrypted';

interface Step {
    message: string;
    context: StepContext;
}
