import cors from '@fastify/cors';
import Fastify from 'fastify';
import { getCorsOrigins, normalizeLocale } from './config.js';
import type { ResumeRepository } from './repository.js';

export function buildApp(repository: ResumeRepository) {
  const app = Fastify({
    logger: process.env.NODE_ENV !== 'test' && !process.env.VITEST
  });

  void app.register(cors, {
    origin: getCorsOrigins()
  });

  app.get('/health', async () => ({
    status: 'ok',
    service: 'resumee-api'
  }));

  app.get('/v1/resume', async (request) => {
    const query = request.query as { locale?: string };
    const locale = normalizeLocale(query.locale);
    return repository.getResume(locale);
  });

  app.setNotFoundHandler(async (_request, reply) => {
    return reply.code(404).send({
      error: 'not_found',
      message: 'Route not found'
    });
  });

  app.setErrorHandler(async (error, _request, reply) => {
    app.log.error(error);
    return reply.code(500).send({
      error: 'internal_server_error',
      message: 'Unexpected server error'
    });
  });

  return app;
}
