import { PrismaClient } from '@prisma/client';
import { buildApp } from './app.js';
import { getPort } from './config.js';
import { PrismaResumeRepository } from './repository.js';

const prisma = new PrismaClient();
const app = buildApp(new PrismaResumeRepository(prisma));

const shutdown = async () => {
  await app.close();
  await prisma.$disconnect();
};

process.on('SIGINT', () => {
  void shutdown().then(() => process.exit(0));
});

process.on('SIGTERM', () => {
  void shutdown().then(() => process.exit(0));
});

await app.listen({
  port: getPort(),
  host: '0.0.0.0'
});
