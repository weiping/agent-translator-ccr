import React, { useState } from 'react';
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

interface InputProps {
    onSubmit: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (value.trim().length > 0) {
            onSubmit(value);
            setValue('');
        }
    };

    return (
        <Box borderStyle="round" paddingX={1}>
            <Box marginRight={1}>
                <Text>	</Text>
            </Box>
            <TextInput
                value={value}
                onChange={setValue}
                onSubmit={handleSubmit}
            />
        </Box>
    );
};
