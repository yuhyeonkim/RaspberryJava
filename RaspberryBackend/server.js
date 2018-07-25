var sprintf = require("sprintf-js").sprintf
var express = require('express')
var bodyParser = require('body-parser')

// mysql 데이터베이스 connection 모듈을 require 합니다.
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.56.101',
    user     : 'dachshund',
    password : 'dachshund',
    port     : 3306,
    database : 'raspboard'
});
connection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }
});


var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json());


app.get('/', function (req, res) {
    let response = {
        status: 'ok',
        message: 'Hello world'
    }
    res.json(response);
    
    // res.send('Hello World!');
});


app.get('/ras', function(req, res) {
    res.send('HA HA HA');
})



app.get('/users', function (req, res) {
    if (req.query) {
        console.log(req.query.page_no);
        console.log(req.query.name);
    }


    /********
     * MySQL DB를 전체 조회한 후 요청한 곳에 전송해 주면 된다.
     * 단, Paging이 되게 하면 좋겠다.
     */
    try {
        connection.query('SELECT user_id, user_pw, user_name FROM user_table', function(err, rows, fields) {
            try {
                if (err) {
                    res.json({});
                    return;
                }
        
                console.log(rows);
        
                res.json(rows);
             }
            catch (err) {
                console.log(err);
                res.status(500);
                res.json({});
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(500);
        res.json({});
    }
});



app.get('/users/:id', function (req, res) {
    let user_id = req.params.id;
    let response = {
        user_id: user_id
    };

    /********
     * MySQL DB를 특정 조건을 조회한 후 요청한 곳에 전송해 주면 된다.
     */
    try {
        let querystring = sprintf('SELECT user_id, user_pw, user_name FROM user_table WHERE user_id = "%s"', user_id);
        connection.query(querystring, function(err, rows, fields) {
            try {
                if (err) {
                    console.log(err)
                    res.json({});
                    return;
                }
        
                console.log(rows);
        
                res.json(rows);
             }
            catch (err) {
                console.log(err);
                res.status(500);
                res.json({});
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(500);
        res.json({});
    }
});




app.post('/users', function (req, res) {
    if (req.body) {
        let newUser = req.body;
        
        console.log(newUser.user_id);
        console.log(newUser.user_pw);
        console.log(newUser.user_name);

        /********************
         * MySQL DB에 신규 요청된 사용자를 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            let querystring = sprintf('INSERT INTO user_table (user_id, user_pw, user_name) VALUES ("%s", password("%s"), "%s")', 
                                       newUser.user_id, newUser.user_pw, newUser.user_name);
            console.log(querystring);
            connection.query(querystring, function(err, rows, field) {
                try {
                    if (err) {
                        console.log(err)
                        res.json({});
                        return;
                    }
            
                    console.log(field);
            
                    res.json(rows);
                 }
                catch (err) {
                    console.log(err);
                    res.status(500);
                    res.json({});
                }
            })
        }
        catch(err) {
            console.log(err);
            res.status(500);
            res.json({});
        }
    }
    else {
        console.log('no body');
        res.json({});
    }
});


app.put('/users/:id', function (req, res) {
    if (req.body) {
        let updateUser = req.body;
        
        console.log(updateUser.user_id);
        console.log(updateUser.user_pw);
        console.log(updateUser.user_name);

        /********************
         * MySQL DB에 수정 요청된 사용자를 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            let querystring = sprintf('UPDATE user_table SET user_id ="%s", user_pw = password("%s") WHERE user_name="%s"', 
                                       updateUser.user_id, updateUser.user_pw, updateUser.user_name);
            console.log(querystring);
            connection.query(querystring, function(err, rows, field) {
                try {
                    if (err) {
                        console.log(err)
                        res.json({});
                        return;
                    }
            
                    console.log(field);
            
                    res.json(rows);
                 }
                catch (err) {
                    console.log(err);
                    res.status(500);
                    res.json({});
                }
            })
        }
        catch(err) {
            console.log(err);
            res.status(500);
            res.json({});
        }
    }
    else {
        console.log('no body');
        res.json({});
    }
});
  
  
app.delete('/users/:id', function (req, res) {
    let user_id = req.params.id;
    let response = {
        user_id: user_id
    };

    /********
     * MySQL DB를 특정 조건에 맞는 사용자를 삭제한 후 해당 결과를 전송해 주면 된다.
     */

    try {
        let querystring = sprintf('DELETE FROM user_table WHERE user_name="%s"', user_id);
        console.log(querystring);
        connection.query(querystring, function(err, rows, field) {
            try {
                if (err) {
                    console.log(err)
                    res.json({});
                    return;
                }
        
                console.log(field);
        
                res.json(rows);
             }
            catch (err) {
                console.log(err);
                res.status(500);
                res.json({});
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(500);
        res.json({});
    }
});
  



  



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});