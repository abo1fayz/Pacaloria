const books = [
  {
    title: "الرياضيات - بكالوريا علمي",
    file: "math.pdf",
    image: "math.jpg",
    category: "علمي"
  },
  {
    title: "الفيزياء - بكالوريا علمي",
    file: "physics.pdf",
    image: "physics.jpg",
    category: "علمي"
  },
  {
    title: "التاريخ - بكالوريا أدبي",
    file: "history.pdf",
    image: "history.jpg",
    category: "أدبي"
  },
  {
    title: "مرجع القواعد النحوية",
    file: "grammar.pdf",
    image: "grammar.jpg",
    category: "أدبي"
  }
];

let selectedCategory = "all";

const bookList = document.getElementById("book-list");

function displayBooks(filteredBooks) {
  bookList.innerHTML = "";
  filteredBooks.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";

    bookDiv.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="book-image">
      <h3>${book.title}</h3>
      <a href="${book.file}" target="_blank" rel="noopener noreferrer">
        <button>فتح الكتاب</button>
      </a>
    `;

    bookList.appendChild(bookDiv);
  });
}

function setCategory(category) {
  selectedCategory = category;
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById("search-input").value.toLowerCase();

  let filtered = books.filter(book => {
    const matchCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchSearch = book.title.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  displayBooks(filtered);
}

window.onload = () => {
  applyFilters();
};
