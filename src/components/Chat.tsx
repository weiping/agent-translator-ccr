import React, { useState, useRef, useEffect } from 'react';
import { Box, useStdin } from 'ink';
import { Welcome } from './Welcome.js';
import { History } from './History.js';
import { Input } from './Input.js';
import { Status } from './Status.js';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export const Chat = () => {
    const { isRawModeSupported } = useStdin();
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState('Welcome! Type your message and press Enter.');
    const messageCounter = useRef(0);

    useEffect(() => {
        if (!isRawModeSupported) {
            setStatus('Input is not supported in this terminal.');
        }
    }, [isRawModeSupported]);

    const handleSubmit = (text: string) => {
        const newUserMessage: Message = { id: `msg-${messageCounter.current++}`, role: 'user', content: text };
        setMessages(prev => [...prev, newUserMessage]);

        setTimeout(() => {
            const newAiMessage: Message = { id: `msg-${messageCounter.current++}`, role: 'assistant', content: `You said: "${text}"` };
            setMessages(prev => [...prev, newAiMessage]);
        }, 500);
    };

    return (
        <Box flexDirection="column" padding={1}>
            <Welcome />
            <History messages={messages} />
            {isRawModeSupported && <Input onSubmit={handleSubmit} />}
            <Status message={status} />
        </Box>
    );
};
