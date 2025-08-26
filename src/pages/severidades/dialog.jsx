import { Box } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { queryClient } from "../../config/react-query";
import { createDynamicFormFields } from "./formFields";
import { useUpdateServico } from "../../hooks/api/servico/useUpdateServico";
import { useCreateServico } from "../../hooks/api/servico/useCreateServico";
import { useLoadAssistant } from "../../hooks/api/assistant-config/useLoadAssistant";
import { useIaChat } from "../../hooks/useIaChat";
import { FormDialog } from "../../components/formDialog";
import {
  DefaultTrigger,
  IconTrigger,
} from "../../components/formDialog/form-trigger";
import { ORIGENS } from "../../constants/origens";

export const ServicosDialog = ({
  defaultValues = null,
  label = "Adicionar servico",
}) => {
  const [data, setData] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const { onOpen } = useIaChat();
  const { assistant } = useLoadAssistant(["servico"]);
  const fields = useMemo(() => createDynamicFormFields(), []);

  const updateServico = useUpdateServico({
    origem: ORIGENS.FORM,
    onSuccess: (data) => {
      if (open) setData((prev) => (data?.servico ? data.servico : prev));
    },
  });

  const createServico = useCreateServico({
    origem: ORIGENS.FORM,
    onSuccess: (data) => {
      if (open) setData((prev) => (data?.servico ? data.servico : prev));
    },
  });

  const onSubmit = async (values) => {
    const body = {
      ...values,
      pessoa: values?.pessoa?.value,
    };

    if (!data) return await createServico.mutateAsync({ body });
    return await updateServico.mutateAsync({ body, id: data._id });
  };

  useEffect(() => {
    setData(defaultValues);
  }, [defaultValues]);

  return (
    <Box>
      <Box onClick={() => setOpen(true)} asChild>
        {defaultValues ? <IconTrigger /> : <DefaultTrigger />}
      </Box>
      <FormDialog
        data={{ ...data, moeda: data?.moeda?._id }}
        fields={fields}
        label={label}
        onOpenAssistantDialog={() => onOpen(data, assistant)}
        onSubmit={onSubmit}
        onOpenChange={() => {
          queryClient.invalidateQueries(["listar-servicos"]);
          setOpen(false);
          setData(defaultValues);
        }}
        open={open}
        stateKey="servicos"
      />
    </Box>
  );
};
