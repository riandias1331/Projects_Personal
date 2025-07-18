npm init -y
npm i express dotenv mongoose nodemon  cors
npm install --save-dev typescript @types/node @types/express @types/mongoose @types/cors


{
  "name": "api-rest-typescript",
  "version": "1.0.0",
  "main": "server.ts",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon --exec ts-node server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.0",
    "express": "^5.1.0",
    "mongoose": "^8.16.4",
    "nodemon": "^3.1.10"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.3",
    "@types/mongoose": "^5.11.96",
    "@types/node": "^24.0.14",
    "typescript": "^5.8.3",
    "ts-node": "^10.9.2"
  }
}

npx tsc --init


Edite o arquivo tsconfig.json com as seguintes configurações:
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
