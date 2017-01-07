describe("At time", () => {
  it("record a single files", (done) => {
    var time = require('../src')((event) => {
      expect(event).toEqual("/tmp/test");
      done();
    });

    time.record('/tmp/test', {timeout: 100});
  });

  it("should records different files", (done) => {
    var i = 0;
    var time = require('../src')((event) => {
      if (i > 0) {
        expect(event).toEqual("/tmp/test2");
        done();
      } else {
        expect(event).toEqual("/tmp/test");
      }

      ++i;
    });

    time.record('/tmp/test', {timeout: 100});
    time.record('/tmp/test2', {timeout: 200});
  });

  it("should postpone files for storage", (done) => {
    var fn = {
      call: (event) => {
        expect(event).toEqual("/tmp/test");
      }
    };

    spyOn(fn, "call").and.callThrough();

    var time = require('../src')(fn.call);

    time.record('/tmp/test', {timeout: 200});
    time.record('/tmp/test', {timeout: 200});
    time.record('/tmp/test', {timeout: 200});

    setTimeout(() => {
      expect(fn.call.calls.count()).toEqual(1);
      done();
    }, 400);
  });

  it("should pass an argument as option", (done) => {
    var fn = {
      call: (event) => {
        expect(event).toEqual({"test": true, "path": "/tmp/test"});
        done();
      }
    };
    var time = require('../src')(fn.call);

    time.record('/tmp/test', {timeout: 200, arg: {"test": true, "path": "/tmp/test"}});
  });

  it("should keep the this argument with bind", (done) => {
    var Stub = function() {
      this.opt = true;
    };
    Stub.prototype.test = function(arg) {
      expect(this.opt).toBe(true);
      expect(arg).toEqual({"test":true, "path": "/tmp/test"});
      done();
    };

    var stub = new Stub();

    var time = require('../src')(stub.test.bind(stub));

    time.record('/tmp/test', {timeout: 200, arg: {"test": true, "path": "/tmp/test"}});

  });
});
