import {Image, View, Text} from 'react-native';
import React, {useState} from 'react';
import {FullScreen} from "../components/FullScreen";
import {PlatformBackground} from "../components/PlatformBackground";
import {Button, TextInput} from "@react-native-material/core";
import {Padding} from "../components/Padding";
import {Expand} from "../components/Expand";
import {PlatformComponentConstraint} from "../components/PlatformComponentConstraint";
import {PlatformSideView} from "../components/PlatformSideView";

export function LoginScreen({navigation}) {
    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(false);

    const postLogin = async () => {
        try {
            setLoading(true);
            console.log(text);
            const response = await fetch(
                'https://electroshopapi.herokuapp.com/user/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: text,
                    }),
                },
            );
            const data = await response.json();
            global.userId = data.id;
            console.log(data);
            navigation.replace('Orders');
        } catch (error) {
            console.error(error);
        } finally {
            try {
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
    };

    // useEffect(() => {
    //     setLoading(true)
    // })
    {/*// TODO Add empty field validation*/
    }
    {/*// TODO Handle proper button width*/
    }
    return (
        <FullScreen style={{backgroundColor: '#EEEEEE'}}>
            <PlatformBackground>
                <Expand>
                    <Padding>
                        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
                            <PlatformSideView>
                                <Image
                                    source={require('../assets/images/logo.png')}
                                    style={{
                                        width: 300,
                                        aspectRatio: 4.8,
                                        resizeMode: 'contain',
                                        alignSelf: 'flex-start'
                                    }}
                                />
                                <Text style={{fontSize: 20, fontWeight: '400'}}>
                                    Welcome in the best electronic shop! You will find phones, laptops and every
                                    electronic
                                    equipment that You can imagine.
                                </Text>
                                <Text style={{fontSize: 20, fontWeight: '500'}}>
                                    Before signing-in please read our privacy-policy
                                </Text>
                                <Text style={{fontSize: 20, fontWeight: '400'}}>
                                    To start shopping please provide Your login:
                                </Text>
                                <PlatformComponentConstraint>
                                    <TextInput
                                        defaultValue={text}
                                        helperText={'Enter your login'}
                                        onChangeText={newText => setText(newText)}/>
                                </PlatformComponentConstraint>
                                <PlatformComponentConstraint>
                                    <Button title={'Done'} onPress={() => postLogin()}/>
                                </PlatformComponentConstraint>
                            </PlatformSideView>
                        </View>
                    </Padding>
                </Expand>
            </PlatformBackground>
        </FullScreen>
    )
}