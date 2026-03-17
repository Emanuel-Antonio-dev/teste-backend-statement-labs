import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from "../../../src/app.module"

const datas = {
  plate: "LD-12-24",
}
let id_ticket
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it("deve permitir registrar checkout e retornar 200", async()=>{
    const ticketId = await request(app.getHttpServer()).post("/check-in").send({plate: datas.plate})
    console.log(ticketId.body)
    id_ticket = ticketId.body.datas.ticket.id
    const res = await request(app.getHttpServer()).post("/check-out").send({id_ticket})
    expect(res.statusCode).toBe(201)
  })
});

