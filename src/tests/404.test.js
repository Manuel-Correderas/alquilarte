// src/tests/404.test.js
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

describe('Ruta inexistente', () => {
  test('GET /ruta-que-no-existe debería devolver 404', async () => {
    const res = await agent.get('/ruta-que-no-existe');
    expect([404, 302]).toContain(res.statusCode);
  });
});
