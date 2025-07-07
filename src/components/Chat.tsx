import React, { useState, useRef, useEffect } from 'react';
import { Box, useStdin } from 'ink';
import { Welcome } from './Welcome.js';
import { History } from './History.js';
import { Input } from './Input.js';
import { Status } from './Status.js';
import { getLanguageModel } from '../utils/llm.js';
import { streamText, CoreMessage } from 'ai';
import { readFileTool } from '../tools/readFile.js';
import { fetchUrlTool } from '../tools/fetchUrl.js';

type Message = CoreMessage & { id: string };

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

        let currentMessages: CoreMessage[] = newMessages;
        let hasToolCalls = true;

        while (hasToolCalls) {
            setStatus('AI is thinking...');
            try {
                const result = await streamText({
                    model: getLanguageModel(),
                    system: 'You are a helpful chatbot. You can use tools to access local files and web pages.',
                    temperature: 0.1,
                    messages: currentMessages,
                    tools: {
                        readFile: readFileTool,
                        fetchUrl: fetchUrlTool,
                    },
                });

                let fullResponse = '';
                let toolMessages: Message[] = [];
                hasToolCalls = false;

                for await (const delta of result.fullStream) {
                    if (delta.type === 'text-delta') {
                        fullResponse += delta.textDelta;
                    } else if (delta.type === 'tool-call') {
                        setStatus(`Calling tool: ${delta.toolName} with args: ${JSON.stringify(delta.args)}`);
                        hasToolCalls = true;
                    } else if (delta.type === 'tool-result') {
                        const toolMessage: Message = {
                            id: `msg-${messageCounter.current++}`,
                            role: 'tool',
                            content: [{
                                type: 'tool-result',
                                toolCallId: delta.toolCallId,
                                toolName: delta.toolName,
                                result: delta.result,
                            }],
                        };
                        toolMessages.push(toolMessage);
                    }
                }
                
                currentMessages = [...currentMessages, ...toolMessages];
                setMessages(currentMessages as Message[]);
                
                if (fullResponse && !hasToolCalls) {
                    const newAiMessage: Message = { id: `msg-${messageCounter.current++}`, role: 'assistant', content: fullResponse };
                    setMessages(prev => [...prev, newAiMessage]);
                }
            } catch (error) {
                setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                hasToolCalls = false;
            }
        }
        setStatus('Ready.');
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
