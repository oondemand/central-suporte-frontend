import { z } from "zod";
import { DefaultField } from "../../../../components/buildForm/filds/default";
import { SelectField } from "../../../../components/buildForm/filds/selectField";
import { TextareaField } from "../../../../components/buildForm/filds/textarea";
import { SelectListaField } from "../../../../components/buildForm/filds/selectListaField";
import { SelectAplicativoField } from "../../../../components/buildForm/filds/selectAplicativoField";
import { SelectSeveridadeField } from "../../../../components/buildForm/filds/selectSeveridade";

export const fields = () => {
  return [
    {
      accessorKey: "assunto",
      label: "Assunto",
      render: DefaultField,
      validation: z.string(),
      colSpan: 2,
    },
    {
      accessorKey: "aplicativo",
      label: "Aplicativo",
      render: SelectAplicativoField,
      validation: z.any(),
      colSpan: 1,
    },
    {
      accessorKey: "severidade",
      label: "Severidade",
      render: SelectSeveridadeField,
      validation: z.any(),
      colSpan: 1,
    },
    {
      accessorKey: "prioridade",
      label: "Prioridade",
      render: SelectField,
      options: [
        { label: "Baixa", value: "baixa" },
        { label: "Média", value: "media" },
        { label: "Alta", value: "alta" },
      ],
      validation: z.string("Campo obrigatório"),
      colSpan: 1,
    },
    {
      accessorKey: "categoria",
      label: "Categoria",
      render: SelectListaField,
      cod: "categoria",
      validation: z.string("Campo obrigatório"),
      colSpan: 1,
    },
    {
      accessorKey: "detalhamento",
      label: "Detalhamento",
      render: (props) => (
        <TextareaField
          h="36"
          mt="1.5"
          variant="outline"
          fontWeight="medium"
          {...props}
        />
      ),
      validation: z.string(),
      colSpan: 2,
    },
  ];
};
