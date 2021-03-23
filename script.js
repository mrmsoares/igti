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
  fetchJson("http://localhost:3000/employees")
    .then((employees) => {
      fetchJson("http://localhost:3000/roles")
        .then((roles) => {
          let table = renderTable(employees, roles);
          document.getElementById("app").innerHTML = table;
        })
        // Chamamos a função showError para mostra a mensagem de erro.
        .catch(showError);
    })
    .catch((error) => {
      showError();
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
    // Passamos como último parâmetro a função showError para mostar a mensagem de erro.
  }, showError);
}
//solution4();

async function solution5() {
  // Com funções assincronas, tratamos o erro com try/catch
  try {
    let employees = await fetchJson("http://localhost:3000/employees");
    let roles = await fetchJson("http://localhost:3000/roles");
    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
  } catch (error) {
    showError(error);
  }
}
//solution5();

async function solution6() {
  try {
    let [employees, roles] = await Promise.all([
      fetchJson("http://localhost:3000/employees"),
      fetchJson("http://localhost:3000/roles"),
    ]);
    let table = renderTable(employees, roles);
    document.getElementById("app").innerHTML = table;
  } catch (error) {
    showError(error);
  }
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

function showError(employees, roles) {
  document.getElementById("app").innerHTML = "Erro ao carregar dados.";
}

/*
// CRIAR

fecth(`http://localhost:3000/employees`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(employee),
});

// ATUALIZAR

fecth(`http://localhost:3000/employees/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(employee),
});

// EXCLUIR

fecth(`http://localhost:3000/employees/${id}`, {
  method: "DELETE",
});

*/
