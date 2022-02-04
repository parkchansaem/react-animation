import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { transform } from "typescript";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  &:first-child {
    transform-origin: right bottom;
  }
  &:last-child {
    transform-origin: left top;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;

  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Btn = styled(motion.button)`
  border-radius: 5px;
  margin-top: 50px;
`;
const btnvar = {
  active: {
    scale: 1.4,
    color: "orange",
  },
  inactive: { scale: 1 },
};
const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
`;
const boxVar1 = {
  normal: { scale: 1 },
  hover: {
    scale: 1.2,
    transition: { duration: 0.1, type: "tween" },
  },
};
const boxVar4 = {
  normal: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 },
  },
};
function App() {
  const [click, setClick] = useState(false);
  const [circleclick, setCircleclick] = useState(true);
  const [id, setId] = useState<null | string>(null);
  const toggle = () => setClick((prev) => !prev);
  const circletoggle = () => setCircleclick((prev) => !prev);
  return (
    <Wrapper onClick={toggle}>
      <AnimatePresence>
        <Grid>
          <Box
            variants={boxVar1}
            initial="normal"
            whileHover="hover"
            transition={{ type: "tween" }}
            exit="exit"
            onClick={() => setId("1")}
            layoutId={"1"}
            key={1}
          ></Box>
          <Box key={2}>{circleclick && <Circle layoutId="circle" />}</Box>
          <Box key={3}>{!circleclick && <Circle layoutId="circle" />}</Box>
          <Box
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            onClick={() => setId("4")}
            layoutId={"4"}
            key={4}
          ></Box>
        </Grid>
        <Btn
          onClick={circletoggle}
          variants={btnvar}
          animate={circleclick ? "active" : "inactive"}
        >
          Switch
        </Btn>
      </AnimatePresence>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 200,
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
