import React, { useState, useRef, useEffect } from 'react';
import { Box, useStdin } from 'ink';
import { Welcome } from './Welcome.js';
import { History } from './History.js';
import { Input } from './Input.js';
import { Status } from './Status.js';
import { getLanguageModel } from '../utils/llm.js';
import { generateText, CoreMessage } from 'ai';
import { readFileTool } from '../tools/readFile.js';
import { fetchUrlTool } from '../tools/fetchUrl.js';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'tool';
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
        
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);
        setStatus('AI is thinking...');

        try {
            const historyForSDK: CoreMessage[] = updatedMessages
                .filter((msg): msg is Message & { role: 'user' | 'assistant' } => msg.role === 'user' || msg.role === 'assistant')
                .map(({ role, content }) => ({ role, content }));

            const result = await generateText({
                model: getLanguageModel(),
                system: 'You are a helpful chatbot. You can use tools to access local files and web pages.',
                temperature: 0.1,
                messages: historyForSDK,
                tools: {
                    readFile: readFileTool,
                    fetchUrl: fetchUrlTool,
                },
                maxSteps: 5,
            });

            let messagesToAdd: Message[] = [];
            if (result.toolResults && result.toolResults.length > 0) {
                const toolMessages: Message[] = result.toolResults.map(toolResult => ({
                    id: `msg-${messageCounter.current++}`,
                    role: 'tool',
                    content: `Tool '${toolResult.toolName}' Result: ${JSON.stringify(toolResult.result)}`,
                }));
                messagesToAdd.push(...toolMessages);
            }

            const newAiMessage: Message = { id: `msg-${messageCounter.current++}`, role: 'assistant', content: result.text };
            messagesToAdd.push(newAiMessage);

            setMessages(prev => [...prev, ...messagesToAdd]);

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
