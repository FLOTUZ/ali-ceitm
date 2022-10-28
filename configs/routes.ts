export const routes = [
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
    path: "/admin/historial",
    roles: ["CONCEJAL", "ADMIN"],
  },
  {
    title: "Exportar",
    path: "/admin/exportar",
    roles: ["CONCEJAL", "ADMIN"],
  },
  {
    title: "Configuraciones",
    path: "/admin/config",
    roles: ["ADMIN"],
  },
];
