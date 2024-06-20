// Home.jsx
import React, { useState } from 'react';
import InputProcesses from '../components/InputProcesses';
import SchedulerOutputContainer from '../components/SchedulerOutputContainer';

const Home = () => {
  const [outputData, setOutputData] = useState(null);

  const handleSubmit = (formData) => {
    fetch("http://localhost:8080/submit", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOutputData(data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Check console for details.");
      });
  };

  return (
    <div className='my-4'>
      <div className='w-3/4 mx-auto'>
      <InputProcesses onSubmit={handleSubmit} />
    </div>
    <div className='mx-2'>
      <SchedulerOutputContainer outputData={outputData} />
    </div>
    </div>
  );
};

export default Home;
