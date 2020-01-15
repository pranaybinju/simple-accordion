import React from 'react';
import Animated, {Easing} from 'react-native-reanimated';
import {Text, View, TouchableOpacity, SafeAreaView} from 'react-native';

const {
  set,
  cond,
  startClock,
  stopClock,
  clockRunning,
  block,
  timing, //Updates position node by running timing based animation from a given position to a destination determined by toValue. The animation is expected to last duration milliseconds and use easing function that could be set to one of the nodes exported by the Easing object. The frameTime node will also get updated and represents the progress of animation in milliseconds (how long the animation has lasted so far), similar to the time node that just indicates the last clock time the animation node has been evaluated. Both of these variables are expected to be reset before restarting the animation. Finally finished node will be set to 1 when the position reaches the final value or when frameTime exceeds duration.
  debug,
  Value,
  Clock, //animated node , the value it returns is the current frame timestamp in milliseconds
} = Animated;
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: value, //from position given by value
    time: new Value(0),
    frameTime: new Value(0), //frameTime node will also get updated and represents the progress of animation in milliseconds (how long the animation has lasted so far)
  };

  const config = {
    duration: 1000, //animation duration
    toValue: dest, //to position given by dest
    easing: Easing.inOut(Easing.cubic), //easing function
  };
  //block nodes can be used if we want to execute several nodes (commands) in a specific sequence
  return block([
    //check if clock is running already, if not we set variables and start clock
    cond(clockRunning(clock), 0, [
      //cond nodes are equivalent of if ... else
      set(state.finished, 0), //set nodes are equivalent of =
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config), //here we start animation using timing which takes state and config variables
    cond(state.finished, debug('stop clock', stopClock(clock))), //if animation is finished ,we stop clock
    state.position, //return position of animated variable which will map to this.heightIncrease
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
      height: 50,
    };

    this.heightIncrease = new Value(50);
    this.heightDecrease = new Value(0);
    this.heightRow1 = new Value(50);
    this.heightRow2 = new Value(50);
    this.heightRow3 = new Value(50);
  }
  /*  setCurrentExpandedElem = elemId => {
    this.setState({currentElementId: elemId});
  }; */

  animateFirstRow = () => {
    if (!this.state.allowFirstRowUpdate) {
      this.heightRow1 = runTiming(new Clock(), new Value(50), new Value(200));
    } else {
      this.heightRow1 = runTiming(new Clock(), new Value(200), new Value(50));
    }
    if (this.state.allowSecondRowUpdate) {
      this.heightRow2 = runTiming(new Clock(), new Value(200), new Value(50));
    }
    if (this.state.allowThirdRowUpdate) {
      this.heightRow3 = runTiming(new Clock(), new Value(200), new Value(50));
    }

    this.setState({
      allowFirstRowUpdate: !this.state.allowFirstRowUpdate,
      allowSecondRowUpdate: false,
      allowThirdRowUpdate: false,
    });
  };

  animateSecondRow = () => {
    /*   this.heightIncrease = runTiming(new Clock(), new Value(0), new Value(3600));
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
 */
    if (!this.state.allowSecondRowUpdate) {
      this.heightRow2 = runTiming(new Clock(), new Value(50), new Value(200));
    } else {
      this.heightRow2 = runTiming(new Clock(), new Value(200), new Value(50));
    }
    if (this.state.allowFirstRowUpdate) {
      this.heightRow1 = runTiming(new Clock(), new Value(200), new Value(50));
    }
    if (this.state.allowThirdRowUpdate) {
      this.heightRow3 = runTiming(new Clock(), new Value(200), new Value(50));
    }

    this.setState({
      allowFirstRowUpdate: false,
      allowSecondRowUpdate: !this.state.allowSecondRowUpdate,
      allowThirdRowUpdate: false,
    });
  };

  animateThirdRow = () => {
    /*  this.heightIncrease = runTiming(new Clock(), new Value(0), new Value(3600));
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
    } */

    if (!this.state.allowThirdRowUpdate) {
      this.heightRow3 = runTiming(new Clock(), new Value(50), new Value(200));
    } else {
      this.heightRow3 = runTiming(new Clock(), new Value(200), new Value(50));
    }
    if (this.state.allowFirstRowUpdate) {
      this.heightRow1 = runTiming(new Clock(), new Value(200), new Value(50));
    }
    if (this.state.allowSecondRowUpdate) {
      this.heightRow2 = runTiming(new Clock(), new Value(200), new Value(50));
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
