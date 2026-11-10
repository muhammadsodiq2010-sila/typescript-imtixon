// Mahsulot qo‘shish metodini import qilish
import { addProduct } from "./services/productService.js";
// Forma elementini olish
const productForm = document.getElementById("productForm");
// Forma yuborilganda mahsulot qo‘shish
productForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Forma ma'lumotlarini olish
    const newProduct = {
        name: document.getElementById("productName").value,
        category: document.getElementById("productCategory").value,
        manufacturer: document.getElementById("manufacturer").value,
        purchasePrice: Number(document.getElementById("purchasePrice").value),
        sellingPrice: Number(document.getElementById("sellingPrice").value),
        quantity: Number(document.getElementById("quantity").value),
        minQuantity: Number(document.getElementById("minQuantity").value),
        expiryDate: document.getElementById("expiryDate").value,
        image: document.getElementById("image").value,
        description: document.getElementById("description").value,
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
    }
    catch (error) {
        console.error("Mahsulot qo‘shishda xatolik:", error);
        alert("Mahsulot qo‘shishda xatolik yuz berdi!");
    }
});
