"use client";
import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { range } from "@/utils";
import Card from "@/components/Card";
import SliderControl from "@/components/SliderControl";

import Equation from "./Equation";
import styles from "./DivisionGroupsDemo.module.css";

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}) {
  //const items = range(numOfItems).map(() => (id = crypto.randomUUID()));

  const [numOfGroups, setNumOfGroups] = React.useState(initialNumOfGroups);

  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  const remainder = includeRemainderArea ? numOfItems % numOfGroups : null;

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        };

  const id = React.useId();

  return (
    <Card as="section" className={styles.wrapper}>
      <header className={styles.header}>
        <SliderControl
          label="Number of Groups"
          className={styles.slider}
          step={1}
          min={1}
          max={4}
          value={numOfGroups}
          onChange={(ev) => setNumOfGroups(Number(ev.target.value))}
        />
      </header>

      <div className={styles.demoWrapper}>
        <div className={clsx(styles.demoArea)} style={gridStructure}>
          {range(numOfGroups).map((groupIndex) => (
            <div key={groupIndex} className={styles.group}>
              {range(numOfItemsPerGroup).map((index) => {
                const i = numOfItemsPerGroup * groupIndex + index;
                return (
                  <motion.div
                    layoutId={`${id}-${
                      numOfItemsPerGroup * groupIndex + index
                    }`}
                    // layoutId={`${groupIndex}-${index}`}
                    key={`${id}-${i}`}
                    className={styles.item}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 40,
                    }}
                  >
                    {`${i}`}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {includeRemainderArea && (
        <div className={styles.remainderArea}>
          <p className={styles.remainderHeading}>Remainder Area</p>

          {range(remainder).map((index) => {
            const i = numOfItems - index - 1;
            return (
              <motion.div
                key={`${id}-${i}`}
                className={styles.item}
                layoutId={`${id}-${i}`}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 40,
                }}
              >{`${i}`}</motion.div>
            );
          })}
        </div>
      )}

      <Equation
        dividend={numOfItems}
        divisor={numOfGroups}
        remainder={remainder}
      />
    </Card>
  );
}

export default DivisionGroupsDemo;
