# 📊 Implementación de Analytics con PostHog

## 🎯 Eventos Implementados

### 1. **Creación de Productos**
- **`product_creation_started`** - Cuando inicia la creación de un producto
- **`product_creation_step`** - Progreso por cada paso del formulario
- **`product_creation_abandoned`** - Abandono del formulario antes de completar
- **`product_published`** - Producto publicado exitosamente

**Ubicación**: `src/components/product-form/CreateProductForm.tsx`

### 2. **Clicks y Navegación de Productos**
- **`product_clicked`** - Click en card de producto
- **`product_detail_viewed`** - Vista de página de detalle
- **`external_link_clicked`** - Click en enlaces externos (website, GitHub)

**Ubicaciones**: 
- `src/components/AppCard.tsx`
- `src/components/ProductDetailAnalytics.tsx`
- `src/app/app/[id]/page.tsx`

### 3. **Sistema de Votos**
- **`product_voted`** - Voto a producto (upvote/downvote/remove)
- **`vote_auth_required`** - Intento de voto sin autenticación

**Ubicaciones**:
- `src/components/AppCard.tsx`
- `src/hooks/useVotes.ts`

### 4. **Perfiles de Usuario**
- **`user_profile_clicked`** - Click en nombre de maker
- **`user_profile_viewed`** - Vista de perfil de usuario
- **`user_followed`** - Seguir/dejar de seguir usuario

**Ubicaciones**:
- `src/components/AppCard.tsx`
- `src/components/maker-profile/MakerProfileHero.tsx`

### 5. **Búsquedas**
- **`search_performed`** - Búsqueda realizada con resultados

**Ubicación**: `src/components/ProductsPageContent.tsx`

## 🔧 Hook Principal

**`useAnalytics`** (`src/hooks/useAnalytics.ts`)
- Centraliza todas las funciones de tracking
- Añade automáticamente `user_id` y `timestamp`
- Integra con NextAuth para datos de usuario

## 📋 Propiedades Rastreadas

### **Metadatos Automáticos**
- `user_id` - ID del usuario autenticado
- `timestamp` - Marca de tiempo ISO

### **Creación de Producto**
- Tiempo total de completado
- Campos completados/abandonados
- Paso donde se abandonó
- Tipo de producto y características

### **Engagement de Producto**
- Posición en listado
- Fuente del click (`feed`, `search`, `featured`)
- Total de productos mostrados
- Categoría del producto

### **Votos**
- Estado previo del voto
- Conteo actual de votos
- Fuente del voto (`product_card`, `product_detail`)

### **Búsquedas**
- Término de búsqueda
- Número de resultados
- Fuente de búsqueda (`header`, `page`)

## 🎯 Métricas Clave a Monitorear

### **Funnel de Creación**
```
product_creation_started → product_creation_step → product_published
```

### **Engagement Pipeline**
```
product_clicked → product_detail_viewed → external_link_clicked
```

### **Conversión de Votos**
```
product_viewed → product_voted
```

### **Descubrimiento**
```
search_performed → product_clicked → product_detail_viewed
```

## 🚀 Configuración

1. **Instalar PostHog**: `pnpm add posthog-js`
2. **Variables de entorno** (`.env.local`):
   ```env
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
   ```
3. **Provider configurado** en `src/app/providers.tsx`
4. **Hook disponible** globalmente via `useAnalytics()`

## 📊 Dashboards Sugeridos

### **Producto**
- Productos más votados por período
- Tasa de conversión de vista → voto
- Enlaces externos más clickeados

### **Usuario**
- Tiempo promedio de creación de producto
- Tasa de abandono por paso
- Usuarios más activos

### **Búsqueda**
- Términos más buscados
- Búsquedas sin resultados
- Conversión búsqueda → click

### **Navegación**
- Fuentes de tráfico más efectivas
- Productos con mejor CTR
- Patrones de navegación

## 🔄 Próximos Pasos

- [ ] Tracking de filtros aplicados
- [ ] Eventos de comentarios
- [ ] Seguimiento de makers
- [ ] Métricas de retención
- [ ] A/B testing de features 