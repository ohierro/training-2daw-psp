# Scripts de Automatización

Este directorio contiene scripts de utilidad para automatizar la generación de presentaciones y configuración de GitHub Pages.

## 📚 build-marp.sh

**Propósito**: Exportar todas las presentaciones Marp a HTML de forma dinámica.

### Características:
- ✅ Descubre automáticamente todos los subdirectorios de evaluaciones (1ev, 2ev, 3ev, etc.)
- ✅ Exporta cada evaluación y sus sesiones a HTML
- ✅ Genera un índice principal dinámico basado en los directorios encontrados
- ✅ Actualiza automáticamente las tarjetas de sesiones según lo encontrado
- ✅ Proporciona logs detallados del proceso

### Uso:
```bash
./build-marp.sh
```

### Requisitos:
- Node.js instalado
- Marp CLI instalado globalmente: `npm install -g @marp-team/marp-cli`

### Output:
Genera la carpeta `public/` con:
- `index.html` - Página principal con todas las evaluaciones y sesiones
- `presentations.html` - Slide Marp general
- Carpetas por evaluación (`1ev/`, `2ev/`, etc.)
  - `index.html` - Índice de la evaluación
  - `sesion-*.html` - Presentaciones de sesiones

## 🔧 setup-gh-pages.sh

**Propósito**: Configurar automáticamente la rama `gh-pages` para GitHub Pages.

### Características:
- ✅ Crea la rama `gh-pages` localmente si no existe
- ✅ La envía a GitHub automáticamente
- ✅ Proporciona instrucciones de configuración en GitHub

### Uso:
```bash
./setup-gh-pages.sh
```

### Requisitos:
- Git configurado
- Acceso al repositorio remoto en GitHub

## 🚀 Flujo Completo

### Primera vez:
```bash
# 1. Configurar la rama gh-pages
./setup-gh-pages.sh

# 2. Ir a GitHub y configurar Pages (Settings → Pages)
# 3. Asignar permisos al workflow (Settings → Actions → General)
```

### Cambios regulares:
```bash
# 1. Realizar cambios en presentations/
# 2. Hacer commit y push
# 3. El workflow se ejecutará automáticamente

# O ejecutar manualmente:
./build-marp.sh
```

## 📝 Personalización

### Agregar nuevas evaluaciones:
Solo crea una carpeta en `presentations/` con el nombre de la evaluación (ej: `3ev`, `4ev`):
```
presentations/
├── 1ev/
├── 2ev/
├── 3ev/  ← Nueva evaluación
│   ├── index.md
│   └── sesion-01-*/index.md
```

El script detectará automáticamente la nueva evaluación.

### Personalizar descripciones y emojis:
En `build-marp.sh`, busca la sección:
```bash
case "$eval" in
    1ev) desc="..." emoji="🔶" ;;
    2ev) desc="..." emoji="🔷" ;;
    3ev) desc="..." emoji="🟢" ;;
```

## 🐛 Troubleshooting

### "marp no está instalado"
```bash
npm install -g @marp-team/marp-cli
```

### El index.html no se genera correctamente
- Verifica que existen directorios en `presentations/`
- Comprueba que cada evaluación tiene un `index.md`
- Revisa los logs del script para más detalles

### Los archivos no se suben a GitHub Pages
- Verifica que la rama `gh-pages` existe en GitHub
- Comprueba los permisos del workflow en Settings → Actions
- Revisa los logs del workflow en Actions
