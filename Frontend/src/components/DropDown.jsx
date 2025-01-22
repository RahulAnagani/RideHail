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
          id="Bike"
          value="Hello"
          name="tabs"
          checked={tab === "Bike"}
          onChange={handleChange}
        />
        <label className="tab" htmlFor="Bike">
          Bike
        </label>

        <input
          type="radio"
          id="Auto"
          value="UI"
          name="tabs"
          checked={tab === "Auto"}
          onChange={handleChange}
        />
        <label className="tab" htmlFor="Auto">
          Auto
        </label>

        <input
          type="radio"
          id="Car"
          value="World"
          name="tabs"
          checked={tab === "Car"}
          onChange={handleChange}
        />
        <label className="tab" htmlFor="Car">
          Car
        </label>

        <span className="glider"></span>
      </div>
    </div>
  );
};

export default DropDown;
