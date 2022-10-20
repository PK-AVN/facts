import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {

  const [facts, setFacts] = useState([]);
  const firstRender = useRef(true);

  const apiCall = async () => {
    const response = await axios.get('https://catfact.ninja/fact');
    return response.data;
  }

  const getFacts = async () => {
    let promises = [];
    let currentFact = 0;
   
    while (currentFact < 10) {
      promises.push(apiCall());
      currentFact++;
    }

    if (firstRender.current) {
      firstRender.current = false;
    }

    try {
      const factsss = await Promise.all(promises);
      console.log(factsss, "factsss")
      factsss.forEach((each) => {
        setFacts((prev) => ([...prev, each.fact]))
      })
    }
    catch {
      throw Error("Promise failed");
    }
  }

  useEffect(() => {
    setFacts([]);
    getFacts();
  }, [])

  return (
    <div className="App">
      <ul>
        {facts.map((fact, index) => <li key={index}>{fact}</li>)}
      </ul>
    </div>
  );
}

export default App;















// useEffect(() => {
//   const apiCall = ()=> {
//     fetch('https://catfact.ninja/fact ')
//       .then(response => response.json())
//       .then(jsonResponse => {
//         console.log(jsonResponse.fact);
//         setFacts((prev) => ([...prev, jsonResponse.fact
//         ]))
//       });
//   }
//   for (let index = 0; index < 5; index++) {
//     apiCall();
//   }
// }, []);
