var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'spacedesign.store@gmail.com',
    pass: 'SDesign-135qw'
  }
});

module.exports = (app)=> {

  app.get("/api/slides", function(req, res){
    const db = req.app.locals.slides;
    db.list(function(err, objects){
      if (err) res.status(500).send(err);
      
      const sorted_objects = objects.sort((e1,e2) => (e1.id-e2.id));

      res.send({data: sorted_objects});
    })
  });

  app.get("/api/categories", function(req, res){
    const db = req.app.locals.categories;
    db.list(function(err, objects){
      if (err) res.status(500).send(err);
      
      const sorted_objects = objects.sort((e1,e2) => (e1.id-e2.id));

      res.send({data: sorted_objects});
    })
  });

  app.post("/api/gds", function(req, res){
    const {filter} = req.body;

    const db = req.app.locals.gds;
    db.list(function(err, objects){
      if (err) res.status(500).send(err);
      let result = [];

      if(filter === "all") {
        result = objects
      } else {
        result = objects.filter(({tag}) => tag === filter);
      }

      const sorted_result = result.sort((e1,e2) => (e1.id-e2.id));
      
      res.send({data: sorted_result});
    })
  });

  app.get("/api/services", function(req, res){

    const db = req.app.locals.services;
    db.list(function(err, objects){
      if (err) res.status(500).send(err);
      
      const sorted_objects = objects.sort((e1,e2) => (e1.id-e2.id));

      res.send({data: sorted_objects});
    })
  });

  app.post("/api/form", function(req, res){
    const db = req.app.locals.orders;
    const id = (new Date()).getTime();
    const data = {id: Number(id), ...req.body};
    
    console.log(data.inputs[0])

    db.add(data, function(err) {
      if (err) res.status(500).send(err);
      
      var mailOptions = {
      from: 'spacedesign.store@gmail.com',
      to: 'spacedesign.store@gmail.com',
      subject: 'НА САЙТЕ НОВЫЙ ЗАКАЗ',
      html: `
      <div>${data.id}</div>
      <div>${data.inputs.map(({value}) => {
          if(value.length < 600) return value; 
      } ).join(", ")}</div>
      <div>${data.gds.data !== undefined && data.gds.data.map(({name}) => name ).join(", ")}</div>
      
      <div><a href="http://spacedesign.store:3000">В админку</a></div>
      `
    };
      
      transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
      
      res.send({data: data});
    });
  });

};
