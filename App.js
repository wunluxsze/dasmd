import { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import {
  Engine,
  Runner,
  Bodies,
  Composite,
  Composites,
  Common,
} from "matter-js";

const WINDOW_WIDTH = Dimensions.get("window").width;
const BOX_INIT_X = WINDOW_WIDTH / 2;
const BOX_INIT_Y = WINDOW_WIDTH / 2;
const BOX_SIZE = WINDOW_WIDTH / 5;

export default function App() {
  const [positionX, setPositionX] = useState(BOX_INIT_X);
  const [positionY, setPositionY] = useState(BOX_INIT_Y);

  useEffect(() => {
    const engine = Engine.create(); // Create a physical engine
    engine.gravity.y = -1;
    // Create a box object
    const boxA = Bodies.rectangle(BOX_INIT_X, BOX_INIT_Y, BOX_SIZE, BOX_SIZE);

    Composite.add(engine.world, boxA);
    // Composite.add(engine.world, ground);

    // Operate the physical engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    const timer = setInterval(() => {
      setPositionX(boxA.position.x);
      setPositionY(boxA.position.y);
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const boxStyle = {
    position: "absolute",
    left: positionX - BOX_SIZE / 2,
    top: positionY - BOX_SIZE / 2,
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 500,
    backgroundColor: "red",
  };

  return <View style={boxStyle} />;
}
