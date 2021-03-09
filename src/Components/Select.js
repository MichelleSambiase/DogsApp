import React, { useEffect, useState } from "react";
import getBreeds from "./Helpers/getBreeds";
import Errors from "./Errors";

const initialBreeds = [
  {
    id: 1,
    name: "boxer",
  },
  {
    id: 2,
    name: "Husky",
  },
];
const Select = ({ updateDog }) => {
  const [breeds, setBreeds] = useState(initialBreeds);
  const [error, setError] = useState(null);

  useEffect(() => {
    updateBreeds();
  }, []);

  const updateBreeds = async () => {
    try {
      const newBreeds = await getBreeds();
      setBreeds(newBreeds);
    } catch (e) {
      console.log(e);
      setError("Error al cargar las razas");
    }
  };

  return (
    <>
      <select onChange={(e) => updateDog(e.target.value)}>
        {breeds.map((breed) => (
          <option value={breed.id} key={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>

      {error && <Errors error={error}/>}
    </>
  );
};

export default Select;
