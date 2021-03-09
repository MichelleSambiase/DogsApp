import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import Select from "./Components/Select";
import getDog from "./Components/Helpers/getDog";
import Errors from "./Components/Errors";

const initialDog = {
  image:
    "",
  breed: {
    id: "0",
    name: "",
  },
};

function App() {
  const [dog, setDog] = useState(initialDog);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateDog();
  }, []);

  const updateDog = async (breedId) => {
    try {
      setLoading(true);
      const newDog = await getDog(breedId);
      setDog(newDog);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError("Error al cargar un perro")
      setLoading(false);
      
    }
  };

  return (
    <div className="app">
      <Select updateDog={updateDog} />

      {error &&  <Errors error={error}/> }
     
      <Card dog={dog} updateDog={updateDog} loading={loading} />
     
    </div>
  );
}

export default App;
