import './App.css';
import { useState, useEffect } from 'react';

//4 - custom hook
import { useFetch } from './hooks/UseFetch';

const url = "http://localhost:3000/products";

function App() {

  const [products, setProducts] = useState([]);

  //4 - Custom
  const { data: items, httpConfig } = useFetch(url);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  //Resgatando dados
  /*
  useEffect(() => {
    
    async function fetchData() {
      
      const res = await fetch(url)
      
      const data = await res.json()
      
      setProducts(data)
    }

    fetchData();

  }, []);
  */

  //2 - add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      nome,
      preco
    };

    /*
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(product)
    });

    //3 - carregamento dinâmico
    const addedProduct = await res.json();
    setProducts((prevProducts) => [...prevProducts, addedProduct]);
    */ 

    httpConfig(product, "POST");
    setNome("");
    setPreco("");
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>

      <ul>
          {items && items.map((obj) => (
            <li key={obj.id}>
              {obj.nome} - R$         
              {obj.preco}         
            </li>
          ))}
      </ul>

      <div className="add_product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={nome} name='nome' onChange={(e) => setNome(e.target.value)}/>
          </label>
          <label>
            Preço:
            <input type="number" value={preco} name='preco' onChange={(e) => setPreco(e.target.value)}/>
          </label>
          <input type="submit" value="criar"/>
        </form>
      </div>

    </div>
  );
}

export default App;
