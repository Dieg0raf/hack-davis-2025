// app/api/auth/[auth0]/route.ts
import { Auth0Client } from "@auth0/nextjs-auth0/server"
import { handleAuth } from '@auth0/nextjs-auth0/server';

export const GET = handleAuth();