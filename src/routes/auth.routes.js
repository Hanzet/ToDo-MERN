import { Router } from 'express';
import { login,
    register,
    logout,
    profile,
    verifyToken
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post("/register", validateSchema(registerSchema), register); // Para registrar el usuario primero se valida el esquema y luego se llama a la función register
router.post("/login", login, validateSchema(loginSchema), login); // Para loguear al usuario primero se llama a la función login y luego se valida el esquema
router.post("/logout", logout); // Para desloguear al usuario se llama a la función logout
router.get("/verify", verifyToken); // Para verificar el token primero se valida el token y luego se envía un mensaje
router.get("/profile", authRequired, profile); // Para obtener el perfil del usuario primero se valida el token y luego se llama a la función profile

export default router;