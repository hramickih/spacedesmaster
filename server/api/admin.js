module.exports = (app)=> {
  app.post("/admin/auth", function(req, res){
    const auth = req.body;
    if(auth.login === "SPACE@design@ADMIN@2019" && auth.password === "ADMIN@password@SPACE@Design@01.05.19") {
      res.status(200);
      res.send(req.body);
    }

  });

  app.post("/admin/data", function(req, res){
    const {key, auth} = req.body;
    if(auth.login === "SPACE@design@ADMIN@2019" && auth.password === "ADMIN@password@SPACE@Design@01.05.19") {
      const db = req.app.locals[key];
      db.list(function(err, objects){
        if (err) return;
        res.send({data: objects});
      })
    }

  });

  app.post("/admin/data/add", function(req, res){
    let {data, key, auth} = req.body;
    if(auth.login === "SPACE@design@ADMIN@2019" && auth.password === "ADMIN@password@SPACE@Design@01.05.19") {
      const db = req.app.locals[key];
      const id = (new Date()).getTime();
      data = {id: Number(id), ...data};

      db.add(data, function(err) {
        if (err) res.status(500).send(err);

        db.list(function(err, objects){
          if (err) res.status(500).send(err);
          res.status(200);
          res.send({data: objects});
        })
      });
    }

  });

  app.post("/admin/data/edit", function(req, res){
    let {data, key, auth} = req.body;
    if(auth.login === "SPACE@design@ADMIN@2019" && auth.password === "ADMIN@password@SPACE@Design@01.05.19") {
      const db = req.app.locals[key];
      data.id = Number(data.id);

      db.add(data, function(err) {
        if (err) res.status(500).send(err);

        db.list(function(err, objects){
          if (err) res.status(500).send(err);
          res.send({data: objects});
        });
      });
    }

  });

  app.post("/admin/data/remove", function(req, res){
    let {id, key, auth} = req.body;
    if(auth.login === "SPACE@design@ADMIN@2019" && auth.password === "ADMIN@password@SPACE@Design@01.05.19") {
      const db = req.app.locals[key];
      id = Number(id);

      db.remove(id, function(err) {
        if (err) res.status(500).send(err);

        db.list(function(err, objects){
          if (err) res.status(500).send(err);
          res.status(200);
          res.send({data: objects});
        });
      });
    }

  });


};
