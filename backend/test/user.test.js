const chai = require('chai');
const expect = chai.expect;
const User = require('../models/userModel');
const db = require('../db/database');

describe('User Model Tests', () => {
  // Setup test database connection
  before(function(done) {
    this.timeout(10000);
    // Wait for database to be ready
    setTimeout(done, 5000);
  });

  const testUser = {
    name: 'Test User',
    email: 'test@test.com',
    age: 25,
    phone: '1234567890'
  };

  it('should create a new user', function(done) {
    this.timeout(10000);
    User.create(testUser, function(err, result) {
      if (err) {
        console.log('Create user error:', err);
        done(err);
        return;
      }
      expect(result).to.exist;
      done();
    });
  });

  it('should get all users', function(done) {
    this.timeout(10000);
    User.getAll((err, users) => {
      if (err) {
        console.log('Get users error:', err);
        done(err);
        return;
      }
      expect(users).to.be.an('array');
      done();
    });
  });

  // Cleanup after tests
  after(function(done) {
    this.timeout(10000);
    db.end(done);
  });
});
