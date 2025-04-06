import mostrarPokemon from "../pokemon.js";
import * as general from "../general.js";

describe("mostrarPokemon", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="pokemon-contenedor" style="display:none"></div>
      <img id="pokemon-imagen" />
      <h1 id="pokemon-nombre"></h1>
      <p id="pokemon-id"></p>
      <div id="tipos"></div>
      <div id="habilidades"></div>
      <table><tbody id="movimientos"></tbody></table>
    `;
    jest.spyOn(general, "actualizarTextoAyuda").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("debería mostrar correctamente los datos del Pokémon", () => {
    const pokemon = {
      id: 25,
      nombre: "Pikachu",
      foto: "pikachu.png",
      tipos: ["electric"],
      habilidades: ["estática"],
      movimientos: [
        {
          movimiento: "impactrueno",
          versiones: ["rojo", "azul"],
        },
      ],
    };

    mostrarPokemon(pokemon);

    expect(document.querySelector("#pokemon-contenedor").style.display).toBe("block");
    expect(document.querySelector("#pokemon-imagen").src).toContain("pikachu.png");
    expect(document.querySelector("#pokemon-imagen").alt).toBe("Imagen frontal del pokemon Pikachu");
    expect(document.querySelector("#pokemon-nombre").textContent).toBe("Pikachu");
    expect(document.querySelector("#pokemon-id").textContent).toBe("25");
    expect(document.querySelector("#tipos").textContent).toContain("electric");
    expect(document.querySelector("#habilidades").textContent).toContain("estática");
    expect(document.querySelector("#movimientos").textContent).toContain("impactrueno");
    expect(document.querySelector("#movimientos").textContent).toContain("rojo");
    expect(document.querySelector("#movimientos").textContent).toContain("azul");
  });
});
