import React, { useState } from "react";

const DropDown = ({setTab,tab}) => {

  const handleChange = (e) => {
    setTab(e.target.id);
  };

  return (
    <div className="container">
      <div className="tabs">
        <input
          type="radio"
          id="bike"
          value="Hello"
          name="tabs"
          checked={tab === "bike"}
          onChange={handleChange}
        />
        <label className="tab" htmlFor="bike">
          Bike
        </label>

        <input
          type="radio"
          id="auto"
          value="UI"
          name="tabs"
          checked={tab === "auto"}
          onChange={handleChange}
        />
        <label className="tab" htmlFor="auto">
          Auto
        </label>

        <input
          type="radio"
          id="car"
          value="World"
          name="tabs"
          checked={tab === "car"}
          onChange={handleChange}
        />
        <label className="tab" htmlFor="car">
          Car
        </label>

        <span className="glider"></span>
      </div>
    </div>
  );
};

export default DropDown;
