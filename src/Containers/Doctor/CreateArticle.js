import React, { Component } from 'react';
import { Platform, View, AsyncStorage, Image, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
import { Text, Input, Button, Icon, Avatar } from 'react-native-elements';
import style from '../../assets/styles';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import Common from '../../Common';

const options = {
    title: 'Select Picture',
    takePhotoButtonTitle: 'Take Photo',
    chooseFromLibraryButtonTitle: 'Choose from Library',
    mediaType: 'photo',
    cameraType: 'back',
    storageOptions: {
        skipBackup: true,
    },
};


export default class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: '',
            downloadUrl: '',
            question: '',
            questionError: '',
            errors: [],
            progress: 0,
            disabledStatus: false,
        }
        this.common = new Common();
    }

    UploadPicture() {
        ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
                console.log("response: ",response)
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                });
                this.uploadImage(response)
			}
		});
    }

    uploadImage = (file) => {
        var snapshot = null;
        var fileName = (new Date()).getTime()
        var th = this;
        th.setState({disabledStatus: true})
        var uploadTask = firebase.storage().ref('question/'+fileName).putFile(file.path);
        uploadTask.on('state_changed', function(snapshot){
            
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            if(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                th.setState({progress:progress})
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            }
          }, function(error) {
              console.log("upload error: ",error)
              th.setState({disabledStatus: false})
          }, function(success) {
            console.log("upload success: ",success)
            th.common.showToast("Uploaded Successfully.")
            th.setState({downloadUrl:success.downloadURL})
            th.setState({disabledStatus: false})
          });
    }

    postQuestion = () => {
        
        if(!this.state.question) {
            this.common.showToast("Enter question")
            return false;
        }
        else {
            this.setState({disabledStatus: true})
            firebase.firestore().collection('question').add({
                question: this.state.question,
                image: this.state.downloadUrl,
                userId: this.common.getUserId(),
                createdOn: new Date(),
                modifiedOn: new Date()
            })
            .catch( error => {
                this.setState({disabledStatus: false})
                this.common.showToast('Something went wrong, please try again later')
            })
            .done( success => {
                this.setState({disabledStatus: false})
                this.common.showToast('Question Post Successfully.')
                this.setState({
                    avatarSource: '',
                    downloadURL: '',
                    question: ''
                })
            });
        }
    }

    showProgress = () => {
        if(this.state.progress > 0 && this.state.progress < 100) {
            if(Platform.OS === 'ios') {
                return <ProgressViewIOS
                progress={(this.state.progress * 1)/100}
                trackTintColor="#2196F3"
                progressViewStyle='bar'
                />
            }
            else {
                return <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={(this.state.progress * 1)/100}
                color="#2196F3"
                />
            }
        }
    }
    

    render() {
        
        return (
            <View style={style.container}>
                <Input
                    placeholder='Ask anything from our specialist'
                    inputStyle={{fontSize:14}}
                    multiline
                    autoCompleteType="off" 
                    errorMessage={this.state.questionError} 
                    value={this.state.question} 
                    onChangeText={(text) => this.setState({ 'question': text })}
                    rightIcon={
                        <Icon
                            name="image"
                            onPress={() => this.UploadPicture()}
                        />
                    }
                />
                {this.state.avatarSource ? <Avatar
                    size={100}
                    overlayContainerStyle={{ backgroundColor: '#FFF' }}
                    source={this.state.avatarSource}
                    imageProps={{ resizeMode: 'cover' }}
                    containerStyle={{margin:10}}
                /> : null }
                <Button
                    title="Post Question"
                    containerStyle={style.mtop15}
                    disabled={this.state.disabledStatus}
                    onPress={() => this.postQuestion()}
                />
            </View>
        )
    }
}

