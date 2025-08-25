import { apiAssistant } from "../config/api";

const listAssistant = async () => {
  const response = await apiAssistant.get("/assistentes/ativos");
  return response.data;
};

const askQuestion = ({ body }) => {
  const formData = new FormData();

  for (const key in body) {
    formData.append(key, JSON.stringify(body[key]));
  }

  return apiAssistant.post(`/gpt`, body);
};

const getAssistant = async ({ id }) => {
  const { data } = await apiAssistant.get(
    `/cst/assistentes/prompts?assistente=${id}`
  );
  return data;
};

export const AssistantService = {
  listAssistant,
  getAssistant,
  askQuestion,
};
