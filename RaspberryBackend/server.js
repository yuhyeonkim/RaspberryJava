var express = require('express');
var bodyParser = require('body-parser')

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
    let users = [
        {
            user_id: 'user1',
            user_pw: 'pw1',
            user_name: 'name1'
        },
        {
            user_id: 'user2',
            user_pw: 'pw2',
            user_name: 'name2'
        }
    ];


    if (req.query) {
        console.log(req.query.page_no);
        console.log(req.query.name);
    }


    /********
     * MySQL DB를 전체 조회한 후 요청한 곳에 전송해 주면 된다.
     * 단, Paging이 되게 하면 좋겠다.
     */

    res.json(users);
});



app.get('/users/:id', function (req, res) {
    let user_id = req.params.id;
    let response = {
        user_id: user_id
    };

    /********
     * MySQL DB를 특정 조건을 조회한 후 요청한 곳에 전송해 주면 된다.
     */

    res.json(response);
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

        res.json(req.body);
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

        res.json(req.body);
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

    res.json(response);
});
  



  



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});