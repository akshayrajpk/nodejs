var request = require("request");
var helloWorld = require("../exp.js")
var base_url = "http://localhost:3000/"

describe("Pass Ejs Home", function() {
  describe("GET /", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("Parsing Failed", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });

  });
});

describe("Pass index.html", function() {
  describe("GET /index.html", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'startChartSession');
      request.get(base_url+'index.html', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failure", function(done) {
      request.get(base_url+'index.html', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });
});


describe("Pass render.js", function() {
  describe("GET /render.js", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'render.js', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failure", function(done) {
      request.get(base_url+'render.js', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });
});

describe("Pass d3.js", function() {
  describe("GET /d3.js", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'d3.js', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failure", function(done) {
      request.get(base_url+'d3.js', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });
});

describe("Pass linedata.json", function() {
  describe("GET /lineData.json", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'lineData.json', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failed", function(done) {
      request.get(base_url+'lineData.json', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });
});

describe("Pass data", function() {
  describe("GET /data", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'data', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failure", function(done) {
      request.get(base_url+'data', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });

});

describe("Insert Data To DB", function() {
  describe("GET /addpost", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'addpost1/test/0/0', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  it("Parsing Failure", function(done) {
    request.get(base_url+'addpost1/test/0/0', function(error, response, body) {
      expect(response.body).toBe("");
      done();
    });
  });
});

describe("Insert Data To Variable Data", function() {
  describe("GET /chart/test/English", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'chart/test/English', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  it("Parsing Content Successfull", function(done) {
    request.get(base_url+'chart/test/English', function(error, response, body) {
      expect(response.body).not.toBe("");
      done();
    });
  });
  it("Error Throw Check", function(done) {
    request.get(base_url+'chart/doc/English', function(error, response, body) {
      expect(response.body).not.toBe(null);
      done();
    });
  });
  
  
});

describe("Display DB to User", function() {
  describe("GET /db/test/English", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'addpost1/test/6/7');
      request.get(base_url+'db/test/English', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  it("Parsing Failure Check", function(done) {    
    request.get(base_url+'startDbSession');
    request.get(base_url+'db/test/English', function(error, response, body) {
      expect(response.body).not.toBe("");
      done();
    });
  });
  it("Error Throw Check", function(done) {
    request.get(base_url+'dbOperatorReload');
    request.get(base_url+'db/doc/English', function(error, response, body) {
      expect(response.body).not.toBe(null);
      done();
    });
  });
});

describe("Update Operation", function() {
  describe("GET update", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'update/test/0/2', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  it("Parsing Failure", function(done) {
    request.get(base_url+'update/test/0/2', function(error, response, body) {
      expect(response.body).toBe("");
      done();
    });
  });
  it("Error Throw Check", function(done) {
    request.get(base_url+'update/doc/1/3', function(error, response, body) {
      expect(response.body).not.toBe(null);
      done();
    });
  });
});

describe("Delete Operation", function() {
  describe("GET /delete/test", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'delete/test/0/2', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  it("Parsing Failure", function(done) {
    request.get(base_url+'delete/test/0/2', function(error, response, body) {
      expect(response.body).toBe("");
      done();
    });
  });
  it("Error Throw Check", function(done) {
    request.get(base_url+'delete/doc/1/2', function(error, response, body) {
      expect(response.body).not.toBe(null);
      done();
    });
  });
});

describe("Insertion of new patient", function() {
  describe("GET New entry", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'newEntry/test/English', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  it("Parsing Data", function(done) {
    request.get(base_url+'newEntry/test/English', function(error, response, body) {
      expect(response.body).not.toBe("");
      done();
    });
  });
  it("Error Throw Check", function(done) {
    request.get(base_url+'newEntry/test/English', function(error, response, body) {
      expect(response.body).not.toBe(null);
      done();
    });
  });
});

describe("Language Parser", function() {
  it("Parsing successfully", function(done) {
    request.get(base_url+'language', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe("Start Session", function() {
  describe("GET /startSession", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'startSession', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failure", function(done) {
      request.get(base_url+'startSession', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });
});

describe("Loout", function() {
  describe("GET /logout", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'logout', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failure", function(done) {
      request.get(base_url+'logout', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });
});

describe("New PID check", function() {
  describe("GET /newPid/language", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'newPid/English', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failure", function(done) {
      request.get(base_url+'newPid/English', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });
});

describe("SignupPage", function() {
  describe("GET /signup/language", function() {
    it("Parsing successfully", function(done) {
      request.get(base_url+'signup/English', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it("Parsing Failure", function(done) {
      request.get(base_url+'signup/English', function(error, response, body) {
        expect(response.statusCode).not.toBe(404);
        done();
      });
    });
  });
});

