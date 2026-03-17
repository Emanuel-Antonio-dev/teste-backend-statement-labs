import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from "../../../src/app.module"
import "dotenv/config"

const datas = {
    email: "systemaadmin@gmail.com",
    password: "system_admin@2025!#"
}

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const res = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        email: datas.email,
        password: datas.password
      })

    accessToken = res.body.accessToken
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve retornar 200", async () => {
    const res = await request(app.getHttpServer())
      .get("/spots/available")
      .set("Authorization", `Bearer ${accessToken}`)
    
    expect(res.statusCode).toBe(200)
  })
})