const Router = require('express');
const {
    register,
    login,
    verification,
    forgotPassword,
    getDetailsUser,
    updateUser
    // 	handleLoginWithGoogle,
} = require('../controllers/authController');

const authRouter = Router();


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/verification', verification);
authRouter.post('/forgotPassword', forgotPassword);
authRouter.get('/get-details/:id', getDetailsUser)
authRouter.put('/update-user/:id', updateUser)
// authRouter.post('/google-signin', handleLoginWithGoogle);


module.exports = authRouter;