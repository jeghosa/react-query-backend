const express = require("express")
const app = express()
const cors = require("cors")
let people = [{name:"john", age:"34", id:6545443}, {name:"james", age:"54", id:3245543} ]
app.use(cors())
app.use(express.json())


app.get("/people", (req,res)=>{
   return res.status(200).json([...people])

})
app.post("/people", (req,res)=>{
    // const{name,age,id}= req.body 
    req.body.id= new Date().getTime()
    people = [...people, req.body]
    // console.log(people)
   return res.status(201).json(people)

})
app.delete("/people/:id", (req,res)=>{
    const {id} = req.params
people = people.filter(item=>item.id !== parseInt(id))
    // console.log(people)
   return  res.status(200).json(people)

})

app.patch("/people/:id", (req,res)=>{
    const {id} =req.params 
//     console.log( req.body)
//    let  tempp= people.find((person)=>person.id=== parseInt(id) )
//     tempp[0].name= req.body.name 
//     tempp[0].age= req.body.age
// console.log( req)
    people= people.map((person)=>{
        if (person.id=== parseInt(id)) {
            return {...person,name:req.body.name, age:req.body.age}
            }
        else{ return person}
    })
    return  res.status(200).json(people)
})











const port= process.env.PORT || 4000
app.listen(port, ()=>{console.log(`listening on ${port}`)})