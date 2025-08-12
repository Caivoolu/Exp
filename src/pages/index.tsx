// src/pages/index.tsx
import type { NextPage } from 'next';

/**
 * Halaman ini sengaja tidak merender elemen apa pun (mengembalikan null).
 * Alasannya adalah karena layout utama dan konten halaman (seperti 'Home')
 * sudah diatur oleh komponen <Sidebar /> yang dipanggil dari _app.tsx.
 *
 * Dengan begitu, kita menghindari konflik rendering ganda dan membiarkan
 * Sidebar menjadi satu-satunya sumber konten di halaman utama.
 */
const IndexPage: NextPage = () => {
  return null;
};

export default IndexPage;
