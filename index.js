const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const { auth, JWT_SECRET } = require("./auth");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect("mongodb+srv://Ujwal:Ujwal2510@merncluster.5dodjsu.mongodb.net/Ujwal-Todo-App")



app.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        res.status(201).json({
            message: "You have successfully SignedUp"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while signing up",
            error: error.message
        })
    };
});

app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            return res.status(403).json({
                message: "User does not exists"
            })
        }
        if (existingUser.password !== password) {
            return res.status(403).json({
                message: "Incorrect password"
            });
        }
        else {
            const token = jwt.sign({
                id: existingUser._id.toString()
            }, JWT_SECRET)
            res.json({
                token
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Cannot signin"
        })
    }
});

app.post("/todo", auth, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    try {
        await TodoModel.create({
            userId: userId,
            title: title,
            done: done
        })

        res.status(200).json({
            message: "Todo Created"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while creating a todo",
            error: error.message
        })
    }

});

app.get("/todos", auth, async (req, res) => {
      const userId = req.userId ;
      
      try {
        const todos = await TodoModel.find({userId})
      res.status(200).json({
        todos
      })
      }catch(error){
        res.status(500).json({
            message :"Error while fetching todos",
            error : error.message
        })
      }
})

app.listen(3000);