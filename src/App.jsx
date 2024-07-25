import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Card from "./component/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [showcreateForm, setShowCreateForm] = useState(false);
  const [pokemons, setPokemons] = useState([]);

  const onCreate = (e) => {
    e.preventDefault();

    const title = document.getElementById("input_name").value;
    const body = document.getElementById("input_type").value;
    const d = new Date();
    setPokemons([
      {
        id:
          d.getDate() +
          "" +
          d.getHours() +
          "" +
          d.getMinutes() +
          "" +
          d.getSeconds() +
          "" +
          d.getMilliseconds(),
        title,
        body,
      },
      ...pokemons,
    ]);
    setShowCreateForm(true);
  };

  const onDelete = (id) => {
    const tempPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
    setPokemons(tempPokemons);
    saveChanges(tempPokemons);
  };

  const onEdit = (id, title, body) => {
    const tempPokemons = pokemons.map((pokemon) => {
      if (pokemon.id === id) {
        pokemon.title = title;
        pokemon.body = body;
      }

      return pokemon;
    });
    setPokemons(tempPokemons);
  };

  const saveChanges = (p = pokemons) => {
    localStorage.setItem("pokemons", JSON.stringify(p));
  };

  useLayoutEffect(() => {
    if (pokemons.length > 0) {
      saveChanges();
    }
  }, [pokemons]);

  useEffect(() => {
    if (localStorage.getItem("pokemons")) {
      setPokemons(JSON.parse(localStorage.getItem("pokemons")));
    }
  }, []);

  return (
    <div>
      <div className="gap-1rem d-flex justify-content-center">
        {/* main content */}
        <div className="d-flex align-item-center gap-1rem margin-10px">
          <h1 className="text-align-center">Pokedex</h1>
          <button
            className="addpokemon-btn btn"
            onClick={() => setShowCreateForm(!showcreateForm)}
          >
            <FontAwesomeIcon icon={faSearch} />
            Check Pokemon
          </button>
        </div>
      </div>
      {showcreateForm ? (
        <div className="d-flex flex-wrap justify-content-center">
          {/* Card area */}
          {pokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              title={pokemon.title}
              body={pokemon.body}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="container">
            <div className="cover d-flex justify-content-center">
              <div className="pokeball">
                <div className="part"></div>
                <div className="part d-flex justify-content-center align-item-center">
                  <div className="sm-circle"></div>
                </div>
              </div>
            </div>
            <div className="cover d-flex justify-content-center">
              <div className="pokedex">
                <form onSubmit={onCreate}>
                  <h1 className="text-align-center">Pokedev</h1>
                  <div className="mt-1">
                    <input
                      required
                      placeholder="Pokemon Name"
                      type="text"
                      id="input_name"
                    />
                  </div>
                  <div className="mt-1">
                    <textarea
                      required
                      placeholder="Pokemon Type"
                      id="input_type"
                    ></textarea>
                    <div>
                      <button
                        className="m-auto d-block btn"
                        style={{
                          background: "rgb(19, 119, 181)",
                          color: "white",
                          marginTop: 3,
                        }}
                      >
                        <FontAwesomeIcon icon={faAdd} />
                        <span style={{ margin: 2 }}>Create</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
