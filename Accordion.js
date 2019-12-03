import React from 'react';
import {Touchable} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {Text} from 'react-native';
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
    duration: 200,
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
      currentElementId: -1,
    };
  }
  setCurrentExpandedElem = elemId => {
    this.setState({currentElementId: elemId});
  };

  render() {
    let elements = React.Children.toArray(this.props.children); //convert children to array of chilren
    elements = elements.map((element, index) =>
      React.cloneElement(element, {
        id: index,
        currentElementId: this.state.currentElementId,
        setCurrentExpandedElem: this.setCurrentExpandedElem,
      }),
    );

    return (
      <Animated.View
        style={{
          margin: 20,

          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#00000',
        }}>
        {elements}
      </Animated.View>
    );
  }
}
