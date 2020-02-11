import React, { Component, useState } from 'react';
import { Platform, View, AsyncStorage, FlatList, Modal, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Icon, Card, Badge, Avatar, PricingCard, SearchBar, ListItem } from 'react-native-elements';
import styles from '../../assets/styles';
import firebase from 'react-native-firebase';
import Common from '../../Common';
import { ScrollView } from 'react-native-gesture-handler';

export default class DoctorDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            profile: []
        }
        this.common = new Common()

    }

    componentDidMount() {
        var profile = this.props.navigation.getParam('item');
        this.setState({ profile: profile })
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                
                    <View style={styles.Part1}>
                        <View style={styles.avatar}>
                            <Text style={[styles.white, styles.imageName]}>MK</Text>
                        </View>
                        <Text style={[styles.white, styles.name]}>{this.state.profile.firstname} {this.state.profile.lastname}</Text>
                        <Text style={[styles.white]}>{this.state.profile.city}, {this.state.profile.country}</Text>
                    </View>
                    <View style={styles.Part3}>
                        <Card containerStyle={styles.part2Card}>
                            <View style={styles.Part2}>
                                <View style={styles.center}>
                                    <Text>Chat</Text>
                                    <Icon
                                        name="stack-exchange"
                                        type="font-awesome"
                                        reverse
                                        color="#E82368"
                                        onPress={() => this.props.navigation.navigate('Chat', {profile: this.state.profile})}
                                    />
                                </View>
                                <View style={styles.center}>
                                    <Text>Video Call</Text>
                                    <Icon
                                        name="video-camera"
                                        type="font-awesome"
                                        reverse
                                        color="#E82368"
                                    />
                                </View>
                            </View>
                        </Card>
                        <ScrollView style={styles.part3Content}>
                            <View style={styles.row}>
                                <Text style={[styles.bold]}>Clinic: </Text>
                                <Text style={styles.primary}>{this.state.profile.clinic_name} </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.bold]}>Description: </Text>
                                <Text style={styles.primary}>{this.state.profile.description} </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.bold]}>Speciality: </Text>
                                <Text style={styles.primary}>{this.state.profile.specialities && this.state.profile.specialities.join(", ")} </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={[styles.bold]}>Contact: </Text>
                                <Text style={styles.primary}>{this.state.profile.contact} </Text>
                            </View>
                        </ScrollView>
                    </View>
            </View>
        )
    }
}

