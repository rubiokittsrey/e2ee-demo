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
    step: string;
    setCurrentUser: (user: string) => void;
    generateKeyPair: (userName: string) => Promise<void>;
    sendMessage: (message: string, sender: string, recipient: string) => Promise<void>;
    decryptMessage: (userName: string, index: number) => Promise<void>;
}
