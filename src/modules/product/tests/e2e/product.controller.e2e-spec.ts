// import { Test } from '@nestjs/testing';
// import express from 'express';
// import request from 'supertest';
// import * as utilities from '../utilities';
// import { DatabaseModule } from '../../../../database/database.module';
// import { AuthorService } from '../../user.service';
// import { AuthorController } from '../../user.controller';
// import { userProvider } from '../../user.provider';

// describe('BooksController', () => {
//     const server = express();
//     const fakeBooks = utilities.generateFakeBook();
    
//     const Bookservice = {
//         findAll: () => fakeBooks,
//         create: () => 'created',
//         findById: () => fakeBooks[0],
//         update: () => 'updated',
//         delete: () => 'deleted'
//     };

//     beforeAll(async () => {
//         const module = await Test.createTestingModule({
//             imports: [DatabaseModule],
//             controllers: [AuthorController],
//             providers: [userProvider, AuthorService]
//         })
//             .overrideComponent(AuthorService)
//             .useValue(Bookservice)
//             .compile();

//         const app = module.createNestApplication(server);
//         await app.init();
//     });

//     it('should return all Books', async () => {
//         return request(server)
//             .get('/Books')
//             .expect(200)
//             .expect(Bookservice.findAll());
//     });

//     it('should return one user', async () => {
//         return request(server)
//             .get('/Books/1')
//             .expect(200)
//             .expect(Bookservice.findById());
//     });

//     it('should create a user', async () => {
//         return request(server)
//             .post('/Books')
//             .send(fakeBooks[0])
//             .expect(201);
//     });

//     it('should update a user by id', async () => {
//         return request(server)
//             .put('/Books/1')
//             .send(fakeBooks[0])
//             .expect(200);
//     });

//     it('should delete a user by id', async () => {
//         return request(server)
//             .delete('/Books/1')
//             .expect(200);
//     });
// });
