import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

// Function to limit routes to certain roles
export const Roles = (roles: UserRole[]) => SetMetadata('roles', roles);
