function fetchJson(url) {
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(resp.statusText);
    }
  });
}

function listEmployees() {
  return fetchJson("http://localhost:3000/employees");
}

function listRoles() {
  return fetchJson("http://localhost:3000/roles");
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
