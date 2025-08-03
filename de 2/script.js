let currentPage = 1;
let limit = 5;

function renderTable() {
  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const sliced = transactions.slice(start, end);
  const table = document.getElementById("transactionTable");
  table.innerHTML = "";

  sliced.forEach(t => {
    table.innerHTML += `
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
      </tr>`;
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(transactions.length / limit);
  let controls = "";
  for (let i = 1; i <= totalPages; i++) {
    controls += `<button onclick="goToPage(${i})" ${i === currentPage ? 'style="background:#007bff;color:white;"' : ''}>${i}</button> `;
  }
  document.getElementById("paginationControls").innerHTML = controls;
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

function openModal() {
  const myModal = new bootstrap.Modal(document.getElementById('modal'));
  myModal.show();
}

function addTransaction(e) {
  e.preventDefault();
  const customer = document.getElementById("customer").value.trim();
  const employee = document.getElementById("employee").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!customer || !employee || !amount) {
    alert("Vui lòng điền đầy đủ tất cả các trường.");
    return;
  }

  if (customer.length > 30) {
    alert("Tên khách hàng không được vượt quá 30 ký tự.");
    return;
  }

  if (employee.length > 30) {
    alert("Tên nhân viên không được vượt quá 30 ký tự.");
    return;
  }

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

  document.querySelector("form").reset();
  bootstrap.Modal.getInstance(document.getElementById('modal')).hide();
  renderTable();
}

function searchTransaction() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = transactions.filter(t =>
    t.customer.toLowerCase().includes(keyword) ||
    t.employee.toLowerCase().includes(keyword) ||
    t.id.toString().includes(keyword)
  );

  const table = document.getElementById("transactionTable");
  table.innerHTML = "";

  filtered.forEach(t => {
    table.innerHTML += `
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
      </tr>`;
  });
}

function changeLimit() {
  const newLimit = parseInt(document.getElementById("limitSelect").value);
  limit = newLimit;
  currentPage = 1;
  renderTable();
}

window.onload = () => {
  renderTable();
};
