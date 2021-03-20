let employeesPromise = fetch("http://localhost:3000/employees");

employeesPromise.then((resp) => {
  resp.json().then((employees) => {
    // crio uma variável table e atribuo a ela a função renderTable, que está pegando todos os items id e name da lista.
    let table = renderTable(employees);

    // busco no documento html o id "app" e insiro dentro dele a tabela renderizada.
    document.getElementById("app").innerHTML = table;
  });
});

function renderTable(employees) {
  let rows = employees.map((employee) => {
    return `<tr>
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      </tr>`;
  });
  // O método join() junta todos os elementos de um array (ou um array-like object) em uma string e retorna esta string.
  return `<table>${rows.join("")}</table>`;
}
