import request from 'supertest';
import app from '../../app.js';

export const expectNoToken = (response) => {
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
        "status":108,
        "message":"Token tidak valid atau kadaluwarsa",
        "data":null
    })
}

export const getToken = async () => {
    const responseLogin = await request(app).post('/login').send({
        email:'test@mailinator.com',
        password:'admin123'
    })
    const {token} = responseLogin.body.data
    return token
}