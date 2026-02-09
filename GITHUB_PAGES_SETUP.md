# GitHub Pages - Configuración de Pipeline Marp

## 📋 Descripción

Este pipeline automático exporta todas las presentaciones Marp a HTML y las publica en GitHub Pages cada vez que hay cambios en la rama `main`.

## 🚀 Configuración Rápida

### 1. Crear la rama `gh-pages` (si no existe)

```bash
cd /ruta/del/repositorio
chmod +x ./scripts/setup-gh-pages.sh
./scripts/setup-gh-pages.sh
```

Este script:
- Crea la rama `gh-pages` localmente
- La envía a GitHub
- Te muestra los próximos pasos

### 2. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En **Source**, selecciona **Deploy from a branch**
4. Configura:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Haz clic en **Save**

### 3. Configurar permisos del workflow

El workflow necesita permisos para escribir en la rama `gh-pages`:

1. Ve a **Settings** → **Actions** → **General**
2. En **Workflow permissions**, selecciona:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
3. Guarda los cambios

### 4. Primera ejecución

El workflow se ejecutará automáticamente cuando:
- Hagas push a la rama `main` con cambios en `presentations/`
- O ejecutes manualmente desde **Actions** → **Marp Export to GitHub Pages** → **Run workflow**

## 📁 Estructura esperada

```
presentations/
├── 2ev/
│   ├── index.md
│   ├── sesion-01-ecosistema-nodejs/
│   │   └── index.md
│   ├── sesion-02-javascript-typescript/
│   │   └── index.md
│   └── ... (más sesiones)
```

## 🔄 Cómo funciona

1. **Trigger**: Se ejecuta cuando hay cambios en `presentations/` en `main`
2. **Build**: 
   - Instala Node.js y Marp CLI
   - Exporta cada archivo `.md` a `.html`
   - Genera un index.html principal con enlaces a todas las presentaciones
3. **Deploy**: Publica los archivos HTML en GitHub Pages automáticamente

## 📊 Archivos generados

```
public/
├── index.html (página principal con enlaces)
└── 2ev/
    ├── index.html
    ├── sesion-01-ecosistema-nodejs.html
    ├── sesion-02-javascript-typescript.html
    └── ... (más sesiones)
```

## 🌐 Acceso a las presentaciones

Una vez configurado, las presentaciones estarán disponibles en:

```
https://tu-usuario.github.io/training-2daw-psp/
```

Y cada sesión en:

```
https://tu-usuario.github.io/training-2daw-psp/2ev/sesion-01-ecosistema-nodejs.html
```

## 🔧 Modificar el script

El script se encuentra en `scripts/build-marp.sh`. Puedes:

- Añadir nuevas carpetas de presentaciones
- Cambiar el formato de exportación (PDF, PPTX, etc.)
- Personalizar el index.html

## ⚠️ Solución de problemas

### El workflow no se ejecuta

1. Verifica que el archivo está en `.github/workflows/marp-export.yml`
2. Comprueba que tienes permisos de lectura/escritura en el repositorio
3. Revisa los logs en **Actions**

### Las presentaciones no aparecen

1. Verifica que los archivos `.md` están en `presentations/2ev/sesion-*/index.md`
2. Revisa que tienes contenido Marp válido (`---` y `marp: true`)
3. Comprueba los logs del workflow para errores de exportación

### Páginas no accesible

1. Ve a **Settings** → **Pages**
2. Asegúrate de que está habilitado y apunta a la rama `gh-pages`
3. Espera unos minutos después del primer deploy

## 📝 Notas

- El workflow se ejecuta solo cuando hay cambios en `presentations/`
- Los cambios en otras carpetas no dispararán la exportación
- Puedes forzar la ejecución manualmente desde el tab **Actions**
