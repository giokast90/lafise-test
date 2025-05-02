import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import TransferMoneyScreen from '../screens/TransferMoneyScreen';
import ConfirmTransferScreen from '../screens/ConfirmTransferMoney';
import TransferSuccessScreen from '../screens/TransferSuccess';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator id={ undefined } initialRouteName="Tabs">
                <Stack.Screen name="Tabs" component={ TabNavigator } options={ { headerShown: false } }/>
                <Stack.Screen name="TransferMoney" component={ TransferMoneyScreen }
                              options={ {
                                  title: 'Transferir dinero',
                                  headerTitleAlign: 'center',
                                  headerBackTitle: 'Atrás'
                              } }/>
                <Stack.Screen name="ConfirmTransfer" component={ ConfirmTransferScreen }
                              options={ {
                                  title: 'Confirma tu envío',
                                  headerTitleAlign: 'center',
                                  headerBackTitle: 'Atrás'
                              } }/>
                <Stack.Screen name="TransferSuccess" component={ TransferSuccessScreen }
                              options={ {
                                  headerShown: false
                              } }/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;