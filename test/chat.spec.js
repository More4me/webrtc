const request = require('supertest');
const { app } = require('../server');
const { expect } =require('chai');
describe('server', function () {
    it('should server html when a get request is made', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200, done);
    });
    it('should server the correct html page', function(done){
        request(app)
        .get('/')
        .end((error, response)=> {
            expect(response.text.match('<title>Cold Brew Tutorial</title>')).to.not.be.null;
            done();
        });
    });
});