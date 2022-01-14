import React from 'react'
import {View,} from 'react-native'

const Flex = () => {
    return(
        <View style={{
            flex: 1,
            alignItems: 'stretch',
          }}>
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue', alignSelf: 'center'}} />
            <View style={{height: 50, backgroundColor: 'skyblue'}} />
            <View style={{height: 100, backgroundColor: 'steelblue'}} />
          </View>
    )
}

export default Flex