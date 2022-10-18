import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState("all");
  const [render, setRender] = useState(true);
  const [url, setUrl] = useState(`http://localhost:3001/pets/`);


useEffect(()=>{
  fetch(url)
  .then(res=>res.json())
  .then(data=>setPets(data))
  
},[render,url])

  function onChangeType(e){
    setFilters(e.target.value);
    console.log(filters);
    setRender(!render);
  }

  function onAdoptPet(pet){
    console.log(pet)
    fetch(url+pet.id, {
      method:"PUT",
      headers: {"Content-type":"application/json"
    },
    body:JSON.stringify({
      id: pet.id,
      type: pet.type,
      gender: pet.gender,
      age: pet.age,
      weight: pet.weight,
      name: pet.name,
      isAdopted: true}
    )
    })
    console.log("adopted");
    setRender(()=>!render);
  }

  function onFindPetsClick(){
    if(filters==="all"){setUrl(`http://localhost:3001/pets`)}
    else if(filters==="dog"){setUrl(`http://localhost:3001/pets?type=dog`)}
    else if(filters==="cat"){setUrl(`http://localhost:3001/pets?type=cat`)}
    else if(filters==="micropig"){setUrl(`http://localhost:3001/pets?type=micropig`)}
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
