import React from 'react';
import { Box, Text } from 'ink';

interface StatusProps {
    message: string;
}

export const Status: React.FC<StatusProps> = ({ message }) => {
    let color = 'white';
    if (message.startsWith('AI is thinking...') || message.startsWith('Calling tool:')) {
        color = 'yellow';
    } else if (message.startsWith('Error:')) {
        color = 'red';
    } else if (message === 'Ready.') {
        color = 'green';
    }

    return (
        <Box>
            <Text color={color}>{message}</Text>
        </Box>
    );
};
