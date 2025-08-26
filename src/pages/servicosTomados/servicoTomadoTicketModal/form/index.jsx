import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { BuildForm } from "../../../../components/buildForm";
import { useVisibleInputForm } from "../../../../hooks/useVisibleInputForms";
import { useMemo } from "react";
import { fields as makeFields } from "./fields";

import { VisibilityControlDialog } from "../../../../components/vibilityControlDialog";

export const TicketForm = ({ onlyReading, ticket }) => {
  const { inputsVisibility, setInputsVisibility } = useVisibleInputForm({
    key: "TICKET_MODAL_FORM",
  });

  const fields = useMemo(() => makeFields(), []);
  const onSubmitPessoa = (data) => {};

  // useEffect(() => {}, [ticket]);

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap="4">
        <GridItem colSpan={1} mt="6">
          <Box w="100px">
            <Text color="gray.600" fontSize="sm">
              Detalhes
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={3} mt="6">
          {/* {!onlyReading && (
            <Box
              mt="4"
              w="full"
              h="1"
              borderBottom="2px solid"
              borderColor="gray.100"
            />
          )} */}

          {/* <Text fontSize="sm" color="gray.500" mt="6">
            Detalhes
          </Text> */}

          <Flex alignItems="center" gap="4" mb="6">
            <Box
              w="full"
              h="1"
              borderBottom="2px solid"
              borderColor="gray.100"
            />
            <VisibilityControlDialog
              fields={fields}
              setVisibilityState={setInputsVisibility}
              visibilityState={inputsVisibility}
              title="Ocultar inputs"
            />
          </Flex>
          <BuildForm
            // disabled={!ticket || onlyReading}
            fields={fields}
            data={ticket}
            // shouldUseFormValues={true}
            visibleState={inputsVisibility}
            onSubmit={onSubmitPessoa}
            gridColumns={2}
            gap={4}
          />
        </GridItem>
      </Grid>
    </>
  );
};
