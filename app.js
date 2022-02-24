const express = require('express');
const app = express();
const path = require('path')
const port = 8000;
const mongoose = require('mongoose');
const { stringify } = require('querystring');




async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
}

main().catch(err => console.log(err));



//Define mongoose schema:
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,

});


const contact = mongoose.model('Contact', contactSchema);

//Set the views directory:
app.set('views', path.join(__dirname, 'views'))

// EXPRESS SPECIFIC STUFF: 
app.use('/static', express.static('static'))

// PUG SPECIFIC STUFF:
app.set('view engine', 'pug') //Set the template engine as pug:
app.use(express.urlencoded())

//ENDPOINTS: 
app.get('/', (req, res) => {
    const param = {}
    res.status(200).render('home.pug', param)
})

app.get('/contact', (req, res) => {
    const param = {}
    res.status(200).render('contact.pug', param)
})

//START THE SERVER: 

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
