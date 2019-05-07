import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, H1, H2 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';
import { baseUrl } from '../common/Constants';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.navigation.getParam('Id', 'QYWbOIK'),
            realmId: '',
            accessToken: ''
        }
    }

    componentDidMount() {
        alert(this.state.code);
        let { code, realmId, accessToken } = this.state;

        let url = baseUrl + '/getToken.php?id=' + code;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseJson => this.setState({
            realmId: responseJson.RealmId,
            accessToken: responseJson.AccessToken 
        }))
        .catch(error => console.log(error));
    }

    callAPI = () => {
        let url = "https://sandbox-quickbooks.api.intuit.com/v3/company/123146474131214/query?minorversion=14";
        let bearer = 'Bearer ' + this.state.accessToken;
        let headers = {
            method: 'POST',
            body: 'select * from Account',
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                //'User-Agent': 'QBOV3-OAuth2-Postman-Collection',
                'Content-Type': 'application/text',
                'Accept': 'application/json'
            }
        };
        console.log(bearer);
        
        fetch(url, headers)
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson['QueryResponse']['Account'][0]);
        })
        .catch(error => console.log(error));
    }
    
    render() {
        //alert(this.state.code);
        let { code, realmId, accessToken } = this.state;
        //alert(accessToken);
        return (
            <Container>
                <HeaderExport screenName="Home" navigation={this.props.navigation} />
                <Container style={commonStyles.container}>
                    <H2 style={{ color: 'brown', marginVertical: hp('2%') }}>Bank Balance</H2>
                    <Card style={commonStyles.cardContainerMain}>
                    {/* onPress={() => this.props.navigation.navigate('BankBalance')} */}
                        <CardItem style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }}  button onPress={this.callAPI}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text uppercase style={commonStyles.labelMain}>Bank Balance</Text>
                                <Text style={commonStyles.valueMain}>3,67,897 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Cash Balance</Text>
                                <Text style={commonStyles.value}>2,45,877 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Recievables')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Recievables</Text>
                                <Text style={commonStyles.value}>50,774 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Payables')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Payables</Text>
                                <Text style={commonStyles.value}>32,009 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('StatutoryPayables')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Statutory Payables</Text>
                                <Text style={commonStyles.value}>12,754 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Income')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Income</Text>
                                <Text style={commonStyles.value}>65,000 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Expenses')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Expenses</Text>
                                <Text style={commonStyles.value}>92,897 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                    {/* onPress={() => this.props.navigation.navigate('BankBalance')} */}
                        <CardItem style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }} onPress={this.callAPI} button >
                            <Body style={commonStyles.cardItemContainer}>
                                <Text uppercase style={commonStyles.labelMain}>Profit and Loss Account</Text>
                                <Text style={commonStyles.valueMain}>1,77,000 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('ProfitAndLoss')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Balance Sheet</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('CashInFlow')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Cash Flow</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Container>
            </Container>
        );
    }
}