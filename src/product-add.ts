// Mahsulot qo‘shish metodini import qilish
import { addProduct } from "./services/productService.js";

// Forma elementini olish
const productForm = document.getElementById("productForm") as HTMLFormElement;

// Forma yuborilganda mahsulot qo‘shish
productForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Forma ma'lumotlarini olish
  const newProduct = {
    name: (document.getElementById("productName") as HTMLInputElement).value,
    category: (document.getElementById("productCategory") as HTMLSelectElement).value,
    manufacturer: (document.getElementById("manufacturer") as HTMLInputElement).value,
    purchasePrice: Number((document.getElementById("purchasePrice") as HTMLInputElement).value),
    sellingPrice: Number((document.getElementById("sellingPrice") as HTMLInputElement).value),
    quantity: Number((document.getElementById("quantity") as HTMLInputElement).value),
    minQuantity: Number((document.getElementById("minQuantity") as HTMLInputElement).value),
    expiryDate: (document.getElementById("expiryDate") as HTMLInputElement).value,
    image: (document.getElementById("image") as HTMLInputElement).value,
    description: (document.getElementById("description") as HTMLTextAreaElement).value,
  };

  // Majburiy maydonlarni tekshirish
  if (!newProduct.name || !newProduct.category || !newProduct.manufacturer) {
    alert("Iltimos, barcha kerakli maydonlarni to‘ldiring!");
    return;
  }

  try {
    // Mahsulotni MockAPI ga saqlash
    await addProduct(newProduct);

    alert("Yangi mahsulot muvaffaqiyatli qo‘shildi!");

    // Formani tozalash
    productForm.reset();

    // Mahsulotlar sahifasiga qaytish
    window.location.href = "products.html";
  } catch (error) {
    console.error("Mahsulot qo‘shishda xatolik:", error);
    alert("Mahsulot qo‘shishda xatolik yuz berdi!");
  }
});