import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from "../../../src/app.module"

const datas = {
  plate: "LD-12-24",
}
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it("deve permitir registrar checkIn e retornar 200", async ()=>{
    const res = await request(app.getHttpServer()).post("/check-in").send({plate: datas.plate})
    expect(res.statusCode).toBe(201)
    expect(res.body.success).toBe(true)
  })
  it("deve nao deve permitir registrar checkIn e retornar 409", async()=>{
    await request(app.getHttpServer()).post("/check-in").send({plate: datas.plate})
    const res = await request(app.getHttpServer()).post("/check-in").send({plate: datas.plate})
    expect(res.statusCode).toBe(409)
  })
});

