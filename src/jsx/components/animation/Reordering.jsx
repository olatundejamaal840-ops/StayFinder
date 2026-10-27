"use client";

import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

export default function Reordering() {
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    const timeout = setTimeout(() => setOrder(shuffle(order)), 1000);
    return () => clearTimeout(timeout);
  }, [order]);

  return (
    <ul style={container} className="select-none pointer-events-none">
      {order.map((backgroundColor) => (
        <motion.li
          key={backgroundColor}
          layout
          transition={spring}
          style={{ ...item, backgroundColor }}
          className="shadow-lg shadow-blue-900/10 border border-white/20"
        />
      ))}
    </ul>
  );
}

export { Reordering };

const initialOrder = [
  "var(--hue-1)",
  "var(--hue-2)",
  "var(--hue-3)",
  "var(--hue-4)"
];

/**
 * ==============   Utils   ================
 */
function shuffle([...array]) {
  return array.sort(() => Math.random() - 0.5);
}

/**
 * ==============   Styles   ================
 */
const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300
};

const container = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  width: 220,
  maxWidth: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
};

const item = {
  width: 100,
  height: 100,
  borderRadius: "14px"
};
