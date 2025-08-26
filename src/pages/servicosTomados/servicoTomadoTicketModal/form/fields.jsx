import { z } from "zod";
import { DefaultField } from "../../../../components/buildForm/filds/default";
import { SelectField } from "../../../../components/buildForm/filds/selectField";

export const fields = () => {
  // aplicativo: { type: String, required: true },
  // usuario_solicitante: { type: String, required: true },
  // prioridade: {
  //   type: String,
  //   enum: ["baixa", "media", "alta"],
  //   default: "baixa",
  // },
  // categoria: { type: String, required: true },
  // assunto: { type: String, required: true },
  // detalhamento: { type: String, required: true },
  // etapa: { type: String, required: true },
  // arquivos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" }],
  // severidade: { type: mongoose.Schema.Types.ObjectId, ref: "Severidade" },
  // primeira_resposta_em: Date,
  // ultima_interacao_em: Date,
  // resolvido_em: Date,
  // fechado_em: Date,

  return [
    {
      accessorKey: "assunto",
      label: "Assunto",
      render: DefaultField,
      validation: z.string(),
      colSpan: 2,
    },
    {
      accessorKey: "detalhamento",
      label: "Detalhamento",
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
      validation: z.string(),
      colSpan: 1,
    },
  ];
};
