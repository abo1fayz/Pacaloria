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
  
  if (filteredBooks.length === 0) {
    bookList.innerHTML = '<p class="no-results">لا توجد نتائج مطابقة للبحث</p>';
    return;
  }
  
  filteredBooks.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    
    // صورة افتراضية إذا لم توجد صورة
    const imageContent = book.image ? 
      `<img src="${book.image}" alt="${book.title}" class="book-image">` :
      `<div class="book-image">${book.title}</div>`;
    
    bookDiv.innerHTML = `
      ${imageContent}
      <h3>${book.title}</h3>
      <a href="${book.file}" download="${book.title}">
        <button><i class="fas fa-download"></i> تحميل الكتاب</button>
      </a>
    `;
    bookList.appendChild(bookDiv);
  });
}

function setCategory(category) {
  selectedCategory = category;
  
  // تحديث الأزرار النشطة
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent === (category === 'all' ? 'الكل' : category)) {
      btn.classList.add('active');
    }
  });
  
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById("search-input").value.toLowerCase();
  
  const filtered = books.filter(book =>
    (selectedCategory === "all" || book.category === selectedCategory) &&
    book.title.toLowerCase().includes(query)
  );
  
  displayBooks(filtered);
}

// تهيئة الصفحة عند التحميل
window.onload = () => {
  applyFilters();
};
