'use client';

import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';

export const E2EEContext = createContext<E2EEContextType | null>(null);

export const useE2EE = () => {
    const context = useContext(E2EEContext);
    if (!context) throw new Error('useE2EE must be used within E2EEProvider');
    return context;
};

export default function E2EEProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<Record<string, User>>({
        alice: { privateKey: null, publicKey: null, messages: [] },
        bob: { privateKey: null, publicKey: null, messages: [] },
    });
    const [currentUser, setCurrentUser] = useState('alice');
    const [step, setStep] = useState('');

    const updateStep = (message: string, duration: number = 2000) => {
        setStep(message);
        if (duration > 0) {
            setTimeout(() => setStep(''), duration);
        }
    };

    const generateKeyPair = async (userName: string) => {
        updateStep(`Generate key pair for ${userName}...`, 0);

        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: 'RSA-OAEP',
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: 'SHA-256',
            },
            true,
            ['encrypt', 'decrypt']
        );

        setUsers((prev) => ({
            ...prev,
            [userName]: {
                ...prev[userName],
                privateKey: keyPair.privateKey,
                publicKey: keyPair.publicKey,
            },
        }));

        updateStep(`${userName}'s keys generated!`);
    };

    const encryptData = async (
        msg: string,
        recipientPublicKey: CryptoKey
    ): Promise<ArrayBuffer> => {
        updateStep('Encrypting message...', 0);

        const encoder = new TextEncoder();
        const data = encoder.encode(msg);

        const encrypted = await window.crypto.subtle.encrypt(
            { name: 'RSA-OAEP' },
            recipientPublicKey,
            data
        );

        updateStep('Message encrypted!');
        return encrypted;
    };

    const decryptData = async (
        encryptedData: ArrayBuffer,
        privateKey: CryptoKey
    ): Promise<string> => {
        updateStep('Decrypting message...', 0);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'RSA-OAEP' },
            privateKey,
            encryptedData
        );

        const decoder = new TextDecoder();
        updateStep('Message decrypted!');
        return decoder.decode(decrypted);
    };

    const sendMessage = async (message: string, sender: string, recipient: string) => {
        if (!message.trim()) return;

        if (!users[recipient].publicKey) {
            alert(`${recipient} hasn't generated keys yet!`);
            return;
        }

        try {
            const encrypted = await encryptData(message, users[recipient].publicKey!);

            setUsers((prev) => ({
                ...prev,
                [recipient]: {
                    ...prev[recipient],
                    messages: [
                        ...prev[recipient].messages,
                        {
                            from: sender,
                            encrypted: encrypted,
                            decrypted: null,
                            timestamp: Date.now(),
                        },
                    ],
                },
            }));
        } catch (error) {
            console.error('Encryption error:', error);
            updateStep('Error encrypting message');
        }
    };

    const decryptMessage = async (userName: string, index: number) => {
        const msg = users[userName].messages[index];

        if (!users[userName].privateKey) {
            alert('Generate your keys first!');
            return;
        }

        try {
            const decrypted = await decryptData(msg.encrypted, users[userName].privateKey!);

            setUsers((prev) => ({
                ...prev,
                [userName]: {
                    ...prev[userName],
                    messages: prev[userName].messages.map((m, i) =>
                        i === index ? { ...m, decrypted } : m
                    ),
                },
            }));
        } catch (error) {
            console.error('Decryption error:', error);
            updateStep('Error decrypting message');
        }
    };

    return (
        <E2EEContext.Provider
            value={{
                users,
                currentUser,
                step,
                setCurrentUser,
                generateKeyPair,
                sendMessage,
                decryptMessage,
            }}
        >
            {children}
        </E2EEContext.Provider>
    );
}
