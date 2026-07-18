import api from "./api";

export async function checkout() {
  const res = await api.post("/payment/checkout");
  return res.data;
}

export async function getBilling() {
  const res = await api.get("/payment/billing");
  return res.data;
}

export async function cancelSubscription() {
  const res = await api.post("/payment/cancel");
  return res.data;
}