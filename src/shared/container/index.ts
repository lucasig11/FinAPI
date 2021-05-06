import { container } from "tsyringe";

import UsersRepository from "@modules/User/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/User/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
