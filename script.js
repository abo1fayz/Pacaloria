const books = [
  {
    title: "الرياضيات - بكالوريا علمي",
    file: "pdfs/math.pdf",
    image: "images/math.jpg",
    category: "علمي"
  },
  {
    title: "الفيزياء - بكالوريا علمي",
    file: "pdfs/physics.pdf",
    image: "images/physics.jpg",
    category: "علمي"
  },
  {
    title: "التاريخ - بكالوريا أدبي",
    file: "pdfs/history.pdf",
    image: "images/history.jpg",
    category: "أدبي"
  },
  {
    title: "مرجع القواعد النحوية",
    file: "pdfs/grammar.pdf",
    image: "images/grammar.jpg",
    category: "أدبي"
  }
];

const bookList = document.getElementById("book-list");
const viewer = document.getElementById("viewer");
const pdfFrame = document.getElementById("pdf-frame");
const viewerTitle = document.getElementById("viewer-title");
const downloadBtn = document.getElementById("download-btn");

function displayBooks(filteredBooks) {
  bookList.innerHTML = "";
  filteredBooks.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";

    bookDiv.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="book-image">
      <h3>${book.title}</h3>
      <button onclick="openViewer('${book.title}', '${book.file}')">فتح الكتاب</button>
    `;

    bookList.appendChild(bookDiv);
  });
}

function filterBooks(category) {
  if (category === "all") {
    displayBooks(books);
  } else {
    const filtered = books.filter(book => book.category === category);
    displayBooks(filtered);
  }
}

function openViewer(title, file) {
  viewerTitle.textContent = title;
  pdfFrame.src = file;
  downloadBtn.href = file;
  viewer.classList.remove("hidden");
  window.scrollTo({ top: viewer.offsetTop, behavior: "smooth" });
}

function closeViewer() {
  viewer.classList.add("hidden");
  pdfFrame.src = "";
}

// عرض الكل عند التحميل
window.onload = () => {
  displayBooks(books);
};
