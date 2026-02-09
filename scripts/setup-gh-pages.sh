#!/bin/bash

# Script para crear la rama gh-pages en GitHub

echo "🔧 Configurando rama gh-pages para GitHub Pages..."

# Verificar si estamos en un repositorio git
if [ ! -d ".git" ]; then
    echo "❌ No estás en un repositorio git"
    exit 1
fi

# Verificar si la rama ya existe localmente
if git show-ref --quiet refs/heads/gh-pages; then
    echo "⚠️  La rama gh-pages ya existe localmente"
else
    echo "📝 Creando rama gh-pages vacía..."
    git checkout --orphan gh-pages
    git rm -rf .
    
    # Crear un archivo README temporal
    cat > README.md << 'EOF'
# GitHub Pages - Presentaciones 2DAW PSP

Esta rama contiene los archivos HTML generados automáticamente a partir de las presentaciones Marp.

Los archivos se regeneran automáticamente cuando hay cambios en `presentations/` en la rama `main`.
EOF
    
    git add README.md
    git commit -m "Initial commit for gh-pages branch"
    echo "✅ Rama gh-pages creada localmente"
fi

# Volver a la rama main
echo "🔄 Volviendo a la rama main..."
git checkout main

# Push de la rama gh-pages
echo "📤 Enviando rama gh-pages a GitHub..."
git push origin gh-pages

echo ""
echo "✅ Rama gh-pages creada y enviada a GitHub"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a Settings → Pages"
echo "2. En 'Source', selecciona 'Deploy from a branch'"
echo "3. Selecciona rama: 'gh-pages'"
echo "4. Selecciona folder: '/ (root)'"
echo "5. Haz clic en 'Save'"
echo ""
echo "¡Listo! El workflow se ejecutará automáticamente en el próximo push."
