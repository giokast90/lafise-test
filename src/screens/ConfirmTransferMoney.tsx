import React, { useEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SmartphoneIcon } from "lucide-react-native";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/store";
import { resetTransferState, selectTransfer, transferMoney } from "@/store/slices/transferSlice";

type TransferParams = {
    ConfirmTransfer: {
        accountNumber: string;
        amount: string;
    };
};

const ConfirmTransferScreen = () => {
    const formatNumber = (amount: number): string => {
        return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const route = useRoute<RouteProp<TransferParams, 'ConfirmTransfer'>>();
    const { accountNumber, amount } = route.params;

    const dispatch = useDispatch<AppDispatch>();
    const { loading, success, response, error } = useSelector(selectTransfer);
    const navigation = useNavigation();

    const handleTransfer = () => {
        dispatch(
            transferMoney({
                    origin: "0234567645",
                    destination: accountNumber,
                    amount: { currency: "NIO", value: parseFloat(amount) }
                }
            )
        );
    };

    useEffect(() => {
        if (success && response) {
            // @ts-ignore
            navigation.navigate('TransferSuccess' as never, { transferResult: response, } as never);
            dispatch(resetTransferState());
        }
    }, [success, response]);

    if (!amount)
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large"/>
                <Text>Loading account details...</Text>
            </View>
        );

    return (
        <View className="bg-white flex-1 px-6 pt-5">
            <View className="mt-5 flex justify-between items-center">
                <View className="w-20 h-20 rounded-full flex-row justify-center items-center"
                      style={ { backgroundColor: '#E6F7FD' } }>
                    <SmartphoneIcon color="#0079A8"/>
                </View>
            </View>
            <View className="mt-5 flex justify-between items-center">
                <Text className="text-lg text-gray-500">Total a enviar</Text>
                <Text className="text-xl text-black font-bold">C$ { formatNumber(parseFloat(amount)) }</Text>
            </View>

            <View className="mt-16 border-b border-gray-200">
                <View className="pb-3">
                    <View className="flex-row justify-between items-center">
                        <View className="flex ml-2">
                            <Text className="text-gray-700 font-semibold">Al número de cuenta</Text>
                            <Text className="text-gray-400 font-semibold mt-2">{ accountNumber }</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View className="mt-4 border-b border-gray-200">
                <View className="pb-3">
                    <View className="flex-row justify-between items-center">
                        <View className="flex ml-2">
                            <Text className="text-gray-700 font-semibold">Cuenta a utilizar para el envío</Text>
                            <Text className="text-gray-400 font-semibold mt-2">0234567645</Text>
                        </View>
                    </View>
                </View>
            </View>

            { error && <Text className="text-red-500 mt-4">{ error }</Text> }

            <View className="absolute bottom-0 left-0 right-0 p-6 bg-white">
                <Pressable
                    onPress={ handleTransfer }
                    className="rounded-full py-4"
                    style={ { backgroundColor: '#018765' } }>
                    <Text className="text-center text-base font-semibold text-white">
                        { loading ? 'Enviando...' : 'Confirmar el envío' }
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ConfirmTransferScreen;