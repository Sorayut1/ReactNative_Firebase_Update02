import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { ListItem, Badge } from 'react-native-elements';
import { firebase } from '../database/firebaseDb';

const UserScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userArr, setUserArr] = useState([]);

    useEffect(() => {
        const firestoreRef = firebase.firestore().collection('firebase');
        const unsubscribe = firestoreRef.onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.forEach(doc => {
                const { name, email, mobile, url, address,num,lname } = doc.data();
                users.push({
                    key: doc.id,
                    res: doc,
                    name,
                    email,
                    mobile,
                    url,
                    num,
                    lname,
                    address,
                });
            });
            setUserArr(users);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        );
    }

    return (
        <ScrollView>
            {userArr.map((item, index) => (
                <ListItem
                    key={index}
                    bottomDivider
                    onPress={() => {
                        navigation.navigate('UserDetailScreen', {
                            userKey: item.key
                        });
                    }}
                >
                    <Badge value={index + 1} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                        
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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

export default UserScreen;
