var sprintf = require("sprintf-js").sprintf
var express = require('express')
var bodyParser = require('body-parser')

// mysql 데이터베이스 connection 모듈을 require 합니다.
// 현재 클라우드 서버가 없는 관계로 로컬로 연결 되었습니다.
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


// app.get('/', function (req, res) {
//     let response = {
//         status: 'ok',
//         message: 'Hello world'
//     }
//     res.json(response);
    
//     // res.send('Hello World!');
// });


// app.get('/ras', function(req, res) {
//     res.send('HA HA HA');
// })



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
        // 사용자를 조회합니다. 
        // 결과는 rows라는 곳에 배열 형식으로 반환합니다. 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        connection.query('SELECT user_id, user_pw, user_name FROM user_table', function(err, rows, fields) {
            try {
                if (err) {
                    res.json([]);
                    return;
                }
        
                console.log(rows);
        
                res.json(rows);
             }
            catch (err) {
                console.log(err);
                res.status(500);
                res.json([]);
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
        // 특정 사용자를 조회합니다. Where 조건에 조회하고 싶은 사용자를 입력합니다. 
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
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
            // 사용자를 등록합니다. INSERT 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
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
            // 사용자를 수정합니다. UPDATE 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
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
        // 사용자를 삭제합니다. DELETE 구문을 이용합니다.
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
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
  


app.get('/cal', function (req, res) {
    if (req.query) {
        console.log(req.query.page_no);
        console.log(req.query.name);
    }


    /********
     * MySQL DB를 전체 조회한 후 요청한 곳에 전송해 주면 된다.
     * 단, Paging이 되게 하면 좋겠다.
     */
    try {
        // 학사일정을 조회합니다. 
        // 결과는 rows라는 곳에 배열 형식으로 반환합니다. 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        connection.query('SELECT cal_idx, cal_date, cal_content, cal_starttime, cal_endtime, cal_place, cal_name FROM cal_table', function(err, rows, fields) {
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



app.get('/cal/:idx', function (req, res) {
    let cal_idx = req.params.idx;
    let response = {
        cal_idx: cal_idx
    };

    /********
     * MySQL DB를 특정 조건을 조회한 후 요청한 곳에 전송해 주면 된다.
     */
    try {
        // 특정 학사일정을 조회합니다. Where 조건에 조회하고 싶은 학사일정을 입력합니다. 
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        let querystring = sprintf('SELECT cal_idx, cal_date, cal_content, cal_starttime, cal_endtime, cal_place, cal_name FROM cal_table WHERE cal_idx = "%s"', cal_idx);
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



app.post('/cal', function (req, res) {
    if (req.body) {
        let newCal = req.body;
        
        console.log(newCal.cal_idx);
        console.log(newCal.cal_date);
        console.log(newCal.cal_content);
        console.log(newCal.cal_starttime);
        console.log(newCal.cal_endtime);
        console.log(newCal.cal_place);
        console.log(newCal.cal_name);

        /********************
         * MySQL DB에 신규 요청된 일정을 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            // 학사일정을 등록합니다. INSERT 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
            let querystring = sprintf('INSERT INTO cal_table (cal_idx, cal_date, cal_content, cal_starttime, cal_endtime, cal_place, cal_name) VALUES ("%s", "%s", "%s", "%s", "%s", "%s", "%s")', 
                                       newCal.cal_idx, newCal.cal_date, newCal.cal_content, newCal.cal_starttime, newCal.cal_endtime, newCal.cal_place, newCal.cal_name);
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



app.put('/cal/:idx', function (req, res) {
    if (req.body) {
        let updateCal = req.body;
        
        console.log(updateCal.cal_idx);
        console.log(updateCal.cal_date);
        console.log(updateCal.cal_content);
        console.log(updateCal.cal_starttime);
        console.log(updateCal.cal_endtime);
        console.log(updateCal.cal_place);
        console.log(updateCal.cal_name);

        /********************
         * MySQL DB에 수정 요청된 일정을 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            // 학사일정을 수정합니다. UPDATE 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
            let querystring = sprintf('UPDATE cal_table SET cal_idx="%s", cal_date="%s", cal_content="%s", cal_starttime="%s", cal_endtime="%s", cal_place="%s" WHERE cal_name="%s"', 
                                       updateCal.cal_idx, updateCal.cal_date, updateCal.cal_content, updateCal.cal_starttime, updateCal.cal_endtime, updateCal.cal_place, updateCal.cal_name);
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
  

  
app.delete('/cal/:idx', function (req, res) {
    let cal_idx = req.params.idx;
    let response = {
        cal_idx: cal_idx
    };

    /********
     * MySQL DB를 특정 조건에 맞는 일정을 삭제한 후 해당 결과를 전송해 주면 된다.
     */

    try {
        // 학사일정을 삭제합니다. DELETE 구문을 이용합니다.
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        let querystring = sprintf('DELETE FROM cal_table WHERE cal_idx="%s"', cal_idx);
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



app.get('/bbs', function (req, res) {
    if (req.query) {
        console.log(req.query.page_no);
        console.log(req.query.name);
    }


    /********
     * MySQL DB를 전체 조회한 후 요청한 곳에 전송해 주면 된다.
     * 단, Paging이 되게 하면 좋겠다.
     */
    try {
        // 게시물을 조회합니다. 
        // 결과는 rows라는 곳에 배열 형식으로 반환합니다. 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        connection.query('SELECT bbs_idx, bbs_category, bbs_subject, bbs_content, bbs_writer_name, bbs_date, bbs_file FROM bbs_table', function(err, rows, fields) {
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



app.get('/bbs/:idx', function (req, res) {
    let bbs_idx = req.params.idx;
    let response = {
        bbs_idx: bbs_idx
    };

    /********
     * MySQL DB를 특정 조건을 조회한 후 요청한 곳에 전송해 주면 된다.
     */
    try {
        // 특정 게시물을 조회합니다. Where 조건에 조회하고 싶은 게시물을 입력합니다. 
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        let querystring = sprintf('SELECT bbs_idx, bbs_category, bbs_subject, bbs_content, bbs_writer_name, bbs_date, bbs_file FROM bbs_table WHERE bbs_idx = "%s"', bbs_idx);
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



app.post('/bbs', function (req, res) {
    if (req.body) {
        let newBbs = req.body;
        
        console.log(newBbs.bbs_idx);
        console.log(newBbs.bbs_category);
        console.log(newBbs.bbs_subject);
        console.log(newBbs.bbs_content);
        console.log(newBbs.bbs_writer_name);
        console.log(newBbs.bbs_date);
        console.log(newBbs.bbs_file);
        console.log(newBbs.bbs_tablecol);

        /********************
         * MySQL DB에 신규 요청된 게시물을 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            // 게시물을 등록합니다. INSERT 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
            let querystring = sprintf('INSERT INTO bbs_table (bbs_idx, bbs_category, bbs_subject, bbs_content, bbs_writer_name, bbs_date, bbs_file) VALUES ("%s", "%s", "%s", "%s", "%s", "%s", "%s")', 
                                       newBbs.bbs_idx, newBbs.bbs_category, newBbs.bbs_subject, newBbs.bbs_content, newBbs.bbs_writer_name, newBbs.bbs_date, newBbs.bbs_file);
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



app.put('/bbs/:idx', function (req, res) {
    if (req.body) {
        let updateBbs = req.body;
        
        console.log(updateBbs.bbs_idx);
        console.log(updateBbs.bbs_category);
        console.log(updateBbs.bbs_subject);
        console.log(updateBbs.bbs_content);
        console.log(updateBbs.bbs_writer_name);
        console.log(updateBbs.bbs_date);
        console.log(updateBbs.bbs_file);

        /********************
         * MySQL DB에 수정 요청된 게시물을 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            // 게시물을 수정합니다. UPDATE 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
            let querystring = sprintf('UPDATE bbs_table SET bbs_idx ="%s", bbs_category ="%s", bbs_subject ="%s", bbs_content ="%s", bbs_writer_name ="%s", bbs_date ="%s", bbs_file ="%s"', 
                                       updateBbs.bbs_idx, updateBbs.bbs_category, updateBbs.bbs_subject, updateBbs.bbs_content, updateBbs.bbs_writer_name, updateBbs.bbs_date, updateBbs.bbs_file);
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
  
  
app.delete('/bbs/:idx', function (req, res) {
    let bbs_idx = req.params.idx;
    let response = {
        bbs_idx: bbs_idx
    };

    /********
     * MySQL DB를 특정 조건에 맞는 게시물을 삭제한 후 해당 결과를 전송해 주면 된다.
     */

    try {
        // 게시물을 삭제합니다. DELETE 구문을 이용합니다.
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        let querystring = sprintf('DELETE FROM bbs_table WHERE bbs_idx="%s"', bbs_idx);
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

app.get('/ad', function(req, res){
    if(req.query){
        console.log(req.query.page_no);
        console.log(req.query.name);
    }

    try{
        // 광고를 조회합니다.
        // 결과는 rows라는 곳에 배열 형식으로 반환합니다. 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        connection.query('SELECT ad_idx, ad_category, ad_subject, ad_content, ad_file, ad_date, ad_name FROM ad_table', function(err, rows, fields){
            try{
                if (err) {
                    res.json({});
                    return;
                }
        
                console.log(rows);
        
                res.json(rows);
            }catch (err) {
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

app.get('/ad/:idx', function(req, res){
    let ad_idx = req.params.idx;
    let response = {
        ad_idx: ad_idx
    };
    try{
        // 특정 광고를 조회합니다. where 조건에 조회하고 싶은 광고idx를 입력합니다.
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        let querystring = sprintf('SELECT ad_idx, ad_category, ad_subject, ad_content, ad_file, ad_date, ad_name FROM ad_table WHERE ad_idx = "%s"', ad_idx);
        connection.query(querystring, function(err, rows, fields){
            try {
                if (err) {
                    console.log(err)
                    res.json({});
                    return;
                }
        
                console.log(rows);
        
                res.json(rows);
             }catch (err) {
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

app.post('/ad', function (req, res) {
    if (req.body) {
        let newAd = req.body;
        
        console.log(newAd.ad_idx);
        console.log(newAd.ad_category);
        console.log(newAd.ad_subject);
        console.log(newAd.ad_content);
        console.log(newAd.ad_file);
        console.log(newAd.ad_date);
        console.log(newAd.ad_name);

        /********************
         * MySQL DB에 신규 요청된 광고를 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            // 광고를 등록합니다. INSERT 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
            let querystring = sprintf('INSERT INTO ad_table (ad_idx, ad_category, ad_subject, ad_content, ad_file, ad_date, ad_name) VALUES ("%s", "%s", "%s", "%s", "%s", "%s", "%s")', 
                                       newAd.ad_idx, newAd.ad_category, newAd.ad_subject, newAd.ad_content, newAd.ad_file, newAd.ad_date, newAd.ad_name);
                                       
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

app.put('/ad/:idx', function (req, res) {
    if (req.body) {
        let updateAd = req.body;
        
        console.log(updateAd.ad_idx);
        console.log(updateAd.ad_category);
        console.log(updateAd.ad_subject);
        console.log(updateAd.ad_content);
        console.log(updateAd.ad_file);
        console.log(updateAd.ad_date);
        console.log(updateAd.ad_name);

        /********************
         * MySQL DB에 수정 요청된 광고를 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            // 광고를 수정합니다. UPDATE 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
            let querystring = sprintf('UPDATE ad_table SET ad_idx="%s", ad_category="%s", ad_subject="%s", ad_content="%s", ad_file="%s", ad_date="%s" WHERE ad_name="%s"', 
                                       updateAd.ad_idx, updateAd.ad_category, updateAd.ad_subject, updateAd.ad_content, updateAd.ad_file, updateAd.ad_date, updateAd.ad_name);
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

app.delete('/ad/:idx', function (req, res) {
    let ad_idx = req.params.idx;
    let response = {
        ad_idx: ad_idx
    };

    /********
     * MySQL DB를 특정 조건에 맞는 광고를 삭제한 후 해당 결과를 전송해 주면 된다.
     */

    try {
        // 광고를 삭제합니다. DELETE 구문을 이용합니다.
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        let querystring = sprintf('DELETE FROM ad_table WHERE ad_idx="%s"', ad_idx);
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

app.get('/food', function (req, res) {
    if (req.query) {
        console.log(req.query.page_no);
        console.log(req.query.name);
    }


    /********
     * MySQL DB를 전체 조회한 후 요청한 곳에 전송해 주면 된다.
     * 단, Paging이 되게 하면 좋겠다.
     */
    try {
        // 학식메뉴를 조회합니다. 
        // 결과는 rows라는 곳에 배열 형식으로 반환합니다. 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        connection.query('SELECT food_date, food_weekday, food_breakfast_menu, food_lunch_menu, food_dinner_menu FROM food_table', function(err, rows, fields) {
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

app.get('/food/:date', function (req, res) {
    let food_date = req.params.date;
    let response = {
        food_date: food_date
    };

    /********
     * MySQL DB를 특정 조건을 조회한 후 요청한 곳에 전송해 주면 된다.
     */
    try {
        // 특정날짜의 학식메뉴를 조회합니다. Where 조건에 조회하고 싶은 학식메뉴날짜를 입력합니다. 
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        let querystring = sprintf('SELECT food_date, food_weekday, food_breakfast_menu, food_lunch_menu, food_dinner_menu FROM food_table WHERE food_date = "%s"', food_date);
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

app.post('/food', function (req, res) {
    if (req.body) {
        let newFood = req.body;
        
        console.log(newFood.food_date);
        console.log(newFood.food_weekday);
        console.log(newFood.food_breakfast_menu);
        console.log(newFood.food_lunch_menu);
        console.log(newFood.food_dinner_menu);
        
        /********************
         * MySQL DB에 신규 요청된 학식메뉴를 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            // 학식메뉴를 등록합니다. INSERT 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
            let querystring = sprintf('INSERT INTO food_table (food_date, food_weekday, food_breakfast_menu, food_lunch_menu, food_dinner_menu) VALUES ("%s", "%s", "%s", "%s", "%s")', 
                                       newFood.food_date, newFood.food_weekday, newFood.food_breakfast_menu, newFood.food_lunch_menu, newFood.food_dinner_menu);
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


app.put('/food/:date', function (req, res) {
    if (req.body) {
        let updateFood = req.body;
        
        console.log(updateFood.food_date);
        console.log(updateFood.food_weekday);
        console.log(updateFood.food_breakfast_menu);
        console.log(updateFood.food_lunch_menu);
        console.log(updateFood.food_dinner_menu);

        /********************
         * MySQL DB에 수정 요청된 학식메뉴를 저장하고
         * 저장 결과를 응답해준다.
         */

        try {
            // 학식메뉴를 수정합니다. UPDATE 구문을 이용합니다.
            // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
            let querystring = sprintf('UPDATE food_table SET food_date ="%s", food_weekday ="%s", food_breakfast_menu ="%s", food_lunch_menu ="%s", food_dinner_menu ="%s"', 
                                       updateFood.food_date, updateFood.food_weekday, updateFood.food_breakfast_menu, updateFood.food_lunch_menu, updateFood.food_dinner_menu);
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

app.delete('/food/:date', function (req, res) {
    let food_date = req.params.date;
    let response = {
        food_date: food_date
    };

    /********
     * MySQL DB를 특정 조건에 맞는 학식메뉴를 삭제한 후 해당 결과를 전송해 주면 된다.
     */

    try {
        // 학식메뉴를 삭제합니다. DELETE 구문을 이용합니다.
        // 에러가 발생한 경우에는 err에 메시지가 설정되어 에러를 리턴합니다.
        let querystring = sprintf('DELETE FROM food_table WHERE food_date="%s"', food_date);
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
