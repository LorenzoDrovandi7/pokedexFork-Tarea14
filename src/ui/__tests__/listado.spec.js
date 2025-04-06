import { actualizarTextoIndicePokemones, mostrarListadoPokemones } from "../listado";

describe("listado.js", () => {
  let $indice;

  beforeEach(() => {
    document.body.innerHTML = '<div id="indice"></div>';
    $indice = document.querySelector("#indice");
  });

  test("actualiza el texto del índice", () => {
    actualizarTextoIndicePokemones("Pokémon cargados");
    expect($indice.textContent).toBe("Pokémon cargados");
  });

  test("muestra listado de pokemones y ejecuta callback al hacer clic", () => {
    const nombres = ["Pikachu", "Charmander"];
    const mockCallback = jest.fn();

    mostrarListadoPokemones(nombres, mockCallback);

    const links = $indice.querySelectorAll("a");
    expect(links).toHaveLength(2);
    expect(links[0].textContent).toBe("Pikachu");
    expect(links[1].textContent).toBe("Charmander");

    links[0].click();
    expect(mockCallback).toHaveBeenCalledWith("Pikachu");
  });
});
