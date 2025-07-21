npm install @prisma/client
npm install -D prisma

arquivo em src/config/prisma.ts or in controller(topo)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;


npm i --save-dev @types/jsonwebtoken