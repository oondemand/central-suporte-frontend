import {
  Users,
  Settings,
  LogOut,
  ListChecks,
  CalendarSync,
  TicketCheckIcon,
  NotepadText,
  NotepadTextDashed,
  Notebook,
  Rotate3D,
  HelpCircle,
  MessageCircle,
  LifeBuoy,
  ChartNoAxesColumnIncreasingIcon,
} from "lucide-react";
import { Chart } from "../../svg/chart";
import { InvertedChart } from "../../svg/invertedChart";
import { Box } from "@chakra-ui/react";

export const menuItems = [
  // {
  //   title: "Dashboard",
  //   icon: Chart,
  //   href: "/",
  // },
  // {
  //   title: "Planejamento",
  //   href: "/planejamento",
  //   icon: CalendarSync,
  // },
  {
    title: "Esteira de suporte",
    icon: Chart,
    href: "/",
  },
  // {
  //   title: "Clientes e prestadores",
  //   icon: Users,
  //   href: "/pessoas",
  // },
  // {
  //   title: "Documentos Cadastrais",
  //   href: "/documentos-cadastrais",
  //   rules: ["admin", "tomador"],
  // },
  // {
  //   title: "Serviços",
  //   icon: ListChecks,
  //   href: "/servicos",
  // },
  // {
  //   title: "Documentos Fiscais",
  //   href: "/documentos-fiscais",
  //   rules: ["admin", "tomador"],
  // },
  // {
  //   title: "Integrações",
  //   icon: Rotate3D,
  //   rules: ["admin"],
  //   subLinks: [
  //     {
  //       title: "Cliente/prestador central -> Omie",
  //       href: "/integracao/pessoa/central-omie",
  //     },
  //     {
  //       title: "Cliente/prestador central <- Omie",
  //       href: "/integracao/pessoa/omie-central",
  //     },
  //     {
  //       title: "Conta pagar central -> Omie",
  //       href: "/integracao/conta-pagar/central-omie",
  //     },
  //     {
  //       title: "Conta pagar central <- Omie",
  //       href: "/integracao/conta-pagar/omie-central",
  //     },
  //     {
  //       title: "Anexos central -> Omie",
  //       href: "/integracao/anexos/central-omie",
  //     },
  //   ],
  // },
  {
    title: "Severidades",
    icon: ListChecks,
    href: "/severidades",
    rules: ["padrao"],
  },
  {
    title: "Configurações",
    icon: Settings,
    rules: ["padrao"],
    subLinks: [
      {
        title: "Listas",
        href: "/listas",
      },
      // {
      //   title: "Moedas",
      //   href: "/moedas",
      // },
      // {
      //   title: "Registros",
      //   href: "/registros",
      // },
      {
        title: "Sistema",
        href: "/sistema",
      },
      // {
      //   title: "Etapas",
      //   href: "/etapas",
      // },
      {
        title: "Assistentes",
        href: "/assistentes",
      },
      // {
      //   title: "Integrações",
      //   href: "/configuracoes/integracao",
      // },
    ],
  },
  // {
  //   title: "Suporte",
  //   icon: LifeBuoy,
  //   subLinks: [
  //     {
  //       title: "Doc",
  //       href: "/doc",
  //     },
  //     {
  //       title: "Roteiro de testes",
  //       href: "/roteiro-de-testes",
  //     },
  //     {
  //       title: "Log de mudanças",
  //       href: "/changelog",
  //     },
  //   ],
  // },
];
