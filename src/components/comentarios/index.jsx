import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Paperclip, CircleX, Trash } from "lucide-react";
import { ServicoTomadoTicketService } from "../../service/servicoTomadoTicket";
import { FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
  message: z
    .string({ required_error: "Campo obrigatório" })
    .nonempty("Campo obrigatório"),
  arquivos: z.any().optional(),
});

export const ComentariosSession = ({
  comentarios,
  containerStyle,
  onAddComentario,
  onRemoveComentario,
}) => {
  const { user } = useAuth();

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = methods;

  const handleDownloadFile = async ({ id }) => {
    try {
      const { data } = await ServicoTomadoTicketService.getFile({ id });

      if (data) {
        const byteArray = new Uint8Array(data?.arquivo?.buffer?.data);
        const blob = new Blob([byteArray], { type: data?.arquivo?.mimetype });
        saveAs(blob, data?.arquivo?.nomeOriginal);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const arquivos = watch("arquivos") || [];

  const handleRemoveArquivo = (index) => {
    const novos = arquivos.filter((_, i) => i !== index);
    setValue("arquivos", novos, { shouldValidate: true });
  };

  return (
    <Box>
      <Box
        p="4"
        rounded="md"
        border="1px dashed"
        borderColor="gray.200"
        className="dialog-custom-scrollbar"
        position="relative"
        {...containerStyle}
      >
        <Box spaceY="3">
          {comentarios?.map((comentario) => (
            <Box key={comentario?._id} bg="gray.50" rounded="lg" p="2.5">
              <Flex alignItems="center" justifyContent="space-between">
                <Flex gap="2">
                  <Box h="4" w="4" bg="blue.200" rounded="full" />
                  <Flex alignItems="baseline" gap="2">
                    <Text fontWeight="medium" fontSize="sm">
                      {comentario.usuario.nome}
                    </Text>
                    <Text fontWeight="normal" fontSize="xs">
                      {formatDistanceToNow(new Date(comentario.updatedAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </Text>
                  </Flex>
                </Flex>
                {(comentario.usuario?._id === user?._id ||
                  user?.tipo === "amin") && (
                  <Button
                    onClick={() => onRemoveComentario({ id: comentario._id })}
                    size="2xs"
                    variant="ghost"
                    color="gray.600"
                  >
                    <Trash />
                  </Button>
                )}
              </Flex>

              <Text fontWeight="normal" fontSize="xs" mt="2">
                {comentario.mensagem}
              </Text>

              <Box mt="2">
                {comentario?.arquivos?.map((item) => {
                  const byteArray = new Uint8Array(item?.buffer?.data || []);
                  const blob = new Blob([byteArray], { type: item?.mimetype });
                  const objectUrl = URL.createObjectURL(blob);

                  return (
                    <Box mt="4" key={item?._id}>
                      <Button
                        size="2xs"
                        variant="ghost"
                        fontSize="sm"
                        color="gray.500"
                        fontWeight="normal"
                        display="flex"
                        gap="1.5"
                        alignItems="center"
                        px="0.5"
                        onClick={() => handleDownloadFile({ id: item?._id })}
                      >
                        <Paperclip color="purple" size={14} />
                        {item?.nomeOriginal} {(item?.size / 1024).toFixed(1)} KB
                      </Button>

                      {item?.mimetype?.startsWith("image/") && (
                        <Image
                          src={objectUrl}
                          alt={item?.nomeOriginal}
                          maxH="300px"
                          objectFit="contain"
                          rounded="md"
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
        <Box alignContent="end">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit((values) => {
                onAddComentario(values);
                reset();
              })}
            >
              <Flex alignItems="start" gap="3" mt="6">
                <Box w="full">
                  <Input
                    {...register("message")}
                    size="xs"
                    variant="flushed"
                    placeholder="Digite seu comentário..."
                  />
                  {errors?.message?.message && (
                    <Text fontSize="2xs" color="red.500">
                      {errors?.message?.message}
                    </Text>
                  )}
                </Box>

                <Flex gap="2" alignItems="end">
                  <Controller
                    control={control}
                    name="arquivos"
                    render={({ field: { onChange, value } }) => (
                      <FileUploadRoot
                        multiple
                        onFileAccept={(e) => {
                          const novosArquivos = [...(value || []), ...e.files];
                          onChange(novosArquivos);
                        }}
                      >
                        <FileUploadTrigger asChild>
                          <IconButton
                            size="xs"
                            variant="subtle"
                            color="gray.600"
                          >
                            <Paperclip />
                          </IconButton>
                        </FileUploadTrigger>
                      </FileUploadRoot>
                    )}
                  />

                  <Button type="submit" variant="subtle" size="xs">
                    Salvar
                  </Button>
                </Flex>
              </Flex>
            </form>
          </FormProvider>

          <Box mt="3">
            {arquivos?.map((arquivo, i) => (
              <Flex
                key={`${i}-${arquivo.name}`}
                alignItems="center"
                justifyContent="space-between"
                bg="gray.50"
                rounded="md"
                px="2"
                py="1"
                mt="1"
              >
                <Text
                  fontSize="xs"
                  display="flex"
                  alignItems="center"
                  gap="1.5"
                  fontWeight="normal"
                >
                  <Paperclip color="purple" size={12} /> {arquivo.name}
                </Text>
                <IconButton
                  aria-label="Remover arquivo"
                  size="xs"
                  variant="ghost"
                  color="red.500"
                  onClick={() => handleRemoveArquivo(i)}
                >
                  <CircleX size={14} />
                </IconButton>
              </Flex>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
