import { ReflectMetadata } from '@nestjs/common';

// tslint:disable-next-line:variable-name
export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);
