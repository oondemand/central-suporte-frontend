import { IconButton } from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { queryClient } from "../../../config/react-query";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { Tooltip } from "../../ui/tooltip";
import { useDeleteSeveridade } from "../../../hooks/api/severidade/useDeleteSeveridade";
import { ORIGENS } from "../../../constants/origens";

export const DeleteSeveridadeAction = ({ id }) => {
  const { requestConfirmation } = useConfirmation();

  const deleteSeveridade = useDeleteSeveridade({
    onSuccess: () => queryClient.refetchQueries(["listar-severidades"]),
    origem: ORIGENS.DATAGRID,
  });

  const handleDeleteSeveridade = async () => {
    const { action } = await requestConfirmation({
      title: "Tem certeza que deseja excluir serviço?",
      description: "Essa operação não pode ser desfeita.",
    });

    if (action === "confirmed") {
      await deleteSeveridade.mutateAsync({ id });
    }
  };

  return (
    <Tooltip content="Excluir severidade" openDelay={700} closeDelay={50}>
      <IconButton
        variant="surface"
        colorPalette="red"
        size="2xs"
        onClick={handleDeleteSeveridade}
      >
        <Trash />
      </IconButton>
    </Tooltip>
  );
};
