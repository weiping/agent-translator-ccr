import React from 'react';
import { Box, Text } from 'ink';

import { CoreMessage } from 'ai';

interface HistoryProps {
    messages: (CoreMessage & { id: string })[];
}

export const History: React.FC<HistoryProps> = ({ messages }) => {
    return (
        <Box flexDirection="column">
            {messages.map(message => (
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
                    <Text>{typeof message.content === 'string' 
                        ? message.content 
                        : message.content.map(part => {
                            if (part.type === 'tool-result') {
                                return JSON.stringify(part.result);
                            }
                            return '';
                        }).join('')}
                    </Text>
                </Box>
            ))}
        </Box>
    );
};
