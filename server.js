const express = require('express')
const mysql = require('mysql2');
const path = require('path');
const bodyparser = require('body-parser');
const cookieHandmade = require('./cookie_hd');
const { AsyncLocalStorage } = require('async_hooks');

let user_cookie = '';
let unlock = false;

const port = 3002;

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));


const register_path = path.join(__dirname,'public','Register-Pages.html')
const login_path = path.join(__dirname,'public','Login-Pages.html')
const profile_path = path.join(__dirname,'public','Profile-Pages.html')
const onequiz_path = path.join(__dirname,'public','Course-One-Quiz-Pages.html')
const twoquiz_path = path.join(__dirname,'public','Course-Two-Quiz-Pages.html')
const onepage_path = path.join(__dirname,'public','Course-One-Pages.html')
const twopage_path = path.join(__dirname,'public','Course-Two-Pages.html')
const contentone_path = path.join(__dirname,'public','Course-One-Content-Pages.html')
const contenttwo_path = path.join(__dirname,'public','Course-Two-Content-Pages.html')
const courseall_path = path.join(__dirname,'public','Course-All.html')
const about_us_path = path.join(__dirname,'public','About-us-Pages.html')


const connection = mysql.createConnection({
    host :'localhost',
    user:'root',
    password:'',
    database:'jabing'
});

connection.connect((err)=>{
    if(err){
        console.log("error",err)
        return;
    }
    console.log("success");
})

const queryDB = (sql) => {
    return new Promise((resolve,reject) => {
        connection.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

function randomnumber(){
    let eigth_random = Math.floor((Math.random()*100000000));
    //console.log(eigth_random);
    return eigth_random;
}

app.get('/register.html',(req,res) => {
    res.clearCookie("username");
    res.sendFile(register_path);
});

app.get('/login.html',(req,res) => {
    res.sendFile(login_path);
});

app.get('/profile.html',(req,res) => {
    res.sendFile(profile_path);
});

app.get('/onequiz.html',(req,res) => {
    res.sendFile(onequiz_path);
});

app.get('/twoquiz.html',(req,res) => {
    res.sendFile(twoquiz_path);
});

// app.post('/onepage',async (req,res) => {
//     var sql = await queryDB("CREATE TABLE IF NOT EXISTS courseDB (username VARCHAR(100), courseid VARCHAR(11), score varchar(2)");

//     sql = await queryDB(`insert into courseDB(username,courseid) values('${req.body.username}','${1}')`);
//     // res.redirect('Course-One-Pages.html');
//     // res.sendFile(onepage_path);
// });

app.get('/allcourse.html',(req,res) => {
    res.sendFile(courseall_path);
});

// app.get('/twopage.html',async (req,res) => {
//     var sql = await queryDB("CREATE TABLE IF NOT EXISTS courseDB (username VARCHAR(100), courseid VARCHAR(11), score varchar(2)");
//     var username = getCookie('username');
//     sql = await queryDB(`insert into courseDB(username,courseid) values('${username}','${2}')`);
//     res.sendFile(twopage_path);
// });

app.get('/aboutus.html',(req,res) => {
    res.sendFile(about_us_path);
});

app.get('/content1.html',(req,res) => {
    res.sendFile(contentone_path);
});

app.get('/content2.html',(req,res) => {
    res.sendFile(contenttwo_path);
});





app.post('/register', async (req, res) => {
    const { username, email, password1, password2, name , lastname, phonenumber } = req.body;
    //email ซ้ำ
    const dbemail = `select * from users where email = "${email}"`;
    const existing_email = await queryDB(dbemail);
    if (existing_email.length > 0) {
        return res.redirect('/register.html');
    }
    //username ซ้ำ
    const dbusername = `select * from users where username = "${username}"`;
    const existing_username = await queryDB(dbusername);
    if (existing_username.length > 0) {
        return res.redirect('/register.html');
    }
    //passwordไม่ตรงกัน
    if (password1!=password2){
        return res.redirect('/register.html');
    }
    const insert_info = `insert into users (username,email,password,name,lastname,phonenumber) values ("${username}","${email}","${password1}", "${name}", "${lastname}","${phonenumber}")`;
    await queryDB(insert_info);

    console.log("success");
    return res.redirect('/login.html');
});

app.post('/login',async (req,res)=>{
    const {username, password } = req.body;

    const sql = `select * from users where username = "${username}"`;
    const result = await queryDB(sql);
    const user = result[0];

    if (user && user.password === password) {
        
        let n_random = randomnumber();

        const set_cookie = `UPDATE users SET cookiehandmade = "${n_random}" WHERE username = "${user.username}"`;
        await queryDB(set_cookie);

        user_cookie = n_random;

        cookieHandmade.add_cookie(n_random);
        res.cookie("username",user.username);
        res.redirect('/allcourse.html');


    } else {
        // ถ้าชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
        
        console.log(user.usename);
        res.redirect('/login.html');
    }
})
app.post('/UpdateScore', async (req, res) => { 
    var sql = await queryDB("CREATE TABLE IF NOT EXISTS courseDB (username VARCHAR(100), courseid VARCHAR(11), score varchar(2)");

    sql = await queryDB(`Update into courseDB(score) values ('${req.body.score}') where username = '${req.body.username}'`);
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}/register.html`);
});