import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";
import { favoritesController } from "./controllers/favoritesController";
const router = express.Router();

//É importante que a ordem da rotas dinamicas estejam abaixo das rotas específicas, pois o router testa as rotas em ordem. Caso eu coloque uma não dinamica depois o Router pode confundir como uma dinâmica.

//Passo 25 - Middleware de autorização, adicionando a middleware: verificação de rota
//Obs: tem que ser primeiro que a função do controlador para verificar que o usuário está logado

//Passo 15 primeira rota
router.get("/categories", ensureAuth, categoriesController.index);
//Passo 17 - obtendo cursos de uma categoria

router.get("/categories/:id", ensureAuth, categoriesController.show);

//Passo 19 - obtendo 3 cursos em destaque
router.get("/courses/featured", ensureAuth, coursesController.featured);
//Passo 20 - obtendo cursos lançamento
router.get("/courses/newest", coursesController.newest);
//Passo 21 - buscando por cursos
router.get("/courses/search", ensureAuth, coursesController.search);
//Passo 18 - obtendo informações de um curso
router.get("/courses/:id", ensureAuth, coursesController.show);

//Passo 22 - streaming de vídeo na api
//Passo 26 - Protegendo os videos, foi adicionado o ensureAuthViaQuery garantindo a autorização via query
router.get("/episodes/stream", ensureAuthViaQuery, episodesController.stream);

//Passo 23 - registro de usuários
router.post("/auth/register", authController.register);
//Passo 24 - login com json web token
router.post("/auth/login", authController.login);

//Passo 27 - Adicionando favoritos
router.post("/favorites", ensureAuth, favoritesController.save);

//Passo a passo para criar essas rotas
//1 - passo criar um controler com os métodos desejados
//2 - Refatorar o código - criar um service específico
//3 - criar o router e a rota

export { router };
