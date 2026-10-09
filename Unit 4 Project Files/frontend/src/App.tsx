import React, { useState } from 'react';
import './styles.css';

function App() {
  
  const [locationInput, setLocationInput] = useState('');
  const [results, setResults] = useState<{ name: string; distanceKm: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInput(event.target.value);
  };

  const handleFormSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      console.log('Form submitted with input:', locationInput);

  try {
        const res = await fetch(
          `http://localhost:3001/nearest?query=${encodeURIComponent(locationInput)}`
        );

        if (!res.ok) {
          setError('Location not found or server error');
          return;
        }

        const data = await res.json();
        setResults(data);
      } catch {
        setError('Could not connect to backend');
      }
  };

  return (
    <>
    <div className='header'>
      <h1 className='logo'>Northern Green</h1>
      <h3 className='slogan'>Empowering Ethical Choices Online</h3>
    </div>

    <div className='description'>
      <p>Try our new feature linking you with locally-sourced goods.</p>
    </div>


    <form onSubmit={handleFormSubmission}>
      <p className='prompt'>Enter Your Location</p>
      <input
        type='text'
        value={locationInput}
        onChange={handleInputChange}
        placeholder='e.g. Uppermill'
      />
      <button type='submit'>Submit</button>
    </form>

    {error && <p className='error'>{error}</p>}
    {results.length > 0 && (
      <table>
        <thead>
          <tr>
            <th>Shop</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((shop) => (
            <tr key={shop.name}>
              <td>{shop.name}</td>
              <td>{shop.distanceKm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </>
  );
}

export default App;
