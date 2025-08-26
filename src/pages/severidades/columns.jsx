import { DefaultEditableCell } from "../../components/dataGrid/cells/defaultEditable";
import { SelectListaCell } from "../../components/dataGrid/cells/selectLista";
import { TableActionsCell } from "../../components/dataGrid/cells/tableActionsCell";
import { CurrencyCell } from "../../components/dataGrid/cells/currencyCell";
import { DateCell } from "../../components/dataGrid/cells/dateCell";
import { DeleteSeveridadeAction } from "../../components/dataGrid/actions/deleteSeveridadeButton";
import { formatDateToDDMMYYYY } from "../../utils/formatting";
import { SelectPrestadorCell } from "../../components/dataGrid/cells/selectPrestador";
import { SelectAutoCompleteCell } from "../../components/dataGrid/cells/selectAutoComplete";
import { SelectMoedaCell } from "../../components/dataGrid/cells/selectMoeda";
import { SwitchCell } from "../../components/dataGrid/cells/switchCelll";
import { SeveridadesDialog } from "./dialog";

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
    {
      accessorKey: "acoes",
      header: "Ações",
      cell: (props) => (
        <TableActionsCell>
          <DeleteSeveridadeAction id={props.row.original?._id} />
          <SeveridadesDialog
            label="Severidade"
            defaultValues={props.row.original}
          />
        </TableActionsCell>
      ),
    },
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
