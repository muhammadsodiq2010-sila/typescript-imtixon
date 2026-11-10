
// Product interfeysini import qilish
import type { Product } from "./types/Product.js";

// Mahsulot metodlarini import qilish
import {
  getAllProducts,
  addProduct,
  deleteProduct,
} from "./services/productService.js";

// Barcha mahsulotlarni saqlash
let allProducts: Product[] = [];

// O‘chirilgan mahsulotlarni vaqtincha saqlash
let deletedProducts: Product[] = [];

// Mahsulot kartalarini HTML ga chiqarish
function renderProductCards(products: Product[]) {
  const productList = document.getElementById("productList");

  if (!productList) return;

  productList.innerHTML = products.map((product) => `
    <div class="product-card">

      <div class="product-image">
        <i class="fa-solid fa-pills"></i>
      </div>

      <h3>${product.name}</h3>

      <p>Kategoriya: ${product.category}</p>
      <p>Ishlab chiqaruvchi: ${product.manufacturer}</p>
      <p>Yaroqlilik muddati: ${product.expiryDate}</p>

      <div class="product-bottom">
        <span class="price">
          ${product.sellingPrice.toLocaleString()} so‘m
        </span>

        <span class="tag">${product.quantity} dona</span>
      </div>

      <div class="product-actions">

        <button class="edit-btn" data-id="${product.id}">
          <i class="fa-solid fa-pen"></i> Edit
        </button>

        <button class="delete-btn" data-id="${product.id}">
          <i class="fa-solid fa-trash"></i> Delete
        </button>

      </div>

    </div>
  `).join("");
}


// Qidiruv va kategoriyani filterlash
function applyFilters() {
  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  const categoryFilter = document.getElementById("categoryFilter") as HTMLSelectElement;

  const searchValue = searchInput?.value.toLowerCase() || "";
  const selectedCategory = categoryFilter?.value || "";

  const filteredProducts = allProducts.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchValue);

    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    return matchesName && matchesCategory;
  });

  renderProductCards(filteredProducts);
}


// Barcha mahsulotlarni MockAPI dan olish
async function renderProducts() {
  try {
    allProducts = await getAllProducts();
    applyFilters();
  } catch (error) {
    console.error("Mahsulotlarni olishda xato:", error);
    alert("Mahsulotlarni yuklashda xatolik yuz berdi!");
  }
}


// O‘chirilgan mahsulotlarni chiqarish
function renderDeletedProducts() {
  const deletedList = document.getElementById("deletedProductList");

  if (!deletedList) return;

  deletedList.innerHTML = deletedProducts.map((product) => `
    <div class="product-card">

      <div class="product-image">
        <i class="fa-solid fa-pills"></i>
      </div>

      <h3>${product.name}</h3>

      <p>Kategoriya: ${product.category}</p>

      <p>Narxi: ${product.sellingPrice.toLocaleString()} so‘m</p>

      <button class="restore-btn" data-id="${product.id}">
        <i class="fa-solid fa-rotate-left"></i> Restore
      </button>

    </div>
  `).join("");
}


// Mahsulotni qayta tiklash
async function restoreProduct(id: string) {
  const product = deletedProducts.find((item) => item.id === id);

  if (!product) {
    alert("Mahsulot topilmadi!");
    return;
  }

  const { id: oldId, ...productData } = product;

  try {
    await addProduct(productData);

    deletedProducts = deletedProducts.filter(
      (item) => item.id !== id
    );

    renderDeletedProducts();
    await renderProducts();

    alert("Mahsulot qayta tiklandi!");

  } catch (error) {
    console.error("Tiklashda xato:", error);
    alert("Mahsulotni qayta tiklashda xatolik yuz berdi!");
  }
}


// Mahsulotlar ro‘yxatidagi tugmalar
const productList = document.getElementById("productList");

productList?.addEventListener("click", async (event: Event) => {
  const target = event.target as HTMLElement;

  // Delete tugmasi
  const deleteButton = target.closest(".delete-btn") as HTMLButtonElement | null;

  if (deleteButton) {
    const id = deleteButton.dataset.id;

    if (!id) return;

    const confirmDelete = confirm("Mahsulotni o‘chirmoqchimisiz?");

    if (!confirmDelete) return;

    const deletedProduct = allProducts.find(
      (product) => product.id === id
    );

    try {
      await deleteProduct(id);

      if (deletedProduct) {
        deletedProducts.push(deletedProduct);
      }

      renderDeletedProducts();
      await renderProducts();

      alert("Mahsulot muvaffaqiyatli o‘chirildi!");

    } catch (error) {
      console.error("O‘chirishda xato:", error);
      alert("Mahsulotni o‘chirishda xatolik yuz berdi!");
    }

    return;
  }

  // Edit tugmasi
  const editButton = target.closest(".edit-btn") as HTMLButtonElement | null;

  if (editButton) {
    const id = editButton.dataset.id;

    if (!id) return;

    window.location.href = `product-edit.html?id=${id}`;
  }
});


// Mahsulot nomi bo‘yicha qidirish
const searchInput = document.getElementById("searchInput") as HTMLInputElement;

searchInput?.addEventListener("input", applyFilters);


// Kategoriya bo‘yicha filterlash
const categoryFilter = document.getElementById("categoryFilter") as HTMLSelectElement;

categoryFilter?.addEventListener("change", applyFilters);


// Restore tugmasi
const deletedProductList = document.getElementById("deletedProductList");

deletedProductList?.addEventListener("click", async (event: Event) => {
  const target = event.target as HTMLElement;

  const restoreButton = target.closest(".restore-btn") as HTMLButtonElement | null;

  if (!restoreButton) return;

  const id = restoreButton.dataset.id;

  if (!id) return;

  await restoreProduct(id);
});


// Sahifa ochilganda mahsulotlarni yuklash
renderProducts();
