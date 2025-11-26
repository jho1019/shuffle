"use client";

import { useState } from 'react';

interface CardInputProps {
    onAnalyze: (cert: string) => void;
    isLoading: boolean;
}

export default function CardInput({ onAnalyze, isLoading }: CardInputProps) {
    const [cert, setCert] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cert.trim()) {
            onAnalyze(cert.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative flex items-center bg-black rounded-lg p-1">
                    <input
                        type="text"
                        value={cert}
                        onChange={(e) => setCert(e.target.value)}
                        placeholder="Enter PSA Cert #"
                        className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500 font-mono text-lg"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Scanning...' : 'Analyze'}
                    </button>
                </div>
            </div>
        </form>
    );
}
