import React from 'react';
import { Box, Text } from 'ink';

interface StatusProps {
    message: string;
}

export const Status: React.FC<StatusProps> = ({ message }) => {
    return (
        <Box>
            <Text>{message}</Text>
        </Box>
    );
};
