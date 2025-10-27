import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import PlantList from "./components/PlantList";
import NewPlantForm from "./components/NewPlantForm";
import Search from "./components/Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants);
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <NewPlantForm onAddPlant={(plant) => setPlants([...plants, plant])} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} />
    </div>
  );
}

export default App;
