"use server";

import api from './api';

async function getCoins(query:string) {
  const response = await api.get(`/coingecko/search?query=${query}`);
  return response.data;
}

export { getCoins };