function new_user(user_id, uname){
    db.collection("usr").doc(user_id).get().then(function(doc) {
        if(doc.exists) {
            console.log("User exists");
        }
        else
        {
            db.collection("usr").doc(user_id).set({
                userid: user_id,
                username: uname,
                week01total: 0,
                week02total: 0,
                week03total: 0,
                week04total: 0,
                week05total: 0,
                week06total: 0,
                week07total: 0,
                week08total: 0,
                week09total: 0,
                week10total: 0,
                week11total: 0,
                week12total: 0,
                week13total: 0,
                week14total: 0,
                week15total: 0,
                week16total: 0,
                week17total: 0,
                season2018total: 0
            });
        }
    })
   
}

