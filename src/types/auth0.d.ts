declare module '@auth0/nextjs-auth0/client' {
  export const UserProvider: React.FC<{ children: React.ReactNode }>;
  export const UserButton: React.FC;
}

declare module '@auth0/nextjs-auth0/edge' {
  export function withMiddlewareAuthRequired(): any;
} 