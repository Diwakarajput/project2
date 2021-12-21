const express =require('express');
const router =express.Router();
var fetchuser=require('../middleware/fetchuser');
const Note= require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try {
        const notes=await Note.find({user:req.user.id});
   res.json(notes)

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error ");
    }
   
    
})



//ROUTE 2: Add a new  Notes using: GET "/api/notes/addNote". Login required
router.post('/addnote',fetchuser,[
    body('title',"Enter a valid title").isLength({min:3}),
    body('description',"Description must be at least 5 characters").isLength({min : 5}),
], async (req, res)=>{
    try {
        const {title,description,tag}=req.body;
     // if there are errors , return Bad  request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
        const note=new Note({
            title,description,tag, user:req.user.id
        })
         const saveNote= await note.save()

    
    res.json(saveNote)
        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error ");
    }
   
     
 })




 //ROUTE 3: Update a new  Notes using: Put "/api/notes/updatenote". Login required
 router.put('/updatenote/:id',fetchuser, async (req, res)=>{
    const {title, description, tag}=req.body;
    try {
        //create a newNote object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};



    //Find the note to be updated  and update it
    let note= await  Note.findById(req.params.id);
    if(!note){
       return  res.status(404).send("Not found")
    }

    if( note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")

    }

    note= await  Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
    res.json({note});
        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error ");
    }
    
 })





//ROUTE 4: Delete a new  Notes using: Delete "/api/notes/deletenote". Login required
router.delete('/deletenote/:id',fetchuser, async (req, res)=>{
  
    try {
         //Find the note to be delete   and delete it
    let note= await  Note.findById(req.params.id);
    if(!note){
       return  res.status(404).send("Not found")
    }
    if(note.user.toString() !==req.user.id){
        return res.status(401).send("Not Allowed")

    }

    note=await  Note.findByIdAndDelete(req.params.id, {$set: newNote},{new:true})
    res.json({"Success":"Note has been deleted",note:note});
    }  catch(error){
        console.error(error.message);
        res.status(500).send("Internal server Error ");
    }

   
})

module.exports=router