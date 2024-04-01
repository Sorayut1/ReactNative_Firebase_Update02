import React, { useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View ,TextInput} from 'react-native';
import { ThemeProvider, Button, Text, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase } from '../database/firebaseDb';
import RNPickerSelect from 'react-native-picker-select';

const AddUserScreen = ({ navigation }) => {
    const dbRef = firebase.firestore().collection('firebase');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [url, setUrl] = useState("");
    const [num, setNum] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const inputValueUpdate = (val, prop) => {
        switch(prop) {
            case 'name':
                setName(val);
                break;
            case 'email':
                setEmail(val);
                break;
            case 'mobile':
                setMobile(val);
                break;
            case 'url':
                setUrl(val);
                break;
            case 'num':
                setNum(val);
                break;
            case 'lname':
                setLname(val);
                break;
            default:
                break;
        }
    }

    const storeUser = () => {
        if (name === '') {
            alert('Fill at least your name!');
        } else {
            setIsLoading(true);
            dbRef.add({
                name: name,
                email: email,
                mobile: mobile,
                url: url,
                address: [num, lname]
            }).then((res) => {
                setName('');
                setEmail('');
                setMobile('');
                setUrl('');
                setNum('');
                setLname('');
                setIsLoading(false);
                navigation.navigate('UserScreen');
            }).catch((err) => {
                console.log('Error found: ', err);
                setIsLoading(false);
            });
        }
    }
    console.log(address)
    if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }

    return (
        <ScrollView>
            <View>
                <ThemeProvider theme={theme}>
                    <ScrollView style={styles.container}>
                        <Image 
                            source={{ uri: url }}
                            style={{ width: 200, height: 200 }}
                            containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
                        />
                        
        
                     
      
                        <Input 
                            leftIcon={
                                <Icon 
                                    name='user-o'
                                    size={20}
                                    color='#0085E6'
                                />
                            }
                            placeholder={'  Name'}
                            value={name}
                            onChangeText={(val) => inputValueUpdate(val, 'name')}
                        />
                        <Input 
                            leftIcon={
                                <Icon 
                                    name='envelope-o'
                                    size={20}
                                    color='#0085E6'
                                />
                            }
                            placeholder={'  Email'}
                            value={email}
                            onChangeText={(val) => inputValueUpdate(val, 'email')}
                        />
                        <Input 
                            leftIcon={
                                <Icon 
                                    name='mobile'
                                    size={30}
                                    color='#0085E6'
                                />
                            }
                            placeholder={'  Mobile'}
                            value={mobile}
                            onChangeText={(val) => inputValueUpdate(val, 'mobile')}
                        />
                        <Input 
                            leftIcon={
                                <Icon 
                                    name='mobile'
                                    size={30}
                                    color='#0085E6'
                                />
                            }
                            placeholder={'url'}
                            value={url}
                            onChangeText={(val) => inputValueUpdate(val, 'url')}
                        />
                        <Text style={{fontSize:20,fontWeight:'bold'}}>ที่อยู่</Text>
                        <Input 
                            leftIcon={
                                <Icon 
                                    name='mobile'
                                    size={30}
                                    color='#0085E6'
                                />
                            }
                            placeholder={'num'}
                            value={num}
                            onChangeText={(val) => inputValueUpdate(val, 'num')}
                        />
                        <Input 
                            leftIcon={
                                <Icon 
                                    name='mobile'
                                    size={30}
                                    color='#0085E6'
                                />
                            }
                            placeholder={'lname'}
                            value={lname}
                            onChangeText={(val) => inputValueUpdate(val, 'lname')}
                        />
                        <Button 
                            icon={
                                <Icon 
                                    name='check'
                                    size={15}
                                    color='white'
                                />
                            }
                            title='  Add User'
                            buttonStyle={{
                                backgroundColor: "green"
                            }}
                            onPress={() => storeUser()}
                        />
                        <Button 
                            icon={
                                <Icon 
                                    name='users'
                                    size={15}
                                    color='white'
                                />
                            }
                            title='  Go to User List'
                            onPress={() => navigation.navigate('UserScreen')}
                            containerStyle={{
                                marginTop: 10
                            }}
                        />
                    </ScrollView>
                </ThemeProvider>
            </View>
        </ScrollView>
    );
}

const theme = {
    Button: {
        raised: true
    }
}

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
})

export default AddUserScreen;
