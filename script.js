function solution1() {
  let employeesPromise = fetch("http://localhost:3000/employees");

  employeesPromise.then((respEmployee) => {
    respEmployee.json().then((employees) => {
      // crio uma variável rolesPromise para captura dados das funções de cada funcionário na lista roles.
      let rolesPromise = fetch("http://localhost:3000/roles");

      rolesPromise.then((respRoles) => {
        respRoles.json().then((roles) => {
          // crio uma variável table e atribuo a ela a função renderTable, que está pegando todos os items id e name da lista "employees" e o name da lista "roles".
          let table = renderTable(employees, roles);

          // busco no documento html o id "app" e insiro dentro dele a tabela renderizada.
          document.getElementById("app").innerHTML = table;
        });
      });
    });
  });
}
//solution1();

function solution2() {
  fetch("http://localhost:3000/employees")
    .then((respEmployee) => {
      return respEmployee.json();
    })
    .then((employees) => {
      fetch("http://localhost:3000/roles")
        .then((respRoles) => {
          return respRoles.json();
        })
        .then((roles) => {
          let table = renderTable(employees, roles);
          document.getElementById("app").innerHTML = table;
        });
    });
}
//solution2();

function fetchJson(url) {
  return fetch(url).then((r) => {
    return r.json();
  });
}

function solution3() {
  fetchJson("http://localhost:3000/employees").then((employees) => {
    fetchJson("http://localhost:3000/roles").then((roles) => {
      let table = renderTable(employees, roles);
      document.getElementById("app").innerHTML = table;
    });
  });
}
//solution3();

function solution4() {
  Promise.all([
    fetchJson("http://localhost:3000/employees"),
    fetchJson("http://localhost:3000/roles"),
  ]).then(([employees, roles]) => {
    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
  });
}
//solution4();

async function solution5() {
  let employees = await fetchJson("http://localhost:3000/employees");
  let roles = await fetchJson("http://localhost:3000/roles");
  let table = renderTable(employees, roles);
  document.getElementById("app").innerHTML = table;
}
//solution5();

async function solution6() {
  let [employees, roles] = await Promise.all([
    fetchJson("http://localhost:3000/employees"),
    fetchJson("http://localhost:3000/roles"),
  ]);
  let table = renderTable(employees, roles);
  document.getElementById("app").innerHTML = table;
}
solution6();

function renderTable(employees, roles) {
  //O método map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
  let rows = employees.map((employee) => {
    //O método find() retorna o valor do primeiro elemento do array que satisfizer a função de teste provida.
    let role = roles.find((role) => role.id == employee.role_id);
    return `<tr>
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      <td>${role.name}</td>
      </tr>`;
  });
  // O método join() junta todos os elementos de um array (ou um array-like object) em uma string e retorna esta string.
  return `<table>${rows.join("")}</table>`;
}
