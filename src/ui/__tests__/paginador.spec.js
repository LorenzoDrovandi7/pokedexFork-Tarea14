import mostrarPaginador, { manejarCambioPagina } from "../paginador.js";

describe("paginador.js", () => {
  let $container;

  beforeEach(() => {
    document.body.innerHTML = '<ul id="paginador"></ul>';
    $container = document.querySelector("#paginador");
  });

  it('debería ejecutar el callback con número de página si href es "#"', () => {
    const mockCallback = jest.fn();
    mostrarPaginador(20, 1, null, null, mockCallback);

    const pagina2 = $container.querySelectorAll("a.page-link")[1];
    pagina2.dataset.pagina = "2";
    pagina2.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(mockCallback).toHaveBeenCalledWith(2);
  });

  it("debería renderizar las páginas correctamente", () => {
    mostrarPaginador(40, 2, "siguienteUrl", "anteriorUrl");

    const items = $container.querySelectorAll("li");
    expect(items.length).toBe(4);

    expect(items[0].textContent).toBe("Anterior");
    expect(items[1].textContent).toBe("1");
    expect(items[2].textContent).toBe("2");
    expect(items[3].textContent).toBe("Siguiente");

    expect(items[2].classList.contains("active")).toBe(true);
  });

  it('debería marcar los botones "Anterior" y "Siguiente" como deshabilitados si no hay URL', () => {
    mostrarPaginador(20, 1, null, null);
    const [anterior, , siguiente] = $container.querySelectorAll("li");

    expect(anterior.classList.contains("disabled")).toBe(true);
    expect(siguiente.classList.contains("disabled")).toBe(true);
  });

  it('debería ejecutar el callback con número de página si href es "#"', () => {
    const mockCallback = jest.fn();
    mostrarPaginador(20, 1, null, null, mockCallback);

    const pagina2 = $container.querySelectorAll("a.page-link")[1];
    pagina2.dataset.pagina = "2";
    pagina2.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(mockCallback).toHaveBeenCalledWith(2);
  });

  it('debería ejecutar el callback con url si href no es "#"', () => {
    const mockCallback = jest.fn();
    const e = {
      preventDefault: jest.fn(),
      target: document.createElement("a"),
    };
    e.target.setAttribute("href", "https://pokeapi.co/page2");
    manejarCambioPagina(e, mockCallback);
    expect(mockCallback).toHaveBeenCalledWith("https://pokeapi.co/page2");
  });
});
