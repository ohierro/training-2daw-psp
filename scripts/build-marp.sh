#!/bin/bash

# Script para exportar todos los archivos Marp a HTML de forma dinámica

set -e

PUBLIC_DIR="public"
PRESENTATIONS_DIR="presentations"

# Verificar que marp está disponible
if ! command -v marp &> /dev/null; then
    echo "❌ Error: marp no está instalado"
    exit 1
fi

echo "ℹ️  Versión de marp: $(marp --version)"

# Limpiar directorio público
rm -rf "$PUBLIC_DIR"
mkdir -p "$PUBLIC_DIR"

echo "🚀 Iniciando exportación de presentaciones Marp..."
echo "📁 Directorio de presentaciones: $PRESENTATIONS_DIR"  

# Función para exportar un archivo Marp
export_marp_file() {
    local input_file="$1"
    local output_file="$2"
    
    if [ -f "$input_file" ]; then
        echo "📄 Exportando: $input_file -> $output_file"
        if marp "$input_file" --html --output "$output_file"; then
            echo "   ✅ Exportado exitosamente"
        else
            echo "   ❌ Error exportando $input_file"
            return 1
        fi
    else
        echo "⚠️  Archivo no encontrado: $input_file"
    fi
}

# Función para procesar una evaluación completa
process_evaluation() {
    local eval_name="$1"
    local eval_dir="$PRESENTATIONS_DIR/$eval_name"
    
    if [ -d "$eval_dir" ]; then
        mkdir -p "$PUBLIC_DIR/$eval_name"
        
        # Exportar index.md de la evaluación
        export_marp_file "$eval_dir/index.md" "$PUBLIC_DIR/$eval_name/index.html"
        
        # Exportar cada sesión
        for session_dir in "$eval_dir"/sesion-*/; do
            if [ -d "$session_dir" ]; then
                session_name=$(basename "$session_dir")
                session_file="$session_dir/index.md"
                
                if [ -f "$session_file" ]; then
                    export_marp_file "$session_file" "$PUBLIC_DIR/$eval_name/${session_name}.html"
                fi
            fi
        done
    fi
}

# Exportar índice principal de presentaciones
export_marp_file "$PRESENTATIONS_DIR/index.md" "$PUBLIC_DIR/presentations.html"

# Procesar evaluaciones encontradas dinámicamente
echo ""
echo "🔍 Buscando evaluaciones..."
if [ -d "$PRESENTATIONS_DIR" ]; then
    for eval_dir in "$PRESENTATIONS_DIR"/*/; do
        if [ -d "$eval_dir" ]; then
            eval_name=$(basename "$eval_dir")
            # Ignorar archivos que no son directorios válidos
            if [[ "$eval_name" != "." && "$eval_name" != ".." ]]; then
                echo "📚 Procesando evaluación: $eval_name"
                process_evaluation "$eval_name"
            fi
        fi
    done
fi

# Generar index.html dinámico basado en directorios encontrados
echo ""
echo "🎨 Generando índice HTML principal..."

# Recolectar evaluaciones
declare -a EVAL_DIRS
for eval_dir in "$PUBLIC_DIR"/*/; do
    if [ -d "$eval_dir" ]; then
        eval_name=$(basename "$eval_dir")
        EVAL_DIRS+=("$eval_name")
    fi
done

# Generar datos JSON para el HTML
EVAL_DATA="{"
first=true
for eval in "${EVAL_DIRS[@]}"; do
    if [ "$first" = true ]; then
        first=false
    else
        EVAL_DATA+=","
    fi
    
    # Obtener descripción según el nombre
    case "$eval" in
        1ev) desc="Programación Concurrente: Threading, sincronización y patrones en Java" ;;
        2ev) desc="Backend Moderno: Node.js, Express y NestJS con JavaScript/TypeScript" ;;
        3ev) desc="Tercera Evaluación" ;;
        *) desc="Evaluación $eval" ;;
    esac
    
    # Obtener emoji
    case "$eval" in
        1ev) emoji="🔶" ;;
        2ev) emoji="🔷" ;;
        3ev) emoji="🟢" ;;
        *) emoji="📚" ;;
    esac
    
    # Recolectar sesiones
    SESSIONS="["
    first_session=true
    for session_file in "$PUBLIC_DIR/$eval"/sesion-*.html; do
        if [ -f "$session_file" ]; then
            if [ "$first_session" = true ]; then
                first_session=false
            else
                SESSIONS+=","
            fi
            
            filename=$(basename "$session_file")
            name=$(echo "$filename" | sed 's/.html//' | sed 's/sesion-/Sesión /' | sed 's/-/ /g')
            SESSIONS+="{\"file\":\"$filename\",\"name\":\"$name\"}"
        fi
    done
    SESSIONS+="]"
    
    EVAL_DATA+="\"$eval\":{\"name\":\"$eval\",\"emoji\":\"$emoji\",\"desc\":\"$desc\",\"sessions\":$SESSIONS}"
done
EVAL_DATA+="}"

# Crear index.html con datos incrustados
cat > "$PUBLIC_DIR/index.html" << 'HTML_EOF'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presentaciones 2DAW - PSP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            color: white;
            text-align: center;
            margin-bottom: 15px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .subtitle {
            color: rgba(255, 255, 255, 0.9);
            text-align: center;
            margin-bottom: 50px;
            font-size: 1.1em;
        }
        
        .curriculum-section {
            margin-bottom: 50px;
        }
        
        .curriculum-section h2 {
            color: white;
            margin-bottom: 20px;
            font-size: 1.8em;
            padding-bottom: 10px;
            border-bottom: 3px solid rgba(255, 255, 255, 0.3);
        }
        
        .section-description {
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 20px;
            font-size: 1em;
            line-height: 1.6;
        }
        
        .presentations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .presentation-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        
        .presentation-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .presentation-card a {
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .card-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            font-size: 1.2em;
            font-weight: 600;
        }
        
        .card-content {
            padding: 20px;
            color: #333;
        }
        
        .card-content p {
            margin-bottom: 0;
            line-height: 1.6;
            color: #666;
            font-size: 0.95em;
        }
        
        .card-footer {
            padding: 15px 20px;
            background: #f8f9fa;
            border-top: 1px solid #e9ecef;
            font-weight: 500;
            color: #667eea;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .card-footer::after {
            content: "→";
            font-size: 1.5em;
        }
        
        footer {
            text-align: center;
            color: white;
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📚 Presentaciones 2DAW - PSP</h1>
        <p class="subtitle">Ciclo Formativo de Grado Superior</p>
        <p class="subtitle">Profesor: Óliver Hierro Amón</p>
        <p class="subtitle">Repositorio del curso 💻: <a href="https://github.com/ohierro/training-2daw-psp">https://github.com/ohierro/training-2daw-psp</a></p>
        
        <div id="content"></div>
        
        <footer>
            <p>🔄 Generado automáticamente por GitHub Actions • Última actualización: <span id="updated"></span></p>
        </footer>
    </div>
    
    <script>
        const evaluationsData = EVAL_DATA_PLACEHOLDER;
        const contentDiv = document.getElementById('content');
        
        // Procesar cada evaluación
        Object.keys(evaluationsData).sort().forEach(evalKey => {
            const eval = evaluationsData[evalKey];
            const section = document.createElement('div');
            section.className = 'curriculum-section';
            
            let cardsHTML = `<div class="presentations-grid">`;
            
            // Tarjeta del índice general
            cardsHTML += `
                <div class="presentation-card">
                    <a href="./${eval.name}/index.html">
                        <div class="card-header">📋 Índice</div>
                        <div class="card-content">
                            <p>${eval.desc}</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
            `;
            
            // Tarjetas de sesiones
            eval.sessions.forEach((session, idx) => {
                const number = idx + 1;
                cardsHTML += `
                    <div class="presentation-card">
                        <a href="./${eval.name}/${session.file}">
                            <div class="card-header">📌 Sesión ${number}</div>
                            <div class="card-content">
                                <p>${session.name}</p>
                            </div>
                            <div class="card-footer">Ver</div>
                        </a>
                    </div>
                `;
            });
            
            cardsHTML += `</div>`;
            
            section.innerHTML = `
                <h2>${eval.emoji} Evaluación ${eval.name.toUpperCase()}</h2>
                <p class="section-description">${eval.desc}</p>
                ${cardsHTML}
            `;
            
            contentDiv.appendChild(section);
        });
        
        // Actualizar timestamp
        document.getElementById('updated').textContent = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    </script>
</body>
</html>
HTML_EOF

# Insertar los datos reales en el HTML (escapar caracteres especiales para sed)
EVAL_DATA_ESCAPED=$(echo "$EVAL_DATA" | sed 's/[&/\]/\\&/g')
sed -i "s/EVAL_DATA_PLACEHOLDER/$EVAL_DATA_ESCAPED/g" "$PUBLIC_DIR/index.html"

echo "✅ Índice HTML generado dinámicamente"
echo ""
echo "✅ Exportación completada"
echo ""
echo "📊 Resumen de archivos generados:"
echo "   - Total de archivos: $(find "$PUBLIC_DIR" -type f | wc -l)"
echo "   - Archivos HTML: $(find "$PUBLIC_DIR" -name "*.html" | wc -l)"
echo "   - Evaluaciones procesadas: ${#EVAL_DIRS[@]}"
echo ""
echo "📁 Estructura de directorios:"
find "$PUBLIC_DIR" -type d | sed 's|[^/]*/|  |g'
echo ""
echo "📄 Archivos generados:"
find "$PUBLIC_DIR" -type f | sort
echo ""
echo "✨ El contenido está listo para GitHub Pages"
