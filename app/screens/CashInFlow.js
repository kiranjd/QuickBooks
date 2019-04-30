import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, H1, H2 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';

export default class CashInFlow extends Component {
    render() {
        return (
            <Container>
                <HeaderExport screenName="Cash In-Flow" navigation={this.props.navigation} />
                <Container style={commonStyles.container}>
                <H2 style={{color: 'brown', marginVertical: hp('2%')}}>Cash In Flow</H2>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text style={commonStyles.label}>Direct Income</Text>
                            <Text style={commonStyles.value}>2,00,876 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text style={commonStyles.label}>Indirect Income</Text>
                            <Text style={commonStyles.value}>35,877 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text style={commonStyles.label}>Current Assets</Text>
                            <Text style={commonStyles.value}>5,877 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem style={{backgroundColor: 'rgba(0, 0, 255, 0.1)'}} button onPress={() => this.props.navigation.navigate('BankBalance')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text uppercase style={commonStyles.labelMain}>Total</Text>
                            <Text style={commonStyles.valueMain}>3,67,897 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <H2 style={{color: 'brown', marginVertical: hp('2%')}}>Application Of Fund</H2>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text style={commonStyles.label}>Current Liabilities</Text>
                            <Text style={commonStyles.value}>2,00,876 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text style={commonStyles.label}>Direct Expense</Text>
                            <Text style={commonStyles.value}>35,877 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card style={commonStyles.cardContainerMain}>
                    <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                        <Body style={commonStyles.cardItemContainer}>
                            <Text style={commonStyles.label}>Indirect Expense</Text>
                            <Text style={commonStyles.value}>5,877 Rs.</Text>
                        </Body>
                    </CardItem>
                </Card>
                </Container>
            </Container>
        );
    }
}