import {
  Box,
  Flex,
  Heading,
  Textarea,
  Input,
  Text,
  GridItem,
  Grid,
} from "@chakra-ui/react";
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
import { ComentariosSession } from "../../../components/comentarios";

export const TicketModal = ({ open, setOpen, defaultValue }) => {
  const [ticket, setTicket] = useState(defaultValue);
  const { onOpen } = useIaChat();
  const { user } = useAuth();

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

  const { mutateAsync: handleAddComentario } = useMutation({
    mutationFn: async ({ files, mensagem }) =>
      await ServicoTomadoTicketService.comentario({
        files,
        mensagem,
        ticketId: ticket?._id,
      }),
    onSuccess: (data) => {
      toaster.create({
        title: "Comentário adicionado!",
        type: "success",
      });

      queryClient.invalidateQueries(["ticket", { ticketId: ticket?._id }]);
    },

    onError: () => {
      toaster.create({
        title: "Ouve um erro ao adicionar comentário!",
        type: "error",
      });
    },
  });

  const { mutateAsync: onRemoveComentario } = useMutation({
    mutationFn: async ({ id }) =>
      await ServicoTomadoTicketService.removerComentario({
        comentarioId: id,
        ticketId: ticket?._id,
      }),
    onSuccess: (data) => {
      toaster.create({
        title: "Comentário removido!",
        type: "success",
      });

      queryClient.invalidateQueries(["ticket", { ticketId: ticket?._id }]);
    },

    onError: () => {
      toaster.create({
        title: "Ouve um erro ao remover comentário!",
        type: "error",
      });
    },
  });

  const onSubmit = async (data) => {
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
    const usuarioResponsavel = ticket?.usuario_responsavel?._id === user?._id;
    const etapaRequisicao = ticket?.etapa === "requisicao";
    const userAdmin = user?.tipo === "admin";
    const usuarioPadrao = user?.tipo === "padrao";

    if (!defaultValue) return false;
    if (userAdmin) return false;
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
            onSubmit={onSubmit}
            onlyReading={onlyReading}
          />
          <Grid templateColumns="repeat(4, 1fr)" gap="4">
            <GridItem colSpan={1} mt="6">
              <Box w="100px">
                <Text color="gray.600" fontSize="sm">
                  Comentários
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3} mt="6">
              <Box
                w="full"
                h="1"
                borderBottom="2px solid"
                borderColor="gray.100"
              />
              <ComentariosSession
                comentarios={ticketQuery.data?.ticket?.comentarios}
                onAddComentario={async (values) => {
                  await handleAddComentario({
                    files: values.arquivos ?? [],
                    mensagem: values.message,
                  });
                }}
                onRemoveComentario={async (values) => {
                  await onRemoveComentario({
                    id: values.id,
                  });
                }}
                containerStyle={{ mt: "8" }}
              />
            </GridItem>
          </Grid>
          <FilesForm
            onlyReading={onlyReading}
            defaultValues={ticket?.arquivos}
            ticketId={ticket?._id}
          />
        </DialogBody>
        {defaultValue && user?.tipo !== "padrao" && (
          <DialogFooter justifyContent="start">
            <TicketActions
              onUpdateTicket={updateTicketMutation}
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
