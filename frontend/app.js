const API_URL = "http://localhost:3000/api/books";

// Notifications
function notify(msg, type="success") {
  const n = document.getElementById("notification");
  n.innerText = msg;
  n.className = "";
  n.classList.add(type === "success" ? "bg-green-500" : "bg-red-500", "text-white", "p-2", "rounded", "mb-2");
  n.classList.remove("hidden");
  setTimeout(() => n.classList.add("hidden"), 3000);
}

// Affichage livres
async function fetchBooks() {
  const res = await fetch(API_URL);
  const data = await res.json();
  displayBooks(data.data);
  updateStats(data.data);
}

// Statistiques
function updateStats(books) {
  document.getElementById("totalBooks").innerText = books.length;
  document.getElementById("availableBooks").innerText = books.filter(b => b.available).length;
}

// Affichage table
function displayBooks(books) {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.forEach(book => {
    list.innerHTML += `
      <tr class="border-b">
        <td class="p-2 text-center">${book.id}</td>
        <td class="p-2">${book.title}</td>
        <td class="p-2">${book.author}</td>
        <td class="p-2">${book.isbn}</td>
        <td class="p-2 text-center flex justify-center gap-2">
          <button class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onclick="editBook(${book.id}, '${book.title}', '${book.author}', '${book.isbn}')">✏️</button>
          <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="deleteBook(${book.id})">❌</button>
        </td>
      </tr>
    `;
  });
}

// Ajouter ou modifier
async function saveBook() {
  const id = document.getElementById("bookId").value;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  const imageFile = document.getElementById("image").files[0];

  if (!title || !author || !isbn) return notify("Tous les champs sont obligatoires", "error");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("author", author);
  formData.append("isbn", isbn);
  if(imageFile) formData.append("image", imageFile);

  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    await fetch(url, {
      method,
      body: formData
    });
    notify(id ? "Livre modifié !" : "Livre ajouté !");
    resetForm();
    fetchBooks();
  } catch(err) {
    notify("Erreur API", "error");
  }
}

// Modifier
function editBook(id, title, author, isbn) {
  document.getElementById("bookId").value = id;
  document.getElementById("title").value = title;
  document.getElementById("author").value = author;
  document.getElementById("isbn").value = isbn;
}

// Supprimer
async function deleteBook(id) {
  if (!confirm("Supprimer ce livre ?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    notify("Livre supprimé !");
    fetchBooks();
  } catch(err) {
    notify("Erreur API", "error");
  }
}

// Reset form
function resetForm() {
  document.getElementById("bookId").value = "";
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
}

// Recherche
async function searchBook() {
  const search = document.getElementById("search").value.toLowerCase();
  const res = await fetch(API_URL);
  const data = await res.json();
  const filtered = data.data.filter(b =>
    b.title.toLowerCase().includes(search) ||
    b.author.toLowerCase().includes(search)
  );
  displayBooks(filtered);
}

// Init
fetchBooks();