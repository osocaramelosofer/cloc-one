# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern Next.js 15 web application with AWS Cognito authentication and AWS Bedrock AI chat assistant integration. Built with TypeScript, HeroUI, and Tailwind CSS.

## Development Commands

### Setup
```bash
pnpm install                 # Install dependencies
```

### Development
```bash
pnpm dev                    # Start development server with Turbopack (localhost:3000)
pnpm build                  # Build for production with Turbopack
pnpm start                  # Start production server
pnpm lint                   # Run ESLint
```

## Environment Setup

Required environment variables in `.env.local`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# AWS Cognito
COGNITO_CLIENT_ID=<from AWS Console>
COGNITO_CLIENT_SECRET=<from AWS Console>
COGNITO_ISSUER=https://cognito-idp.<region>.amazonaws.com/<user-pool-id>

# AWS Credentials (for Bedrock)
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=<IAM user access key>
AWS_SECRET_ACCESS_KEY=<IAM user secret key>

# AWS Bedrock Agent (optional, for chat)
BEDROCK_AGENT_ID=<agent id>
BEDROCK_AGENT_ALIAS_ID=<agent alias id>
```

**Important:** Add Cognito callback URL: `http://localhost:3000/api/auth/callback/cognito`

## Architecture

### Authentication Flow

1. **Middleware Protection** (`src/middleware.ts`):
   - Runs on Edge Runtime before every request
   - Uses `withAuth` from NextAuth to verify session tokens
   - Protects routes: `/dashboard/*`, `/organizations/*`
   - Redirects authenticated users from `/` to `/dashboard`
   - Redirects unauthenticated users to `/auth/login`

2. **NextAuth Configuration** (`src/config/auth.ts`):
   - Configures AWS Cognito as OAuth provider
   - JWT callback: Saves `access_token`, `id_token`, `refresh_token`, `expiresAt` from Cognito
   - Session callback: Passes tokens to client-side session
   - Custom sign-in page: `/auth/login`

3. **Session Access**:
   - Client components: `useSession()` from `next-auth/react`
   - Server components/routes: `getServerSession(authOptions)`
   - Session includes: `accessToken`, `idToken`, `refreshToken`, `expiresAt`

### AWS Bedrock Integration

- Backend API route: `/api/bedrock/route.ts`
- Verifies authentication via `getServerSession()`
- Uses AWS SDK credentials from environment variables (never in client code)
- Chat widget: `src/modules/common/components/chat-widget.tsx` calls backend API

### Module Structure

Components are organized by feature modules under `src/modules/`:

- `src/modules/auth/components/` - Authentication components (login-button, logout-button)
- `src/modules/common/components/` - Shared components (app-sidebar, chat-widget, toggle-theme)
- `src/modules/ui/` - Base UI components (shadcn/ui style)

**Component Naming Convention:**
- Use kebab-case: `login-button.tsx`, `chat-widget.tsx`
- Place in appropriate module: `@modules/[module-name]/components/`
- Use Tailwind CSS for styling
- Use Framer Motion for animations when needed

### Path Aliases

- `@/*` maps to `src/*`
- Import example: `import { authOptions } from "@/config/auth"`

### Key Files

- `src/middleware.ts` - Route protection and auth verification
- `src/config/auth.ts` - NextAuth configuration with Cognito
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth API handler
- `src/app/api/bedrock/route.ts` - Secure AWS Bedrock API endpoint
- `src/types/next-auth.d.ts` - TypeScript extensions for NextAuth session/token types
- `src/middlewate.ts` - Typo file (should be deleted if unused)

## Tech Stack

- **Framework:** Next.js 15.5.4 (App Router, Turbopack)
- **UI:** HeroUI 2.8.5, Radix UI, Tailwind CSS 4
- **Auth:** NextAuth.js 4.24.11 with AWS Cognito
- **AI:** AWS Bedrock Agent Runtime SDK
- **Animations:** Framer Motion 12.23.22
- **Language:** TypeScript 5

## Common Patterns

### Creating Protected Pages

All pages under `/dashboard/*` and `/organizations/*` are automatically protected by middleware. No additional auth checks needed in page components.

### Accessing User Session

**Client component:**
```typescript
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  // session.accessToken, session.idToken, session.refreshToken available
}
```

**Server component/route:**
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  // session.accessToken, session.idToken, session.refreshToken available
}
```

### Making Authenticated API Calls

Always verify authentication in API routes:
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.idToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Process authenticated request
}
```

## Security Notes

- Never hardcode AWS credentials in client code
- All AWS SDK calls must be in server-side API routes
- Environment variables starting with `AWS_` and `COGNITO_` are server-only
- Rotate compromised credentials immediately in AWS IAM Console
- `.env.local` is gitignored - never commit it

## Troubleshooting

**ERR_TOO_MANY_REDIRECTS:**
- Check middleware `authorized` callback excludes `/auth/*` routes

**Cannot read properties of undefined (reading 'custom'):**
- Use `withAuth` middleware, not `getToken` from `next-auth/jwt` with Cognito

**Login fails:**
- Verify all environment variables are set correctly
- Verify callback URL is registered in Cognito App Client settings
- Check AWS Cognito User Pool and App Client configuration

**Debug mode:**
- Check console logs in `src/config/auth.ts` (callbacks log ACCOUNT, TOKEN, SESSION)
- These should be removed in production
