import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest'; // Изменён импорт
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()) // Теперь должно работать
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});