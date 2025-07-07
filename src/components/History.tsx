import React from 'react';
import { Box, Text } from 'ink';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

interface HistoryProps {
    messages: Message[];
}

export const History: React.FC<HistoryProps> = ({ messages }) => {
    return (
        <Box flexDirection="column">
            {messages.map((message, index) => (
                <Box key={message.id} marginY={1}>
                    <Text color={message.role === 'user' ? 'green' : 'blue'}>
                        {message.role === 'user' ? 'You: ' : 'AI: '}
                    </Text>
                    <Text>{message.content}</Text>
                </Box>
            ))}
        </Box>
    );
};
