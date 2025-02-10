import request from 'supertest';
import app from '../app.js';
import { v4 as uuidv4 } from 'uuid';
import { responseSchemaLoginSuccess, responseSchemaProfileSuccess, responseSchemaUpdateProfileSuccess } from './schema/schemaMembership.js';
import { expectNoToken ,getToken} from './utils/requestTemplate.js';

describe('API Test /Registration', () => {
    it('POST /registration sukses regristrasi membership', async () => {
        const email = `${uuidv4()}@mailinator.com`
        const payload = {email,password:'admin1234'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            "status": 0,
            "message": "Registrasi berhasil silahkan login",
            "data": null
        })
    })

    it('POST /registration validate format email', async () => {
        const payload = {email:'test',password:'admin1234'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter email tidak sesuai format",
            "data": null
        })
    })

    it('POST /registration validate email sudah terdaftar', async () => {
        const payload = {email:'test@mailinator.com',password:'admin1234'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Email sudah terdaftar",
            "data": null
        })
    })

    it('POST /registration validate parameter email harus diiisi', async () => {
        const payload = {password:'admin'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter email harus diisi",
            "data": null
        })
    })

    it('POST /registration validate parameter password harus diiisi', async () => {
        const payload = {email:'test@mailinator.com'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter password harus diisi",
            "data": null
        })
    })

    it('POST /registration validate password length', async () => {
        const payload = {email:'test@mailinator.com',password:'admin'}
        const response = await request(app).post('/registration').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter password memiliki panjang kurang dari 8",
            "data": null
        })
    })
})

describe('API Test /login' ,() => {
    it('POST /login sukses', async () => {
        const payload = {email:'test@mailinator.com',password:'admin123'}
        const response = await request(app).post('/login').send(payload)
        expect(response.statusCode).toBe(200)
        const {error} = responseSchemaLoginSuccess.validate(response.body)
        expect(error).toBeUndefined()
    })

    it('POST /login Parameter email harus diisi', async() => {
        const payload = {password:'admin'}
        const response = await request(app).post('/login').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter email harus diisi",
            "data": null
        })
    })

    it('POST /login validate parameter password harus diiisi', async () => {
        const payload = {email:'test@mailinator.com'}
        const response = await request(app).post('/login').send(payload)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            "status": 102,
            "message": "Parameter password harus diisi",
            "data": null
        })
    })

    it('POST /login validate email dan password salah', async () => {
        const payload = {email:'test@123a.com',password:'vfjvfkjvnnb'}
        const response = await request(app).post('/login').send(payload)
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({
            "status": 103,
            "message": "Username atau password salah",
            "data": null
        })
    })
})

describe('API test /profile', () => {
    it("GET /profile success", async() => {
        const token = await getToken()
        const responseProfile = await request(app).get('/profile').set('Authorization',`Bearer ${token}`)

        expect(responseProfile.statusCode).toBe(200)
        const {error} = responseSchemaProfileSuccess.validate(responseProfile.body)
        expect(error).toBeUndefined()
    })

    it("GET /profile unauthorized", async() => {
        const response = await request(app).get('/profile')
        expectNoToken(response)
    })
})

describe('API test PUT /profile/update', () => {
    it("PUT /profile/update sukses", async() => {
        const token = await getToken()
        const payload = {first_name:'ada',last_name:'ada'}
        const response = await request(app).put('/profile/update')
            .send(payload)
            .set('Authorization',`Bearer ${token}`)
        
        expect(response.statusCode).toBe(200)
        const {error} = responseSchemaUpdateProfileSuccess.validate(response.body)
        expect(error).toBeUndefined()
    })

    it("PUT /profile/update Unauthorized", async() => {
        const payload = {first_name:'ada','last_name':'ada'}
        const response = await request(app).put('/profile/update').send(payload)
        expectNoToken(response)
    })

    it("PUT /profile/update Parameter first_name harus diisi", async() => {
        const token = await getToken()
        const payload = {last_name:'ada'}
        const response = await request(app).put('/profile/update')
            .send(payload)
            .set('Authorization',`Bearer ${token}`)
        
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            status:102,
            message:"Parameter first_name harus diisi",
            data:null
        })
    })

    it("PUT /profile/update Parameter last_name harus diisi", async() => {
        const token = await getToken()
        const payload = {first_name:'ada'}
        const response = await request(app).put('/profile/update')
            .send(payload)
            .set('Authorization',`Bearer ${token}`)
        
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({
            status:102,
            message:"Parameter last_name harus diisi",
            data:null
        })
    })
})
