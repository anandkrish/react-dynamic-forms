import React from 'react';

const DynamicOptionsForm = ({
    customFilters,
    handleDynamicFilterFormChange
}) => {
    const customFiltersGrid = customFilters.filter((fil) => fil.checked);

    const handleFieldValidation = (event, field) => {
        // Handle form validations here 
    }

    return (
        <div>
        { customFiltersGrid.length > 0 ? (
            <div className='dynmaicForm'>
                            <h3 style={{marginBottom:'40px'}}>Dynamic fields section</h3>

              {customFiltersGrid.map((elem) => (
                <div key={`div${elem.id}` }>
                    <label key={`lb${elem.id}` } htmlFor={ elem.name }>{ elem.name } </label>

                    <input type="text" key={ elem.id } id={ elem.id } label={ elem.name } 
                    onChange={ (e) => handleDynamicFilterFormChange(e, elem) } onBlur={(e) => handleFieldValidation(e,elem.id)}/>
                </div>
              ))
              }

            </div>
        ) : null
            }
        </div>
    );
};

export default DynamicOptionsForm;
