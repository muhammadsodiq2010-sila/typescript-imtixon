// MockAPI manzili
const API_URL = "https://6aec20adee39618d7bf8f094.mockapi.io/Products";
// Barcha mahsulotlarni olish
export async function getAllProducts() {
    const response = await fetch(API_URL);
    if (!response.ok)
        throw new Error("Mahsulotlarni olishda xatolik");
    return response.json();
}
// Yangi mahsulot qo‘shish
export async function addProduct(product) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!response.ok)
        throw new Error("Mahsulot qo‘shilmadi");
    return response.json();
}
// Mahsulotni o‘chirish
export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok)
        throw new Error("Mahsulot o‘chirilmadi");
}
// Mahsulotni yangilash
export async function updateProduct(id, product) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!response.ok)
        throw new Error("Mahsulot yangilanmadi");
    return response.json();
}
