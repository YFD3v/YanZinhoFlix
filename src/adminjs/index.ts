//Terceiro passo - configurando o adminjs( painel )

import AdminJS from "adminjs";
import { default as AdminJsExpress } from "@adminjs/express";
import { default as AdminJsSequelize } from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";

// Adaptador da ORM
AdminJS.registerAdapter(AdminJsSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  //Esse resources são todas as resources juntas
  resources: adminJsResources,
  branding: brandingOptions,
  //Passo 12 adicionando tradução
  locale: locale,
  //Passo 13 personalizando o dashboard
  dashboard: dashboardOptions,
});
//Anteriormente era: export const adminJsRouter = AdminJsExpress.buildRouter(adminjs)
//Passo 11 - autenticação e tela de login
export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
);
