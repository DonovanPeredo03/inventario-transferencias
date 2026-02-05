require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("./models/Usuario");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log("MongoDB conectado ✅");

  // borrar admins viejos
  await Usuario.deleteMany({ role: "admin" });
  console.log("Admins anteriores eliminados");

  // ⚠️ SIN hash manual
  const admin = new Usuario({
    username: "admin",
    password: "admin123", // ← texto plano
    role: "admin"
  });

  await admin.save(); // aquí el pre("save") hace el hash correcto

  console.log("Admin creado exitosamente ✅");
  process.exit(0);
})
.catch(err => {
  console.log("Error al conectar a MongoDB:", err);
});
