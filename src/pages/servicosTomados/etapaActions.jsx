import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { SquarePlus } from "lucide-react";
import { TicketModal } from "./servicoTomadoTicketModal";
import { Tooltip } from "../../components/ui/tooltip";

export const EtapaActions = ({ etapa }) => {
  const [createModalOpen, setCreateModalOpen] = useState();

  if (etapa.codigo === "requisicao") {
    return (
      <Box>
        <Tooltip content="Criar ticket">
          <Text
            p="1"
            rounded="full"
            _hover={{ bg: "gray.200" }}
            onClick={() => setCreateModalOpen(true)}
            color="brand.500"
            cursor="pointer"
          >
            <SquarePlus size={20} />
          </Text>
        </Tooltip>
        {createModalOpen && (
          <TicketModal open={createModalOpen} setOpen={setCreateModalOpen} />
        )}
      </Box>
    );
  }
};
