import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken"

export const singup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    //TODO
    next(error);
    console.log(error);
  }
};


export const singin = async (req, res, next) => {
    try {
     const user = await User.findOne({name: req.body.name})
     if(!user) return next(createError(404, "user not found!"))

     const isCorrect = await bcrypt.compare(req.body.password, user.password)

     if(!isCorrect) return next(createError(400, "Wrong Crefentials!"))

     const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
     const {password, ...others} = user._doc;
     res.cookie("access_token", token,{
        httpOnly: true
     }).status(200).send({
      token ,others
     })
    } catch (error) {
      //TODO 
      next(error);
      console.log(error);
    }
  };
  
  export const googleAuth = async(req,res,next)=> {
    try {
      const user =await User.findOne({email:req.body.email});
      if(user){
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      
      res.cookie("access_token", token,{
        httpOnly: true
     }).status(200).send(user._doc)
      }
      else{
        const newUser = new User({
          ...req.body,
          fromGoogle: true
        })
        const savedUser = await newUser.save()
        const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET)
      
      res.cookie("access_token", token,{
        httpOnly: true
     }).status(200).send(savedUser._doc)
      }
    } 
    
    catch (error) {
      next(error)
    }
  }
  