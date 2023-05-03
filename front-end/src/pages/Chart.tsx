import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import useDataStore from "../zustand/data";
import { Button } from "antd";
import { Link } from "react-router-dom";

const DemoPie = () => {
  const dataStore = useDataStore();
  //   const genderCount = dataStore.data.reduce(
  //     (acc, { gender }) => {
  //       if (gender === "male") {
  //         acc.male += 1;
  //       } else if (gender === "female") {
  //         acc.female += 1;
  //       }
  //       return acc;
  //     },
  //     { male: 0, female: 0 }
  //   );
  const cityCount = {};

  dataStore.data.forEach((item) => {
    const city = item.address.city;
    if (cityCount[city]) {
      cityCount[city]++;
    } else {
      cityCount[city] = 1;
    }
  });

  const cityCounts = Object.entries(cityCount).map(([name, count]) => ({
    type: name,
    value: count,
  }));
  const data = cityCounts;

  const config = {
    appendPadding: 5,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <div>
        <h1 style={{ margin: "30px 38%" }}>Gender chart</h1>
        <Link to="/">
          <Button type="primary" style={{ margin: "0px 40%" }}>
            Back to Table page
          </Button>
        </Link>
        <Pie {...config} />
      </div>
    </>
  );
};

export default DemoPie;
