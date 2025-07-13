const request = require('supertest');
const server = require('../server');
jest.setTimeout(30000); // 30 seconds

let token = '';
let taskId = '';

beforeAll(async () => {
  // Register a user
  await request(server)
    .post('/api/auth/signup')
    .send({
      name: 'Task Tester',
      email: 'task@test.com',
      password: 'taskpass123',
    });

  // Login and store token
  const res = await request(server)
    .post('/api/auth/login')
    .send({
      email: 'task@test.com',
      password: 'taskpass123',
    });

  token = res.body.token;
});

describe('Task Endpoints', () => {
  it('should create a new task', async () => {
    const res = await request(server)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
    expect(res.body).toHaveProperty('_id');

    taskId = res.body._id;
  });

  it('should get all tasks for the user', async () => {
    const res = await request(server)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update the task status to completed', async () => {
    const res = await request(server)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        completed: true,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('should delete the task', async () => {
    const res = await request(server)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted successfully'); // Adjust if needed
  });
});
