import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
/* const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
    overflow: hidden;
`; */

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 100px;
`;

const boxVars = {
  Hover: { scale: 1.5, rotateZ: 90 },
  Tap: { scale: 1, borderRadius: "100px" },
  Drag: { backgroundColor: "rgb(100,100,100)", transition: { duration: 5 } },
};

const BoxV = {
  initial: (back: boolean) => ({
    opacity: 0,
    scale: 0,
    x: back ? -500 : 500,
  }),
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  exit: (back: boolean) => ({
    opacity: 0,
    scale: 0,
    x: back ? 500 : -500,
    rotateZ: 360,
    transition: { duration: 1 },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const next = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prev = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <Wrapper>
      <button onClick={next}>next</button>
      <button onClick={prev}>prev</button>
      <AnimatePresence exitBeforeEnter custom={back}>
        <Box
          custom={back}
          variants={BoxV}
          initial="initial"
          animate="visible"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
