import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import DynamicOptions from "./dynamicOptions";
import * as constants from "./utils/constants";
import DynamicOptionsForm from "./dynamicOptionsForm";

const customStylesModal = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "250px",
    background: "rgb(232 231 231)",
    borderRadius: "1rem",
    inset: "30% auto auto 50%",
  },
};

function App() {
  const [showDynamicOptions, setShowDynamicOptions] = useState(false);
  const [dynamicFilters, setDynamicFilters] = useState(
    constants.dynamicOptions
  );
  const [dynamicForm, setDynamicForm] = useState([]);
  const [staticForm, setStaticForm] = useState({
    firstName: "",
    lastName: "",
  });


  const handleFilterAddClick = (dynamicOptions) => {
    setDynamicFilters(dynamicOptions);
    setShowDynamicOptions(false);
  };

  useEffect(() => {
    const newElements = dynamicFilters.filter((elem) => elem.checked);
    const selectedOptsForm = [];
    const selectedOptsFormIds =
      dynamicForm.length > 0 ? dynamicForm.map((a) => a.id) : [];
    newElements.forEach((form) => {
      if (selectedOptsFormIds.includes(form.id)) {
        const b = dynamicForm.find((e) => e.id === form.id);
        selectedOptsForm.push(b);
      } else {
        selectedOptsForm.push(form);
      }
    });
    setDynamicForm([...selectedOptsForm]);
  }, [dynamicFilters]);

  const handleDynamicFilterFormChange = (event, element) => {
    const currentElement = dynamicForm.find((elem) => elem.id === element.id);
    currentElement.value = event.target.value;
  };

  const handleStaticFormChange = (event, fieldType) => {
    switch (fieldType) {
      case "firstName": {
        setStaticForm({
          ...staticForm,
          firstName: event.target.value,
        });
        break;
      }
      case "lastName": {
        setStaticForm({
          ...staticForm,
          lastName: event.target.value,
        });
        break;
      }
      default: 
        // DO nothing
    }
  };

  const handleFormSubmit = (event) => {
    let dynamicFormValues = dynamicForm
                    .filter(item => item.checked)
                   .map((e) => ({
                    [e.id]: e.value
                }));

    const payload = {
      ...staticForm,
      ...dynamicFormValues
    }

    // Use this payload for further operations
  }

  return (
    <div className="App">
      <body>
        <h3 style={{marginBottom:'40px'}}>Dynamic form example</h3>

        <div className="staticForm">
          <label htmlFor="firstName">FirstName</label>
          <input
            type="text"
            name="firstName"
            value={staticForm.firstName}
            onChange={(e) => handleStaticFormChange(e, "firstName")}
          />
          <label htmlFor="lastName">LastName</label>
          <input
            type="text"
            name="lastName"
            value={staticForm.lastName}
            onChange={(e) => handleStaticFormChange(e, "lastName")}
          />
        </div>
        <button type="submit"  onClick={() => setShowDynamicOptions(true)}>
          Show dynamic options
        </button>

        {showDynamicOptions ? (
          <DynamicOptions
            showDynamicOptions={showDynamicOptions}
            allOptions={dynamicFilters}
            customStyles={customStylesModal}
            handleFilterAddClick={handleFilterAddClick}
          />
        ) : (
          ""
        )}

        {dynamicFilters.filter((fil) => fil.checked).length > 0 && (
          <DynamicOptionsForm
            customFilters={dynamicFilters}
            handleDynamicFilterFormChange={handleDynamicFilterFormChange}
          />
        )}

          <button type="submit"  onClick={(event) => handleFormSubmit(event)}>
                   Submit
                  </button>
      </body>
    </div>
  );
}

export default App;
