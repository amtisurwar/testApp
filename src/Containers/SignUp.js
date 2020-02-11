import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import Loader from '../Components/Loader';
import firebase from 'react-native-firebase'
import Common from '../Common';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }
        this.common = new Common()
    }

    handleSignUp = () => {
        console.log('handleSignUp')
        if(!this.state.email) {
            this.common.showToast("Enter Email")
        }
        else if(!this.state.password) {
            this.common.showToast("Enter Password")
        }
        else if(this.state.email && !this.common.validateEmail(this.state.email)) {
            this.common.showToast("Enter Valid Email")
        }
        else {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => console.log("user: ",user))
            .catch(error => this.setState({ errorMessage: error.message }))    
        }

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
                <Button
                    title="Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('SignIn')}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})