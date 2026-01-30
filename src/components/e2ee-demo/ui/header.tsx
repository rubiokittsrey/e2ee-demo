'use client';

import { CircleQuestionMark, Lock } from 'lucide-react';
import { useE2EE } from '../provider';
import React from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme-toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CollapsibleProps } from '@radix-ui/react-collapsible';

export default function Header({ className, ...props }: React.HTMLProps<'div'>) {
    return (
        <div
            className={cn(
                'bg-white rounded-lg border p-8 flex flex-col justify-between space-y-5',
                className
            )}
        >
            <div className="flex flex-col space-y-5 shrink-0">
                <h1 className="text-lg font-bold flex items-center gap-3">
                    <div className="bg-input p-3 rounded-full">
                        <Lock className="size-5" />
                    </div>
                    End-to-End Encryption (E2EE) Demo
                </h1>

                <p className="text-sm">
                    Experience how E2EE works: generate keys, send encrypted messages, and decrypt
                    them.
                </p>
            </div>

            <div className="flex flex-col min-h-0 flex-1 border-t">
                <History />
            </div>

            <div className="shrink-0">
                <ThemeToggle />
            </div>
        </div>
    );
}

function History() {
    const { steps } = useE2EE();

    return (
        <div className="flex flex-col min-h-0 flex-1 pt-5">
            <h3 className="mb-5 shrink-0 text-sm flex items-center justify-between">
                {'⏳ History'}{' '}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <CircleQuestionMark className="size-4 ml-3" />
                    </TooltipTrigger>
                    <TooltipContent className="font-sans">
                        <p className="mb-1">
                            The step-by-step process of encryption and decryption operations.
                        </p>
                        <p>(Click on an item to display more information.)</p>
                    </TooltipContent>
                </Tooltip>
            </h3>
            <div className="h-full overflow-hidden space-y-2 overflow-y-auto p-">
                {steps.map((s, i) => (
                    <HistoryItem key={i} index={i} {...s} />
                ))}
            </div>
        </div>
    );
}

function HistoryItem({
    message,
    context,
    className,
    index,
    ...props
}: Step & CollapsibleProps & React.RefAttributes<HTMLDivElement> & { index: number }) {
    return (
        <Collapsible
            {...props}
            className={cn(
                'w-full justify-start font-medium text-sm p-2 px-3 rounded-sm',
                'bg-input/75 hover:bg-input text-foreground flex flex-col cursor-pointer'
            )}
        >
            <CollapsibleTrigger className="w-full">
                <div className="flex justify-start cursor-pointer w-full">
                    <span className="opacity-40 mr-2">{`${index + 1}.`}</span>
                    <span className="min-w-0 wrap-break-words text-left">{message}</span>
                </div>
                <CollapsibleContent className="mt-1 ml-4 font-normal opacity-50 cursor-pointer">
                    <p className="text-start italic">{stepContextDescriptions[context]}</p>
                </CollapsibleContent>
            </CollapsibleTrigger>
        </Collapsible>
    );
}

export const stepContextDescriptions: Record<StepContext, string> = {
    'public-private-key-generation':
        'Generates a 2048-bit RSA key pair consisting of a public key (shared with others to encrypt messages for you) and a private key (kept secret to decrypt messages sent to you). This is the foundation of asymmetric encryption.',
    'aes-key-generation':
        'Creates a random 256-bit AES symmetric key that will be used to encrypt the actual message content. This one-time key is generated fresh for each message to ensure maximum security.',
    'message-encryption-aes':
        'Encrypts the plaintext message using AES-GCM (Advanced Encryption Standard in Galois/Counter Mode), a fast and secure symmetric encryption algorithm. This produces ciphertext that cannot be read without the AES key.',
    'aes-key-encryption-rsa':
        "Encrypts the AES key using the recipient's RSA public key via RSA-OAEP algorithm. This ensures only the recipient can decrypt the AES key with their private key, enabling secure key exchange over insecure channels.",
    'message-sent':
        "The encrypted message bundle (containing the AES-encrypted message and RSA-encrypted AES key) has been successfully packaged and delivered to the recipient's inbox. The message is now secure in transit and at rest.",
    'aes-key-decryption-rsa':
        "Uses the recipient's RSA private key to decrypt the encrypted AES key. This recovers the symmetric key that was originally used to encrypt the message, demonstrating the power of asymmetric cryptography.",
    'message-decryption-aes':
        'Decrypts the encrypted message content using the recovered AES key and the initialization vector (IV). This reverses the symmetric encryption to reveal the original plaintext message.',
    'message-decrypted':
        'The decryption process is complete. The original plaintext message has been successfully recovered and can now be read by the recipient. End-to-end encryption ensures only the intended recipient could decrypt this message.',
};
