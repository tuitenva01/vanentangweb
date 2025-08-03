$(document).ready(function () {
  function renderEmployees(data) {
    $("#employeeTable").empty();
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
      $("#employeeTable").append(row);
    });
  }

  renderEmployees(employees);

  $("#employeeForm").on("submit", function (e) {
    e.preventDefault();
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const address = $("#address").val().trim();
    const phone = $("#phone").val().trim();
    const $phoneError = $("#phoneError");

    if (!name || !email || !address || !phone) {
      $phoneError.text("Vui lòng nhập đầy đủ tất cả các trường.");
      return;
    }

    if (!/^0\d{9}$/.test(phone)) {
      $phoneError.text("Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.");
      return;
    }

    $phoneError.text("");

    employees.push({ name, email, address, phone });
    renderEmployees(employees);
    $("#employeeForm")[0].reset();
    bootstrap.Modal.getInstance($("#employeeModal")[0]).hide();
  });

  window.searchEmployees = function () {
    const query = $("#searchInput").val().toLowerCase();
    const filtered = employees.filter((e) =>
      e.name.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.address.toLowerCase().includes(query) ||
      e.phone.includes(query)
    );
    renderEmployees(filtered);
  };
});
