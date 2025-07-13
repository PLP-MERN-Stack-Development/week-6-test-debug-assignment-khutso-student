const request = require('supertest');
const server = require('../server');
const app = require('../server'); // ✅ not server.listen(), just the app

jest.setTimeout(30000);



describe('Auth Endpoints', () => {
  describe('POST /api/auth/signup', () => {
    it('should sign up a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@test.com',
        password: 'password123',
      };

      const res = await request(server)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);

      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(userData.email); // adjust depending on your controller response
      expect(res.body.user).not.toHaveProperty('password');
    });

    it('should not sign up user with invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
      };

      await request(server)
        .post('/api/auth/signup')
        .send(userData)
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const userData = {
        name: 'Jane Doe',
        email: 'jane@test.com',
        password: 'password123',
      };

      // First, sign up the user
      await request(server)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);

      // Then, try logging in
      const res = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'jane@test.com',
          password: 'password123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(userData.email); // again, adjust if needed
    });
  });
});
