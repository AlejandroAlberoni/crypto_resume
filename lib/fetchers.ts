"use server";

import api from './api';

async function getCoins(query:string) {
  const response = await api.get(`/coingecko/search?query=${query}`);
  return response.data;
}

async function getCoinDataById(coinId: string) {
  try {
    const response = await api.get(`/coingecko/coindatabyid?id=${coinId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch coin data:', error);
    return null;
  }
}

async function getCoinMarketDataById(id:string = 'bitcoin ', vs_currency: string= 'usd', days: number = 1) {
  const response = await api.get(`/coingecko/coinmarketchart?id=${id}&vs_currency=${vs_currency}&days=${days}`);
  return response.data;
  
}

export { getCoins, getCoinDataById, getCoinMarketDataById };