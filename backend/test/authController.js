const expect = require('chai').expect;
const sinon = require('sinon');
const Email = require('../utils/email');

const authController = require('../controllers/authController');
const User = require('../models/userModel');
const { stub } = require('sinon');

describe('Auth Controller - Login', function () {
  it('should return an error with code 400 if no email or password in request body', function () {
    const req = {
      body: {
        email: 'kzh@gmail.com',
      },
    };

    let error;
    const next = err => {
      error = err;
    };

    authController.login(req, {}, next);

    expect(error).to.have.property(
      'message',
      'Please provide email and address!'
    );
    expect(error).to.have.property('statusCode', 400);
    expect(error).to.have.property('status', 'fail');
    expect(error).to.have.property('isOperational', true);
  });

  it('should return an error with code if the user does not exist', function (done) {
    const stub = sinon.stub(User, 'findOne');
    User.findOne = () => {
      return {
        select() {
          return null;
        },
      };
    };

    const req = {
      body: {
        email: 'kzh@gmail.com',
        password: 'helloworld',
      },
    };

    const next = err => {
      expect(err).to.have.property('message', 'Incorrect email or password');
      expect(err).to.have.property('statusCode', 401);
      expect(err).to.have.property('status', 'fail');
      expect(err).to.have.property('isOperational', true);
      done();
    };

    authController.login(req, {}, next);

    stub.restore();
  });

  it('should return an error with code 401 the password is incorrect', function (done) {
    const stub = sinon.stub(User, 'findOne');
    User.findOne = () => {
      return {
        select() {
          return {
            password: '123456',
            correctPassword(pw1, pw2) {
              return pw1 === pw2;
            },
          };
        },
      };
    };

    const req = {
      body: {
        email: 'kzh@gmail.com',
        password: 'helloworld',
      },
    };

    const next = err => {
      expect(err).to.have.property('message', 'Incorrect email or password');
      expect(err).to.have.property('statusCode', 401);
      expect(err).to.have.property('status', 'fail');
      expect(err).to.have.property('isOperational', true);
      done();
    };

    authController.login(req, {}, next);

    stub.restore();
  });
});

describe('Auth Controller - Protect', function () {
  it('should return an error with code 401 if the request header does not contain authorization', function (done) {
    const req = {
      headers: {},
    };
    const next = err => {
      expect(err).to.have.property(
        'message',
        'You are not logged in! Please log in to get access.'
      );
      expect(err).to.have.property('statusCode', 401);
      expect(err).to.have.property('status', 'fail');
      expect(err).to.have.property('isOperational', true);
      done();
    };
    authController.protect(req, {}, next);
  });

  it('should return an error with code 401 if authorization does not start with Bearer', function (done) {
    const req = {
      headers: {
        authorization: 'fdaf afdsf',
      },
    };
    const next = err => {
      expect(err).to.have.property(
        'message',
        'You are not logged in! Please log in to get access.'
      );
      expect(err).to.have.property('statusCode', 401);
      expect(err).to.have.property('status', 'fail');
      expect(err).to.have.property('isOperational', true);
      done();
    };
    authController.protect(req, {}, next);
  });

  it('should return an error with code 401 if jwt malformed', function (done) {
    const stub = sinon.stub(User, 'findById');
    User.findById = () => null;

    const req = {
      headers: {
        authorization: 'Bearer fsfadsafdsf',
      },
    };

    const next = err => {
      expect(err).to.have.property('message', 'jwt malformed');
      done();
    };

    authController.protect(req, {}, next);

    stub.restore();
  });
});

describe('Auth Controller - Restrict', function () {
  it('should return an error with 403 status code if the user is not authorized', function () {
    const req = {
      user: {
        role: 'user',
      },
    };
    let error;
    const next = err => {
      error = err;
    };

    authController.restrictTo(['admin', 'moderator'])(req, {}, next);

    expect(error).to.have.property(
      'message',
      'You do not have permission to perform this action'
    );
    expect(error).to.have.property('statusCode', 403);
    expect(error).to.have.property('status', 'fail');
    expect(error).to.have.property('isOperational', true);
  });
});

describe('Auth Controller - Forgot Password', () => {
  it('should return an error with code 404 if no user is found with given email address', done => {
    const stub = sinon.stub(User, 'findOne');
    User.findOne = () => null;

    let error;
    const next = err => {
      error = err;
      expect(error).to.have.property(
        'message',
        'There is no user with such email address.'
      );
      expect(error).to.have.property('statusCode', 404);
      expect(error).to.have.property('status', 'fail');
      expect(error).to.have.property('isOperational', true);
      done();
    };

    authController.forgotPassword(
      { body: { email: 'kzh@gmail.com' } },
      {},
      next
    );

    stub.restore();
  });

  it('should throw an error with code 500 if there was an error sending email', done => {
    const stub1 = sinon.stub(User, 'findOne');
    User.findOne = () => {
      return {
        createPasswordResetToken() {
          return 'abcedfafd';
        },
        save() {
          return null;
        },
      };
    };

    const stub2 = sinon.stub(Email.prototype, 'sendPasswordReset');
    Email.prototype.sendPasswordReset = () => {
      throw new Error();
    };

    let error;
    const next = err => {
      error = err;
      expect(error).to.have.property(
        'message',
        'There was an error sending the email. Try again later!'
      );
      expect(error).to.have.property('statusCode', 500);
      expect(error).to.have.property('status', 'error');
      expect(error).to.have.property('isOperational', true);
      done();
    };

    authController.forgotPassword(
      {
        protocol: 'http',
        get() {
          return 'abc';
        },
        body: { email: 'kzh@gmailcom' },
      },
      {},
      next
    );

    stub1.restore();
    stub2.restore();
  });
});

describe('Auth Controller - Reset Password', () => {
  it('hould return an errro with code 400 if the user is not found', done => {
    const stub = sinon.stub(User, 'findOne');
    User.findOne = () => {
      return null;
    };

    let error;
    const next = err => {
      error = err;
      expect(error).to.have.property(
        'message',
        'Token is invalid or has expired'
      );
      expect(error).to.have.property('statusCode', 400);
      expect(error).to.have.property('status', 'fail');
      expect(error).to.have.property('isOperational', true);
      done();
    };

    authController.resetPassword(
      {
        params: {
          token: 'abc',
        },
      },
      {},
      next
    );

    stub.restore();
  });
});

describe('Auth Controller - Reset Password', () => {
  it('return an error with code 401 if the current password is wrong', done => {
    const stub = sinon.stub(User, 'findById');
    User.findById = () => {
      return {
        select() {
          return {
            correctPassword() {
              return false;
            },
            password: '',
          };
        },
      };
    };

    let error;
    const next = err => {
      error = err;
      expect(error).to.have.property(
        'message',
        'Your current password is wrong.'
      );
      expect(error).to.have.property('statusCode', 401);
      expect(error).to.have.property('status', 'fail');
      expect(error).to.have.property('isOperational', true);
      done();
    };

    authController.updatePassword(
      {
        user: {
          id: '1111',
        },
        body: {
          paswordCurrent: '1111',
        },
      },
      {},
      next
    );

    stub.restore();
  });
});
