
import { useState } from 'react';
import './App.css'
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const {data} = useFoodData();
  const [isModalOpen,setIsModal ] = useState(false);

  const handleOpenModal = () =>{
    setIsModal( prev => !prev )
  }

  return (
    <div className='container'>
      <h1> Cardápio</h1>
      <div className='card-grid'>

        {data?.map(food => 
          <Card 
          price={food.price} 
          title={food.title} 
          image ={food.image} />
        )}
      </div>
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal}>novo</button>
    </div>
  )
}

export default App
