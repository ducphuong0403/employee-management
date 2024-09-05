document.addEventListener("DOMContentLoaded", function() {
    const btnAdd = document.getElementById("btn_addnew");
    const inputName = document.getElementById("input_name");
    const inputPhone = document.getElementById("input_phone");
    const inputDepartment = document.getElementById("deparment");
    const btnSubmit = document.getElementById("btn_submit");
    const btnCancelFormInput = document.getElementById("btn_cancel");
    const btnRemove = document.getElementById("btn_remove");
    const bodyTable = document.getElementById("tableBody");
    const inputSearch = document.getElementById("input_search");
    const btnCancelModal = document.getElementById("btn_cancel_modal");
    const myModal = document.getElementById("myModal");
    let listEmployee = [];

    //Sự kiện click button Add -> hiển thị Form Input Employee
    btnAdd.addEventListener('click', function(){
        showFormInput();
    })

    btnCancelFormInput.addEventListener('click', function(){
        hideFormInput();
        resetFormInput();
        btnSubmit.innerHTML = 'Submit';
    })

    const btnEdits = document.getElementsByClassName("btn_edit");
    for (let i = 0; i < btnEdits.length; i++) {
        btnEdits[i].addEventListener('click', function() {
            showFormInput();
        });
    }

    btnSubmit.addEventListener('click', function(e){
        e.preventDefault();
        if(btnSubmit.innerHTML === 'Update') {
            updateInfo();
            return;
        }

        let newEmployee = {
            name : inputName.value,
            department : inputDepartment.value,
            phone : inputPhone.value
        }

        listEmployee.push(newEmployee);     
        loadListDataEmployee(listEmployee);
        hideFormInput();
        displayCountTotalEmployee(listEmployee);
        resetFormInput();
    })

    //Chức năng thêm mới Employee mới từ form Input vào Table
    function loadListDataEmployee(listEmployee) {
        bodyTable.innerHTML = '';
        for (let i = 0; i < listEmployee.length; i++) {
            let newRow = document.createElement('tr');  // Define newRow within the loop
            let newEmployee = `
                <td>${listEmployee[i].name}</td>
                <td>${listEmployee[i].department}</td>
                <td>${listEmployee[i].phone}</td>
                <td>
                    <button class="btn_edit">
                        <i class="fa-solid fa-pencil btn"></i>
                    </button>
                    <button class="btn_remove" onclick="showModalConfirmDelete()" data-toggle="modal" data-target="#myModal">
                        <i class="fa-solid fa-trash btn"></i>
                    </button>
                </td>`;
            newRow.innerHTML = newEmployee;
            console.log("New Employee:", newEmployee);
            bodyTable.appendChild(newRow);
            console.log("Updated Employee List:", listEmployee);
            addEventEdit(newRow, i);
            addEventRemove(newRow, i);
        }
    }
    

    //Chức năng hiển thị Total các Employee
    function displayCountTotalEmployee(list) {
        let arrDepartment = {
            'Administration': 0,
            'Human Resources': 0,
            'Customer Service': 0,
            'Total Employee' : 0
        };

        for (let i = 0; i < list.length; i++) {
            arrDepartment[list[i].department]++;
        }
        document.getElementById("total_admin").innerHTML = arrDepartment['Administration'];
        document.getElementById("total_human").innerHTML = arrDepartment['Human Resources'];
        document.getElementById("total_customer").innerHTML = arrDepartment['Customer Service'];
        
        arrDepartment['Total Employee'] = arrDepartment['Administration'] + arrDepartment['Customer Service'] + arrDepartment['Human Resources'];
        document.getElementById("total_Employee").innerHTML = arrDepartment['Total Employee'];;
    
    }

    function addEventEdit(element, idx) {
        let btnEdit = element.getElementsByClassName("btn_edit")[0];
        btnEdit.addEventListener('click', function (e) {
            showFormInput();
            inputName.value = listEmployee[idx].name;
            inputDepartment.value = listEmployee[idx].department;
            inputPhone.value = listEmployee[idx].phone;
            btnSubmit.innerHTML = "Update";
            btnSubmit.setAttribute('idx', idx);
        });
    }

    function addEventRemove(element, idx) {
        let btnRemove = element.getElementsByClassName("btn_remove")[0];
        btnRemove.addEventListener('click', function (e) {
            myModal.setAttribute("idx", idx);
        });
    }
    
    document.getElementById("btn_Confirm_delete").addEventListener("click", function (e) {
        listEmployee.splice(myModal.getAttribute("idx"), 1);
        loadListDataEmployee(listEmployee);
        displayCountTotalEmployee(listEmployee);
        closeModal();
    });

    function updateInfo() {
        let idx = btnSubmit.getAttribute('idx');
        listEmployee[idx].name = inputName.value;
        listEmployee[idx].department = inputDepartment.value;
        listEmployee[idx].phone = inputPhone.value;
        loadListDataEmployee(listEmployee);
        resetFormInput();
        btnSubmit.innerHTML = 'Submit';
        hideFormInput();
        displayCountTotalEmployee(listEmployee);
    }

    //Chức Năng Hiển Thị Form Input Employee
    function showFormInput() {
        btnAdd.disabled = true;
        document.getElementById("form_input").style.display = "block";
    }

    //Chức Năng Đóng Form Input Employee
    function hideFormInput() {
        document.getElementById("form_input").style.display = 'none';
        btnAdd.disabled = false;
    }

    //Chức Năng Reset dữ liệu tại form Input
    function resetFormInput() {
        inputName.value = '';
        inputDepartment.querySelector('option[value="0"]').selected = true;
        inputPhone.value = '';
    }

})

//Chức năng hiển thị Modal ConfirmDelete Employee tại table!
function showModalConfirmDelete() {
    const myModal = document.getElementById("myModal");
    myModal.style.display = 'block';
}

//Chức năng đóng Modal ConfirmDelete
function closeModal() {
    const myModal = document.getElementById("myModal");
    myModal.style.display = 'none';
}