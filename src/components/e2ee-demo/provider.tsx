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
        john: { privateKey: null, publicKey: null, messages: [] },
    });
    const [currentUser, setCurrentUser] = useState('alice');
    const [step, setStep] = useState('');

    const updateStep = (message: string, duration: number = 2000) => {
        setStep(message);
        if (duration > 0) {
            setTimeout(() => setStep(''), duration);
        }
    };

    const generateAESKey = () =>
        window.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
            'encrypt',
            'decrypt',
        ]);

    const encryptWithAES = async (message: string, key: CryptoKey) => {
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encoded = new TextEncoder().encode(message);

        const encryptedMessage = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            encoded
        );

        return { encryptedMessage, iv };
    };

    const decryptWithAES = async (
        encryptedMessage: ArrayBuffer,
        key: CryptoKey,
        iv: Uint8Array<ArrayBuffer>
    ) => {
        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            encryptedMessage
        );

        return new TextDecoder().decode(decrypted);
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

    const encryptAESKey = async (aesKey: CryptoKey, publicKey: CryptoKey) => {
        const rawKey = await window.crypto.subtle.exportKey('raw', aesKey);

        return window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, rawKey);
    };

    const decryptAESKey = async (encryptedKey: ArrayBuffer, privateKey: CryptoKey) => {
        const rawKey = await window.crypto.subtle.decrypt(
            { name: 'RSA-OAEP' },
            privateKey,
            encryptedKey
        );

        return window.crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, [
            'decrypt',
        ]);
    };

    const sendMessage = async (message: string, sender: string, recipient: string) => {
        if (!message.trim()) return;

        const recipientPublicKey = users[recipient].publicKey;
        if (!recipientPublicKey) {
            alert(
                `${recipient.charAt(0).toUpperCase() + recipient.slice(1)} has no keys yet.\nA user must generate a key to receive encrypted messages`
            );
            return;
        }

        try {
            // generate one-time AES key
            const aesKey = await generateAESKey();

            // encrypt message with AES
            const { encryptedMessage, iv } = await encryptWithAES(message, aesKey);

            // encrypt AES key with RSA
            const encryptedKey = await encryptAESKey(aesKey, recipientPublicKey);

            setUsers((prev) => ({
                ...prev,
                [recipient]: {
                    ...prev[recipient],
                    messages: [
                        ...prev[recipient].messages,
                        {
                            from: sender,
                            encryptedMessage,
                            encryptedKey,
                            iv,
                            decrypted: null,
                            timestamp: Date.now(),
                        },
                    ],
                },
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const decryptMessage = async (userName: string, index: number) => {
        const msg = users[userName].messages[index];
        const privateKey = users[userName].privateKey;

        if (!privateKey) return;

        try {
            // decrypt AES key with RSA
            const aesKey = await decryptAESKey(msg.encryptedKey, privateKey);

            // decrypt message with AES
            const decrypted = await decryptWithAES(msg.encryptedMessage, aesKey, msg.iv);

            setUsers((prev) => ({
                ...prev,
                [userName]: {
                    ...prev[userName],
                    messages: prev[userName].messages.map((m, i) =>
                        i === index ? { ...m, decrypted } : m
                    ),
                },
            }));
        } catch (err) {
            console.error(err);
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
