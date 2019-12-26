import React from 'react';
import {TouchableOpacity, TouchableHighlight, View} from 'react-native';

import Animated, {Easing} from 'react-native-reanimated';
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
class Item extends React.Component {
  constructor(props) {
    super(props);

    this.height = new Animated.Value(this.props.height || 50);
    this.heightIncrease = new Value(0);
    this.heightDecrease = new Value(0);
  }

  animateExpand = () => {
    this.heightIncrease = runTiming(new Clock(), new Value(0), new Value(3600));
    this.height = interpolate(this.heightIncrease, {
      inputRange: [0, 3600],
      outputRange: [this.height, 200],
      extrapolate: Animated.Extrapolate.CLAMP,
    });
  };

  animateCollapse = () => {
    this.heightDecrease = runTiming(new Clock(), new Value(0), new Value(3600));
    if (this.props.id !== this.props.currentElementId) {
      this.height = interpolate(this.heightDecrease, {
        inputRange: [0, 3600],
        outputRange: [this.height, 50],
        extrapolate: Animated.Extrapolate.CLAMP,
      });
    }
  };

  render() {
    if (this.props.id !== this.props.currentElementId) {
      this.animateCollapse();
    }
    return (
      <Animated.ScrollView style={{height: this.height}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              this.animateExpand();

              //  this.props.setCurrentExpandedElem(this.props.id);
            }}>
            <View
              style={{
                backgroundColor: '#8f8f8f',
              }}>
              <Text>Hello</Text>
            </View>
            <Text>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.Anim pariatur cliche reprehenderit, enim eiusmod high
              life accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    );
  }
}

export default Item;
