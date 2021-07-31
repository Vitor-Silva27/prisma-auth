import { hash } from "bcryptjs";

import { client } from "../../prisma/client";

interface UserRequest {
  name: string;
  password: string;
  username: string;
}

class CreateUserUseCase {
  async execute({ name, username, password }: UserRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });
    if (userAlreadyExists) {
      return ({status: "Error",message: "User already exists!"});
    }

    const passwordHash = await hash(password, 8);

    const user = await client.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });
    return user;
  }
}

export { CreateUserUseCase };
