'use strict';

/* ---------------------------
  Toggle Utility
--------------------------- */
const elementToggleFunc = elem => elem.classList.toggle("active");

/* ---------------------------
  Sidebar Toggle (Mobile)
--------------------------- */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

/* ---------------------------
  Testimonials Modal
--------------------------- */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

// Open modal
testimonialsItem.forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

// Close modal
modalCloseBtn?.addEventListener("click", testimonialsModalFunc);
overlay?.addEventListener("click", testimonialsModalFunc);

/* ---------------------------
  Portfolio Filter
--------------------------- */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = selectedValue => {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Custom select dropdown
select?.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter buttons (large screen)
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = btn.innerText;
    filterFunc(selectedValue);

    lastClickedBtn?.classList.remove("active");
    btn.classList.add("active");
    lastClickedBtn = btn;
  });
});

/* ---------------------------
  Contact Form Validation
--------------------------- */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

/* ---------------------------
  Page Navigation
--------------------------- */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.textContent.trim().toLowerCase();

    // Show clicked page
    pages.forEach(page => {
      page.classList.toggle("active", page.dataset.page === target);
    });

    // Set active nav link
    navLinks.forEach(nav => nav.classList.remove("active"));
    link.classList.add("active");

    window.scrollTo(0, 0);
  });
});

/* ---------------------------
  Date Formatter
--------------------------- */
function getFormattedDate() {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date().toLocaleDateString('en-GB', options);
}

const modalDate = document.getElementById('modal-date');
if (modalDate) {
  modalDate.textContent = getFormattedDate();
  modalDate.setAttribute('datetime', new Date().toISOString());
}

/* ---------------------------
  WhatsApp Form Submission
--------------------------- */
function sendToWhatsApp(event) {
  event.preventDefault();

  const name = document.getElementById('name')?.value || "";
  const email = document.getElementById('email')?.value || "";
  const message = document.getElementById('message')?.value || "";

  const whatsappMessage = 
    `Hello!%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;

  const phoneNumber = "918344445522"; // without +
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  window.open(whatsappLink, '_blank');
}
