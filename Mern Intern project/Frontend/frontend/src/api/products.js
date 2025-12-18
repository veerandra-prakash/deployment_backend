import { request, withAuth } from "./client";

export const fetchProducts = (token) =>
  request("/products", {
    headers: token ? withAuth(token) : {},

  });

