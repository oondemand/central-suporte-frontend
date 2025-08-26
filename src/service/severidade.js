import { api } from "../config/api";

const listarSeveridades = async ({ filters }) => {
  const { data } = await api.get("/severidades", { params: filters });
  return data;
};

// const listarSeveridadesPorPessoa = async ({ pessoaId }) => {
//   const { data } = await api.get(`/severidades/pessoa/${pessoaId}`);
//   return data;
// };

// const criarSeveridade = async ({ body, origem }) => {
//   const { data } = await api.post("/severidades", body, {
//     headers: { "x-origem": origem },
//   });
//   return data;
// };

const atualizarSeveridade = async ({ id, body, origem }) => {
  const { data } = await api.patch(`severidades/${id}`, body, {
    headers: { "x-origem": origem },
  });
  return data;
};

// const deletarSeveridade = async ({ id, origem }) => {
//   const { data } = await api.delete(`severidades/${id}`, {
//     headers: { "x-origem": origem },
//   });
//   return data;
// };

const importarSeveridades = async ({ files }) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("file", file);
  }

  const response = await api.post("severidades/importar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

const exportarSeveridades = async ({ filters }) => {
  const response = await api.get("/severidades/exportar", { params: filters });
  return response;
};

export const SeveridadeService = {
  listarSeveridades,
  // criarSeveridade,
  atualizarSeveridade,
  importarSeveridades,
  // deletarSeveridade,
  // listarSeveridadesPorPessoa,
  exportarSeveridades,
};
