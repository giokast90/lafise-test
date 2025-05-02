import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TransferFormScreen = () => {
    const navigation = useNavigation();
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');

    const isFormValid = accountNumber.trim() !== '' && amount.trim() !== '';

    const handleSubmit = () => {
        if (isFormValid) {
            // @ts-ignore
            navigation.navigate('ConfirmTransfer' as never, { accountNumber, amount });
        }
    };

    return (
        <View className="flex-1 bg-white px-6 pt-5">
            <Text className="text-xl font-bold mb-2">¿A quién le enviaras dinero hoy?</Text>

            <Text className="text-base mb-1 pt-5">Ingresa el número de cuenta</Text>
            <TextInput
                className="border border-gray-300 rounded-2xl px-4 py-3 mb-4 text-gray-600"
                placeholder="N. de cuenta"
                value={ accountNumber }
                keyboardType="numeric"
                onChangeText={ setAccountNumber }
            />

            <Text className="text-base mb-1">¿Cuanto dinero le enviaras?</Text>
            <TextInput
                className="border border-gray-300 rounded-2xl px-4 py-3 mb-8 text-gray-600"
                placeholder="C$500"
                keyboardType="numeric"
                value={ amount }
                onChangeText={ setAmount }
            />

            <View className="p-6 bg-white">
                <Pressable
                    onPress={ handleSubmit }
                    disabled={ !isFormValid }
                    className="rounded-full py-4"
                    style={ { backgroundColor: isFormValid ? '#018765' : '#e5e7eb' } }
                >
                    <Text
                        className={ `text-center text-base font-semibold ${ isFormValid ? 'text-white' : 'text-gray-400' }` }>
                        Enviar
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default TransferFormScreen;