const express = require('express');
const multer = require('multer');

const app = express();

const PORT = 5000;

app.use(express.static(__dirname));

app.get("/", (req, res) => res.sendFile(process.cwd() + "/index.html") );

app.post('/api/fileinfo',  multer().single('upfile'), (req, res) => {
    const upfile = req.file;
    if (typeof upfile === "undefined") {
        res.json({ error: "file not uploaded" });
    }
    return res.json({
        name: upfile.originalname,
        type: upfile.mimetype,
        size: upfile.size
    });
});

(async function start(){
    try {
        app.listen(PORT, () => console.log('App has been started...'));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
})();

