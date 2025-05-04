npm init -y
npm install express bcryptjs jsonwebtoken prisma @prisma/client dotenv
npm install -D typescript ts-node-dev @types/express @types/jsonwebtoken @types/bcryptjs
npx tsc --init
npx prisma init



create prisma users // schema.prisma

npm install @prisma/client

Como rodar:
    Gere o cliente Prisma:npx prisma generate

    (Se necessário) Crie a base e aplique a modelagem: npx prisma db push

    Inicie o servidor em modo dev: npx ts-node-dev src/server.ts