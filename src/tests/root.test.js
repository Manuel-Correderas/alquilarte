// src/tests/root.test.js
import mongoose from 'mongoose';
import request from 'supertest';
import http from 'http';
import app from '../app.js';

let server, agent;

beforeAll(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(resolve));
  agent = request.agent(server);

  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/test');
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Redirección root', () => {
  test('GET / redirige a /login', async () => {
    const res = await agent.get('/');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/login');
  });
});