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

import { useMutation } from "@tanstack/react-query";
import { ServicoTomadoTicketService } from "../../../service/servicoTomadoTicket";

import { toaster } from "../../../components/ui/toaster";

import { TicketActions } from "./ticketActions";
import { FilesForm } from "./form/files";
import { useIaChat } from "../../../hooks/useIaChat";
import { useQuery } from "@tanstack/react-query";
import { ORIGENS } from "../../../constants/origens";
import { useLoadAssistant } from "../../../hooks/api/assistant-config/useLoadAssistant";
import { TicketForm } from "./form";
import { useAuth } from "../../../hooks/useAuth";

export const TicketModal = ({ open, setOpen, defaultValue }) => {
  const [ticket, setTicket] = useState(defaultValue);
  const { onOpen } = useIaChat();
  const { user } = useAuth;

  const { mutateAsync: createTicketMutation } = useMutation({
    mutationFn: async ({ body }) =>
      await ServicoTomadoTicketService.adicionarTicket({
        body,
        origem: ORIGENS.ESTEIRA,
      }),
    onSuccess: (data) => {
      toaster.create({
        title: "Ticket criado com sucesso!",
        type: "success",
      });

      setTicket(data?.ticket);
    },
  });

  const { mutateAsync: updateTicketMutation } = useMutation({
    mutationFn: async ({ id, body }) =>
      await ServicoTomadoTicketService.alterarTicket({
        id,
        body,
        origem: ORIGENS.ESTEIRA,
      }),
    onSuccess: (data) => {
      toaster.create({
        title: "Ticket atualizado com sucesso!",
        type: "success",
      });

      setTicket(data?.ticket);
    },
  });

  const onInputTicketFieldBlur = async (data) => {
    if (!ticket) {
      return await createTicketMutation({
        body: data,
      });
    }

    return await updateTicketMutation({
      id: ticket._id,
      body: data,
    });
  };

  const ticketQuery = useQuery({
    queryKey: ["ticket", { ticketId: ticket?._id }],
    queryFn: async () =>
      await ServicoTomadoTicketService.carregarTicket(ticket?._id),
    staleTime: 1000 * 60 * 1, // 1 minute
    enabled: open && !!defaultValue,
  });

  const { assistant } = useLoadAssistant([
    `suporte.${ticket?.etapa}`,
    "suporte.geral",
  ]);

  const verifiyOnlyReading = () => {
    const usuarioResponsavel = Boolean(
      ticket?.usuario_responsavel &&
        user?._id &&
        ticket.usuario_responsavel === user._id
    );

    const etapaRequisicao = ticket?.etapa === "requisicao";
    const usuarioPadrao = !["amin", "agente"].includes(user?.tipo);

    if (!defaultValue) return false;
    if (usuarioResponsavel) return false;
    if (usuarioPadrao && etapaRequisicao) return false;

    return true;
  };

  const onlyReading = verifiyOnlyReading();

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
          <TicketForm
            ticket={ticket}
            onSubmit={onInputTicketFieldBlur}
            onlyReading={onlyReading}
          />
          <FilesForm
            onlyReading={onlyReading}
            defaultValues={ticket?.arquivos}
            ticketId={ticket?._id}
          />
        </DialogBody>
        {defaultValue && ["amin", "agente"].includes(user?.tipo) && (
          <DialogFooter justifyContent="start">
            <TicketActions
              updateTicketMutation={updateTicketMutation}
              ticket={ticket}
              etapa={ticket?.etapa}
            />
          </DialogFooter>
        )}
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
