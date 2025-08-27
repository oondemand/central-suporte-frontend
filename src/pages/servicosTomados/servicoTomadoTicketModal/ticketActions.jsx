import { Flex, Button, useDialogContext, Text } from "@chakra-ui/react";
import { Check, Trash, X } from "lucide-react";

import { toaster } from "../../../components/ui/toaster";
import { ServicoTomadoTicketService } from "../../../service/servicoTomadoTicket";
import { useMutation } from "@tanstack/react-query";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { queryClient } from "../../../config/react-query";
import { ORIGENS } from "../../../constants/origens";
import { useListEtapas } from "../../../hooks/api/etapas/useListEtapas";
import { Link } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";

export const TicketActions = ({ ticket, etapa, onUpdateTicket }) => {
  const { setOpen } = useDialogContext();
  const { requestConfirmation } = useConfirmation();
  const { user } = useAuth();

  const { etapas } = useListEtapas();

  const { mutateAsync: arquiveTicketMutation, isPending: isArquivePending } =
    useMutation({
      mutationFn: async () =>
        await ServicoTomadoTicketService.arquivarTicket({
          id: ticket?._id,
          origem: ORIGENS.ESTEIRA,
        }),
      onSuccess: () => {
        toaster.create({
          title: "Ticket arquivado com sucesso!",
          type: "success",
        });
      },
      onError: (error) => {
        toaster.error({
          title: "Ouve um erro ao arquivar o ticket!",
          description: error?.response?.data?.message,
        });
      },
    });

  const { mutateAsync: aproveTicketMutation, isPending: isAprovePending } =
    useMutation({
      mutationFn: async () =>
        await ServicoTomadoTicketService.aprovarTicket({
          id: ticket?._id,
          origem: ORIGENS.ESTEIRA,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(["listar-tickets"]);
        toaster.create({
          title: "Ticket aprovado com sucesso!",
          type: "success",
        });
      },
      onError: (error) => {
        toaster.error({
          title: "Ouve um erro ao aprovar o ticket!",
          description: error?.response?.data?.message,
        });
      },
    });

  const { mutateAsync: reproveTicketMutation, isPending: isReprovePending } =
    useMutation({
      mutationFn: async () =>
        await ServicoTomadoTicketService.reprovarTicket({
          id: ticket?._id,
          origem: ORIGENS.ESTEIRA,
        }),
      onSuccess: (error) => {
        queryClient.invalidateQueries(["listar-tickets"]);
        toaster.create({
          description: error?.response?.data?.message,
          title: "Ticket reprovado com sucesso!",
          type: "success",
        });
      },
      onError: () => {
        toaster.error({ title: "Ouve um erro ao reprovar o ticket!" });
      },
    });

  const handleArquiveTicket = async () => {
    const { action } = await requestConfirmation({
      title: "Tem que deseja arquivar ticket?",
      description: "Todo o seu progresso será perdido!",
    });

    if (action === "confirmed") {
      await arquiveTicketMutation();
      setOpen(false);
    }
  };

  const primeiraEtapa = etapas[0]?.codigo;
  const usuarioResponsavel =
    ticket?.usuario_responsavel &&
    ticket?.usuario_responsavel?._id === user?._id;

  const userAdmin = user?.tipo === "admin";

  const aoAtribuirUsuario = async () => {
    return await onUpdateTicket({
      id: ticket._id,
      body: { usuario_responsavel: user },
    });
  };

  return (
    <Flex alignItems="center" w="full" justifyContent="space-between">
      <Flex gap="2">
        {!["concluido"].includes(etapa) &&
          (usuarioResponsavel || userAdmin) && (
            <>
              <Button
                onClick={async (e) => {
                  await aproveTicketMutation();
                  setOpen(false);
                }}
                disabled={isAprovePending}
                variant="surface"
                shadow="xs"
                colorPalette="green"
                size="xs"
              >
                <Check /> Aprovar
              </Button>

              <Button
                disabled={etapa === primeiraEtapa || isReprovePending}
                onClick={async (e) => {
                  await reproveTicketMutation();
                  setOpen(false);
                }}
                colorPalette="red"
                variant="surface"
                shadow="xs"
                size="xs"
              >
                <X /> Reprovar
              </Button>
            </>
          )}

        {(usuarioResponsavel || userAdmin) && (
          <Button
            disabled={isArquivePending}
            onClick={async (e) => {
              await handleArquiveTicket();
              setOpen(false);
            }}
            variant="surface"
            shadow="xs"
            size="xs"
          >
            <Trash /> Arquivar
          </Button>
        )}

        {!ticket?.usuario_responsavel && (
          <Link viewTransition>
            <Button
              onClick={aoAtribuirUsuario}
              size="xs"
              variant="ghost"
              color="brand.500"
              display="flex"
            >
              <Text>Atribuir a mim</Text>
            </Button>
          </Link>
        )}
      </Flex>

      <Button
        onClick={(e) => {
          setOpen(false);
        }}
        variant="surface"
        shadow="xs"
        size="xs"
      >
        Fechar
      </Button>
    </Flex>
  );
};
