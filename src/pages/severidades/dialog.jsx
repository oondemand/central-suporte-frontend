import { Box } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { queryClient } from "../../config/react-query";
import { createDynamicFormFields } from "./formFields";
import { useUpdateSeveridade } from "../../hooks/api/severidade/useUpdateSeveridade";
import { useCreateSeveridade } from "../../hooks/api/severidade/useCreateSeveridade";
import { useLoadAssistant } from "../../hooks/api/assistant-config/useLoadAssistant";
import { useIaChat } from "../../hooks/useIaChat";
import { FormDialog } from "../../components/formDialog";
import {
  DefaultTrigger,
  IconTrigger,
} from "../../components/formDialog/form-trigger";
import { ORIGENS } from "../../constants/origens";

export const SeveridadesDialog = ({
  defaultValues = null,
  label = "Adicionar severidade",
}) => {
  const [data, setData] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const { onOpen } = useIaChat();
  const { assistant } = useLoadAssistant(["severidade"]);
  const fields = useMemo(() => createDynamicFormFields(), []);

  const updateSeveridade = useUpdateSeveridade({
    origem: ORIGENS.FORM,
    onSuccess: (data) => {
      if (open) setData((prev) => (data?.severidade ? data.severidade : prev));
    },
  });

  const createSeveridade = useCreateSeveridade({
    origem: ORIGENS.FORM,
    onSuccess: (data) => {
      if (open) setData((prev) => (data?.severidade ? data.severidade : prev));
    },
  });

  const onSubmit = async (values) => {
    const body = { ...values };

    if (!data) return await createSeveridade.mutateAsync({ body });
    return await updateSeveridade.mutateAsync({ body, id: data._id });
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
          queryClient.invalidateQueries(["listar-severidades"]);
          setOpen(false);
          setData(defaultValues);
        }}
        open={open}
        stateKey="severidades"
      />
    </Box>
  );
};
