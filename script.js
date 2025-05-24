const books = [
  {
    title: "الرياضيات - بكالوريا علمي",
    file: "math.pdf",
    image: "math.jpg",
    category: "علمي",
    subcategory: "رياضيات"
  },
  {
    title: "الفيزياء - بكالوريا علمي",
    file: "physics.pdf",
    image: "physics.jpg",
    category: "علمي",
    subcategory: "علوم تجريبية"
  },
  {
    title: "الكيمياء - علوم تجريبية",
    file: "chemistry.pdf",
    image: "chemistry.jpg",
    category: "علمي",
    subcategory: "علوم تجريبية"
  },
  {
    title: "الهندسة الكهربائية - تقني رياضي",
    file: "electric.pdf",
    image: "electric.jpg",
    category: "علمي",
    subcategory: "تقني رياضي"
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
let selectedSubcategory = null;
const bookList = document.getElementById("book-list");

function displayBooks(filteredBooks) {
  bookList.innerHTML = "";
  
  // عرض شريط التخصص الفرعي إذا كان محددًا
  if (selectedSubcategory && selectedCategory === 'علمي') {
    const subBar = document.createElement('div');
    subBar.className = 'subcategory-bar';
    subBar.innerHTML = `
      عرض كتب: <span>${selectedSubcategory}</span>
      <button onclick="setCategory('علمي')" class="clear-sub">إلغاء التخصيص</button>
    `;
    bookList.appendChild(subBar);
  }
  
  if (filteredBooks.length === 0) {
    bookList.innerHTML += '<p class="no-results">لا توجد نتائج مطابقة للبحث</p>';
    return;
  }
  
  filteredBooks.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    
    const imageContent = book.image ? 
      `<img src="${book.image}" alt="${book.title}" class="book-image">` :
      `<div class="book-image">${book.title}</div>`;
    
    bookDiv.innerHTML = `
      ${imageContent}
      <h3>${book.title}</h3>
      ${book.subcategory ? `<p class="book-sub">${book.subcategory}</p>` : ''}
      <a href="${book.file}" download="${book.title}">
        <button><i class="fas fa-download"></i> تحميل الكتاب</button>
      </a>
    `;
    bookList.appendChild(bookDiv);
  });
}

function setCategory(category) {
  selectedCategory = category;
  selectedSubcategory = null;
  updateActiveButtons();
  applyFilters();
}

function setSubCategory(category, subcategory) {
  selectedCategory = category;
  selectedSubcategory = subcategory;
  updateActiveButtons();
  applyFilters();
  closeDropdown();
}

function updateActiveButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (selectedSubcategory) {
    document.querySelector('.dropbtn').classList.add('active');
  } else if (selectedCategory === 'all') {
    document.querySelector('.filter-btn:first-child').classList.add('active');
  } else {
    const activeBtn = Array.from(document.querySelectorAll('.filter-btn'))
      .find(btn => btn.textContent.includes(selectedCategory));
    if (activeBtn) activeBtn.classList.add('active');
  }
}

function applyFilters() {
  const query = document.getElementById("search-input").value.toLowerCase();
  
  const filtered = books.filter(book => {
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesSubcategory = !selectedSubcategory || book.subcategory === selectedSubcategory;
    const matchesSearch = book.title.toLowerCase().includes(query);
    
    return matchesCategory && matchesSubcategory && matchesSearch;
  });
  
  displayBooks(filtered);
}

function toggleDropdown() {
  document.querySelector('.dropdown-content').classList.toggle('show');
}

function closeDropdown() {
  document.querySelector('.dropdown-content').classList.remove('show');
}

// إغلاق القائمة المنسدلة عند النقر خارجها
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    closeDropdown();
  }
}

window.onload = () => {
  updateActiveButtons();
  applyFilters();
};
