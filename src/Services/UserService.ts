import bcrypt from 'bcrypt';
import { profiles, status } from '../enums/index.enum';
import Paginator from '../interfaces/paginator.interface';
import { User } from '../models/users.model';

import { UserCreateDTO, UserDTO } from '../DTOs/UserDTO';

const list = async (limit: number, offset: number): Promise<Paginator<User>> => {
  let options = {};
  if (limit && offset) {
    options = {
      limit,
      offset,
    };
  }
  return User.findAndCountAll({
    attributes: [
      'id', 'name', 'email', 'organization', 'type', 'status', 'active', 'createdAt',
    ],
    order: [
      ['createdAt', 'ASC'],
    ],
    ...options,
  });
};

const create = async (userDTO: UserCreateDTO): Promise<User> => User.findOne({
  where: {
    email: userDTO.email,
  },
}).then(async (user: User) => {
  if (user) {
    throw new Error('email is taken');
  } else {
    // se hace el checkeo antes porque luego se encripta
    if (userDTO.password.length >= 6) {
      const newUser: User = await User.create({
        name: userDTO.name,
        email: userDTO.email,
        organization: userDTO.organization,
        password: bcrypt.hashSync(userDTO.password, 10),
        type: profiles.client,
        status: status.pending,
        createdBy: 1,
        createdAt: new Date(),
      }).catch((error: Error) => {
        console.log(error);
        throw new Error('create user error');
      });
      newUser.toJSON();
      return newUser;
    }
    throw new Error('password too short');
  }
}).catch((error: Error) => {
  console.log(error);
  throw error;
});

const update = async (userId: number, userDTO: UserCreateDTO): Promise<User> => User.findOne({
  attributes: [
    'id', 'name', 'email',
  ],
  where: {
    id: userId,
  },
}).then(async (user: User) => {
  if (!user) {
    throw new Error('user not found');
  } else {
    const emailUser: User = await User.findOne({
      where: {
        email: userDTO.email,
      },
    });
    if (!emailUser || emailUser.get('id') === user.get('id')) {
      return user.update({
        name: userDTO.name,
        email: userDTO.email,
        organization: userDTO.organization,
        updatedAt: new Date(),
      }).catch((error: Error) => {
        console.log(error);
        throw new Error('user update error');
      });
    }
    throw new Error('email in use');
  }
}).catch((error: Error) => {
  console.log(error);
  throw new Error('find user error');
});

const password = async (userId: number, userDTO: UserCreateDTO): Promise<User> => User.findOne({
  attributes: [
    'id', 'name', 'email',
  ],
  where: {
    id: userId,
  },
}).then(async (user: User) => {
  if (!user) {
    throw new Error('user not found');
  } else {
    return user.update({
      password: bcrypt.hashSync(userDTO.password, 10),
      updatedAt: new Date(),
    }).catch((error: Error) => {
      console.log(error);
      throw new Error('user update error');
    });
  }
}).catch((error: Error) => {
  console.log(error);
  throw new Error('find user error');
});

const approve = async (userId: number): Promise<User> => User.findOne({
  attributes: [
    'id', 'name',
    'email', 'type',
    'createdAt',
  ],
  where: {
    id: userId,
  },
}).then(async (user: User) => {
  if (!user) {
    throw new Error('user not found');
  } else {
    return user.update({
      status: status.approved,
      updatedAt: new Date(),
    }).catch((error: Error) => {
      console.log(error);
      throw new Error('user update error');
    });
  }
}).catch((error: Error) => {
  console.log(error);
  throw new Error('find user error');
});

const cancel = async (userId: number): Promise<User> => User.findOne({
  attributes: [
    'id', 'name',
    'email', 'type',
    'createdAt',
  ],
  where: {
    id: userId,
  },
}).then(async (user: User) => {
  if (!user) {
    throw new Error('user not found');
  } else {
    return user.update({
      status: status.pending,
      updatedAt: new Date(),
    }).catch((error: Error) => {
      console.log(error);
      throw new Error('user update error');
    });
  }
}).catch((error: Error) => {
  console.log(error);
  throw new Error('find user error');
});

const active = async (userId: number): Promise<User> => User.findOne({
  where: {
    id: userId,
  },
}).then(async (user: User) => {
  if (!user) {
    throw new Error('user not found');
  } else {
    return user.update({
      active: !user.get('active'),
      updatedAt: new Date(),
    }).catch((error: Error) => {
      throw new Error('user update error');
    });
  }
}).catch((error: Error) => {
  console.log(error);
  throw new Error('find user error');
});

export default {
  list,
  create,
  update,
  password,
  approve,
  cancel,
  active,
};