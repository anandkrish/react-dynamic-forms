import React, { useState } from "react";
import ReactModal from "react-modal";



const DynamicOptions = ({ 
    allOptions, 
    handleFilterAddClick,
    handleModalClose,
    showDynamicOptions,
    customStyles }) => {
  const [dynamicOpts, setDynamicOpts] = useState(allOptions);

  const handleAddClick = (event) => {
    handleFilterAddClick(dynamicOpts);
  };

  const handleCheckboxChange = (event, option) => {
    const dOps = structuredClone(dynamicOpts);
    dOps.map((elem) => {
      if (elem.id === option.id) {
        elem.checked = event.target.checked;
      }
      return elem;
    });
    setDynamicOpts(dOps);
  };
  return (
    <ReactModal
        isOpen={showDynamicOptions}
        onRequestClose={handleModalClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
      {dynamicOpts.length > 0
        ? dynamicOpts.map((option) => (
            <div  key={`div_${option.id}`} style={ {marginBottom:'10px'}}>
              <input
                type="checkbox"
                id={option.id}
                name={option.name}
                key={option.id}
                value={option.value}
                checked={option.checked}
                onChange={(e) => handleCheckboxChange(e, option)}
              />
              <label htmlFor={option.name} label={option.name} key={`lb${option.id}`}>
                {" "}
                {option.name}
              </label>
            </div>
          ))
        : null}
        <div className="btnDiv">
      <button onClick={(e) => handleAddClick(e)}> Add</button></div>
      </ReactModal>
  );
};

export default DynamicOptions;
