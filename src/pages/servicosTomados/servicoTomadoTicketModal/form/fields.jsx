import { z } from "zod";
import { DefaultField } from "../../../../components/buildForm/filds/default";
import { SelectField } from "../../../../components/buildForm/filds/selectField";
import { TextareaField } from "../../../../components/buildForm/filds/textarea";
import { SelectListaField } from "../../../../components/buildForm/filds/selectListaField";

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
