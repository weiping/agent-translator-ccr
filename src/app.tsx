import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { Chat } from './components/Chat.js';

const App = () => {
    return (
        <Box flexDirection="column">
            <Chat />
        </Box>
    );
};

export default App;
