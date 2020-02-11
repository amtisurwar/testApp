import React from 'react'

import { Platform, AsyncStorage, FlatList, Modal, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Icon, Card, Badge } from 'react-native-elements';
import ShowAnswers from './ShowAnswers';
import style from '../assets/styles';

export default class AnswerModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          
        >
          <ScrollView>
            <View style={{ alignItems: 'flex-end' }}>
              <Icon
                name="times"
                type="font-awesome"
                size={16}
                raised
                onPress={() => this.props.closeModal()}
              />
              <Card
                image={this.props.item.image ? { uri: this.props.item.image } : null}>
                <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>{this.props.item.question}</Text>
                <View>
                <ShowAnswers comments={this.props.comments} showReply saveAnswer={this.props.saveAnswer} item={this.props.item} answers={this.props.answers} /> 
                </View>
              </Card>
            </View>
          </ScrollView>
        </Modal>
      
    )
  }
}