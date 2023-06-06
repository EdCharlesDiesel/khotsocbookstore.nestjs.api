import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, LoggerService } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from "./app.module"

class TestLogger implements LoggerService {
  log(message: string) {}
  error(message: string, trace: string) {}
  warn(message: string) {}
  debug(message: string) {}
  verbose(message: string) {}
}

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useLogger(new TestLogger())
    await app.init()

    // tip: access the database connection via
    // const connection = app.get(Connection)
    // const a = connection.manager
  })

  afterAll(async () => {
    await Promise.all([
      app.close(),
    ])
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  describe('Authentication', () => {
    let jwtToken: string

    describe('AuthModule', () => {
      // assume test data includes user test@example.com with password 'password'
      it.skip('authenticates user with valid credentials and provides a jwt token', async () => {
        const response = await request(app.getHttpServer())
          .post('/authentication/login')
          .send({ email: 'test@example.com', password: 'password' })
          .expect(200)

        // set jwt token for use in subsequent tests
        jwtToken = response.body.accessToken
        expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) // jwt regex
      })

      it('fails to authenticate user with an incorrect password', async () => {
        const response = await request(app.getHttpServer())
          .post('/authentication/login')
          .send({ email: 'test@example.com', password: 'wrong' })
          .expect(401)

        expect(response.body.accessToken).not.toBeDefined()
      })

      // assume test data does not include a nobody@example.com user
      it('fails to authenticate user that does not exist', async () => {
        const response = await request(app.getHttpServer())
          .post('/authentication/login')
          .send({ email: 'nobody@example.com', password: 'test' })
          .expect(401)

        expect(response.body.accessToken).not.toBeDefined()
      })
    })

    describe('Protected', () => {
      it('gets protected resource with jwt authenticated request', async () => {
        const response = await request(app.getHttpServer())
          .get('/author')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200)

        const data = response.body.data
        // add assertions that reflect your test data
        // expect(data).toHaveLength(3)
      })
    })
  })

})
