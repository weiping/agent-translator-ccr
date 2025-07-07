import React, { useState, useRef, useEffect } from 'react';
import { Box, useStdin } from 'ink';
import { Welcome } from './Welcome.js';
import { History } from './History.js';
import { Input } from './Input.js';
import { Status } from './Status.js';
import { getLanguageModel } from '../utils/llm.js';
import { generateText, CoreMessage } from 'ai';

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

    const handleSubmit = async (text: string) => {
        const newUserMessage: Message = { id: `msg-${messageCounter.current++}`, role: 'user', content: text };
        const newMessages = [...messages, newUserMessage];
        setMessages(newMessages);
        setStatus('AI is thinking...');

        try {
            const history: CoreMessage[] = newMessages.map(({ role, content }) => ({ role, content }));
            const result = await generateText({
                model: getLanguageModel(),
                system: 'You are a helpful chatbot.',
                temperature: 0.1,
                messages: history,
            });

            const newAiMessage: Message = { id: `msg-${messageCounter.current++}`, role: 'assistant', content: result.text };
            setMessages(prev => [...prev, newAiMessage]);
            setStatus('Ready.');
        } catch (error) {
            setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
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
