import React, { useState, useEffect } from 'react';

const Finish: React.FC = () => {
  const [states, setStates] = useState<string[]>([]); // Stores list of states
  const [selectedState, setSelectedState] = useState<string>(''); // Stores selected state
  const [lgas, setLgas] = useState<string[]>([]); // Stores list of LGAs
  const [loadingStates, setLoadingStates] = useState<boolean>(true); // State for states loading
  const [loadingLgas, setLoadingLgas] = useState<boolean>(false); // State for LGAs loading

  // Fetch states from API
  const getStatesFromApi = async () => {
    try {
      const response = await fetch('https://nga-states-lga.onrender.com/fetch');
      const json = await response.json();
      console.log('Fetched States:', json); // Debugging log
      return json || []; // Ensure empty array if no states
    } catch (error) {
      console.error('Error fetching states:', error);
      return []; // Return an empty array in case of error
    }
  };

  // Fetch all states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      const states = await getStatesFromApi();
      console.log('States after fetching:', states); // Debugging log
      setStates(states); // Set the states
      setLoadingStates(false); // Stop the loading indicator
    };

    fetchStates();
  }, []);

  // Fetch LGAs when a state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchLgas = async () => {
        setLoadingLgas(true); // Start the loading indicator for LGAs
        try {
          const response = await fetch(`https://nga-states-lga.onrender.com/?state=${selectedState}`);
          const json = await response.json();
          console.log('Fetched LGAs:', json); // Debugging log
          setLgas(json || []); // Ensure empty array if no LGAs
        } catch (error) {
          console.error('Error fetching LGAs:', error);
          setLgas([]); // Ensure empty array if error occurs
        } finally {
          setLoadingLgas(false); // Stop the loading indicator for LGAs
        }
      };

      fetchLgas();
    } else {
      setLgas([]); // Clear LGAs when no state is selected
    }
  }, [selectedState]);

  return (
    <div>
      <label htmlFor="state">Select State:</label>
      <select
        id="state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">--Choose a State--</option>
        {loadingStates ? (
          <option disabled>Loading States...</option>
        ) : (
          states.length > 0 ? (
            states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))
          ) : (
            <option disabled>No states available</option>
          )
        )}
      </select>

      <br />

      <label htmlFor="lga">Select LGA:</label>
      <select id="lga" disabled={!selectedState || loadingLgas}>
        <option value="">--Choose an LGA--</option>
        {loadingLgas ? (
          <option disabled>Loading LGAs...</option>
        ) : (
          lgas.length > 0 ? (
            lgas.map((lga, index) => (
              <option key={index} value={lga}>
                {lga}
              </option>
            ))
          ) : (
            <option disabled>No LGAs available</option>
          )
        )}
      </select>
    </div>
  );
};

export default Finish;
