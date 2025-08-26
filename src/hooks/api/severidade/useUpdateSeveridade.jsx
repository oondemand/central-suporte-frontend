import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../../components/ui/toaster";
import { SeveridadeService } from "../../../service/severidade";

export const useUpdateSeveridade = ({ onSuccess, origem }) =>
  useMutation({
    mutationFn: async ({ body, id }) =>
      await SeveridadeService.atualizarSeveridade({
        body,
        id,
        origem,
      }),
    onSuccess(data) {
      onSuccess?.(data);
      toaster.create({
        title: "Severidade atualizado com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      console.log(error);
      toaster.create({
        title: "Ouve um erro ao atualizar o severidade",
        description: error?.response?.data?.message,
        type: "error",
      });
    },
  });
