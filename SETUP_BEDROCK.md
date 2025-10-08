# Configuración de AWS Bedrock con NextAuth

## 🔐 Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-aqui

# AWS Cognito
COGNITO_CLIENT_ID=tu-client-id
COGNITO_CLIENT_SECRET=tu-client-secret
COGNITO_ISSUER=https://cognito-idp.us-east-2.amazonaws.com/us-east-2_XXXXXXX

# AWS Credentials (para Bedrock)
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=tu-access-key-id
AWS_SECRET_ACCESS_KEY=tu-secret-access-key

# AWS Bedrock Agent
BEDROCK_AGENT_ID=tu-agent-id
BEDROCK_AGENT_ALIAS_ID=tu-agent-alias-id
```

## ⚠️ IMPORTANTE: Seguridad de Credenciales

**NUNCA subas el archivo `.env.local` a Git.** Ya está incluido en `.gitignore`.

### Rotar Credenciales Comprometidas

Si accidentalmente expusiste credenciales en el código (como en tu caso anterior), debes:

1. Ir a AWS IAM Console
2. Desactivar/eliminar las credenciales comprometidas
3. Generar nuevas credenciales
4. Actualizar tu archivo `.env.local`

## 📝 Cambios Realizados

### 1. **Configuración de NextAuth** (`src/config/auth.ts`)
- ✅ Ahora guarda `id_token`, `access_token`, `refresh_token` y `expiresAt`
- ✅ Estos tokens están disponibles en la sesión del cliente

### 2. **Tipos de TypeScript** (`src/types/next-auth.d.ts`)
- ✅ Extiende los tipos de NextAuth para incluir los tokens personalizados

### 3. **API Route Segura** (`src/app/api/bedrock/route.ts`)
- ✅ Maneja las llamadas a AWS Bedrock desde el backend
- ✅ Verifica autenticación del usuario
- ✅ Usa credenciales de variables de entorno (seguras)

### 4. **Chat Widget Actualizado** (`src/modules/common/components/chat-widget.tsx`)
- ✅ Ya no tiene credenciales hardcodeadas
- ✅ Llama a la API route del backend
- ✅ Verifica que el usuario esté autenticado antes de hacer la llamada

## 🚀 Cómo Usar

### Acceder a los tokens en cualquier componente cliente:

```typescript
import { useSession } from "next-auth/react";

function MiComponente() {
  const { data: session } = useSession();
  
  console.log(session?.idToken);      // ID Token de Cognito
  console.log(session?.accessToken);  // Access Token
  console.log(session?.refreshToken); // Refresh Token
  console.log(session?.expiresAt);    // Timestamp de expiración
}
```

### Acceder a los tokens en el servidor:

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

async function miAPIRoute() {
  const session = await getServerSession(authOptions);
  
  console.log(session?.idToken);      // ID Token de Cognito
  console.log(session?.accessToken);  // Access Token
}
```

## 🔄 Flujo de Autenticación

```
┌─────────────────────────────────────────────────────────┐
│ 1. Usuario hace login con Cognito                      │
├─────────────────────────────────────────────────────────┤
│ 2. NextAuth recibe tokens (id_token, access_token)     │
├─────────────────────────────────────────────────────────┤
│ 3. Tokens se guardan en JWT (callback jwt())           │
├─────────────────────────────────────────────────────────┤
│ 4. JWT se almacena en cookie encriptada                │
├─────────────────────────────────────────────────────────┤
│ 5. Tokens disponibles en sesión (callback session())   │
├─────────────────────────────────────────────────────────┤
│ 6. Cliente puede acceder a tokens con useSession()     │
└─────────────────────────────────────────────────────────┘
```

## 🧪 Probar

1. Inicia sesión en la aplicación
2. Abre el chat widget
3. Envía un mensaje
4. El backend verificará tu autenticación y llamará a AWS Bedrock
5. Recibirás la respuesta del agente

## 📚 Recursos

- [NextAuth.js Docs](https://next-auth.js.org/)
- [AWS Bedrock Agent Runtime](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html)
- [AWS Cognito](https://docs.aws.amazon.com/cognito/)

