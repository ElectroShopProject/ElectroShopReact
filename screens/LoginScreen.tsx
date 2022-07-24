import {StyleSheet, Image, SafeAreaView, View, Text, Dimensions} from 'react-native';
import {
    Button,
    TextInput,
    Spacer,
} from '@react-native-material/core';
import React, {useState} from 'react';
import {PlatformWidth} from "../components/PlatformWidth";
import {Center} from "../components/Center";
import {Fullscreen} from "../components/Fullscreen";

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

    return (
        <View style={{maxWidth: 1024, alignSelf: 'center', paddingHorizontal: 16}}>
            <View style={{height: Dimensions.get('window').height, justifyContent: 'space-around'}}>
                <Center>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{
                            width: 300,
                            aspectRatio: 4.8,
                            resizeMode: 'contain',
                        }}
                    />
                </Center>
                <Text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has
                    been
                    the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a
                    galley
                    of
                    type
                    and scrambled it to make a type specimen book. It has survived not only five centuries,
                    but
                    also
                    the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                    the
                    1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                    with
                    desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <TextInput
                    defaultValue={text}
                    helperText={'Enter your login'}
                    onChangeText={newText => setText(newText)}/>
                <Button title={'Done'} onPress={() => postLogin()}/>
            </View>
        </View>

        // <Fullscreen>
        //     <SafeAreaView>
        //         <Center>
        //             <PlatformWidth>
        //                 <Center>
        //                     <View style={{backgroundColor: 'grey', height: 100, width: 100}}/>
        //                 </Center>
        //                 <Center>
        //                     <Image
        //                         source={require('../assets/images/logo.png')}
        //                         style={{
        //                             width: 300,
        //                             aspectRatio: 4.8,
        //                             resizeMode: 'contain',
        //                         }}
        //                     />
        //                 </Center>
        //                 <Text>
        //                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
        //                     has
        //                     been
        //                     the
        //                     industry's standard dummy text ever since the 1500s, when an unknown printer took a
        //                     galley
        //                     of
        //                     type
        //                     and scrambled it to make a type specimen book. It has survived not only five centuries,
        //                     but
        //                     also
        //                     the
        //                     leap into electronic typesetting, remaining essentially unchanged. It was popularised in
        //                     the
        //                     1960s
        //                     with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
        //                     with
        //                     desktop
        //                     publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        //                 </Text>
        //                 <TextInput
        //                     defaultValue={text}
        //                     helperText={'Enter your login'}
        //                     onChangeText={newText => setText(newText)}/>
        //                 <Button title={'Done'} onPress={() => postLogin()}/>
        //             </PlatformWidth>
        //         </Center>
        //     </SafeAreaView>
        // </Fullscreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: 'green'
    },
})