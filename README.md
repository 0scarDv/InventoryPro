# InventoryPro
Aplicacion web hecha con React, TypeScrip y Tailwind
Cuenta con un Login, un Dashboard, CRUD para productos, CRUD para categorias de prodcutos
Menu para realizar movimientos de productos (Stock) 
# Tecnologias
- TypeScript
- React 
- Tailwind
- Json-server(api simulada)

# Instalacion 
- Clonar el repositorio e instala las dependencias (npm i)
- En la terminal ejecutar npm run dev
- En una una nueva, npm run start (para correr nuestra api con JSON-SERVER)

# Inicio de sesion 
Admin:
Correo: admin@inventory.com
Contrasenha admin123

# Estructura del Proyecto
 
 ├─ components/     # Componentes y paginas 
 ├─ pages/          # Páginas principales
 ├─ routes/         # Configuración de rutas
 ├─ services/       # Lógica de comunicación con APIs
 ├─ hooks/          # Custom hooks
 ├─ types/          # Tipos de TypeScript
 ├─ App.tsx         # Componente principal
# Funcionalidades implementadas vs pendientes
Funcionalidad	Estado
Login / Autenticación	(falta agregar otros usuarios y autorizacion)
Registro de usuario	✅ Implementada
Rutas protegidas por rol	⚠️ En progreso
Gestión de sesión con JWT	(simulado)
Logout	✅ Implementada (sa sesion se cierra despues de 5 minutos)
Persistencia de sesión	⚠️ Pendiente
Dashboard con cards y graficos	✅ Implementada 
CRUD de productos 	✅ Implementada 
CRUD de categorias 	✅ Implementada 
CRUD de movimientos 	✅ Implementada 
Validaciones de formularios	✅ Implementada parcialmente (faltan algunas validaciones)

# Capturas de pantalla: 
https://drive.google.com/drive/folders/10KKl8JjNHfbZXSXRbeGXMJM1wVgFgBaQ?usp=sharing
