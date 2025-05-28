const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');

chai.use(chaiHttp);

describe('API Integration Tests', () => {
  let createdUserId;

  it('should get all users', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new user', (done) => {
    const user = {
      name: 'Test User',
      email: 'test@test.com',
      age: 30,
      phone: '1234567890'
    };

    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        createdUserId = res.body.id;
        done();
      });
  });

  it('should get a user by id', (done) => {
    chai.request(app)
      .get(`/api/users/${createdUserId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');  // Changed from checking property 'id'
        expect(res.body.id).to.equal(createdUserId);  // Added specific ID check
        done();
      });
  });

  it('should update a user', (done) => {
    const updatedUser = {
      name: 'Updated User',
      email: 'updated@test.com',
      age: 31,
      phone: '0987654321'
    };

    chai.request(app)
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name', 'Updated User');
        done();
      });
  });

  it('should delete a user', (done) => {
    chai.request(app)
      .delete(`/api/users/${createdUserId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User deleted successfully');
        done();
      });
  });

  // Error cases
  it('should handle invalid user creation', (done) => {
    chai.request(app)
      .post('/api/users')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  // Add these new test cases
  it('should handle getting non-existent user', (done) => {
    chai.request(app)
      .get('/api/users/999999')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'User not found');
        done();
      });
  });

  it('should handle invalid update data', (done) => {
    chai.request(app)
      .put(`/api/users/${createdUserId}`)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Name and email are required');
        done();
      });
  });

  it('should handle deleting non-existent user', (done) => {
    chai.request(app)
      .delete('/api/users/999999')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error', 'User not found');
        done();
      });
  });
});