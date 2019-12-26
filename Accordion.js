import React from 'react';
import {Touchable} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import Item from './Item';
const {
  sub,
  set,
  cond,
  startClock,
  stopClock,
  clockRunning,
  block,
  timing,
  debug,
  add,
  Value,
  multiply,
  Clock,
  divide,
  concat,
  interpolate,
} = Animated;
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: dest,
    easing: Easing.inOut(Easing.cubic),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}
export default class Accordion extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allowFirstRowUpdate: false,
      allowSecondRowUpdate: false,
      allowThirdRowUpdate: false,
    };

    this.heightIncrease = new Value(0);
    this.heightDecrease = new Value(0);
    this.heightRow1 = new Value(50);
    this.heightRow2 = new Value(50);
    this.heightRow3 = new Value(50);
  }
  /*  setCurrentExpandedElem = elemId => {
    this.setState({currentElementId: elemId});
  }; */

  animateFirstRow = () => {
    this.heightIncrease = runTiming(new Clock(), new Value(0), new Value(3600));
    this.heightDecrease = runTiming(new Clock(), new Value(0), new Value(3600));
    this.heightRow1 = interpolate(this.heightIncrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow1, 200],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.heightRow2 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow2, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.heightRow3 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow3, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.setState({
      allowFirstRowUpdate: true,
      allowSecondRowUpdate: false,
      allowThirdRowUpdate: false,
    });
  };

  animateSecondRow = () => {
    this.heightIncrease = runTiming(new Clock(), new Value(0), new Value(3600));
    this.heightDecrease = runTiming(new Clock(), new Value(0), new Value(3600));
    this.heightRow1 = interpolate(this.heightIncrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow1, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.heightRow2 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow2, 200],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.heightRow3 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow3, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.setState({
      allowFirstRowUpdate: false,
      allowSecondRowUpdate: true,
      allowThirdRowUpdate: false,
    });
  };

  animateThirdRow = () => {
    this.heightIncrease = runTiming(new Clock(), new Value(0), new Value(3600));
    this.heightDecrease = runTiming(new Clock(), new Value(0), new Value(3600));
    this.heightRow1 = interpolate(this.heightIncrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow1, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.heightRow2 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow2, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.heightRow3 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow3, 200],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.setState({
      allowFirstRowUpdate: false,
      allowSecondRowUpdate: false,
      allowThirdRowUpdate: true,
    });
  };

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            margin: 20,

            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#00000',
          }}>
          <Animated.ScrollView style={{height: this.heightRow1}}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  this.animateFirstRow();

                  //  this.props.setCurrentExpandedElem(this.props.id);
                }}>
                <View
                  style={{
                    backgroundColor: '#8f8f8f',
                    height: 50,
                  }}>
                  <Text>Hello</Text>
                </View>
                {this.state.allowFirstRowUpdate && (
                  <Text>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                    accusamus terry richardson ad squid. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident.Anim pariatur cliche reprehenderit,
                    enim eiusmod high life accusamus terry richardson ad squid.
                    Nihil anim keffiyeh helvetica, craft beer labore wes
                    anderson cred nesciunt sapiente ea proident.
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.ScrollView>

          <Animated.ScrollView style={{height: this.heightRow2}}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  this.animateSecondRow();

                  //  this.props.setCurrentExpandedElem(this.props.id);
                }}>
                <View style={{backgroundColor: '#8f8f8f', height: 50}}>
                  <Text>World</Text>
                </View>
                {this.state.allowSecondRowUpdate && (
                  <Text>This is very aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.ScrollView>

          <Animated.ScrollView style={{height: this.heightRow3}}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => {
                  this.animateThirdRow();

                  //  this.props.setCurrentExpandedElem(this.props.id);
                }}>
                <View style={{backgroundColor: '#8f8f8f', height: 50}}>
                  <Text>This is Accordion</Text>
                </View>
                {this.state.allowThirdRowUpdate && (
                  <Text>This is very aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                )}
              </TouchableOpacity>
            </View>
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}