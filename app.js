const express= require('express');
const fs= require('fs');
const app= express();
const path= './hospital.json';

app.use(express.json());  

 

app.get('/hospitals', (req, res) =>{ 
    fs.readFile(path, 'utf8', (err, data) => { 
        if (err) 
            return res.status(500).send('Error reading data'); 
        res.send(JSON.parse(data)); 
    }); 
});


app.post('/hospitals', (req, res) => { 
    fs.readFile(path, 'utf8', (err, data) => { 
        if (err)
            return res.status(500).send('Error reading data'); 
        const hospitals = JSON.parse(data); 
        hospitals.push(req.body); 

        fs.writeFile(path, JSON.stringify(hospitals, null, 2), (err) => { 
            if (err) return res.status(500).send('Error in writing data'); 
            res.send('Hospital added successfully'); 
        });
     });
 });


app.put('/hospitals/:name', (req, res) => {
     fs.readFile(path, 'utf8', (err, data) => {
         if (err) 
            return res.status(500).send('Error reading data');
          let hospitals = JSON.parse(data);
           hospitals = hospitals.map(hospital => hospital.name === req.params.name ? { ...hospital, ...req.body } : hospital); 

           fs.writeFile(path, JSON.stringify(hospitals, null, 2), (err) => {
             if (err) return res.status(500).send('Error writing data'); 
            res.send('Hospital updated successfully'); 

     }); 
  }); 
});


app.delete('/hospitals/:name', (req, res) => {
     fs.readFile(path, 'utf8', (err, data) => {
         if (err) return res.status(500).send('Error reading data');
          let hospitals = JSON.parse(data); hospitals = hospitals.filter(hospital => hospital.name !== req.params.name);
           fs.writeFile(path, JSON.stringify(hospitals, null, 2), (err) => { 
            if (err) return res.status(500).send('Error writing data'); res.send('Hospital deleted successfully'); 
        });
     });
 });


app.listen(3000,()=>{
    console.log("Server is running at PORT 3000");
})