import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import { CheckIcon } from "lucide-react-native";

type Params = {
    TransferSuccess: {
        transferResult: any;
    };
};

const TransferSuccessScreen = () => {
    const formatNumber = (amount: number): string => {
        return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const route = useRoute<RouteProp<Params, 'TransferSuccess'>>();
    const { transferResult } = route.params;

    const navigation = useNavigation();

    const handleFinish = () => {
        navigation.navigate('Tabs' as never);
    };

    // console.log(transferResult);

    if (!transferResult)
        return (
            <Text className="text-red-500 mt-4">Ha ocurrido un error. Por favor inténtalo más tarde.</Text>
        );

    return (
        <View className="bg-white flex-1 px-6 pt-28">
            <View className="mt-5 flex justify-between items-center">
                <View className="w-20 h-20 rounded-full flex-row justify-center items-center"
                      style={ { backgroundColor: '#33BA75' } }>
                    <CheckIcon color="#FFFFFF"/>
                </View>
            </View>
            <View className="mt-5 mb-5 flex justify-between items-center border-b border-gray-200">
                <Text className="text-4xl text-black font-bold">Envío con éxito</Text>
                <Text className="text-sm text-gray-500 pb-3">{ transferResult.transaction_date }</Text>
            </View>

            <View className="mt-5 flex justify-between items-center">
                <Text className="text-xl text-black font-bold">Resumen de tu envío</Text>
            </View>

            <View className="mt-5 flex justify-between items-center">
                <Text className="text-lg text-gray-500">Total enviado</Text>
                <Text className="text-lg text-black">C$ { formatNumber(parseFloat(transferResult.amount.value)) }</Text>
            </View>

            <View className="mt-5 flex justify-between items-center">
                <Text className="text-lg text-gray-500">Al número de cuenta</Text>
                <Text className="text-lg text-black">{ transferResult.destination }</Text>
            </View>

            <View className="mt-5 flex justify-between items-center">
                <Text className="text-lg text-gray-500">Cuenta utilizada para el envío</Text>
                <Text className="text-lg text-black">{ transferResult.origin }</Text>
            </View>

            <View className="absolute bottom-0 left-0 right-0 p-6 bg-white">
                <Pressable
                    onPress={ handleFinish }
                    className="rounded-full py-4"
                    style={ { backgroundColor: '#018765' } }>
                    <Text className="text-center text-base font-semibold text-white">
                        Volver al inicio
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default TransferSuccessScreen;