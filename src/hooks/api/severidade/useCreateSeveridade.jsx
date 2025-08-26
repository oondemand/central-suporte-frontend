import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../../components/ui/toaster";
import { SeveridadeService } from "../../../service/severidade";

export const useCreateSeveridade = ({ onSuccess, origem }) =>
  useMutation({
    mutationFn: async ({ body }) =>
      await SeveridadeService.criarSeveridade({ body, origem }),
    onSuccess(data) {
      onSuccess?.(data);
      toaster.create({
        title: "Severidade criado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao criar severidade",
        description: error?.response?.data?.message,
        type: "error",
      });
    },
  });
