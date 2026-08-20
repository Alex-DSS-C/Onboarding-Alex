# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app/servidor

# Instalar dependencias (incluye devDeps para compilar TypeScript)
COPY servidor/package.json servidor/package-lock.json ./
RUN npm ci

# Copiar fuentes del servidor y compilar → dist/
COPY servidor/ .
RUN npm run build

# ── Stage 2: Production ──────────────────────────────────────────────────────
FROM node:22-alpine AS production

# La app espera el frontend en __dirname/../.. desde dist/index.js
# es decir: /app/servidor/dist/../../ = /app/
# Copiamos el frontend ahí y el servidor en /app/servidor/
WORKDIR /app

# Archivos del frontend (index.html, script.js, styles.css)
COPY index.html script.js styles.css ./

# Solo dependencias de producción del servidor
WORKDIR /app/servidor
COPY servidor/package.json servidor/package-lock.json ./
RUN npm ci --omit=dev

# Compilado del stage anterior
COPY --from=builder /app/servidor/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
