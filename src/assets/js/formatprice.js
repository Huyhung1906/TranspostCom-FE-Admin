// src/assets/js/formatprice.js
export function formatCurrencyVND(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(value));
}
