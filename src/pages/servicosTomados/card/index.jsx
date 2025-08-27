import { Box, Text, Flex } from "@chakra-ui/react";
import { memo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { Paperclip } from "lucide-react";
import { Tooltip } from "../../../components/ui/tooltip";
import { AnexosCard } from "./arquivosCard";
import { TicketModal } from "../servicoTomadoTicketModal";
import { format } from "date-fns";

const _TicketCard = ({ ticket }) => {
  const [open, setOpen] = useState(false);

  const prioridadeColorMap = {
    baixa: "gray.200",
    media: "yellow.400",
    alta: "red.500",
  };

  return (
    <Box>
      <Box cursor="pointer" p={2} my={2} color="brand.900" h="50px">
        <Flex
          onClick={() => setOpen(true)}
          alignItems="center"
          gap="2"
          fontWeight="bold"
          fontSize="md"
          py="1"
          rounded="lg"
          bg="white"
          p="2"
          boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.05)"
          _hover={{ background: "gray.50" }}
        >
          <Flex w="full" flexDir="column" gap="2">
            <Flex w="full" alignItems="baseline" gap="2">
              <Box
                rounded="full"
                minH="12px"
                minW="12px"
                bg={prioridadeColorMap[ticket?.prioridade] || "blue.500"}
              />
              <Tooltip
                showArrow
                content={ticket?.assunto}
                positioning={{ placement: "top" }}
                openDelay={700}
                closeDelay={50}
              >
                <Box w="90%">
                  <Text
                    truncate
                    fontWeight={500}
                    fontSize="xs"
                    color="gray.700"
                  >
                    {ticket?.assunto}
                  </Text>
                  <Text
                    truncate
                    fontWeight={400}
                    fontSize="2xs"
                    color="gray.400"
                  >
                    {format(ticket?.createdAt, "MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </Text>
                </Box>
              </Tooltip>
            </Flex>

            <Flex
              w="full"
              alignItems="center"
              justifyContent="space-between"
              gap="2"
            >
              <Flex alignItems="center" gap="2">
                <Tooltip
                  showArrow
                  content={<AnexosCard anexos={ticket?.arquivos} />}
                  positioning={{ placement: "bottom" }}
                  openDelay={500}
                  closeDelay={50}
                >
                  <Flex color="gray.400" alignItems="center" gap="1px">
                    <Paperclip size={14} />
                    <Text
                      h="15px"
                      textAlign="center"
                      fontWeight={400}
                      fontSize="xs"
                    >
                      {ticket?.arquivos?.length ?? 0}
                    </Text>
                  </Flex>
                </Tooltip>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {open && (
        <TicketModal
          defaultValue={ticket}
          open={open}
          setOpen={setOpen}
          // onlyReading={[
          //   "conta-pagar-central-omie",
          //   "conta-pagar-omie-central",
          //   "concluido",
          // ].includes(ticket?.etapa)}
        />
      )}
    </Box>
  );
};

export const TicketCard = memo(_TicketCard);
