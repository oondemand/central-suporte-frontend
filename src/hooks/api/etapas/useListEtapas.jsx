import { useQuery } from "@tanstack/react-query";
import { EtapaService } from "../../../service/etapa";

export const useListEtapas = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["listar-etapas"],
    queryFn: () =>
      EtapaService.listarEtapasAtivasPorEsteira({ esteira: "suporte" }),
    staleTime: 1000 * 60 * 10,
  });

  return { etapas: data?.etapas, isLoading, error };
};
