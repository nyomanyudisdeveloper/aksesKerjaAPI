import request from 'supertest';
import app from '../app.js';
import { expectNoToken ,getToken} from './utils/requestTemplate.js';
import { responseSchemaGetBannerSuccess, responseSchemaGetServiceSuccess } from './schema/schemaInformation.js';

describe('API Test GET /banner', () => {
    it('GET /banner success', async() => {
        const token = await getToken()
        const response = await request(app).get('/banner').set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        const {error} = responseSchemaGetBannerSuccess.validate(response.body)
        expect(error).toBeUndefined()

    })

    it('GET /banner unauthorized', async () => {
        const response = await request(app).get('/banner')
        expectNoToken(response)
    })
})

describe('API Test GET /services', () => {
    it('GET /services success', async() => {
        const token = await getToken()
        const response = await request(app).get('/services').set('Authorization',`Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        const {error} = responseSchemaGetServiceSuccess.validate(response.body)
        expect(error).toBeUndefined()

    })

    it('GET /services unauthorized', async () => {
        const response = await request(app).get('/services')
        expectNoToken(response)
    })
})
