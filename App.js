/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Text, View} from 'react-native';
import Accordion from './Accordion';
import Item from './Item';

const App = () => {
  return (
    <Accordion>
      <Item
        height={60}
        heading={
          <View
            style={{
              backgroundColor: '#8f8f8f',
            }}>
            <Text>Hello</Text>
          </View>
        }
        content={
          <Text>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.Anim pariatur
            cliche reprehenderit, enim eiusmod high life accusamus terry
            richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </Text>
        }></Item>
      <Item
        height={60}
        heading={
          <View style={{backgroundColor: '#8f8f8f'}}>
            <Text>World</Text>
          </View>
        }
        content={
          <Text>This is very aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
        }></Item>
      <Item
        height={60}
        heading={
          <View style={{backgroundColor: '#8f8f8f'}}>
            <Text>This is Accordion</Text>
          </View>
        }
        content={
          <Text>This is very aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
        }></Item>
    </Accordion>
  );
};

export default App;
