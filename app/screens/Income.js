import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, H1, H2 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';

export default class Income extends Component {
    render() {
        return (
            <Container>
                <HeaderExport screenName="Income" navigation={this.props.navigation} />
                <Container style={commonStyles.container}>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text style={commonStyles.label}>Sales</Text>
                            <Text style={commonStyles.value}>98,876 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text style={commonStyles.label}>Rental Income</Text>
                            <Text style={commonStyles.value}>18,877 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                </Container>
            </Container>
        );
    }
}