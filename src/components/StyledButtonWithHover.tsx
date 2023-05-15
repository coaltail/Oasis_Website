import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface HoverButtonProps extends ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HoverButton: React.FC<HoverButtonProps> = ({ children, onClick, sx, ...rest }: HoverButtonProps) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                color: 'white',
                backgroundColor: '#302b63',
                '&:hover': {
                    backgroundColor: '#2B4263',
                },
                ...sx, // Merge the provided sx prop with existing styles
            }}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default HoverButton;