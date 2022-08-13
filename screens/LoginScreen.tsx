import {
    Image,
    Text,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform,
    StyleSheet
} from 'react-native';
import React, {useState} from 'react';
import {FullScreen} from "../components/FullScreen";
import {PlatformBackground} from "../components/PlatformBackground";
import {Button, TextInput} from "@react-native-material/core";
import {Padding} from "../components/Padding";
import {Expand} from "../components/Expand";
import {ElasticColumns} from "../components/ElasticColumns";
import {Center} from "../components/Center";
import TextStyle from "../styles/TextStyle";
import ComponentStyle from "../styles/ComponentStyle";
import {StateWrapper} from "../components/StateWrapper";

export function LoginScreen({navigation}) {
    const [login, setLogin] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const postLogin = async () => {
        try {
            if (login.length < 3) {
                setError('Your login is too short. Put min. 3 characters.');
                return
            }

            setError(undefined);

            setLoading(true);
            const response = await fetch(
                'https://electroshopapi.herokuapp.com/user/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: login,
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

    return (
        <FullScreen style={ComponentStyle.background}>
            <Expand>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Expand>
                        <Center>
                            <PlatformBackground>
                                <StateWrapper isLoading={isLoading}>
                                    <Expand>
                                        <Padding>
                                            <ElasticColumns>
                                                <Center>
                                                    <Image
                                                        source={require('../assets/images/logo.png')}
                                                        style={styles.image}/>
                                                </Center>
                                                <Text style={TextStyle.regular}>
                                                    Welcome in the best electronic shop!
                                                    You will find here phones, laptops and every
                                                    electronic equipment that You can imagine.
                                                </Text>
                                                <TouchableHighlight>
                                                    <Text style={TextStyle.highlighted}>
                                                        Before signing-in please read our privacy-policy
                                                    </Text>
                                                </TouchableHighlight>
                                                <Text style={TextStyle.regular}>
                                                    To start shopping please provide Your login:
                                                </Text>
                                                {error === undefined ?
                                                    <TextInput
                                                        variant="outlined"
                                                        defaultValue={login}
                                                        helperText={'Enter your login'}
                                                        onChangeText={newText => setLogin(newText)}/>
                                                    : <TextInput
                                                        color='red'
                                                        variant="outlined"
                                                        inputStyle={styles.errorInput}
                                                        defaultValue={login}
                                                        helperText={error}
                                                        onChangeText={newText => setLogin(newText)}/>
                                                }
                                                <Button title={'Done'} onPress={() => postLogin()}/>
                                            </ElasticColumns>
                                        </Padding>
                                    </Expand>
                                </StateWrapper>
                            </PlatformBackground>
                        </Center>
                    </Expand>
                </KeyboardAvoidingView>
            </Expand>
        </FullScreen>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        aspectRatio: 4.8,
        resizeMode: 'contain',
        alignSelf: 'flex-start'
    },
    errorInput: {
        color: 'red'
    }
})