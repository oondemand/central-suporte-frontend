import { useMutation } from "@tanstack/react-query";
import { toaster } from "../../../components/ui/toaster";
import { SeveridadeService } from "../../../service/severidade";

export const useDeleteSeveridade = ({ onSuccess, origem }) =>
  useMutation({
    mutationFn: async ({ id }) =>
      await SeveridadeService.deletarSeveridade({ id, origem }),
    onSuccess(data) {
      onSuccess?.(data);
      toaster.create({
        title: "Severidade excluído com sucesso",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ouve um erro ao excluir severidade",
        description: error?.response?.data?.message,
        type: "error",
      });
    },
  });
