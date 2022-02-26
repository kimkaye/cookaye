import express from 'express';
import {
  Register,
  Login,
  GetUserInfo,
  AddToUserFavourites,
  GetUserFavourites,
  DeleteFromFavourites, Logout
} from '../controllers/Users.js'
import {VerifyToken} from '../middleware/VerifyToken.js'

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/logout', Logout);
router.get('/user', GetUserInfo);
router.post('/user/favourites', AddToUserFavourites);
router.delete('/user/favourites', DeleteFromFavourites);
router.get('/user/favourites', GetUserFavourites);
router.get('/token', VerifyToken, (req,res)=>{
  res.status(200).json({msg:'accessToken'})
})

export default router;
