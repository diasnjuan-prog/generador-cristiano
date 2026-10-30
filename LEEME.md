# Mi Generador Cristiano — guía paso a paso

Qué es: una página web con su propio servidor. La clave de IA vive SOLO en el servidor (archivo `.env`), nunca en el navegador.

## Estructura
- `server.js` → servidor: crea frases e imágenes con la API y guarda el historial
- `daily.js` → crea 5 imágenes de golpe (para la generación diaria programada)
- `public/index.html` → la página (se adapta a Android)
- `.env.example` → plantilla de tus claves
- `data/` → se crea sola: imágenes e historial

## 1. Probarla en tu computadora
1. Instala Node.js (versión LTS) desde nodejs.org.
2. Abre la carpeta en una terminal y escribe: `npm install`
3. Copia `.env.example` como `.env` y rellénalo (paso 2).
4. Escribe: `npm start` y abre http://localhost:3000

## 2. Conectar el generador real de imágenes (OpenAI)
1. Crea una cuenta en platform.openai.com → «API keys» → crear clave.
2. Agrega saldo en «Billing». Para el modelo de imágenes puede pedirte verificar tu organización.
3. En `.env` pon `OPENAI_API_KEY=` con tu clave y en `APP_PASSWORD=` una contraseña tuya (evita que extraños gasten tu saldo).
4. Nunca compartas ni subas `.env`.

**Costo (aproximado, confírmalo en openai.com/api/pricing):** una imagen vertical cuesta unos 0,02 US$ en calidad `low`, unos 0,06 US$ en `medium` (la que viene por defecto) y unos 0,25 US$ en `high`. Cinco imágenes diarias en `medium` serían ≈ 0,30 US$/día (≈ 9 US$/mes), más centavos por las frases. Cambia la calidad con `IMAGE_QUALITY`.

## 3. Publicarla en Internet (ejemplo con Render.com)
1. Sube esta carpeta a un repositorio de GitHub (sin `.env`).
2. En render.com: New → Web Service → elige tu repositorio. Build: `npm install`. Start: `npm start`.
3. En «Environment» agrega `OPENAI_API_KEY`, `APP_PASSWORD` e `IMAGE_QUALITY`.
4. Importante: el plan gratis borra los archivos al reiniciar. Para conservar el historial agrega un «Disk» (plan de pago) montado en `/var/data` y define `DATA_DIR=/var/data`.
5. Abre tu dirección `https://...onrender.com` en el celular y, en Chrome de Android, menú ⋮ → «Añadir a pantalla de inicio».

## 4. Generación diaria automática
La página cerrada NO genera nada sola: hace falta algo que la active. Opción: en Render crea un «Cron Job» con comando `node daily.js`, horario `0 11 * * *` (hora UTC) y variables `BASE_URL` (la dirección de tu web) y `APP_PASSWORD`. Cada día creará 5 imágenes que verás en «Hoy». Tiene costo adicional del servicio y de la API.

## 5. Descargar todo
Cada imagen se descarga en PNG 1080×1920 (9:16) con la frase integrada. «Descargar todas» crea un ZIP del día (con un `frases.txt`); en «Anteriores» hay un ZIP por cada día.

## Notas honestas
- Si algo falla (saldo, clave, verificación), la página muestra el error real; no inventa imágenes.
- Los resultados con rostros de personajes bíblicos dependen del modelo: revisa cada imagen antes de publicar.
- Las frases se comparan con tu historial para no repetirse; las marcadas «Inspirada en…» deben tener su referencia, revísala.
