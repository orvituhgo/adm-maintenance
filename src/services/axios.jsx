import axios from 'axios';

export const api = axios.create({
  BASE_URL: import.meta.env.API_URL,
});

// // Envia uma requisição post
// export const axiosPost = () => {
//   axios({
//     method: 'post',
//     url: BASE_URL,
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone',
//     },
//   });
// };

// // Requisição GET para imagem remota em node.js
// export const axiosGet = () => {
//   axios({
//     method: 'get',
//     url: BASE_URL,
//     responseType: 'stream',
//   }).then((response) => {
//     const data = response.json;
//     return data;
//   });
// };
