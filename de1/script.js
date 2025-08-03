const employeeTable = document.getElementById("employeeTable"); 
const employeeForm = document.getElementById("employeeForm");

function renderEmployees(data) {
  employeeTable.innerHTML = "";
  data.forEach((emp, index) => {
    const row = `
      <tr>
        <td><input type="checkbox"></td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.address}</td>
        <td>${emp.phone}</td>
        <td>
          <i class="fa-solid fa-pen text-warning me-3" title="Edit" style="cursor:pointer;"></i>
          <i class="fa-solid fa-trash text-danger" title="Delete" style="cursor:pointer;"></i>
        </td>
      </tr>`;
    employeeTable.innerHTML += row;
  });
}

renderEmployees(employees);

employeeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const phoneError = document.getElementById("phoneError");

  if (!name || !email || !address || !phone) {
    phoneError.textContent = "Vui lòng nhập đầy đủ tất cả các trường.";
    return;
  }

  if (!/^0\d{9}$/.test(phone)) {
    phoneError.textContent = "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.";
    return;
  }

  phoneError.textContent = "";

  employees.push({ name, email, address, phone });
  renderEmployees(employees);
  employeeForm.reset();
  bootstrap.Modal.getInstance(document.getElementById("employeeModal")).hide();
});

function searchEmployees() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(query) ||
    e.email.toLowerCase().includes(query) ||
    e.address.toLowerCase().includes(query) ||
    e.phone.includes(query)
  );
  renderEmployees(filtered);
}
