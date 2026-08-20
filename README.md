# Proyecto: Sistema de Biblioteca

## Datos
* **Autor:** Alex
* **Módulo/Proyecto:** Gestión de Biblioteca

---

## Objetivo y Expectativas
En este proyecto espero aprender a:
1. Administrar de forma eficiente el flujo de trabajo colaborativo usando Git y GitHub.
2. Diseñar la estructura para la consulta, préstamo y devolución de libros.
3. Consolidar el uso de comandos de Git sin realizar cambios directos en la rama principal (`main`).

---

## Tecnologías / Herramientas
* **Git & GitHub** (Control de versiones)
* **Markdown** (Documentación)
* **Node.js + TypeScript + Express** (Servidor API REST)
* **PostgreSQL** (Base de datos)
* **Docker & Docker Compose** (Contenerización)

---

## 🐳 Levantar el proyecto con Docker

> **Requisito previo:** tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd onboarding-alex
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (al mismo nivel que `docker-compose.yml`):

```bash
# .env
DB_PASSWORD=tu_contraseña_segura
```

### 3. Levantar todos los servicios

```bash
docker compose up --build
```

Esto construirá la imagen del servidor, levantará PostgreSQL e iniciará la app. La primera vez tarda unos minutos mientras descarga las imágenes y compila TypeScript.

### 4. Verificar que funciona

| Endpoint | Descripción |
|---|---|
| `http://localhost:3000` | Frontend de la biblioteca |
| `http://localhost:3000/api/libros` | API REST – lista todos los libros |

### 5. Detener los servicios

```bash
# Detener sin borrar datos
docker compose down

# Detener Y borrar la base de datos
docker compose down -v
```

---

### ⚠️ Si el puerto 5432 ya está ocupado

Si tienes PostgreSQL instalado localmente, el contenedor `db` usa el puerto **5433** en tu máquina (internamente sigue siendo 5432). El servidor `app` se conecta directamente al contenedor por la red interna de Docker, por lo que **no necesitas cambiar nada**.

---

## Estructura del proyecto

```
onboarding-alex/
├── docker-compose.yml       # Orquesta los servicios app y db
├── .env                     # Variables de entorno (no subir a Git)
├── .dockerignore
├── index.html               # Frontend
├── script.js
├── styles.css
└── servidor/
    ├── Dockerfile           # Imagen del servidor Node.js
    ├── index.ts             # Código principal del servidor
    ├── tsconfig.json
    ├── package.json
    └── DB/
        ├── schema.sql       # Crea la tabla libros (se ejecuta automáticamente)
        └── seed.sql         # Datos iniciales (se ejecuta automáticamente)
```