import {useState} from 'react';
import {IEvent} from './Webinar';

const WebinarForm = (initialValues:IEvent, callback:any) => {
  const [inputs, setInputs] = useState(initialValues);
  const handleSubmit = (event:any) => {
    if (event) event.preventDefault();
      callback(inputs);
  }
  const handleInputChange = (event:any) => {
    event.persist();
    setInputs((inputs:any) => ({...inputs, [event.target.name]: event.target.value}));
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}
export default WebinarForm;