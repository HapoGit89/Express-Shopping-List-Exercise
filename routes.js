const express = require("express");
const router = new express.Router();
const items = require ('./fakeDb');
const ExpressError = require("./expressError");
router.use(express.json())

router.get("/", function(req, res) {
  return res.json(items);
});

router.post("/", function(req,res,next){
    try{
        if(Object.keys(req.body).length == 0){
            throw new ExpressError("Please enter data",400)
            }
        items.push(req.body)
        return res.status(200).json({"added": req.body})
    }
    catch(e){
        return next(e)
    }

})

router.get("/:name",function( req, res, next){
    const names = []
    for (let i = 0; i< items.length; i++){
        names.push(items[i]["name"])
    }
    try{
        if(!names.includes(req.params.name)){
            throw new ExpressError("This item cant be found", 400)
        }
        for (let i = 0;i < items.length; i++){
            if (items[i]["name"]==req.params.name){
                return res.json(items[i])
            }
        }
        
    }
    catch(e){
        return next(e)

    }
})

router.delete("/:id", function(req, res) {
  const idx = users.findIndex(u => u.id === +req.params.id);
  users.splice(idx, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;
