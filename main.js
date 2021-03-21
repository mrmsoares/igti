let employees = [];
let roles = [];

const elementList = document.querySelector("ul");
const elementForm = document.querySelector("form");

async function init() {
  try {
    [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
    renderData();
  } catch (erro) {
    showError(erro);
  }
}
init();

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
  }
}

function showError(errors) {
  document.getElementById("errors").textContent = "Erro ao carregar dados.";
  console.log(errors);
}
