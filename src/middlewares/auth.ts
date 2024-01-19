//Passo 25  - middleware de autorização

//Esse middleware serve para proteção de rotas, caso o usuário não esteja logado, ou não tenha um token ele não conseguirá acessar as rotas que utilizarmos esse middleware

import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

//Essa interface foi criada para que seja possível setar o req.user
export interface AuthenticadedRequest extends Request {
  user?: UserInstance | null;
}

//Protegendo as rotas da aplicação
export function ensureAuth(
  req: AuthenticadedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  //Front-end não enviou o token
  if (!authorizationHeader)
    return res
      .status(401)
      .json({ message: "Não autorizado!: token não encontrado" });

  //Formato do token enviado pela requisição: Bearer {token}
  const token = authorizationHeader.replace(/Bearer /, "");
  //Então pegamos assim pegamos so a parte do token
  jwtService.verifyToken(token, (err, decoded) => {
    console.log("veificando token");
    if (err || typeof decoded === "undefined")
      return res
        .status(401)
        .json({ message: "Não autorizado: token inválido" });

    //Achando o user por meio do decoded que seria o payload do usuário assim que o usuário é logado
    userService.findByEmail((decoded as JwtPayload).email).then((user) => {
      req.user = user;
      next();
    });
  });
}