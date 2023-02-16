import { describe, expect, it } from 'vitest'
import server from '../../src/server'
import prisma from '../../src/utils/prisma'
import resetDb from '../helpers/reset-db'

const UserCreate = {
    email: '3123123434151ddddedd@email.com',
    password: '1231231234',
    name: 'User Fullname'
}

await resetDb()

describe('/auth', async () => {
    describe('[POST] /doctor', () => {
        it('should respond with a `200` status code and user details', async () => {
            const response = await server.inject({
                url: 'api/doctor',
                method: 'POST',
                payload: UserCreate,
                headers: {
                    'Accept': 'application/json'
                }
            })
        const newUser = await prisma.doctor.findFirst()
        expect(newUser).not.toBeNull()
        expect(response.statusCode).eq(201);
        expect(JSON.parse(response.body)).toStrictEqual({
            "id": newUser?.id,
            "email":"3123123434151ddddedd@email.com",
            "name": "User Fullname"}
            )
          })
      })
  })