const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;

chai.use(chaiHttp);

const DEFAULT_URL = 'http://localhost:8080/api/v1/repos';
const URL = process.env.API_URL || DEFAULT_URL;

describe('Repositories', function () {
  this.timeout(9000);

  describe('GET /language/:language/top/:per_page', () => {
    it('should get 10 items with language = JavaScript', (done) => {
      chai.request(URL)
        .get('/language/javascript/top/10')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.body).not.to.be.null;
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(10);
          expect(res.body[0]).to.own.include({ language: 'JavaScript' });
          done();
        })
    });

    it('should get 50 items with language = Haskell', (done) => {
      chai.request(URL)
        .get('/language/haskell/top/50')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.body).not.to.be.null;
          expect(res.body.length).to.equal(50);
          expect(res.body[0]).to.own.include({ language: 'Haskell' });
          done();
        })
    });

    it('should get 100 items with language = Rust', (done) => {
      chai.request(URL)
        .get('/language/rust/top/100')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.body).not.to.be.null;
          expect(res.body.length).to.equal(100);
          expect(res.body[0]).to.own.include({ language: 'Rust' });
          done();
        })
    });
  })

  describe('GET /search', () => {
    it('should get data with default params', (done) => {
      chai.request(URL)
        .get('/search')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.body).not.to.be.null;
          expect(res.body.length).to.equal(10);
          done();
        })
    });
    
    it('should get 100 items per page', (done) => {
      chai.request(URL)
        .get('/search?per_page=100&page=2')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.body).not.to.be.null;
          expect(res.body.length).to.equal(100);
          done();
        })
    });

    it('should get 3 items from predefined date', (done) => {
      chai.request(URL)
        .get('/search?per_page=3&page=2&created=2020-10-10')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.body).not.to.be.null;
          expect(res.body.length).to.equal(3);
          expect(new Date(res.body[0].created_at)).greaterThan(new Date('2020-10-10'));
          done();
        })
    });

    it('should get 25 items from predefined date for language = SQL', (done) => {
      chai.request(URL)
        .get('/search?per_page=25&page=3&created=2019-12-12&language=sql')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          expect(res.body).not.to.be.null;
          expect(res.body.length).to.equal(25);
          expect(new Date(res.body[0].created_at)).greaterThan(new Date('2019-12-12'));
          expect(res.body[0]).to.own.include({ language: 'SQL' });
          done();
        })
    });
  });
});
