// apps/backend/src/env.validation.ts
import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3001),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
});

export function validate(config: Record<string, unknown>) {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    console.error(
      'ENVIRONMENT VALIDATION FAILED. You are missing required variables in apps/backend/.env',
      parsed.error.format(),
    );
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}
