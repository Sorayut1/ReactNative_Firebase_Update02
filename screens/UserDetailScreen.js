import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text ,Alert} from 'react-native';
import { firebase } from '../database/firebaseDb';
import { ThemeProvider, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const UserDetailScreen = ({ route, navigation }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        mobile: '',
        url: '',
        lname: '',
        num: '',
        // เริ่มต้นด้วยอาร์เรย์ว่าง
        address: [],
        isLoading: true
    });
    
    useEffect(() => {
        const { userKey } = route.params;
        const dbRef = firebase.firestore().collection('firebase').doc(userKey);
        dbRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                setUserData({
                    key: res.id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    url: user.url,
                    num: user.num,
                    lname: user.lname,
                    address: user.address,
                    isLoading: false
                });
            } else {
                console.log('Document does not exist!');
            }
        });
    }, []);
    
    const inputValueUpdate = (val, prop) => {
        setUserData({
            ...userData,
            [prop]: val
        });
    };

    const updateUser = () => {
        setUserData({ ...userData, isLoading: true });
        const updateDBRef = firebase.firestore().collection('firebase').doc(userData.key);
        updateDBRef.set({
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            url: userData.url,
            address: [userData.num, userData.lname]
        }).then(() => {
            setUserData({
                key: '',
                name: '',
                email: '',
                mobile: '',
                url: '',
                num: '',
                lname: '',
                address: [userData.num, userData.lname],
                isLoading: false
            });
            navigation.navigate('UserScreen');
        }).catch((err) => {
            console.error('Error:', err);
            setUserData({ ...userData, isLoading: false });
        });
    };

    const deleteUser = () => {
        const dbRef = firebase.firestore().collection('firebase').doc(userData.key);
        dbRef.delete().then(() => {
            console.log("Item removed from database");
            navigation.navigate('UserScreen');
        });
    };

    const openTwoButtonAlert = () => {
        Alert.alert(
            'Delete User',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => deleteUser()},
                {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'}
            ],
            {
                cancelable: true
            }
        );
    };

    if (userData.isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }

    return(
        <ThemeProvider theme={theme}>
            <ScrollView style={styles.container}>
                <Image 
                    source={{ uri: userData.url }}
                    style={{ width: 200, height: 200 }}
                />
                <Input 
                    placeholder={'Name'}
                    value={userData.name}
                    onChangeText={(val) => inputValueUpdate(val, 'name')}
                />
                <Input 
                    placeholder={'Email'}
                    value={userData.email}
                    onChangeText={(val) => inputValueUpdate(val, 'email')}
                />
                <Input 
                    placeholder={'Mobile'}
                    value={userData.mobile}
                    onChangeText={(val) => inputValueUpdate(val, 'mobile')}
                />
                <Input 
                    placeholder={'URL Image'}
                    value={userData.url}
                    onChangeText={(val) => inputValueUpdate(val, 'url')}
                />
                <Text style={{fontSize:20,fontWeight:'bold'}}>ที่อยู่</Text>
                {userData.address.map((item, index) => (
                    index === 0 && <Text key={index}>เลข :{item}</Text>
                ))}
                <Input 
                    placeholder={'num'}
                    value={userData.num}
                    onChangeText={(val) => inputValueUpdate(val, 'num')}
                />
                {userData.address.map((item, index) => (
                    index === 1 && <Text key={index}>Lname :{item}</Text>
                ))}
                <Input 
                    placeholder={'lname'}
                    value={userData.lname}
                    onChangeText={(val) => inputValueUpdate(val, 'lname')}
                />
 
        

  
                

                <Button 
                    icon={
                        <Icon 
                            name="wrench"
                            size={15}
                            color="#fff"
                        />
                    }
                    title='  Update'
                    onPress={() => updateUser()}
                />
                <Button 
                    icon={
                        <Icon 
                            name="trash"
                            size={15}
                            color="#fff"
                        />
                    }
                    title='  Delete'
                    containerStyle={{ marginTop: 10 }}
                    buttonStyle={{ backgroundColor: "red" }}
                    onPress={openTwoButtonAlert}
                />
            </ScrollView>
        </ThemeProvider>
    );
};

const theme = {
    Button: {
        raised: true
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default UserDetailScreen;
