let employees = [];
let roles = [];

// criando variável para armazenar dados do clique na li
let selectedItem;

const elementList = document.querySelector("ul");
const elementForm = document.querySelector("form");

// Capturando os botões delete, cancel e create
const bdelete = document.getElementById("bdelete");
const bcancel = document.getElementById("bcancel");
const bsubmit = document.getElementById("bsubmit");

async function init() {
  try {
    [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
    renderRoles();
    renderData();
    // Iniciamos a aplicação chamando a função clearSelection para inicializar apenas com o botão create.
    clearSelection();
    // Ao clicar no botão cancel ele limpa todos os campos e a seleção.
    bcancel.addEventListener("click", clearSelection);
    // Ao clicar no botão update
    elementForm.addEventListener("submit", onSubmit);

    // ao clicar no botão delete
    bdelete.addEventListener("click", onDelete);
  } catch (erro) {
    showError("Error loading data.", erro);
  }
}
init();

function selectItem(employee, li) {
  // chamamos a função clearSelection para limpar o item que esteja marcado com a classe selected antes de adicionar a classe a um novo item.
  clearSelection();
  selectedItem = employee;
  li.classList.add("selected");

  // Capturando os dados do clique na li para aparecer dentro dos inputs (name, salary e role). Ao clicar pegamos os dados do clique e jogamos dentro do input utilizando o campo name de cada input.
  elementForm.name.value = employee.name;
  elementForm.salary.valueAsNumber = employee.salary;
  elementForm.role_id.value = employee.role_id;

  // Ao clicar no selecionar algum item da lista os botões delete e cancel aparecem.
  bcancel.style.display = "inline";
  bdelete.style.display = "inline";
  bsubmit.textContent = "Update";
}

// Criamos a função para remover a classe de estilo do item que estava clicado ao clicar em outro item.
function clearSelection() {
  clearError();
  selectedItem = undefined;
  // Busca dentro da UL qualquer elemento que esteja com a classe selected adicionada.
  const li = elementList.querySelector(".selected");

  // Se estiver com a classe selected adicionada, apenas remova.
  if (li) {
    li.classList.remove("selected");
  }

  // Ao clicar no botão cancel, os botões delete e cancel são ocultados
  elementForm.name.value = "";
  elementForm.salary.value = "";
  elementForm.role_id.value = "";
  bcancel.style.display = "none";
  bdelete.style.display = "none";
  bsubmit.textContent = "Create";
}

// Função para tratar os dados de atualização da lista
async function onSubmit(evt) {
  // Precisamos cancelar o comportamento padrão (carregar página) do submit atraves do preventDedault
  evt.preventDefault();

  const employeeData = {
    name: elementForm.name.value,
    salary: elementForm.salary.valueAsNumber,
    // adicionando o operador + você transforma em number
    role_id: +elementForm.role_id.value,
  };

  // Verificando se os campos estão vazios para não submeter o formulário
  if (!employeeData.name || !employeeData.salary || !employeeData.role_id) {
    showError("You must fill all form fields");
  } else {
    if (selectedItem) {
      // Passamos a função updateEmployee para dentro da variável updateItem  passando o id do item selecionado como primeiro parâmetro e os novos dados do formulário
      const updateItem = await updateEmployee(selectedItem.id, employeeData);

      // Precisamos pegar o índice do item que estamos editando oara salvar no banco de dados e renderizar a tabela novamente.
      const i = employees.indexOf(selectedItem);
      employees[i] = updateItem;
      renderData();

      // Chamamos a função para selecionar o item novamente para corrigir o bug que limpava a marcação
      selectItem(updateItem, elementList.children[i]);
    } else {
      const createdItem = await createEmployee(employeeData);
      employees.push(createdItem);
      renderData();
      selectItem(createdItem, elementList.lastChild);
      elementList.lastChild.scrollIntoView();
    }
  }
}

async function onDelete() {
  if (selectedItem) {
    await deleteEmployee(selectedItem.id);
    const i = employees.indexOf(selectedItem);
    employees.splice(i, 1);
    renderData();
    clearSelection();
  }
}

function renderData() {
  // Sempre que a tabela for renderizada, vamos limpar os dados para renderizar com as informações atualizadas.
  elementList.innerHTML = "";

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

function showError(message, errors) {
  document.getElementById("errors").textContent = message;
  if (errors) {
    console.log(errors);
  }
}

function clearError() {
  document.getElementById("errors").textContent = "";
}
