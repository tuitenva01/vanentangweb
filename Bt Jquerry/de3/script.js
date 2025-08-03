let currentPage = 1;
let limit = 20;

function renderTable() {
  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const sliced = employees.slice(start, end);
  const table = $("#employeeTable");
  table.empty();

  sliced.forEach((e, index) => {
    table.append(`
      <tr>
        <td>
          <i class="fas fa-eye"></i>
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash-alt"></i>
        </td>
        <td>${start + index + 1}</td>
        <td>${e.name}</td>
        <td>${e.surname}</td>
        <td>${e.address}</td>
        <td>${e.active ? "✔" : "✘"}</td>
      </tr>
    `);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(employees.length / limit);
  let controls = "";
  for (let i = 1; i <= totalPages; i++) {
    controls += `<button onclick="goToPage(${i})" ${i === currentPage ? 'style="background:#007bff;color:white;"' : ''}>${i}</button>`;
  }
  $("#paginationControls").html(controls);
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

function clearErrors() {
  $(".is-invalid").removeClass("is-invalid");
  $(".invalid-feedback").hide();
}

function showError(inputId, message) {
  $(`#${inputId}`).addClass("is-invalid");
  $(`#${inputId}Error`).text(message).show();
}

function validateForm(name, surname, address) {
  let isValid = true;
  clearErrors();

  if (!name) {
    showError("name", "Vui lòng nhập tên.");
    isValid = false;
  } else if (name.length > 15) {
    showError("name", "Tên không vượt quá 15 ký tự.");
    isValid = false;
  }

  if (!surname) {
    showError("surname", "Vui lòng nhập họ đệm.");
    isValid = false;
  } else if (surname.length > 20) {
    showError("surname", "Họ đệm không vượt quá 20 ký tự.");
    isValid = false;
  }

  if (!address) {
    showError("address", "Vui lòng nhập địa chỉ.");
    isValid = false;
  } else if (address.length > 50) {
    showError("address", "Địa chỉ không vượt quá 50 ký tự.");
    isValid = false;
  }

  return isValid;
}

$(document).ready(function () {

  $("#btnAdd").click(() => {
    $("#popupForm").show();
    $("#employeeForm")[0].reset();
    clearErrors();
  });


  $(".close, #cancel").click(() => {
    $("#popupForm").hide();
  });

  $("#employeeForm").submit(function (e) {
    e.preventDefault();
    const name = $("#name").val().trim();
    const surname = $("#surname").val().trim();
    const address = $("#address").val().trim();

    if (!validateForm(name, surname, address)) return;

    employees.push({
      name,
      surname,
      address,
      active: true
    });

    $("#popupForm").hide();
    renderTable();
  });

  $("#searchInput").on("input", function () {
    const keyword = $(this).val().toLowerCase();
    const filtered = employees.filter(e =>
      e.name.toLowerCase().includes(keyword)
    );

    const table = $("#employeeTable");
    table.empty();

    filtered.forEach((e, index) => {
      table.append(`
        <tr>
          <td>
            <i class="fas fa-eye"></i>
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-alt"></i>
          </td>
          <td>${index + 1}</td>
          <td>${e.name}</td>
          <td>${e.surname}</td>
          <td>${e.address}</td>
          <td>${e.active ? "✔" : "✘"}</td>
        </tr>
      `);
    });
  });

  $("#limitSelect").change(function () {
    limit = parseInt($(this).val());
    currentPage = 1;
    renderTable();
  });
  renderTable();
});
