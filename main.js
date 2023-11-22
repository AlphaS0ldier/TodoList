const btn_add = document.querySelector("button.btn-add");
const input_text = document.querySelector("form input");
const todolist = document.querySelector("ul");
const tar_pend = document.querySelector("div.empty p");
const num_tar = document.querySelectorAll("div.task-count span")[1];

const comp_vacio = () => {
  todolist.childElementCount > 0
    ? (tar_pend.hidden = true)
    : (tar_pend.hidden = false);
};

const oper_num = () => {
  num_tar.textContent = todolist.childElementCount;
};

const crear_lista = (valor) => {
  if (valor.value != "") {
    let li = document.createElement("li");
    let p = document.createElement("p");
    let button = document.createElement("button");

    button.setAttribute("class", "btn-delete");
    button.textContent = "x";

    p.textContent = typeof valor === "object" ? valor.value : valor;

    li.append(p, button);
    todolist.append(li);

    button.addEventListener("click", () => {
      button.parentNode.remove();
      let array = getDataFromLocal();
      array.splice(array.indexOf(p.textContent), 1);
      window.localStorage.setItem("array", JSON.stringify(array));
      oper_num();
      comp_vacio();
    });

    oper_num();
    comp_vacio();

    return p.textContent;
  }
};

const getDataFromLocal = () => {
  let array_local_db;
  JSON.parse(localStorage.getItem("array")) != null
    ? (array_local_db = JSON.parse(localStorage.getItem("array")))
    : (array_local_db = []);
  return array_local_db;
};

const cargar_lista = () => {
  let array = getDataFromLocal();
  if (array != null) {
    array.forEach((valor) => {
      crear_lista(valor);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  cargar_lista();
  oper_num();
  comp_vacio();
});

btn_add.addEventListener("click", () => {
  let content = crear_lista(input_text);
  let array_local_db = getDataFromLocal();
  
  if(content!=undefined){
  (array_local_db.push(content));
  window.localStorage.setItem("array", JSON.stringify(array_local_db));
  }
  
  event.preventDefault();
});
