const request = require('supertest');
const { sequelize } = require('../models/Book');
// Ensure server.js exports the app
const app = require('../server');

describe('Books API', () => {

    // Rest the DB before tests
    beforeAll( async () => {
        await sequelize.sync({
            force: true
        });

    });

    // Close DB connection after tests
    afterAll( async () => {
        await sequelize.close();
    });

    // Default values: isBorrow and fine
    it('should create a new book', async () => {
        const response = await request(app)
            .post('/books')
            .send({
                title: 'Pride & Prejudice',
                author: 'Jane Austen',
                isBorrow: true,
                dueDate: '2025-01-03',
                fine: 1.99
            })

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Pride & Prejudice');
        expect(response.body.author).toBe('Jane Austen');
        expect(response.body.dueDate).toBe('2025-01-03');
        expect(response.body.isBorrow).toBe(true);
        expect(response.body.fine).toBe(1.99);
    });

    // Check array value as an empty array can be a false positive
    it('should retrieve all books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBe('Pride & Prejudice');
    });

    // Find book by ID
    it('should get a specific book by id', async () => {
        const response = await request(app)
            .post('/books')
            .send({
                title: 'Pride & Prejudice',
                author: 'Jane Austen',
                isBorrow: true,
                dueDate: '2025-01-03',
                fine: 1.99
            })

        const bookId = response.body.id;
        const getResponse = await request(app).get(`/books/${bookId}`);
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body.title).toBe('Pride & Prejudice');
    });

    // Update book using ID
    // also testing returning book expectations (for future TDD)
    it('should update a book', async () => {
        const response = await request(app)
            .post('/books')
            .send({
                title: 'Encyclopedia of Faes',
                author: 'Emily Wild',
                isBorrow: true,
                dueDate: '2025-01-09',
                fine: 1.99
            })
        const bookId = response.body.id;
        const updateResponse = await request(app)
            .put(`/books/${bookId}`)
            .send({
                title: 'Encyclopedia of Faeries',
                author: 'Emily Wildes',
                isBorrow: false,
                fine: 0
            });

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.title).toBe('Encyclopedia of Faeries');
        expect(updateResponse.body.author).toBe('Emily Wildes');
        expect(updateResponse.body.isBorrow).toBe(false);
        expect(updateResponse.body.fine).toBe(0);
    });
    
    // Remove a book from DB
    // Incorrect book title and author since we will delete
    it('should delete a book', async () => {
        const response = await request(app)
        .post('/books')
        .send({
            title: 'Encyclopedia of Faes',
            author: 'Emily Wild',
            isBorrow: true,
            dueDate: '2025-01-09',
            fine: 1.99
        });

        const bookId = response.body.id;
        const deletionResponse = await request(app).delete(`/books/${bookId}`);
        expect(deletionResponse.statusCode).toBe(204);
    })

})