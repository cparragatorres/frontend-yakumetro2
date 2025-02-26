# 📌 Yakumetro2 - Frontend

¡Bienvenido al repositorio del frontend de Yakumetro2! 🚀 Este proyecto está desarrollado con **React** y **TypeScript** para la visualización del consumo de agua potable.

---

## 📌 **Tecnologías utilizadas**

- ⚛️ **React** (Framework para el frontend)
- 💙 **TypeScript** (Tipado estático y mejores prácticas)
- 🎨 **CSS** (Estilos y diseño responsivo)
- 📡 **Axios** (Para consumir el backend con FastAPI)
- 📊 **Chart.js** (Para los gráficos de consumo de agua)

---

## 📂 **Estructura del proyecto**

```bash
frontend/
│── public/               # Archivos estáticos
│── src/                  # Código fuente principal
│   ├── assets/           # Imagenes y otros recursos
│   ├── components/       # Componentes reutilizables
│   ├── models/           # Modelos de datos para TypeScript
│   ├── pages/            # Páginas principales
│   ├── services/         # Llamadas a la API
│   ├── App.tsx           # Componente principal
│   ├── index.tsx         # Punto de entrada de la aplicación
│── package.json          # Dependencias y scripts
│── tsconfig.json         # Configuración de TypeScript
│── .gitignore            # Archivos y carpetas a ignorar en Git
│── README.md             # Documentación del proyecto
```

---

## 📦 **Instalación y ejecución**

### 🔧 **1. Clonar el repositorio**
```sh
git clone git@github.com:tuusuario/frontend-yakumetro2.git
cd frontend-yakumetro2
```

### 📦 **2. Instalar dependencias**
```sh
npm install axios
```

### 🚀 **3. Ejecutar el proyecto**
```sh
npm start
```
El frontend se ejecutará en **http://localhost:3000**

---

## 🔌 **Conexión con el backend**
El backend está desarrollado en **FastAPI** y se conecta a una base de datos **Oracle**. Para que la aplicación funcione correctamente, asegúrate de que el backend esté corriendo y expuesto en una URL accesible.

> 📌 **Nota:** La URL del backend debe configurarse en el archivo **.env** o directamente en el servicio de Axios.

---

## 🛠 **Comandos útiles**

### ✅ **Ejecutar linter y formateo**
```sh
npm run lint  # Revisar errores de código
npm run format  # Formatear el código
```

### 🚀 **Compilar para producción**
```sh
npm run build
```

---

## 📝 **Commits Semánticos**
Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mantener el historial limpio.
Ejemplos:

- `feat: agregar formulario de búsqueda`
- `fix: corregir validación en input`
- `docs: actualizar documentación`
- `chore: actualizar dependencias`

---

📌 _Desarrollado con ❤️ por cparragatorres_
