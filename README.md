# Cloc One

**Aplicación web moderna con autenticación AWS Cognito y chat asistente inteligente potenciado por AWS Bedrock.**

Una plataforma empresarial construida con Next.js 15 que combina autenticación segura mediante AWS Cognito con capacidades de inteligencia artificial usando AWS Bedrock Agent Runtime. Diseñada para ofrecer una experiencia de usuario fluida con protección de rutas a nivel de middleware y un sistema de chat asistente integrado.

---

## 📋 Tabla de Contenidos
- [Características](#-características)
- [Tech Stack](#️-tech-stack)
- [Pre-requisitos](#-pre-requisitos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Ejecutar el Proyecto](#-ejecutar-el-proyecto)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Autenticación](#-autenticación)
  - [Stack Tecnológico](#stack-tecnológico)
  - [Arquitectura](#arquitectura)
  - [Archivos Clave](#archivos-clave)
  - [Flujo de Autenticación](#flujo-de-autenticación)
  - [Configuración](#configuración)

---

## ✨ Características

- 🔐 **Autenticación Empresarial**: Integración completa con AWS Cognito (OAuth2/OIDC)
- 🛡️ **Protección de Rutas**: Middleware de Next.js para verificación de autenticación en Edge Runtime
- 🤖 **Chat Asistente Inteligente**: Widget de chat integrado con AWS Bedrock Agent
- 🎨 **UI Moderna**: Interfaz construida con HeroUI y Tailwind CSS
- 🌓 **Tema Claro/Oscuro**: Soporte completo para temas personalizables
- ⚡ **Rendimiento Óptimo**: Construido con Next.js 15 y Turbopack
- 📱 **Responsive Design**: Diseño adaptable para todos los dispositivos
- 🔄 **Manejo de Sesiones**: Gestión automática de tokens JWT, refresh tokens y sesiones
- 🏢 **Multi-organización**: Soporte para gestión de múltiples organizaciones
- 🎯 **TypeScript**: 100% tipado para mejor developer experience

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [Next.js 15.5.4](https://nextjs.org/) con App Router
- **UI Library**: [HeroUI 2.8.5](https://www.heroui.com/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes**: [Radix UI](https://www.radix-ui.com/) + Custom Components
- **Animaciones**: [Framer Motion 12.23.22](https://www.framer.com/motion/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Lenguaje**: [TypeScript 5](https://www.typescriptlang.org/)

### **Backend & Autenticación**
- **Autenticación**: [NextAuth.js 4.24.11](https://next-auth.js.org/)
- **Proveedor**: AWS Cognito (OAuth2/OIDC)
- **Middleware**: Next.js Edge Runtime Middleware

### **Servicios AWS**
- **AWS Cognito**: Gestión de usuarios y autenticación
- **AWS Bedrock Agent Runtime**: Chat asistente con IA
- **AWS SDK**: `@aws-sdk/client-bedrock-agent-runtime 3.901.0`

### **Herramientas de Desarrollo**
- **Package Manager**: pnpm
- **Build Tool**: Turbopack (Next.js 15)
- **Linter**: ESLint 9
- **Theme Management**: next-themes

---

## 📦 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión Mínima | Verificar Instalación |
|-------------|----------------|----------------------|
| **Node.js** | 20.x o superior | `node --version` |
| **pnpm** | 8.x o superior | `pnpm --version` |
| **Git** | Cualquier versión | `git --version` |

### Instalar pnpm (si no lo tienes):
```bash
npm install -g pnpm
```

### Servicios AWS Requeridos:
- ✅ AWS Account con acceso a:
  - AWS Cognito User Pool configurado
  - AWS Bedrock Agent (opcional, para chat)
  - IAM User con credenciales (Access Key + Secret Key)

---

## 🚀 Instalación

### 1. **Clonar el Repositorio**
```bash
git clone <tu-repositorio-url>
cd cloc-one
```

### 2. **Instalar Dependencias**
```bash
pnpm install
```

Esto instalará todas las dependencias listadas en `package.json`.

---

## 🔑 Variables de Entorno

### 1. **Crear archivo de configuración**
Crea un archivo `.env.local` en la raíz del proyecto:

```bash
touch .env.local
```

### 2. **Configurar variables requeridas**

Copia y pega el siguiente contenido en `.env.local`:

```env
# ==========================================
# NextAuth Configuration
# ==========================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secret_super_seguro_aqui

# ==========================================
# AWS Cognito Configuration
# ==========================================
COGNITO_CLIENT_ID=tu_cognito_client_id
COGNITO_CLIENT_SECRET=tu_cognito_client_secret
COGNITO_ISSUER=https://cognito-idp.us-east-2.amazonaws.com/us-east-2_XXXXXXXXX

# ==========================================
# AWS Configuration (para Bedrock)
# ==========================================
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=tu_aws_access_key_id
AWS_SECRET_ACCESS_KEY=tu_aws_secret_access_key

# ==========================================
# AWS Bedrock Agent (opcional)
# ==========================================
BEDROCK_AGENT_ID=tu_bedrock_agent_id
BEDROCK_AGENT_ALIAS_ID=tu_bedrock_agent_alias_id
```

### 3. **Obtener las credenciales**

#### **NEXTAUTH_SECRET**
Genera un secret aleatorio seguro:
```bash
openssl rand -base64 32
```

#### **Credenciales de AWS Cognito**
1. Ve a **AWS Console** → **Cognito** → **User Pools**
2. Selecciona tu User Pool (o crea uno nuevo)
3. Ve a **App integration** → **App client list**
4. Selecciona tu App Client o crea uno nuevo
5. Copia el **Client ID** y **Client secret**
6. El **Issuer URL** está en: **User pool overview** → tiene el formato:
   ```
   https://cognito-idp.[region].amazonaws.com/[user-pool-id]
   ```
7. **IMPORTANTE**: Agrega la Callback URL en el App Client:
   ```
   http://localhost:3000/api/auth/callback/cognito
   ```

#### **Credenciales de AWS IAM**
1. Ve a **AWS Console** → **IAM** → **Users**
2. Crea un usuario con permisos para Bedrock (o usa uno existente)
3. Genera **Access Keys** en la sección de **Security credentials**
4. Copia el **Access Key ID** y **Secret Access Key**

#### **AWS Bedrock Agent (Opcional)**
Si quieres usar el chat asistente:
1. Ve a **AWS Console** → **Bedrock** → **Agents**
2. Copia el **Agent ID** y **Agent Alias ID**

> ⚠️ **IMPORTANTE**: Nunca subas el archivo `.env.local` a Git. Ya está incluido en `.gitignore`.

---

## ▶️ Ejecutar el Proyecto

### **Modo Desarrollo** (recomendado para desarrollo local)
```bash
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

Características del modo desarrollo:
- ✅ Hot reload automático
- ✅ Turbopack para builds ultra rápidos
- ✅ Logs detallados en consola
- ✅ Source maps para debugging

### **Modo Producción**

#### 1. Construir la aplicación:
```bash
pnpm build
```

#### 2. Iniciar el servidor:
```bash
pnpm start
```

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Desarrollo** | `pnpm dev` | Inicia servidor de desarrollo con Turbopack |
| **Build** | `pnpm build` | Construye la aplicación para producción |
| **Start** | `pnpm start` | Inicia el servidor de producción |
| **Lint** | `pnpm lint` | Ejecuta ESLint para verificar código |

---

## 📁 Estructura del Proyecto

```
cloc-one/
├── src/
│   ├── app/                      # App Router de Next.js
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/             # NextAuth endpoints
│   │   │   └── bedrock/          # AWS Bedrock integration
│   │   ├── auth/                 # Páginas de autenticación
│   │   │   └── login/            # Página de login
│   │   ├── dashboard/            # Dashboard protegido
│   │   ├── organizations/        # Gestión de organizaciones
│   │   ├── layout.tsx            # Layout principal
│   │   ├── page.tsx              # Página de inicio
│   │   └── globals.css           # Estilos globales
│   │
│   ├── modules/                  # Módulos organizados por feature
│   │   ├── auth/                 # Módulo de autenticación
│   │   │   └── components/       # Componentes de auth
│   │   │       ├── login-button.tsx
│   │   │       └── logout-button.tsx
│   │   ├── common/               # Componentes compartidos
│   │   │   └── components/
│   │   │       ├── app-sidebar.tsx
│   │   │       ├── chat-widget.tsx
│   │   │       └── toggle-theme.tsx
│   │   └── ui/                   # Componentes UI base
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── ...
│   │
│   ├── config/                   # Configuraciones
│   │   └── auth.ts               # Configuración de NextAuth
│   │
│   ├── providers/                # React Context Providers
│   │   ├── auth.provider.tsx
│   │   ├── hero-ui.provider.tsx
│   │   └── theme.provider.tsx
│   │
│   ├── types/                    # Tipos de TypeScript
│   │   └── next-auth.d.ts        # Extensión de tipos NextAuth
│   │
│   ├── lib/                      # Utilidades y librerías
│   │   ├── fonts/
│   │   └── utils/
│   │
│   ├── hooks/                    # Custom React Hooks
│   │   └── use-mobile.ts
│   │
│   └── middleware.ts             # Middleware de Next.js (protección de rutas)
│
├── public/                       # Archivos estáticos
├── .env.local                    # Variables de entorno (NO subir a Git)
├── package.json                  # Dependencias
├── tsconfig.json                 # Configuración TypeScript
├── tailwind.config.ts            # Configuración Tailwind
├── next.config.ts                # Configuración Next.js
└── README.md                     # Este archivo
```

### **Convenciones de Nombres**
- 📁 **Componentes personalizados**: `kebab-case.tsx` (ej: `login-button.tsx`)
- 📁 **Ubicación de componentes**: `@modules/[modulo]/components/`
- 🎨 **Estilos**: Siempre usar Tailwind CSS
- 🎬 **Animaciones**: Framer Motion cuando sea necesario

---

## 🔐 Autenticación

Esta aplicación implementa un sistema de autenticación robusto usando **AWS Cognito** como proveedor de identidad, con protección de rutas a nivel de middleware.

### Stack Tecnológico

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **NextAuth.js** | `4.24.11` | Framework de autenticación para Next.js |
| **AWS Cognito Provider** | Incluido en NextAuth | Proveedor OAuth2/OIDC para AWS Cognito |
| **Next.js Middleware** | Built-in | Protección de rutas en Edge Runtime |

### Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    Flujo de Autenticación                    │
└─────────────────────────────────────────────────────────────┘

1. Usuario → Accede a ruta protegida (/dashboard)
              ↓
2. Middleware → Verifica token de sesión
              ↓
3. ¿Token válido? 
   ├─ NO → Redirige a /auth/login
   │         ↓
   │    4. NextAuth → Inicia OAuth con Cognito
   │         ↓
   │    5. Cognito → Autentica usuario
   │         ↓
   │    6. Callback → Guarda tokens en sesión
   │         ↓
   └─ SÍ → Permite acceso a la ruta
              ↓
7. Usuario → Accede a contenido protegido
```

### Archivos Clave

#### 1. **`src/middleware.ts`** - Protección de Rutas
```typescript
// Middleware que se ejecuta ANTES de cada request
```
**Responsabilidades:**
- ✅ Verifica si el usuario está autenticado usando `withAuth` de NextAuth
- ✅ Protege rutas específicas (`/dashboard`, `/organizations`)
- ✅ Redirige usuarios no autenticados a `/auth/login`
- ✅ Redirige usuarios autenticados de `/` a `/dashboard`
- ✅ Compatible con Edge Runtime (sin dependencias de Node.js)

**Rutas protegidas:**
- `/dashboard/*` - Panel principal de la aplicación
- `/organizations/*` - Gestión de organizaciones

**Rutas públicas:**
- `/` - Página de inicio
- `/auth/login` - Página de login
- `/auth/*` - Todas las rutas de autenticación

---

#### 2. **`src/config/auth.ts`** - Configuración de NextAuth
```typescript
// Configuración centralizada de autenticación
```
**Responsabilidades:**
- 🔧 Configura el proveedor AWS Cognito
- 🔧 Define callbacks para manejar tokens JWT y sesiones
- 🔧 Especifica páginas personalizadas (login, error)
- 🔧 Guarda tokens de acceso, refresh e ID tokens en la sesión

**Callbacks importantes:**
- **`jwt`**: Se ejecuta al hacer login. Guarda los tokens de Cognito en el JWT.
- **`session`**: Se ejecuta en cada request. Pasa los tokens a la sesión del cliente.

---

#### 3. **`src/app/api/auth/[...nextauth]/route.ts`** - API Handler
```typescript
// Route handler que maneja todas las rutas de autenticación
```
**Responsabilidades:**
- 🌐 Expone endpoints de NextAuth (`/api/auth/signin`, `/api/auth/callback`, etc.)
- 🌐 Maneja el flujo OAuth con Cognito
- 🌐 Procesa callbacks y genera sesiones

**Endpoints generados automáticamente:**
- `GET/POST /api/auth/signin` - Inicia el login
- `GET/POST /api/auth/callback/cognito` - Callback de OAuth
- `GET/POST /api/auth/signout` - Cierra sesión
- `GET /api/auth/session` - Obtiene la sesión actual

---

#### 4. **`src/modules/auth/components/login-button.tsx`** - Componente de Login
```typescript
// Botón que inicia el flujo de autenticación
```
**Responsabilidades:**
- 🎨 Interfaz de usuario para iniciar sesión
- 🎨 Llama a `signIn("cognito")` de NextAuth
- 🎨 Redirige al User Pool de Cognito

---

#### 5. **`src/modules/auth/components/logout-button.tsx`** - Componente de Logout
```typescript
// Botón que cierra la sesión del usuario
```
**Responsabilidades:**
- 🎨 Interfaz de usuario para cerrar sesión
- 🎨 Llama a `signOut()` de NextAuth
- 🎨 Limpia tokens y redirige a la página de login

---

#### 6. **`src/types/next-auth.d.ts`** - Tipos de TypeScript
```typescript
// Extensión de tipos de NextAuth para incluir tokens personalizados
```
**Responsabilidades:**
- 📝 Define tipos para `accessToken`, `idToken`, `refreshToken`
- 📝 Proporciona autocompletado y type-safety en toda la aplicación

---

### Flujo de Autenticación

#### **Escenario 1: Usuario No Autenticado**

1. Usuario intenta acceder a `https://app.com/dashboard`
2. **Middleware** detecta que no hay token de sesión
3. Redirige automáticamente a `https://app.com/auth/login`
4. Usuario hace clic en **"Iniciar Sesión"**
5. NextAuth redirige a la página de login de **AWS Cognito**
6. Usuario ingresa credenciales en Cognito
7. Cognito valida y redirige con código de autorización
8. NextAuth intercambia código por tokens (access, ID, refresh)
9. **Callback `jwt`** guarda los tokens en el JWT
10. **Callback `session`** pasa los tokens a la sesión
11. Usuario es redirigido a `/dashboard` con sesión activa ✅

#### **Escenario 2: Usuario Ya Autenticado**

1. Usuario con sesión activa accede a `https://app.com/dashboard`
2. **Middleware** verifica token (válido)
3. Permite acceso directo a `/dashboard` ✅

#### **Escenario 3: Usuario Autenticado en Raíz**

1. Usuario autenticado accede a `https://app.com/`
2. **Middleware** detecta token válido
3. Redirige automáticamente a `https://app.com/dashboard` ✅

#### **Escenario 4: Cierre de Sesión**

1. Usuario hace clic en **"Cerrar Sesión"**
2. Componente `LogoutButton` llama a `signOut()`
3. NextAuth limpia cookies y tokens
4. Usuario es redirigido a `/auth/login` ✅

---

### Configuración

#### Variables de Entorno Requeridas

Crea un archivo `.env.local` con las siguientes variables:

```bash
# AWS Cognito Configuration
COGNITO_CLIENT_ID=tu_client_id_aqui
COGNITO_CLIENT_SECRET=tu_client_secret_aqui
COGNITO_ISSUER=https://cognito-idp.{region}.amazonaws.com/{user-pool-id}

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secret_aleatorio_aqui
```

**Cómo obtener las credenciales de Cognito:**
1. Ve a AWS Console → Cognito → User Pools
2. Selecciona tu User Pool
3. Ve a "App integration" → "App client list"
4. Copia el **Client ID** y **Client Secret**
5. El **Issuer** sigue el formato: `https://cognito-idp.[region].amazonaws.com/[user-pool-id]`

**Generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

### Ventajas de esta Implementación

- ✅ **Seguridad**: Protección de rutas a nivel de middleware (Edge Runtime)
- ✅ **Rendimiento**: Verificación antes de cargar componentes React
- ✅ **Escalabilidad**: Integración con AWS Cognito para gestión de usuarios
- ✅ **Developer Experience**: TypeScript completo con tipos seguros
- ✅ **Mantenibilidad**: Configuración centralizada en `auth.ts`
- ✅ **Tokens Persistentes**: Acceso a JWT, ID y Refresh tokens en la sesión

---

### Troubleshooting

#### Error: "ERR_TOO_MANY_REDIRECTS"
**Causa:** Bucle infinito de redirecciones en el middleware.
**Solución:** Verificar que las rutas públicas (`/auth/*`) estén excluidas en el callback `authorized`.

#### Error: "Cannot read properties of undefined (reading 'custom')"
**Causa:** Uso de `getToken` de `next-auth/jwt` con Cognito en Edge Runtime.
**Solución:** Usar `withAuth` en lugar de `getToken`.

#### Usuario no puede iniciar sesión
**Causa:** Variables de entorno incorrectas o User Pool mal configurado.
**Solución:**
1. Verificar que todas las variables de entorno estén configuradas
2. Verificar que el User Pool tenga un App Client configurado
3. Verificar que la Callback URL esté registrada en Cognito: `http://localhost:3000/api/auth/callback/cognito`

---

## 📚 Recursos Adicionales

- [Documentación de NextAuth.js](https://next-auth.js.org/)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

