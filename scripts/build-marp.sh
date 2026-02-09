#!/bin/bash

# Script para exportar todos los archivos Marp a HTML

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

# Procesar evaluaciones
process_evaluation "1ev"
process_evaluation "2ev"

# Crear índice HTML principal
cat > "$PUBLIC_DIR/index.html" << 'EOF'
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
            margin-bottom: 15px;
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
        
        <!-- PRIMERA EVALUACIÓN -->
        <div class="curriculum-section">
            <h2>🔶 Primera Evaluación (1EV)</h2>
            <p class="section-description">Fundamentos de Programación Concurrente: Threading, sincronización y patrones de concurrencia en Java.</p>
            <div class="presentations-grid">
                <div class="presentation-card">
                    <a href="./1ev/index.html">
                        <div class="card-header">📋 Índice General 1EV</div>
                        <div class="card-content">
                            <p>Visión general del currículo de programación concurrente.</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
            </div>
        </div>
        
        <!-- SEGUNDA EVALUACIÓN -->
        <div class="curriculum-section">
            <h2>🔷 Segunda Evaluación (2EV)</h2>
            <p class="section-description">Currículo Node.js y NestJS: Backend moderno con JavaScript/TypeScript, desde fundamentos hasta persistencia de datos.</p>
            <div class="presentations-grid">
                <div class="presentation-card">
                    <a href="./2ev/index.html">
                        <div class="card-header">📋 Índice General 2EV</div>
                        <div class="card-content">
                            <p>Visión general del currículo completo de Node.js y NestJS.</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
                
                <div class="presentation-card">
                    <a href="./2ev/sesion-01-ecosistema-nodejs.html">
                        <div class="card-header">🌍 Sesión 1</div>
                        <div class="card-content">
                            <p>El Ecosistema Node.js</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
                
                <div class="presentation-card">
                    <a href="./2ev/sesion-02-javascript-typescript.html">
                        <div class="card-header">💻 Sesión 2</div>
                        <div class="card-content">
                            <p>JavaScript y TypeScript</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
                
                <div class="presentation-card">
                    <a href="./2ev/sesion-03-fundamentos-express.html">
                        <div class="card-header">⚡ Sesión 3</div>
                        <div class="card-content">
                            <p>Fundamentos de Express</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
                
                <div class="presentation-card">
                    <a href="./2ev/sesion-04-nestjs-arquitectura.html">
                        <div class="card-header">🏗️ Sesión 4</div>
                        <div class="card-content">
                            <p>NestJS y Arquitectura</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
                
                <div class="presentation-card">
                    <a href="./2ev/sesion-05-controladores-rutas.html">
                        <div class="card-header">🛣️ Sesión 5</div>
                        <div class="card-content">
                            <p>Controladores y Rutas</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
                
                <div class="presentation-card">
                    <a href="./2ev/sesion-06-proveedores-servicios.html">
                        <div class="card-header">🔧 Sesión 6</div>
                        <div class="card-content">
                            <p>Proveedores y Servicios</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
                
                <div class="presentation-card">
                    <a href="./2ev/sesion-07-validacion-datos.html">
                        <div class="card-header">✅ Sesión 7</div>
                        <div class="card-content">
                            <p>Validación de Datos</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
                
                <div class="presentation-card">
                    <a href="./2ev/sesion-08-persistencia-datos.html">
                        <div class="card-header">💾 Sesión 8</div>
                        <div class="card-content">
                            <p>Persistencia de Datos</p>
                        </div>
                        <div class="card-footer">Ver</div>
                    </a>
                </div>
            </div>
        </div>
        
        <footer>
            <p>🔄 Generado automáticamente por GitHub Actions • Última actualización: <span id="updated"></span></p>
        </footer>
    </div>
    
    <script>
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
EOF

echo ""
echo "✅ Exportación completada"
echo ""
echo "📊 Resumen de archivos generados:"
echo "   - Total de archivos: $(find "$PUBLIC_DIR" -type f | wc -l)"
echo "   - Archivos HTML: $(find "$PUBLIC_DIR" -name "*.html" | wc -l)"
echo ""
echo "📁 Estructura de directorios:"
find "$PUBLIC_DIR" -type d | sed 's|[^/]*/|  |g'
echo ""
echo "📄 Archivos generados:"
find "$PUBLIC_DIR" -type f | sort
echo ""
echo "✨ El contenido está listo para GitHub Pages"
