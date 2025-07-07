import React from 'react';
import { Box, Text } from 'ink';

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'tool';
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
                    <Text color={
                        message.role === 'user' ? 'green' :
                        message.role === 'assistant' ? 'blue' : 'yellow'
                    }>
                        {
                            message.role === 'user' ? 'You: ' :
                            message.role === 'assistant' ? 'AI: ' : 'Tool: '
                        }
                    </Text>
                    <Text>{message.content}</Text>
                </Box>
            ))}
        </Box>
    );
};
