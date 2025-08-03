let currentPage = 1;
let limit = 5;

function renderTable() {
  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const sliced = transactions.slice(start, end);
  const table = $("#transactionTable");
  table.empty();

  sliced.forEach(t => {
    table.append(`
      <tr>
        <td class="actions">
          <button style="background:#007bff;color:white;"><i class="fas fa-eye"></i></button>
          <button style="background:#ffc107;"><i class="fas fa-edit"></i></button>
          <button style="background:#dc3545;color:white;"><i class="fas fa-trash-alt"></i></button>
        </td>
        <td>${t.id}</td>
        <td>${t.customer}</td>
        <td>${t.employee}</td>
        <td>${t.amount.toLocaleString()}</td>
        <td>${t.date}</td>
      </tr>
    `);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(transactions.length / limit);
  let controls = "";
  for (let i = 1; i <= totalPages; i++) {
    controls += `<button onclick="goToPage(${i})" ${i === currentPage ? 'style="background:#007bff;color:white;"' : ''}>${i}</button> `;
  }
  $("#paginationControls").html(controls);
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

function openModal() {
  const myModal = new bootstrap.Modal(document.getElementById('modal'));
  myModal.show();
}

function showError(inputId, message) {
  $(`#${inputId}`).addClass("is-invalid");
  $(`#${inputId}Error`).text(message).show();
}

function clearErrors() {
  $(".is-invalid").removeClass("is-invalid");
  $(".invalid-feedback").hide();
}

function addTransaction(e) {
  e.preventDefault();
  clearErrors();

  const customer = $("#customer").val().trim();
  const employee = $("#employee").val().trim();
  const amount = $("#amount").val().trim();
  let isValid = true;

  if (!customer) {
    showError("customer", "Vui lòng nhập tên khách hàng.");
    isValid = false;
  } else if (customer.length > 30) {
    showError("customer", "Tên khách hàng không được vượt quá 30 ký tự.");
    isValid = false;
  }

  if (!employee) {
    showError("employee", "Vui lòng nhập tên nhân viên.");
    isValid = false;
  } else if (employee.length > 30) {
    showError("employee", "Tên nhân viên không được vượt quá 30 ký tự.");
    isValid = false;
  }

  if (!amount) {
    showError("amount", "Vui lòng nhập số tiền.");
    isValid = false;
  } else if (parseInt(amount) < 0) {
    showError("amount", "Số tiền phải lớn hơn hoặc bằng 0.");
    isValid = false;
  }

  if (!isValid) return;

  const now = new Date();
  const dateStr = now.toLocaleString('vi-VN');
  const newId = Math.max(...transactions.map(t => t.id)) + 1;

  transactions.push({
    id: newId,
    customer,
    employee,
    amount: parseInt(amount),
    date: dateStr
  });

  $("form")[0].reset();
  bootstrap.Modal.getInstance(document.getElementById('modal')).hide();
  renderTable();
}

function searchTransaction() {
  const keyword = $("#searchInput").val().toLowerCase();
  const filtered = transactions.filter(t =>
    t.customer.toLowerCase().includes(keyword) ||
    t.employee.toLowerCase().includes(keyword) ||
    t.id.toString().includes(keyword)
  );

  const table = $("#transactionTable");
  table.empty();

  filtered.forEach(t => {
    table.append(`
      <tr>
        <td class="actions">
          <button style="background:#007bff;color:white;"><i class="fas fa-eye"></i></button>
          <button style="background:#ffc107;"><i class="fas fa-edit"></i></button>
          <button style="background:#dc3545;color:white;"><i class="fas fa-trash-alt"></i></button>
        </td>
        <td>${t.id}</td>
        <td>${t.customer}</td>
        <td>${t.employee}</td>
        <td>${t.amount.toLocaleString()}</td>
        <td>${t.date}</td>
      </tr>
    `);
  });
}

function changeLimit() {
  limit = parseInt($("#limitSelect").val());
  currentPage = 1;
  renderTable();
}

$(document).ready(function () {
  // Add error containers
  $("#customer").after(`<div class="invalid-feedback" id="customerError"></div>`);
  $("#employee").after(`<div class="invalid-feedback" id="employeeError"></div>`);
  $("#amount").after(`<div class="invalid-feedback" id="amountError"></div>`);
  renderTable();
});
