import React, { useState } from 'react';

// Este es el Form con inputs dinamicos que armamos en el README.md de la teoria.

function DinamicInputs() {  
  const modeloFamiliar = { nombre: '' };
  const [familiar, setFamiliar] = useState([
    { ...modeloFamiliar },
  ]);

  const [persona, setPersona] = useState({
    nombre: '',
    mail:'',
  });

  const [errors, setErrors] =useState({}) 
  
  const agregaFamiliar = () => {
      setFamiliar([...familiar, persona]);
      console.log(familiar)
  };

  const handlePersonaChange = (e) => {
    
    if (e.target.value.length <3) {
    if (e.target.name === 'mail' && 
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {

        setErrors({...errors, [e.target.name]:'Debe ser un mail'})

    }
    
    
      setErrors({[e.target.name]: 'Debe contener mas de 3 letras'});
      setPersona({
        ...persona,
        [e.target.name]: e.target.value,
      });
   
   
    }else{

      setPersona({
      ...persona,
      [e.target.name]: e.target.value,
    });
    setErrors({})
    }
    
};

  const handleFamiliarChange = (e) => {
    const familiares = [...familiar];
    console.log (familiares[e.target.id][e.target.dataset.name]);
    familiares[e.target.id][e.target.dataset.name] = e.target.value;
    setFamiliar(familiares);
  };

  const handleSubmit = e => {
    e.preventDefault()
    console.log(familiar)
  }

  return (        
    <form onSubmit={handleSubmit}>            
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={persona.nombre}
        onChange={handlePersonaChange}
      />  
      {errors.nombre && <span>{errors.nombre}</span>}
     <label htmlFor='nombre'>Mail:</label>
      <input
        type="text"
        name="mail"
        value={persona.mail}
        onChange={handlePersonaChange}
      />  
      {errors.mail && <span>{errors.nombre}</span>}
      <input
        type="button"
        value="Agrega un Familiar"
        onClick={agregaFamiliar}
        disabled={errors.nombre ? true : false}
      />
      {
      familiar.map((el, i) => (
        <div key={`persona-${i}`}>
          <label htmlFor={`nombre-${i}`}>{`Familiar #${i + 1}`}</label>
          <input
              type="text"
              name={`nombre-${i}`}
              id={i}
              data-name="nombre"
              value={el.nombre}
              onChange={handleFamiliarChange}
          />
        </div>
      ))
      }
      <input type="submit" value="Submit" />        
    </form>   
  );
};

export default DinamicInputs;