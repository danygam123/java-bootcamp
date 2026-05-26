require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { createClient } =
require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.get("/", (req,res)=>{
    res.send("Backend running");
});

app.post("/register", async(req,res)=>{

    try{

        const {name,email,mode} = req.body;

        const { data, error } =
        await supabase
        .from("users")
        .insert([
            {
            full_name: name,
            email: email,
            learning_mode: mode
            }
        ])
        .select();

        if(error){
            throw error;
        }

        res.json({
            success:true,
            data
        });

    }

    catch(err){

        res.status(500).json({
            success:false,
            error:err.message
        });

    }

});

app.listen(process.env.PORT || 3000, ()=>{
    console.log(
        "Server running on port 3000"
    );
});