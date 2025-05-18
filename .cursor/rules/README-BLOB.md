# Configuración de Vercel Blob

Este proyecto utiliza [Vercel Blob](https://vercel.com/docs/vercel-blob) para el almacenamiento de archivos (iconos y capturas de pantalla de productos).

## Pasos para configurar Vercel Blob

### 1. Instalar el paquete

Ejecuta el siguiente comando para instalar el SDK de Vercel Blob:

```bash
npm install @vercel/blob
# o con pnpm
pnpm add @vercel/blob
# o con yarn
yarn add @vercel/blob
```

### 2. Configurar el token

Necesitas agregar un token de Vercel Blob a tus variables de entorno. Hay dos formas de hacerlo:

#### Opción A: Usando la CLI de Vercel (recomendado)

Si el proyecto está enlazado a Vercel:

```bash
vercel env add BLOB_READ_WRITE_TOKEN
```

Luego, sigue las instrucciones para agregar el token en los tres entornos (producción, previsualización y desarrollo).

#### Opción B: Crear un Store manualmente

1. Ve a la [consola de Vercel](https://vercel.com)
2. Navega a Storage → Blob
3. Crea un nuevo store
4. Copia el token de lectura/escritura
5. Añade este token a tu archivo `.env.local`:

```
BLOB_READ_WRITE_TOKEN=tu_token_aquí
```

### 3. Para desarrollo local

Para desarrollo local, asegúrate de tener un archivo `.env.local` con la siguiente variable:

```
BLOB_READ_WRITE_TOKEN=tu_token_aquí
```

## Cómo funciona

El SDK de Vercel Blob se utiliza en el archivo `src/app/products/actions.ts` para subir los archivos de iconos y capturas de pantalla directamente a Vercel Blob. Las URLs generadas se guardan en la base de datos y se pueden usar para mostrar las imágenes.

Beneficios:
- Mejor escalabilidad
- Mayor confiabilidad
- Acceso más rápido a los archivos
- No es necesario preocuparse por el almacenamiento local o la gestión de archivos en el servidor 