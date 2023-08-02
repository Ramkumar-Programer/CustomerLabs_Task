import React, {useState} from 'react';
import '../CSS/ViewAudience.css';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import SaveSegment from './SaveSegment';

function ViewAudience() {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [isSuccessPopupVisible, setSuccessPopupVisibility] = useState(false);


  const saveClick = (event) => {
    event.target.style.boxShadow = '2px 2px 10px rgb(58, 13, 239)';
    setTimeout(() => {
      event.target.style.boxShadow = '2px 2px 4px rgb(26, 2, 121)';
    }, 1000);

    setPopupVisibility(true);
  };

  const handleSaveSuccess = () => {
    setSuccessPopupVisibility(true);

    // Hide the success popup after 3 seconds (adjust the duration as needed)
    setTimeout(() => {
      setSuccessPopupVisibility(false);
    }, 1000);
  };

  return (
    <div >
      <div className={`ViewAudience ${isPopupVisible ? 'visible' : ''}`}>
          <div className="topBar">
              <MdKeyboardArrowLeft className='backLogo'/>
              <p className='title'>View Audience</p>
          </div>

          <div className="bodyContent">
              <div className='ViewAudienceBodyContent'>
                  <input type='submit' value="Save segment" className={`ViewAudienceButton ${isPopupVisible ? 'visible' : ''}`} onClick={saveClick}/>
              </div>
          </div>
      </div>
          
      <div className={`popup ${isPopupVisible ? 'visible' : ''}`}>
          <SaveSegment cancelClicks = {setPopupVisibility}  handleSaveSuccess = {handleSaveSuccess}/>
      </div>
      <div className={`successPopup ${isSuccessPopupVisible ? 'visible' : ''}`}>
        <p className='title'>Segment saved successfully!</p>
      </div>
  </div>
  )

}

export default ViewAudience;