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
      expandRow1: false,
      expandRow2: false,
      expandRow3: false,
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

    if (!this.state.allowFirstRowUpdate) {
      this.heightRow1 = interpolate(this.heightIncrease, {
        inputRange: [0, 3600],
        outputRange: [this.heightRow1, 200],
        extrapolate: Animated.Extrapolate.CLAMP,
      });
    } else {
      this.heightRow1 = interpolate(this.heightIncrease, {
        inputRange: [0, 3600],
        outputRange: [this.heightRow1, 50],
        extrapolate: Animated.Extrapolate.CLAMP,
      });
    }

    this.heightRow2 = interpolate(this.heightIncrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow2, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.heightRow3 = interpolate(this.heightIncrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow3, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.setState({
      allowFirstRowUpdate: !this.state.allowFirstRowUpdate,
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

    if (!this.state.allowSecondRowUpdate) {
      this.heightRow2 = interpolate(this.heightIncrease, {
        inputRange: [0, 3600],
        outputRange: [this.heightRow2, 200],
        extrapolate: Animated.Extrapolate.CLAMP,
      });
    } else {
      this.heightRow2 = interpolate(this.heightIncrease, {
        inputRange: [0, 3600],
        outputRange: [this.heightRow2, 50],
        extrapolate: Animated.Extrapolate.CLAMP,
      });
    }

    this.heightRow3 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow3, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.setState({
      allowFirstRowUpdate: false,
      allowSecondRowUpdate: !this.state.allowSecondRowUpdate,
      allowThirdRowUpdate: false,
    });
  };

  animateThirdRow = () => {
    this.heightIncrease = runTiming(new Clock(), new Value(0), new Value(3600));
    this.heightDecrease = runTiming(new Clock(), new Value(0), new Value(3600));

    this.heightRow1 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow1, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    this.heightRow2 = interpolate(this.heightDecrease, {
      inputRange: [0, 3600],
      outputRange: [this.heightRow2, 50],
      extrapolate: Animated.Extrapolate.CLAMP,
    });

    if (!this.state.allowThirdRowUpdate) {
      this.heightRow3 = interpolate(this.heightIncrease, {
        inputRange: [0, 3600],
        outputRange: [this.heightRow3, 200],
        extrapolate: Animated.Extrapolate.CLAMP,
      });
    } else {
      this.heightRow3 = interpolate(this.heightDecrease, {
        inputRange: [0, 3600],
        outputRange: [this.heightRow3, 50],
        extrapolate: Animated.Extrapolate.CLAMP,
      });
    }

    this.setState({
      allowFirstRowUpdate: false,
      allowSecondRowUpdate: false,
      allowThirdRowUpdate: !this.state.allowThirdRowUpdate,
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
            overflow: 'hidden',
            borderColor: '#00000',
          }}>
          <Animated.View style={{height: this.heightRow1}}>
            <TouchableOpacity
              onPress={() => {
                this.animateFirstRow();

                //  this.props.setCurrentExpandedElem(this.props.id);
              }}>
              <View
                style={{
                  backgroundColor: '#8f8f8f',
                  height: 50,

                  borderColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{marginLeft: 10, color: 'white', fontSize: 14}}>
                  Hello
                </Text>
              </View>
            </TouchableOpacity>
            {this.state.allowFirstRowUpdate && (
              <Animated.ScrollView>
                <Text>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.Anim pariatur cliche reprehenderit, enim
                  eiusmod high life accusamus terry richardson ad squid. Nihil
                  anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea
                  proident.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasadasdasdlasdoasmcaskmdaksdaskmda
                </Text>
              </Animated.ScrollView>
            )}
          </Animated.View>

          <Animated.View style={{height: this.heightRow2}}>
            <TouchableOpacity
              onPress={() => {
                this.animateSecondRow();
                //  this.props.setCurrentExpandedElem(this.props.id);
              }}>
              <View
                style={{
                  backgroundColor: '#8f8f8f',
                  height: 50,

                  flexDirection: 'row',
                  alignItems: 'center',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: 'white',
                }}>
                <Text style={{marginLeft: 10, color: 'white', fontSize: 14}}>
                  World
                </Text>
              </View>
            </TouchableOpacity>
            {this.state.allowSecondRowUpdate && (
              <Animated.ScrollView>
                <Text>This is very aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
              </Animated.ScrollView>
            )}
          </Animated.View>

          <Animated.View
            style={{height: this.heightRow3, border: 1, borderColor: 'white'}}>
            <TouchableOpacity
              onPress={() => {
                this.animateThirdRow();
                //  this.props.setCurrentExpandedElem(this.props.id);
              }}>
              <View
                style={{
                  backgroundColor: '#8f8f8f',
                  height: 50,

                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{marginLeft: 10, color: 'white', fontSize: 14}}>
                  This is Accordion
                </Text>
              </View>
            </TouchableOpacity>
            {this.state.allowThirdRowUpdate && (
              <Animated.ScrollView>
                <Text>This is very aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
              </Animated.ScrollView>
            )}
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}
