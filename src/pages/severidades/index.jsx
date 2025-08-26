import React, { useMemo } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { SeveridadeService } from "../../service/severidade";
import { DataGrid } from "../../components/dataGrid";
import { makeDynamicColumns } from "./columns";
// import { queryClient } from "../../config/react-query";
// import { SeveridadesDialog } from "./dialog";
import { useNavigate } from "react-router-dom";
import { useDataGrid } from "../../hooks/useDataGrid";
// import { useUpdateServico } from "../../hooks/api/servico/useUpdateServico";
// import { ORIGENS } from "../../constants/origens";

export const Severidades = () => {
  const navigate = useNavigate();
  const columns = useMemo(() => makeDynamicColumns(), []);
  const { filters, table } = useDataGrid({ columns, key: "SEVERIDADES" });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["listar-severidades", { filters }],
    queryFn: async () => await SeveridadeService.listarSeveridades({ filters }),
    placeholderData: keepPreviousData,
  });

  // const updateServico = useUpdateServico({
  //   origem: ORIGENS.DATAGRID,
  //   onSuccess: () => {
  //     queryClient.refetchQueries(["listar-severidades", { filters }]);
  //   },
  // });

  // const getAllSeveridadesWithFilters = async (pageSize) => {
  //   const response = await SeveridadeService.exportarSeveridades({
  //     filters: {
  //       ...filters,
  //       pageSize: pageSize ? pageSize : data?.pagination?.totalItems,
  //       pageIndex: 0,
  //     },
  //   });

  //   return response.data.buffer;
  // };

  return (
    <>
      <Flex>
        <Box>
          <Text fontSize="lg" color="gray.700" fontWeight="semibold">
            Severidades
          </Text>
          <Box mt="4" bg="white" py="6" px="4" rounded="lg" shadow="xs">
            <DataGrid
              // form={SeveridadesDialog}
              // exportDataFn={getAllSeveridadesWithFilters}
              // importDataFn={() => navigate("/severidades/importacao")}
              table={table}
              data={data?.results || []}
              rowCount={data?.pagination?.totalItems}
              isDataLoading={isLoading || isFetching}
              // onUpdateData={async (values) => {
              //   await updateServico.mutateAsync({
              //     id: values.id,
              //     body: values.data,
              //   });
              // }}
            />
          </Box>
        </Box>
      </Flex>
    </>
  );
};
