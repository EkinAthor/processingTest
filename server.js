//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
var bodyParser = require('body-parser');

Object.assign=require('object-assign')

//app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname+'/'));
app.use(morgan('combined'));
app.use(bodyParser());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD']
    mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

    }
}
var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
    console.log('opening connection');
    if (mongoURL == null) return;

    var mongodb = require('mongodb');
    if (mongodb == null) return;

    mongodb.connect(mongoURL, function(err, conn) {
        if (err) {
            callback(err);
            return;
        }

        db = conn;
        dbDetails.databaseName = db.databaseName;
        dbDetails.url = mongoURLLabel;
        dbDetails.type = 'MongoDB';

        console.log('Connected to MongoDB at: %s', mongoURL);
    });
};

app.get("/files", function(req, resp) {
    findAll(function(files) {
        resp.json(files);
        resp.end();
    });
});

app.post("/file", function(req, resp) {
    saveFile(req.body, function(result){resp.end();}, req);
});

app.get('/', function (req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function(err){});
    }
    if (db) {
        var col = db.collection('counts');
        // Create a document with request IP and current time of request
        col.insert({ip: req.ip, date: Date.now()});
        col.count(function(err, count){
            res.render('index.html', { pageCountMessage : count, dbInfo: dbDetails });
        });
    } else {
        res.render('index.html', { pageCountMessage : null});
    }
});

app.get('/pagecount', function (req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function(err){});
    }
    if (db) {
        db.collection('counts').count(function(err, count ){
            res.send('{ pageCount: ' + count + '}');
        });
    } else {
        res.send('{ pageCount: -1 }');
    }
});

// error handling
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

initDb(function(err){
    console.log('Error connecting to Mongo. Message:\n'+err);
});


function findAll(callback) {
    var flz = [];
    if (!db) {
        initDb(function(err){});
    }
    if (db) {
        var cursor =db.collection('files').find( );
        cursor.each(function(err, doc) {
            if(err != null) {console.log(err); return}
            if (doc != null) {
                flz.push(doc);
            } else {
                callback(flz);
            }
        });
    } else {
        callback(flz);
    }

}

function saveFile(fileData, callback, req) {
    if (!db) {
        initDb(function(err){});
    }
    if(db) {
        fileData._id=req.ip+Date.now();
        fileData.technicalMetadata.info.label=fileData.technicalMetadata.info.label + " ("+Date.now()+")";
        db.collection('files').insertOne(fileData, function (err, result) {
            if(err != null) {console.log(err); return}
            console.log("Inserted");
            callback(result);
        });
    } else {
        console.log("file not saved mongo not present");
    }

}



app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;