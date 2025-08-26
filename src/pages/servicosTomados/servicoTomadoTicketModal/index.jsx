import { Box, Flex, Heading, Textarea, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogRoot,
  DialogTitle,
} from "../../../components/ui/dialog";
import { queryClient } from "../../../config/react-query";

import { Oondemand } from "../../../components/svg/oondemand";
// import { PessoaForm } from "./form/pessoa";

import { useMutation } from "@tanstack/react-query";
// import { ServicoTomadoTicketService } from "../../../../service/servicoTomadoTicket";

// import { toaster } from "../../../components/ui/toaster";

// import { TicketStatus } from "./ticketStatus";
import { TicketActions } from "./ticketActions";
import { FilesForm } from "./form/files";
// import { ServicoForm } from "./form/servico";
// import { InformacoesAdicionaisForm } from "./form/informacoes-adicionais";
// import { DocumentoFiscalForm } from "./form/documentoFiscal";
import { useIaChat } from "../../../hooks/useIaChat";
import { useQuery } from "@tanstack/react-query";
// import { DocumentosCadastraisService } from "../../../../service/documentos-cadastrais";
import { ORIGENS } from "../../../constants/origens";
import { useLoadAssistant } from "../../../hooks/api/assistant-config/useLoadAssistant";
import { TicketForm } from "./form";
// import { Tooltip } from "../../../../components/ui/tooltip";
// import { Link } from "react-router-dom";
// import { InvertedChart } from "../../../../components/svg/invertedChart";

export const TicketModal = ({ open, setOpen, defaultValue, onlyReading }) => {
  const [ticket, setTicket] = useState(defaultValue);
  const { onOpen } = useIaChat();

  // const { mutateAsync: createTicketMutation } = useMutation({
  //   mutationFn: async ({ body }) =>
  //     await ServicoTomadoTicketService.adicionarTicket({
  //       body,
  //       origem: ORIGENS.ESTEIRA,
  //     }),
  //   onSuccess: (data) => {
  //     toaster.create({
  //       title: "Ticket criado com sucesso!",
  //       type: "success",
  //     });

  //     setTicket(data?.ticket);
  //   },
  // });

  // const { mutateAsync: updateTicketMutation } = useMutation({
  //   mutationFn: async ({ id, body }) =>
  //     await ServicoTomadoTicketService.alterarTicket({
  //       id,
  //       body,
  //       origem: ORIGENS.ESTEIRA,
  //     }),
  //   onSuccess: (data) => {
  //     toaster.create({
  //       title: "Ticket atualizado com sucesso!",
  //       type: "success",
  //     });

  //     setTicket(data?.ticket);
  //   },
  // });

  // const onInputTicketFieldBlur = async ({ target: { name, value } }) => {
  //   if (value !== "" && !ticket) {
  //     return await createTicketMutation({
  //       body: {
  //         [name]: value,
  //       },
  //     });
  //   }

  //   if (value !== "" && value !== ticket?.[name]) {
  //     return await updateTicketMutation({
  //       id: ticket._id,
  //       body: {
  //         [name]: value,
  //       },
  //     });
  //   }
  // };

  // const ticketQuery = useQuery({
  //   queryKey: ["ticket", { ticketId: ticket?._id }],
  //   queryFn: async () =>
  //     await ServicoTomadoTicketService.carregarTicket(ticket?._id),
  //   staleTime: 1000 * 60 * 1, // 1 minute
  //   enabled: open && !!defaultValue,
  // });

  // const documentosCadastraisQuery = useQuery({
  //   queryKey: ["documentos-cadastrais", { pessoaId: ticket?.pessoa?._id }],
  //   queryFn: async () =>
  //     await DocumentosCadastraisService.listarPorPessoa({
  //       pessoaId: ticket?.pessoa?._id,
  //       dataRegistro: "",
  //     }),
  //   staleTime: 1000 * 60 * 1, // 1 minute
  //   enabled: open && !!defaultValue,
  // });

  const { assistant } = useLoadAssistant([
    `suporte.${ticket?.etapa}`,
    "suporte.geral",
  ]);

  return (
    <DialogRoot
      size="cover"
      open={open}
      onOpenChange={({ open }) => {
        queryClient.invalidateQueries(["listar-tickets"]);
        setOpen(open);
      }}
    >
      <DialogContent
        overflow="hidden"
        w="1000px"
        h="95%"
        pt="6"
        px="2"
        rounded="lg"
      >
        <DialogTitle
          asChild
          borderBottom="1px solid"
          w="full"
          borderColor="gray.200"
        >
          <Flex gap="4" alignItems="center" mt="-4" py="2" px="4">
            <Box
              aria-label="Abrir IA"
              cursor="pointer"
              variant="unstyled"
              onClick={() => onOpen(ticketQuery?.data?.ticket, assistant)}
            >
              <Oondemand />
            </Box>

            <Flex alignItems="baseline" gap="2">
              <Heading fontSize="sm">
                {defaultValue ? "Detalhes do ticket" : "Criar novo ticket"}
              </Heading>
              {defaultValue && (
                <Text fontSize="xs" fontStyle="italic" fontWeight="normal">
                  {defaultValue?._id}
                </Text>
              )}
            </Flex>
          </Flex>
        </DialogTitle>
        <DialogBody
          pb="8"
          fontSize="md"
          fontWeight="600"
          color="gray.600"
          overflowY="auto"
          className="dialog-custom-scrollbar"
        >
          <TicketForm ticket={ticket} onlyReading={false}  />
          <FilesForm
            onlyReading={onlyReading}
            defaultValues={ticket?.arquivos}
            ticketId={ticket?._id}
          />
        </DialogBody>
        {/* {defaultValue && (
          <DialogFooter justifyContent="start">
            <TicketActions
              updateTicketMutation={updateTicketMutation}
              ticket={ticket}
              etapa={ticket?.etapa}
            />
          </DialogFooter>
        )} */}
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
