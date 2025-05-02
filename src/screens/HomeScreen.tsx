import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountDetail } from '@/store/slices/accountSlice';
import { fetchTransactions } from '@/store/slices/transactionsSlice';
import { Button } from '@/components/ui/button';
import { AppDispatch, RootState } from "@/store";
import {
    EyeOffIcon,
    SendIcon,
    BanknoteArrowUpIcon,
    LightbulbIcon,
    SmartphoneIcon,
    PanelTopOpenIcon,
    ArrowDownIcon,
    ArrowUpIcon
} from 'lucide-react-native';
// @ts-ignore
import LAFISELogo from '@/../assets/LAFISE.png';
// @ts-ignore
import avatar from '@/../assets/avatar-01.jpg';
import { useNavigation } from '@react-navigation/native';
import { Button as Button2 } from '@react-navigation/elements';

export default function HomeScreen() {
    const formatBalance = (amount: number): string => {
        return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const dispatch = useDispatch<AppDispatch>();
    const { detail, loading } = useSelector((state: RootState) => state.account);
    const { items } = useSelector((state: RootState) => state.transactions);
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(fetchAccountDetail());
        dispatch(fetchTransactions());
    }, []);

    if (loading || !detail)
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large"/>
                <Text>Loading account details...</Text>
            </View>
        );

    if (!loading && !detail)
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">Failed to load account info.</Text>
            </View>
        );

    return (
        <ScrollView className="bg-white flex-1">
            <View className="bg-green-900 p-6 h-72">
                <View className="top-10">
                    <View className="flex-row justify-between">
                        <View className="flex-row">
                            <Image source={ LAFISELogo } style={ { width: 28, height: 28, resizeMode: 'contain' } }/>
                            <Text className="text-white text-lg pl-2">Hola, Josué</Text>
                        </View>
                        <Image source={ avatar } className="rounded-full"
                               style={ { width: 32, height: 32, resizeMode: 'contain' } }/>
                    </View>
                    <View className="flex-row mt-5">
                        <Text className="text-white text-xl">Mis productos</Text>
                        <EyeOffIcon className="text-white ml-2"/>
                    </View>
                </View>
            </View>

            <View className="absolute top-1/3 left-0 right-0 p-6">
                <View className="bg-white mt-6 rounded-xl p-4 shadow">
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="text-black-500">{ detail?.alias }</Text>
                            <Text className="text-sm text-gray-400">{ detail?.account_number }</Text>
                        </View>
                        <SendIcon className="text-green-800"/>
                    </View>
                    <Text className="text-sm text-gray-500 mt-5">Saldo disponible</Text>
                    <View className="flex-row">
                        <Text className="text-black mt-2">{ detail.currency }</Text>
                        <Text className="text-2xl font-bold pl-1">{ formatBalance(detail?.balance ?? 0) }</Text>
                    </View>
                </View>

                <View className="mt-6">
                    <Button2 onPress={ () => navigation.navigate('TransferMoney' as never) }>
                        Transferir dinero
                    </Button2>
                </View>

                <View className="bg-white mt-6 rounded-xl p-4 shadow">
                    <Text className="text-lg font-bold">Operaciones rápidas</Text>
                    <View className="flex-row justify-between mt-4">
                        <Button variant="empty" className="items-center w-1/4 h-25"
                                onPress={ () => navigation.navigate('TransferMoney' as never) }>
                            <View className="w-14 h-14 rounded-xl flex justify-center items-center"
                                  style={ { backgroundColor: '#E6F3F0' } }>
                                <BanknoteArrowUpIcon color="#018765"/>
                            </View>
                            <Text className="text-xs text-center mt-2">Transferir Dinero</Text>
                        </Button>
                        <Button variant="empty" className="items-center w-1/4 h-25">
                            <View className="w-14 h-14 rounded-xl flex justify-center items-center"
                                  style={ { backgroundColor: '#FFF3E9' } }>
                                <LightbulbIcon color="#E8781C"/>
                            </View>
                            <Text className="text-xs text-center mt-2">Pagar Servicio</Text>
                        </Button>
                        <Button variant="empty" className="items-center w-1/4 h-25">
                            <View className="w-14 h-14 rounded-xl flex justify-center items-center"
                                  style={ { backgroundColor: '#E6F7FD' } }>
                                <SmartphoneIcon color="#0079A8"/>
                            </View>
                            <Text className="text-xs text-center mt-2">Recargar celular</Text>
                        </Button>
                        <Button variant="empty" className="items-center w-1/4 h-25">
                            <View className="w-14 h-14 rounded-xl flex justify-center items-center"
                                  style={ { backgroundColor: '#EAE6F3' } }>
                                <PanelTopOpenIcon color="#52169E"/>
                            </View>
                            <Text className="text-xs text-center mt-2">Retiro sin tarjeta</Text>
                        </Button>
                    </View>
                </View>
                <View className="mt-8 border-b border-gray-200">
                    {
                        items.map((item) => (
                                <View key={ item.transaction_number } className="flex-row justify-between pb-3">
                                    <View className="flex-row justify-between items-center">
                                        <View className="w-11 h-11 rounded-full flex justify-center items-center"
                                              style={ { backgroundColor: '#E6F3F0' } }>
                                            {
                                                item.transaction_type === 'Credit' ?
                                                    <ArrowDownIcon color="#018765"></ArrowDownIcon> :
                                                    <ArrowUpIcon color="#018765"></ArrowUpIcon>
                                            }
                                        </View>
                                        <View className="flex ml-2">
                                            <Text className="text-gray-700 font-semibold">{ item.description }</Text>
                                            <Text className="text-gray-400 font-semibold">{ item.bank_description }</Text>
                                        </View>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Text className="text-green-700 font-bold">
                                            { item.amount.currency === 'USD' ? 'U$' : 'C$' } { formatBalance(item.amount.value ?? 0) }
                                        </Text>
                                    </View>
                                </View>
                            )
                        )
                    }
                </View>
            </View>

            <View className="h-20"/>
        </ScrollView>
    );
}
