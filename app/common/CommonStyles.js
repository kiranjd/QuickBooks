import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Directions } from 'react-native-gesture-handler';

const commonStyles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: wp('5%')
    },
    formElement: {
        marginBottom: wp('3.6%')
    },
    imagePicker: {
        width: wp('90%'),
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('25%'),
        width: wp('50%'),
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: wp('3.6%')
    },
    roundedIcon: {
        borderRadius: 100 / 2,
        borderWidth: 2, 
    },
    labelMain: {
        width: wp('40%'),
        fontWeight: 'bold',
        color: 'white'
    },
    valueMain: {
        width: wp('30%'),
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        paddingHorizontal: wp('2%'),
        textAlign: 'center',
        marginHorizontal: wp('4%'),
        fontWeight: 'bold',
        color: 'white'
    },
    cardContainerMain: {
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    cardItemContainer: {
         flexDirection: 'row',
    },
    label: {
        width: wp('40%'),
    },
    value: {
        width: wp('30%'),
        borderRadius: 15,
        paddingHorizontal: wp('2%'),
        textAlign: 'center',
        marginHorizontal: wp('4%'),
        fontWeight: 'bold'
    },

})

export default commonStyles;