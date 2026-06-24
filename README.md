# Dashboard de Equipos Informáticos — ILM

Aplicación web para la gestión, relevamiento y monitoreo del inventario de equipos informáticos del **Instituto Leonardo Murialdo**.

Antes de este sistema, el instituto no contaba con ningún registro digital de sus equipos: no había planillas, ni base de datos, ni forma de saber el estado de las computadoras de cada aula. Este proyecto resuelve ese problema desde cero, centralizando toda la información en un solo lugar accesible desde cualquier dispositivo.

---

## ¿Qué hace?

El sistema permite tener una visión completa y siempre actualizada del parque de equipos del instituto: **57 computadoras distribuidas en 5 aulas**, con todos sus datos de hardware, estado operativo y alertas en tiempo real.

### Dashboard

Pantalla principal con un resumen instantáneo del estado de todos los equipos:

- 6 métricas clave: total de PCs, operativas, no operativas, con SSD, cantidad de aulas y porcentaje de disponibilidad.
- Gráfico de estado por aula (operativas vs. no operativas).
- Distribución de memoria RAM entre todas las PCs.
- Top de modelos de CPU más comunes.
- Comparativa de HDD vs SSD por aula.

Todos los gráficos se actualizan automáticamente al modificar los datos.

### Inventario

Tabla completa de todas las computadoras con información detallada de hardware: procesador, velocidades, núcleos, caché, memoria RAM, tipo y velocidad, disco, capacidad y observaciones.

- Filtros por aula, estado, RAM, tipo de disco y búsqueda de texto libre.
- Edición y eliminación de equipos desde una interfaz visual.
- Alta manual de nuevas computadoras.

### Alertas automáticas

El sistema detecta solo y muestra los equipos que necesitan atención:

- PCs no operativas.
- Velocidad de CPU degradada (por debajo del 65% de la velocidad base).
- Memoria RAM insuficiente (4 GB o menos).
- Equipos con observaciones pendientes de revisión.

Desde cada alerta se puede ir directamente a editar la PC correspondiente.

### Carga de equipos con Inteligencia Artificial

Una de las funciones más potentes: permite cargar nuevas computadoras simplemente **sacando fotos al Administrador de tareas de Windows**.

- Se suben hasta 4 fotos por PC (etiqueta, CPU, RAM y disco).
- La IA lee las imágenes y extrae automáticamente todas las especificaciones de hardware.
- Detecta el número de PC leyendo la etiqueta física en la foto.
- Procesa varias computadoras a la vez en lotes automáticos.
- Muestra una vista previa editable antes de guardar, para corregir cualquier dato.

### Traspaso de equipos entre aulas

Permite mover una o varias PCs de un aula a otra con un solo clic, algo muy habitual en el día a día del instituto. El sistema renumera automáticamente los equipos en el aula de origen y destino, y registra el movimiento en el historial.

### Sincronización con la nube

Todos los datos se sincronizan automáticamente con **Google Sheets**, que funciona como base de datos en la nube:

- Cualquier cambio desde el dashboard se guarda al instante.
- Cualquier cambio hecho directamente en el Sheet se refleja al recargar.
- Los datos quedan accesibles para cualquier persona autorizada, desde cualquier lugar.
- El historial de versiones de Google Drive sirve como backup automático.

### Historial y reportes

- Registro cronológico de todos los cambios realizados (altas, ediciones, bajas y traspasos).
- Exportación de reportes en PDF con todos los equipos de todas las aulas.
- Importación y exportación de datos en formato JSON para backup o migración.

---

## ¿Qué NO hace?

Para tener expectativas claras, el sistema:

- No gestiona el software instalado en cada PC (solo hardware).
- No realiza inventario de periféricos (teclados, monitores, mouse).
- No tiene sistema de usuarios ni control de acceso por contraseña.
- No envía notificaciones automáticas por correo o mensajes.
- No se conecta directamente a las PCs para leer datos en tiempo real.

---

## Tecnologías

El sistema es una aplicación web de página única (SPA) sin backend tradicional. Toda la lógica corre en el navegador y la persistencia se logra mediante Google Sheets a través de una API REST en Google Apps Script.

| Tecnología | Uso |
|------------|-----|
| JavaScript (ES6+) | Lógica completa de la aplicación |
| HTML5 + CSS3 | Estructura y diseño de la interfaz |
| Chart.js | Gráficos interactivos del dashboard |
| Google Apps Script | API REST que conecta con la base de datos |
| Google Sheets | Base de datos en la nube |
| OpenRouter API | Inteligencia artificial / visión por computadora |
| Node.js | Servidor para despliegue en la nube |

---

## Sobre el proyecto

Desarrollado por alumnos de **7° año Informática (2026)** como proyecto escolar real, presentado y aprobado por el instituto.

*Instituto Leonardo Murialdo — Panel de gestión técnica*
