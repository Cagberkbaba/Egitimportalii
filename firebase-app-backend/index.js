const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const { initializeApp } = require('firebase-admin/app');

const adminSdk = require('firebase-admin')
const serviceAccount = require('./fir-odev-31f7e-firebase-adminsdk-4eb6k-b69c0acafe.json')


initializeApp({
    credential: adminSdk.credential.cert(serviceAccount),
    databaseURL: 'https://fir-odev-31f7e-default-rtdb.firebaseio.com/'
})
const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());

const checkClaim = async  (req, res, next) => {
    let auth = req.headers.authorization;

    if(auth){
        await adminSdk.auth().verifyIdToken(auth).then((decodeToken) => {
            if(!decodeToken.admin){
                res.status(403).json({message: 'Yetkisiz işlem'});

            }
            next();
        }).catch(err => {
            res.status(500).json({message: 'beklenmedik hata'});
        })
    }   else {
        next();
    }

};

app.use(checkClaim);

app.post('/setAdmin', async(req, res) => {
    const uid = req.body.uid;
    

    await adminSdk
    .auth()
    .setCustomUserClaims( uid, {admin: true})
    .then((r) => {});
    

    res.status(200).json({message: 'Kullanıcı admin yapıldı'});
})

app.get('/', async  (req, res) => {
    let result;
    await adminSdk
    .auth()
    .listUsers()
    .then(res => result = res.users)
    .catch(err =>{
        res
        .status(500)
        .json({message: 'Merhaba beklenmedik bir hata oluştu'})
    });
    res.status(200).json(result)
})
app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})