import type { Sale } from "../types/Sale.js";

// MockAPI sotuvlar manzili
const API_URL = "https://6aec20adee39618d7bf8f094.mockapi.io/sales";

// Barcha sotuvlarni olish
export async function getAllSales(): Promise<Sale[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Sotuvlarni olishda xatolik");
  }

  return response.json();
}

// Yangi sotuv qo‘shish
export async function addSale(
  sale: Omit<Sale, "id">
): Promise<Sale> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sale),
  });

  if (!response.ok) {
    throw new Error("Sotuv qo‘shilmadi");
  }

  return response.json();
}

// Sotuvni o‘chirish
export async function deleteSale(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Sotuv o‘chirilmadi");
  }
}

// Sotuvni yangilash
export async function updateSale(
  id: string,
  sale: Partial<Sale>
): Promise<Sale> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sale),
  });

  if (!response.ok) {
    throw new Error("Sotuv yangilanmadi");
  }

  return response.json();
}