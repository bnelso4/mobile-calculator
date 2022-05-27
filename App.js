import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import  CalcButton  from './assets/components/CalcButton';

const numColor = 'rgb(51,122,255)';
const opColor = 'rgb(117,117,117)';
let decimal = false;

const reducer = function (state, action) {
    // state = {value1, operation: x||div||-||+, value2}
    // action = {type: number||operation, payload: number||A/C||+/-||%||div||x||-||+||= }
    switch (action.type) {
        case 'number': if (state.operation == null && state.value2 == null) {



            if (!decimal) {
                return { ...state, value1: state.value1 * 10 + action.payload }
            }
            else {
                return {...state, value1: state.value1 + (action.payload/(Math.pow(10,(state.value1.countDecimals()+1))))}
            }
        }
        else {
            if (!decimal) {
                return { ...state, value2: state.value2 * 10 + action.payload }
            }
            else {
                return { ...state, value2: state.value2 + (action.payload / (Math.pow(10, (state.value2.countDecimals() + 1))))}
            }
        }
        case 'operation':
            decimal = false;
            if (action.payload == 'A/C') {
                return { value1: null, operation: null, value2: null }
            }
            else if (state.value2 == null) {
                if (action.payload == '+/-') {
                    return { ...state, value1: state.value1 * -1 }
                }
                else if (action.payload == '%') {
                    return { ...state, value1: state.value1 / 100 }
                }
                else if (action.payload == 'div') {
                    return { ...state, operation: 'div' }
                }
                else if (action.payload == 'x') {
                    return { ...state, operation: 'x' }
                }
                else if (action.payload == '-') {
                    return { ...state, operation: '-' }
                }
                else if (action.payload == '+') {
                    return { ...state, operation: '+' }
                }
                else {
                    
                    return state;
                }

            }
            else{
                if (action.payload == '+/-') {
                    return { ...state, value2: state.value2 * -1 }
                }
                else if (action.payload == '%') {
                    return { ...state, value2: state.value2 / 100 }
                }
                else if (action.payload == 'div') {
                    return { ...state, value1:state.value1/state.value2, value2:null, operation: 'div' }
                }
                else if (action.payload == 'x') {
                    return { ...state, value1: state.value1*state.value2, value2: null, operation: 'x' }
                }
                else if (action.payload == '-') {
                    return { ...state, value1: state.value1-state.value2, value2: null, operation: '-' }
                }
                else if (action.payload == '+') {
                    return { ...state, value1: state.value1+state.value2, value2: null, operation: '+' }
                }
                else if (action.payload == '=')
                {
                    
                    switch (state.operation) {
                        case 'div':
                            return { ...state, value1: state.value1 / state.value2, value2: null, operation: null }
                        case 'x':
                            return { ...state, value1: state.value1 * state.value2, value2: null, operation: null }
                        case '-':
                            return { ...state, value1: state.value1 - state.value2, value2: null, operation: null }
                        case '+':
                            return { ...state, value1: state.value1 + state.value2, value2: null, operation: null }
                        default: return state
                    }





                }
                else {
                    
                    return state;
                }
            }




        default:
            
            return state;


    }


}

const checkDisplayValue = function (state) {
    if (state.value2 == null) {
        
        return state.value1
    }
    else {
        
        return state.value2
    }
}


export default function App() {

    const [state, dispatch] = useReducer(reducer, {value1:null, operation:null,value2:null})







    return <View style={{ flex: 1 }}>
        <View style={styles.numberDisplay} backgroundColor='black'>
            <Text style={styles.value}>{checkDisplayValue(state)}</Text>
        </View>
        <View style={styles.inputDisplay} backgroundColor= 'rgb(207,207,207)'>
            <View style={ styles.buttonColumn}>
                <CalcButton color={opColor} value='A/C' onInput={() => dispatch({ type: 'operation', payload: 'A/C' })}/>
                <CalcButton color={opColor} value='+/-' onInput={() => dispatch({ type: 'operation', payload: '+/-' })} />
                <CalcButton color={opColor} value='%'   onInput={() => dispatch({ type: 'operation', payload: '%' })}/>
                <CalcButton color={opColor} value='div' onInput={() => dispatch({ type: 'operation', payload: 'div' })}/>

            </View>
            <View style={ styles.buttonColumn}>
                <CalcButton color={numColor} value={7} onInput={() => dispatch({type: 'number', payload: 7})}/>
                <CalcButton color={numColor} value={8} onInput={() => dispatch({ type: 'number', payload: 8 })}/>
                <CalcButton color={numColor} value={9} onInput={() => dispatch({ type: 'number', payload: 9 })}/>
                <CalcButton color={opColor} value='X' onInput={() => dispatch({ type: 'operation', payload: 'x' })}/>

            </View>
            <View style={styles.buttonColumn}>
                <CalcButton color={numColor} value={4} onInput={() => dispatch({ type: 'number', payload: 4 })}/>
                <CalcButton color={numColor} value={5} onInput={() => dispatch({ type: 'number', payload: 5 })}/>
                <CalcButton color={numColor} value={6} onInput={() => dispatch({ type: 'number', payload: 6 })}/>
                <CalcButton color={opColor} value='-' onInput={() => dispatch({ type: 'operation', payload: '-' })}/>

            </View>
            <View style={styles.buttonColumn}>
                <CalcButton color={numColor} value={1} onInput={() => dispatch({ type: 'number', payload: 1 })} />
                <CalcButton color={numColor} value={2} onInput={() => dispatch({ type: 'number', payload: 2 })}/>
                <CalcButton color={numColor} value={3} onInput={() => dispatch({ type: 'number', payload: 3 })}/>
                <CalcButton color={opColor} value='+' onInput={() => dispatch({ type: 'operation', payload: '+' })}/>

            </View>

            <View style={styles.buttonColumn}>
                <CalcButton color={numColor} checkZero={true} value={0} onInput={() => dispatch({ type: 'number', payload: 0 })}/>
                <CalcButton color={numColor} value='.' onInput={()=>setDecimal()}/>
                <CalcButton color={opColor} value='=' onInput={() => dispatch({ type: 'operation', payload: '=' })}/>
                

            </View>



        </View>



      </View>
}

const setDecimal = function () {
    decimal = true;
}

Number.prototype.countDecimals = function () {

    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

const styles = StyleSheet.create({
    numberDisplay: {
        height: 200,
        borderWidth: 0,
        borderColor: 'white',
        justifyContent: 'flex-end'
        

    },
    inputDisplay: {
        flex: 1,
        borderWidth: 0,
        borderColor: 'black'

    },
    buttonColumn: {
        fill: 1,
        borderColor: 'green',
        borderWidth: 0,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    value: {
        alignSelf: 'flex-end',
        color: 'white',
        fontSize: 60

    }



});
