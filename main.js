let employees = [];
let roles = [];

// criando variável para armazenar dados do clique na li
let itemSelected;

const elementList = document.querySelector("ul");
const elementForm = document.querySelector("form");

// Capturando os botões delete, cancel e create
const bdelete = document.getElementById("bdelete");
const bcancel = document.getElementById("bcancel");
const bcreate = document.getElementById("bcreate");

async function init() {
  try {
    [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
    renderRoles();
    renderData();
    // Iniciamos a aplicação chamando a função clearSelection para inicializar apenas com o botão create.
    clearSelection();
    // Ao clicar no botão cancel ele limpa todos os campos e a seleção.
    bcancel.addEventListener("click", clearSelection);
  } catch (erro) {
    showError(erro);
  }
}
init();

function selectItem(employee, li) {
  // chamamos a função clearSelection para limpar o item que esteja marcado com a classe selected antes de adicionar a classe a um novo item.
  clearSelection();
  itemSelected = employee;
  li.classList.add("selected");

  // Capturando os dados do clique na li para aparecer dentro dos inputs (name, salary e role). Ao clicar pegamos os dados do clique e jogamos dentro do input utilizando o campo name de cada input.
  elementForm.name.value = employee.name;
  elementForm.salary.valueAsNumber = employee.salary;
  elementForm.role_id.value = employee.role_id;

  // Ao clicar no selecionar algum item da lista os botões delete e cancel aparecem.
  bcancel.style.display = "inline";
  bdelete.style.display = "inline";
}

// Criamos a função para remover a classe de estilo do item que estava clicado ao clicar em outro item.
function clearSelection() {
  itemSelected = undefined;
  // Busca dentro da UL qualquer elemento que esteja com a classe selected adicionada.
  const li = elementList.querySelector(".selected");

  // Se estiver com a classe selected adicionada, apenas remova.
  if (li) {
    li.classList.remove("selected");
  }

  // Ao clicar no botão cancel, os botões delete e cancel são ocultados
  bcancel.style.display = "none";
  bdelete.style.display = "none";
}

function renderData() {
  for (const employee of employees) {
    //O método find() retorna o valor do primeiro elemento do array que satisfizer a função de teste provida.
    let role = roles.find((role) => role.id == employee.role_id);
    const li = document.createElement("li");
    const divName = document.createElement("div");
    divName.textContent = employee.name;
    const divRole = document.createElement("div");
    divRole.textContent = role.name;
    li.appendChild(divName);
    li.appendChild(divRole);
    elementList.appendChild(li);
    // o eventListener tem uma propriedade chamada currentTarget que é justamente o elemento para qual foi registrado, ou seja, aponta para ele mesmo onde ta sendo clicado. Então passo como segundo parâmetro a própria li.
    li.addEventListener("click", () => selectItem(employee, li));
  }
}

function renderRoles() {
  for (const role of roles) {
    const option = document.createElement("option");
    option.textContent = role.name;
    option.value = role.id;

    elementForm.role_id.appendChild(option);
  }
}

function showError(errors) {
  document.getElementById("errors").textContent = "Erro ao carregar dados.";
  console.log(errors);
}
