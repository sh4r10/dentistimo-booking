import { assert } from 'chai'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

import appointment from '../src/controllers/appointment'
import { IAppointment } from '../src/interfaces/appointment'

let mongod: MongoMemoryServer

function randomId(length: number): string {
  let result = ''
  const characters = '0123456789abcdef'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

function generateRandomAppointment(presetUserId?: string | null, presetRequestId?: string | null, presetClinicId?: string | null): IAppointment {
  return {
    user_id: presetUserId || randomId(8),
    request_id: presetRequestId || randomId(20),
    dentist_id: presetClinicId || randomId(10),
    issuance: 0,
    date: new Date().getTime(),
  }
}

before(async () => {
  mongod = await MongoMemoryServer.create()
  await mongoose.connect(mongod.getUri(), {dbName: 'testAppointment'})
})


after(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
})

/*
* This section of unit tests is for creating appointments.
* Tests should attempt use invalid vs. valid parameters, expect former to error and latter to return objects.
*/
describe('Create appointments for user', () => {
  describe('createAppointment(), with invalid parameters', () => {
    it('should X', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    }),
    it('should Y', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })

  describe('createAppointment(), with valid parameters', () => {
    const currentTime = Date.now()
    const paramPreset: IAppointment = generateRandomAppointment('64')

    it('should create a proper appointment', async () => {  
      await appointment.createAppointment(paramPreset).then((result) => {
        assert.exists(result, 'Nothing was returned')
        assert.equal(result.user_id, paramPreset.user_id, 'User ID modified/mismatched')
        assert.equal(result.request_id, paramPreset.request_id, 'Request ID modified/mismatched')
        assert.equal(result.dentist_id, paramPreset.dentist_id, 'Clinic ID modified/mismatched')
        assert.notEqual(result.issuance, 0, "Issuance time unchanged")
        assert.isAtLeast(result.issuance, currentTime, "Issuance time mismatched")
      }).catch((result) => {
        assert.notOk(result, result)
      })
    })
  })
})

/*
* This section of unit tests is for getting appointments from one user's ID.
*/
describe('Getting appointments from one user', () => {
  describe('getAppointmentsFromUserId(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })

  describe('getAppointmentsFromUserId(), specified user', () => {
    it('should contain an empty list', async () => {
      const userId = '288959'
      await appointment.getAppointmentsFromUserId(userId).then((result) => {
        assert.exists(result, 'Missing appointments')
        assert.isEmpty(result, 'Mysterious appointments found')
      })
    })

    it('should contain one appointment', async () => {
      const userId = '288959'
      const paramPreset: IAppointment = generateRandomAppointment(userId)

      await appointment.createAppointment(paramPreset).then(() => {
        appointment.getAppointmentsFromUserId(userId).then((result) => {
          assert.exists(result, 'Missing appointments')
          assert.isNotEmpty(result, 'No appointments found')
        })
      })
    })

    it('should contain more than one appointment', async () => {
      const userId = '288959'
      const paramPreset0: IAppointment = generateRandomAppointment(userId)
      const paramPreset1: IAppointment = generateRandomAppointment(userId)
      
      await appointment.createAppointment(paramPreset0)
      await appointment.createAppointment(paramPreset1).then(() => {
        appointment.getAppointmentsFromUserId(userId).then((result) => {
          assert.exists(result, 'Missing appointments')
          assert.isNotEmpty(result, 'No appointments found')
          assert.isAtLeast(result.length, 2, 'Only one appointment was found')
        })
      })
    })
  })
})

/*
* This section of unit tests is for getting appointments from one user's ID.
*/
describe('Getting upcoming appointments from one user', () => {
  describe('getUpcomingAppointmentsFromUserId(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting historic appointments from one user's ID.
*/
describe('Getting all historic appointments from one user', () => {
  describe('getAppointmentHistoryFromUserId(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting all appointments.
*/
describe('Getting all booked appointments', () => {
  describe('getAllAppointments(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for updating appointments.
*/
describe('Updating appointment time on existing appointment', () => {
  describe('updateAppointmentTime(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})