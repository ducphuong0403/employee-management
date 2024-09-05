var btn_addNew = document.getElementById("btn_addnew");
var btn_remove = document.getElementById("btn_remove");
var formInput = document.getElementById("form_input");
var tableEmployee = document.getElementById("table_employee");
var modalConfirmDelete = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var btn_submit = document.getElementById("btn_submit");
var currentRow = null;
var total_employee = 0;
var total_admin = 0;
var total_human = 1;
var total_customer = 1;

var display_total_employee = document.getElementById("total_Employee");
var display_total_admin = document.getElementById("total_admin");
var display_total_human = document.getElementById("total_human");
var display_total_customer = document.getElementById("total_customer");

displayTotal();

function displayTotal() {
  display_total_employee.innerText = total_customer + total_admin + total_human;
  display_total_admin.innerText = total_admin;
  display_total_human.innerText = total_human;
  display_total_customer.innerText = total_customer;
}

function displayFormInput(btn_addNew) {
  formInput.style.display = "block";
  tableEmployee.style.display = "block";
  tableEmployee.style.width = "70%";
  btn_addNew.disabled = true;
}

function displayModal(row) {
  currentRow = row;
  modalConfirmDelete.style.display = "block";
}

function closeModal() {
  modalConfirmDelete.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == document.getElementById("myModal")) {
    closeModal();
  }
};

document.getElementById("btn_submit").addEventListener("click", function (e) {
  e.preventDefault();
});

document.getElementById("btn_cancel").addEventListener("click", function () {
  formInput.reset();
});

function addData() {
  const name = document.getElementById("ip_name").value;
  const department = document.getElementById("deparment").value;
  const phone = document.getElementById("ip_phone").value;
  let table = document.getElementById("tableBody");
  let newRow = document.createElement("tr");
  newRow.innerHTML = `<td>${name}</td>
                      <td>${department}</td>
                      <td>${phone}</td>
                      <td>
                        <button id="btn_edit" onclick="displayFormInput(this);">
                          <i class="fa-solid fa-pencil btn"></i>
                        </button>
                        <button
                          id="btn_remove"
                          data-toggle="modal"
                          data-target="#myModal"
                          onclick="displayModal()"
                        >
                          <i class="fa-solid fa-trash btn"></i>
                        </button>
                      </td>`;
  table.appendChild(newRow);
  displayTotal();
}

document.getElementById("btn_delete").addEventListener("click", function () {
  console.log(currentRow);
  if (currentRow) {
    currentRow.parentNode.parentNode.remove();
    closeModal();
    currentRow = null;
  }
});