import { DefaultEditableCell } from "../../components/dataGrid/cells/defaultEditable";
import { SelectListaCell } from "../../components/dataGrid/cells/selectLista";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { CurrencyCell } from "../../components/dataGrid/cells/currencyCell";
import { DateCell } from "../../components/dataGrid/cells/dateCell";
import { ServicosDialog } from "./dialog";
import { DeleteServicoAction } from "../../components/dataGrid/actions/deleteServicoButton";
import { formatDateToDDMMYYYY } from "../../utils/formatting";
import { SelectPrestadorCell } from "../../components/dataGrid/cells/selectPrestador";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";
import { SelectMoedaCell } from "../../components/dataGrid/cells/selectMoeda";
import { SwitchCell } from "../../components/dataGrid/cells/switchCelll";

export const makeDynamicColumns = () => {
  const statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "inativo", label: "Inativo" },
  ];

  // const statusProcessamentoOptions = [
  //   { label: "Aberto", value: "aberto" },
  //   { label: "Pendente", value: "pendente" },
  //   { label: "Processando", value: "processando" },
  //   { label: "Pago", value: "pago" },
  //   { label: "Pago externo", value: "pago-externo" },
  // ];

  return [
    // {
    //   accessorKey: "acoes",
    //   header: "Ações",
    //   cell: (props) => (
    //     <TableActionsCell>
    //       <DeleteServicoAction id={props.row.original?._id} />
    //       <ServicosDialog
    //         label="Serviço"
    //         defaultValues={{
    //           ...props.row.original,
    //           dataContratacao: formatDateToDDMMYYYY(
    //             props.row.original?.dataContratacao
    //           ),
    //           dataConclusao: formatDateToDDMMYYYY(
    //             props.row.original?.dataConclusao
    //           ),
    //           pessoa: {
    //             label: `${props.row.original?.pessoa?.nome}-${props.row.original?.pessoa?.documento}`,
    //             value: props.row.original?.pessoa?._id,
    //           },
    //         }}
    //       />
    //     </TableActionsCell>
    //   ),
    // },
    {
      accessorKey: "titulo",
      header: "Titulo",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "titulo" },
    },
    {
      accessorKey: "impacto",
      header: "Impacto",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "impacto" },
    },
    {
      accessorKey: "exemplo",
      header: "Exemplo",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "exemplo" },
    },
    {
      accessorKey: "tempo_horas_resposta",
      header: "Tempo resposta (horas)",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "tempo_horas_resposta" },
    },
    {
      accessorKey: "tempo_resolucao_resposta",
      header: "Tempo resolução (horas)",
      cell: DefaultEditableCell,
      enableColumnFilter: true,
      meta: { filterKey: "tempo_resolucao_resposta" },
    },
    {
      accessorKey: "apenas_dia_util",
      header: "Apenas dias úteis",
      cell: SwitchCell,
      enableColumnFilter: false,
    },
  ];
};
