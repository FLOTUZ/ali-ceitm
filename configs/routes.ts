export const routes = [
  {
    title: "Cobrador",
    path: "/",
    roles: ["CONCEJAL", "ADMIN"],
  },
  {
    title: "Becarios",
    path: "/admin/becarios",
    roles: ["CONCEJAL", "ADMIN"],
  },
  {
    title: "Forzar cobro",
    path: "/admin/forzar",
    roles: ["CONCEJAL", "ADMIN"],
  },
  {
    title: "Historial Cobros",
    path: "/admin/cobros",
    roles: ["CONCEJAL", "ADMIN"],
  },
  {
    title: "Exportar",
    path: "/admin/exportar",
    roles: ["CONCEJAL", "ADMIN"],
  },
  {
    title: "Becas",
    path: "/admin/becas",
    roles: ["ADMIN"],
  },
  {
    title: "Carreras",
    path: "/admin/carreras",
    roles: ["ADMIN"],
  },
  {
    title: "Cafeterias",
    path: "/admin/cafeterias",
    roles: ["ADMIN"],
  },
  {
    title: "Usuarios",
    path: "/admin/usuarios",
    roles: ["ADMIN"],
  },
  {
    title: "Configuraciones",
    path: "/admin/config",
    roles: ["ADMIN"],
  },
];
