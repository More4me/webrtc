const request = require('supertest');
const { app } = require('../server');

//to.not.be.null //http://www.chaijs.com/api/bdd/
const { expect } = require('chai');

const coldBrew = require('cold-brew');
const { Key, By, until } = require('selenium-webdriver');

describe('server', function () {
    it('should server html when a get request is made', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200, done);
    });

    it('should server the correct html page', function (done) {
        request(app)
            .get('/')
            .end((error, response) => {
                expect(response.text.match('<title>Cold Brew Tutorial</title>')).to.not.be.null;
                done();
            });
    });
});

const PORT = 3000;
const ADDRESS = `http://localhost:${PORT}/`;


//cold-brew uses Selenium Webdriver behind the scenes
describe('client-side messager application', function () {
    let client;

    //This creates an automated instance of Google Chrome
    beforeEach(function () {
        client = coldBrew.createClient();
    });
    it('should not reload the page when text form is submitted', function (done) {
        this.timeout(10000);

        client.get(ADDRESS);
        client.do([
            ['sendKeys', 'form input', { type: 'text' }, 'hello world' + Key.ENTER],
            ['click', 'form button', {}],
        ]);

        client.executeScript(function () {
            return window.location.href;
        }).then((url) => {
            expect(url).to.equal(ADDRESS);
            done();
        });
    });

    afterEach(function (done) {
        client.quit().then(() => done());
    });
});
it('should post a message to your page(not send!)', function(){
    this.timeout(2000);
    client.get(ADDRESS);
    client.do([['sendKeys','form input',{},'Hello World',Key.ENTER],]);
    client.wait(until.elementLocated(By.css('p.message')));
    client.findElementByAttributes('p.message',{innerText:'Hello World'}).then((found)=>{
        if(found){
            done();
        }
    });
});