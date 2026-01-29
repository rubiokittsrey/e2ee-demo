'use client';

import { Lock } from 'lucide-react';
import { useE2EE } from '../provider';

export default function Header() {
    const { step } = useE2EE();

    return (
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Lock className="text-indigo-600" />
                End-to-End Encryption Demo
            </h1>
            <p className="text-gray-600 mb-4">
                Experience how E2EE works: generate keys, send encrypted messages, and decrypt them.
            </p>

            {step && (
                <div className="bg-indigo-50 border border-indigo-200 rounded p-3">
                    <p className="text-indigo-700 font-medium">⚡ {step}</p>
                </div>
            )}
        </div>
    );
}
