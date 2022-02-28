import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

export const Register = async (req, res) => {
  console.log(req.body);
  const {name, email , password} = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password,salt);
  try{
    await Users.create({
      name:name,
      email:email,
      password: hashPassword
    });
    res.json({msg:'Register Successful'})
  }
  catch(error){
    res.status(404).json({msg:'Email already exist'})
  }
}

export const Login = async (req,res) => {
  try {
      const users = await Users.findAll({
        where:{
          email:req.body.email
        }
      })
      const match = await bcrypt.compare(req.body.password, users[0].password);
      if(!match) return res.status(400).json({msg:'Wrong Password'});
      const userId = users[0].id;
      const email = users[0].email;
      const accessToken = jwt.sign({userId,email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '3600s'
      })
      res.cookie('accessToken', accessToken,{
        httpOnly:true,
        maxAge: 60* 60 * 1000
      })

      res.json({accessToken})
  } catch (e) {
    console.log(e);
    res.status(404).json({msg:'Email not found'})
  }
}


export const GetUserInfo = async (req,res) => {
    const accessToken = req.cookies.accessToken ||
        req.headers['x-access-token'] ||
        req.headers['authorization'];

    console.log('GetUserInfo accessToken', accessToken);

    if(accessToken == null) return res.sendStatus(401);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
        if(err) return res.sendStatus(403);
        let email = decode.email;
        let userId = decode.userId;
        try {
            const user = await Users.findOne({
                where: {
                    id: userId
                }
            })
            if (user){
                res.json({id: user.id,name: user.name})
            }else {
                console.log(e);
                res.status(404).json({msg:'User not found'})
            }
        }catch (e) {
            console.log(e);
            res.status(404).json({msg:'Email not found'})
        }
    })
}

export const AddToUserFavourites = async (req,res) => {
    const accessToken = req.cookies.accessToken ||
        req.headers['x-access-token'] ||
        req.headers['authorization'];

    console.log('GetUserInfo accessToken', accessToken);

    if(accessToken == null) return res.sendStatus(401);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
        if(err) return res.sendStatus(403);
        let email = decode.email;
        let userId = decode.userId;
        let recipe = req.body.recipe
        try {
            // console.log(recipe)
            const foundUser = await Users.findOne({
                where: {
                    id: userId
                }
            })
            if (!foundUser){
                console.log("User not found!");
                res.status(404).json({msg:'User not found'})
                return
            }

            let favourites = foundUser.favourites || []
            favourites.push(recipe)
            const updatedUser = await Users.update({favourites: favourites},{
                where: {
                    id: userId
                }
            })
            res.json({recipe})
        }catch (e) {
            console.log(e);
            res.status(404).json({msg:'Email not found'})
        }
    })
}

export const DeleteFromFavourites = async (req,res) => {
    const accessToken = req.cookies.accessToken ||
        req.headers['x-access-token'] ||
        req.headers['authorization'];

    console.log('GetUserInfo accessToken', accessToken);

    if(accessToken == null) return res.sendStatus(401);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
        if(err) return res.sendStatus(403);
        let email = decode.email;
        let userId = decode.userId;
        let recipe = req.body.recipe
        try {
            // console.log(recipe)
            const foundUser = await Users.findOne({
                where: {
                    id: userId
                }
            })
            if (!foundUser){
                console.log("User not found!");
                res.status(404).json({msg:'User not found'})
                return
            }

            let favourites = foundUser.favourites || []
            // favourites.delete(recipe)
            for( let i = 0; i < favourites.length; i++){
                if ( favourites[i].recipe.uri === recipe.recipe.uri) {
                    favourites.splice(i, 1);
                }
            }
            const updatedUser = await Users.update({favourites: favourites},{
                where: {
                    id: userId
                }
            })
            res.json({recipe})
        }catch (e) {
            console.log(e);
            res.status(404).json({msg:'Email not found'})
        }
    })
}


export const GetUserFavourites = async (req,res) => {
    const accessToken = req.cookies.accessToken ||
        req.headers['x-access-token'] ||
        req.headers['authorization'];

    console.log('GetUserInfo accessToken', accessToken);

    if(accessToken == null) return res.sendStatus(401);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
        if(err) return res.sendStatus(403);
        let email = decode.email;
        let userId = decode.userId;
        try {
            // console.log(recipe)
            const foundUser = await Users.findOne({
                where: {
                    id: userId
                }
            })
            if (!foundUser){
                console.log("User not found!");
                res.status(404).json({msg:'User not found'})
                return
            }

            let favourites = foundUser.favourites || []

            res.json({favouriteRecipes: favourites})
        }catch (e) {
            console.log(e);
            res.status(404).json({msg:'Email not found'})
        }
    })
}
export const Logout = async (req,res) => {
    const accessToken = req.cookies.accessToken ||
        req.headers['x-access-token'] ||
        req.headers['authorization'];

    console.log('GetUserInfo accessToken', accessToken);

    if(accessToken == null) return res.sendStatus(401);
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
        if(err) return res.sendStatus(403);
        let email = decode.email;
        let userId = decode.userId;
        try {
            res.clearCookie('accessToken',{
                httpOnly:true
            })
            res.sendStatus(200);
        }catch (e) {
            console.log(e);
            res.status(404).json({msg:'Email not found'})
        }
    })
}

export const SearchRecipesAction = async(req,res) => {
    let recipeName = req.query.recipeName;
    const APP_ID = "52a82f98";
    const APP_KEY = "7f861f87ff0f42bf8ae76ae412cb89ac";
    const url = `https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json;charset=UTF-8",
        },
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((searchResponse) => {
            console.log(searchResponse);
            res.json(searchResponse)
        }).catch((err) => {
            console.error(err)
            res.status(404).json({msg:'Search not found'})
    });
};
