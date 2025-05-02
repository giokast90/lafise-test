import React from 'react';
import { Pressable, Text, PressableProps, ActivityIndicator } from 'react-native';
import { cn } from '@/lib/utils';

type ButtonProps = PressableProps & {
    title?: string;
    variant?: 'default' | 'outline' | 'empty';
    isLoading?: boolean;
    children?: React.ReactNode;
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({
                                                  title,
                                                  variant = 'default',
                                                  isLoading = false,
                                                  className,
                                                  children,
                                                  ...props
                                              }) => {
    const baseClasses = 'px-4 py-2 rounded-2xl justify-center items-center';
    const variants = {
        default: 'bg-green-700 text-white',
        outline: 'border border-green-700 text-green-700 bg-white',
        empty: 'bg-transparent'
    };

    return (
        <Pressable
            className={ cn(baseClasses, variants[variant], className) }
            disabled={ isLoading || props.disabled }
            { ...props }
        >
            { isLoading ? (
                <ActivityIndicator color={ variant === 'outline' ? 'green' : 'white' }/>
            ) : typeof children === 'string' || title ? (
                <Text className="text-base font-medium text-center">
                    { title || children }
                </Text>
            ) : (
                children
            ) }
        </Pressable>
    );
};