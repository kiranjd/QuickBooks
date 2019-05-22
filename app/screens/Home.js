import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
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
            code: this.props.navigation.getParam('Id', 'CtEzTYe'),
            realmId: '',
            accessToken: '',
            recievable: '',
            payable: '',
            bankBalance: '',
            expenses: '',
            income: '',
            profitAndLoss: ''
        }
    }

    componentDidMount() {
        //alert(this.state.code);
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
            .then(responseJson => {
                this.setState({
                    realmId: responseJson.RealmId,
                    accessToken: responseJson.AccessToken
                });
                this.callAPI();
            })
        .catch(error => console.log(error));
    }

    roundIt = (num) => {return Math.round(num * 100) / 100}

    callAPI = () => {
        let url = "https://sandbox-quickbooks.api.intuit.com/v3/company/123146474131214/query?minorversion=14";
        let bearer = 'Bearer ' + this.state.accessToken;
        let query = '';
        headers = (query, bearer) =>{
            return {
            method: 'POST',
            body: query,
            credentials: 'include',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/text',
                'Accept': 'application/json'
            }
        }
    };
        console.log(bearer);
        
        //Recievable
        query = 'select * from Account where AccountType = \'Accounts Receivable\'';
        
        fetch(url, headers(query, bearer))
        .then(response => response.json())
        .then(responseJson => {
            let result = responseJson['QueryResponse']['Account'][0]['CurrentBalance'];
            //console.log(result);
            this.setState({recievable:result })
        })
        .catch(error => console.log(error))

        //Payable
        query = 'select * from Account where AccountType = \'Accounts Payable\'';
        fetch(url, headers(query, bearer))
        .then(response => response.json())
        .then(responseJson => {
            let result = responseJson['QueryResponse']['Account'][0]['CurrentBalance'];
            //console.log(result);
            this.setState({payable:result })
        })
        .catch(error => console.log(error))

        //Bank Balance
        query = 'select * from Account where AccountType = \'Bank\'';
        fetch(url, headers(query, bearer))
        .then(response => response.json())
        .then(responseJson => {
            let result = responseJson['QueryResponse']['Account'];
            let sum = 0;
            result.forEach(function(entry) {
                //console.log(entry['CurrentBalance']);
                sum = sum + entry['CurrentBalance'];
            });
            this.setState({bankBalance: sum })
        })
        .catch(error => console.log(error))


        let urlPL = "https://sandbox-quickbooks.api.intuit.com/v3/company/123146474131214/reports/ProfitAndLoss?minorversion=14";
        headersPL = (query, bearer) => {
            return {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    'Accept': 'application/json'
                }
            }
        }
        //Income, expense, profit and loss
        fetch(urlPL, headersPL(query, bearer))
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
            let mainExpense = responseJson['Rows']['Row'][3]['Summary']['ColData'][1]['value'];
            let otherExpense = responseJson['Rows']['Row'][5]['Summary']['ColData'][1]['value'];
            let COGS = responseJson['Rows']['Row'][1]['Summary']['ColData'][1]['value'];
            let expense = Number(mainExpense) + Number(otherExpense) + Number(COGS);
            let income = responseJson['Rows']['Row'][0]['Summary']['ColData'][1]['value'];
            let profitAndLoss = income - expense;
            this.setState({
                income: this.roundIt(income),
                expenses: this.roundIt(expense),
                profitAndLoss: this.roundIt(profitAndLoss)
            });
        })
        .catch(error => console.log(error))
    }
    
    render() {
        //alert(this.state.code);
        let { recievable, payable, bankBalance, expenses, income, profitAndLoss, code } = this.state;
        //alert(accessToken);
        return (
            <Container>
                <HeaderExport screenName="Home" navigation={this.props.navigation} />
                <ScrollView style={commonStyles.container}>
                    <H2 style={{ color: 'brown', marginVertical: hp('2%') }}>Bank Balance</H2>
                    <Card style={commonStyles.cardContainerMain}>
                    {/* onPress={() => this.props.navigation.navigate('BankBalance')} */}
                        <CardItem style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }}  button onPress={this.callAPI}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text uppercase style={commonStyles.labelMain}>Bank Balance</Text>
                                <Text style={commonStyles.valueMain}>{bankBalance? bankBalance: 0} Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Cash Balance</Text>
                                <Text style={commonStyles.value}>0 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Recievables')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Recievables</Text>
                                <Text style={commonStyles.value}>{recievable? recievable: 0} Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Payables')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Payables</Text>
                                <Text style={commonStyles.value}>{payable? payable: 0} Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('StatutoryPayables')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Statutory Payables</Text>
                                <Text style={commonStyles.value}>0 Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Income')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Income</Text>
                                <Text style={commonStyles.value}>{income? income: 0} Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                        <CardItem button onPress={() => this.props.navigation.navigate('Expenses')}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Expenses</Text>
                                <Text style={commonStyles.value}>{expenses? expenses: 0} Rs.</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={commonStyles.cardContainerMain}>
                    {/* onPress={() => this.props.navigation.navigate('BankBalance')} */}
                        <CardItem style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }} onPress={this.callAPI} button >
                            <Body style={commonStyles.cardItemContainer}>
                                <Text uppercase style={commonStyles.labelMain}>Profit and Loss Account</Text>
                                <Text style={commonStyles.valueMain}>{profitAndLoss? profitAndLoss: 0} Rs.</Text>
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
                    <Card >
                        <CardItem button onPress={() => this.props.navigation.navigate('CashInFlow', {Id: code})}>
                            <Body style={commonStyles.cardItemContainer}>
                                <Text style={commonStyles.label}>Cash Flow</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </ScrollView>
            </Container>
        );
    }
}