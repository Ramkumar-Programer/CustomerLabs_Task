import React, { useState } from 'react';
import '../CSS/SaveSegment.css';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const initialSchemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function SaveSegment({ cancelClicks, handleSaveSuccess}) {

  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState('');
  const [schemaOptions, setSchemaOptions] = useState(initialSchemaOptions);

  

  const handleSchemaSelect = (event) => {
    setNewSchema(event.target.value);
  };

  const handleAddNewSchema = () => {
    if (newSchema) {
        setSchemaOptions((prevOptions) =>
      prevOptions.filter((option) => option.value !== newSchema)
    );
      setSelectedSchemas((prevSelected) => {
        const updatedSchemas = [...prevSelected];
        updatedSchemas.push(newSchema);
        return updatedSchemas;
      });
      setNewSchema('');
    }
  };


  const handleSaveSegment = async () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => {
        const label = initialSchemaOptions.find((option) => option.value === schema);
        return { [schema]: label.label };
      }),
    };
  
    try {
      const webhookURL = 'https://webhook.site/dd39c5a3-a7db-468b-a319-078dccf1903a';
  
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        console.log('Data sent successfully:', dataToSend);
        handleSaveSuccess();
      } else {
        console.log('Failed to send data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while sending data:', error);
    }
  
   
    setSegmentName('');
    setSelectedSchemas([]);
    setNewSchema('');
    setSchemaOptions(initialSchemaOptions);
    cancelClicks();
  };

  const cancelClick = (event) => {
    setSegmentName('');
    setSelectedSchemas([]);
    setNewSchema('');
    setSchemaOptions(initialSchemaOptions);
    cancelClicks();
  };

  return (
    <div>
      <div className="topBar">
        <MdKeyboardArrowLeft className="backLogo" onClick={cancelClick} />
        <p className="title">Saving Segment</p>
      </div>
      <div className="saveSegmentBody">
        <div className="nameSegment">
          <label className="namelabel">Enter the name of the Segment</label>
          <input
            type="text"
            placeholder="Name of the segment"
            className="inputBox"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
        </div>
        <p className="note">
          To save your segment, you need to add the schemas to build the query
        </p>
        <div className="traits">
          <div className="userTraits">
            <p className="round green"></p>
            <p className="traitsLabel">User Traits</p>
          </div>

          <div className="groupTraits">
            <p className="round red"></p>
            <p className="traitsLabel">Group Traits</p>
          </div>
        </div>
        <div className="segment">
          <div className="segmentList">

          {selectedSchemas.map((schema, index) => 
            (
                <div>
                <p className='round select'></p>
                        <select  className='selectSchema' key={index}
                            disabled
                            onChange={handleSchemaSelect}
                            value={schema}
                        >
                            <option value="">Select a schema...</option>
                            
                            {initialSchemaOptions.map((option) => 
                            (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                
                            ))}
                            <option value={schema}></option>
                        </select>
                        </div>
            ))}
            
            <div><p className='round select'></p><select onChange={handleSchemaSelect} value={newSchema} className='selectSchema'>
                <option value="">Add schema to segment...</option>
                {
                    schemaOptions.map((option) => 
                    (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))
                }
               </select></div> 
          </div>
          <button className='newSchemaButton' onClick={handleAddNewSchema}>+ Add new schema</button>
        </div>
        
      </div>
      <footer className='segmentFooter'>
            <button className="saveButton" onClick={handleSaveSegment}>
                Save the Segment
            </button>
            <button className="cancelButton" onClick={cancelClick}>
                Cancel
            </button>
        </footer>
    </div>
  );
}

export default SaveSegment;
