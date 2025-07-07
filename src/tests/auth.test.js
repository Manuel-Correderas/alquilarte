// src/tests/auth.test.js
import mongoose from 'mongoose';
import request from 'supertest';
import http from 'http';
import app from '../app.js';
import Usuario from '../models/Usuario.js';

let server, agent;

beforeAll(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(resolve));
  agent = request.agent(server);

  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/test');
  await Usuario.deleteMany({});

  await Usuario.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'testpass',
    role: 'inquilino',
    isVerified: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Autenticación de usuario', () => {
  test('Login exitoso con credenciales válidas', async () => {
    const res = await agent.post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'testpass'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.redirectTo).toBeDefined();
    expect(res.body.email).toBe('test@example.com');
  });

  test('Login fallido con credenciales inválidas', async () => {
    const res = await agent.post('/api/auth/login').send({
      email: 'wrong@example.com',
      password: 'wrongpass'
    });

    expect(res.statusCode).toBe(401);
  });
});