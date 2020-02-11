import React from 'react'
import { View, AsyncStorage, Image } from 'react-native';
import firebase from 'react-native-firebase';
import style from '../assets/styles';
import {Text, Input, Button} from 'react-native-elements';
import Errors from '../Components/Errors';
import Common from '../Common';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.unsubscribe = null;
		this.state = {
			user: null,
			message: '',
			codeInput: '',
			phoneNumber: '',
			confirmResult: null,
		};
		this.common = new Common();
	}

	async componentDidMount() {
		this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
		  if (user) {
			this.setState({ user: user.toJSON() });
			console.log("user: ",user.toJSON())
			AsyncStorage.setItem("user", JSON.stringify(user.toJSON()))
			if(user.displayName) {
				this.props.navigation.navigate(user.displayName)
			}
			else {
				this.props.navigation.navigate('Selection')
			}
			
		  } else {
			// User has been signed out, reset the state
			this.setState({
			  user: null,
			  message: '',
			  codeInput: '',
			  phoneNumber: '',
			  confirmResult: null,
			});
		  }
		});
	}

	componentWillUnmount() {
		if (this.unsubscribe) this.unsubscribe();
	}   

	signIn = () => {
		const { phoneNumber } = this.state;
		
		if(!phoneNumber) {
			this.common.showToast('Enter Phone Number')
			return null;
		}
		else if(phoneNumber && !this.common.validatePhone(phoneNumber)) {
			this.common.showToast('Enter Valid Phone Number')
			return null;
		}
		this.setState({ message: 'Please wait ...' });
		const fullNo = '+91'+phoneNumber;
		firebase.auth().signInWithPhoneNumber(fullNo)
		  .then(confirmResult => this.setState({ confirmResult, message: 'OTP sent!' }))
		  .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
	};

	confirmCode = () => {
		const { codeInput, confirmResult } = this.state;
	
		if (confirmResult && codeInput.length) {
		  confirmResult.confirm(codeInput)
			.then((user) => {
			  this.setState({ message: 'OTP Confirmed!' });
			})
			.catch(error => this.setState({ message: `OTP Confirm Error: ${error.message}` }));
		}
	};

	renderPhoneNumberInput() {
		const { phoneNumber } = this.state;
	 
		 return (
		   <View style={{ padding: 25 }}>
			 <Text h5>Enter phone number:</Text>
			 <Input
			   autoFocus
			   containerStyle={{  marginTop: 15, marginBottom: 15 }}
			   onChangeText={value => this.setState({ phoneNumber: value })}
			   placeholder={'Phone number ... '}
			   value={phoneNumber}
			   keyboardType="number-pad"
			 />
			 <Button title="Sign In" color="green" onPress={this.signIn} />
		   </View>
		 );
	}

	renderMessage() {
		const { message } = this.state;
		if (!message.length) return null;
	
		return <Errors error={message} />
	}

	renderVerificationCodeInput() {
		const { codeInput } = this.state;
	
		return (
		  <View style={{ marginTop: 25, padding: 25 }}>
			<Text>Enter verification code below:</Text>
			<Input
			  autoFocus
			  containerStyle={{  marginTop: 15, marginBottom: 15 }}
			  onChangeText={value => this.setState({ codeInput: value })}
			  placeholder={'Enter OTP '}
			  keyboardType="number-pad"
			  value={codeInput}
			/>
			<Button title="Confirm OTP" color="#841584" onPress={this.confirmCode} />
		  </View>
		);
	  }
	
	
	  render() {
		const { user, confirmResult } = this.state;
		return (
		  <View style={style.container}>
			{this.renderMessage()}
			{!user && !confirmResult && this.renderPhoneNumberInput()}
			{!user && confirmResult && this.renderVerificationCodeInput()}
		  </View>
		);
	  }
}

