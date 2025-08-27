import { DefaultField } from "../../components/buildForm/filds/default";
import { z } from "zod";
import { SelectListaField } from "../../components/buildForm/filds/selectListaField";
import { CurrencyField } from "../../components/buildForm/filds/currencyField";
import { currencyValidation, dateValidation } from "../../utils/zodHelpers";
import { DateField } from "../../components/buildForm/filds/dateField";
import { SelectPrestadorField } from "../../components/buildForm/filds/selectPrestadorField";
import { SelectMoedaField } from "../../components/buildForm/filds/selectMoedaField";
import { SwitchField } from "../../components/buildForm/filds/switchField";

export const createDynamicFormFields = () => {
  return [
    {
      group: [
        {
          accessorKey: "titulo",
          label: "Titulo",
          render: DefaultField,
          validation: z.string().nonempty("Campo obrigatório"),
          colSpan: 2,
        },
        {
          accessorKey: "impacto",
          label: "Impacto",
          render: DefaultField,
          validation: z.string().nonempty("Campo obrigatório"),
          colSpan: 2,
        },
        {
          accessorKey: "exemplo",
          label: "Exemplo",
          render: DefaultField,
          validation: z.string().nonempty("Campo obrigatório"),
          colSpan: 2,
        },
        {
          accessorKey: "tempo_horas_resposta",
          label: "Tempo resposta (horas)",
          render: DefaultField,
          validation: z.coerce.string().nonempty("Campo obrigatório"),
          colSpan: 1,
        },
        {
          accessorKey: "tempo_resolucao_resposta",
          label: "Tempo resolução (horas)",
          render: DefaultField,
          validation: z.coerce.string().nonempty("Campo obrigatório"),
          colSpan: 1,
        },
        {
          accessorKey: "apenas_dia_util",
          label: "Apenas dias úteis",
          render: SwitchField,
          validation: z.boolean().optional(),
          colSpan: 1,
        },
      ],
    },
  ];
};
