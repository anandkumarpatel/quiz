const { google } = require('googleapis')

const TABLE_NAME = 'shoes'
const FIRST_DATA = 'A'
const LAST_DATA = 'A'
const FULL_RANGE = `A1:A1`

const NOT_FOUND = 'Invite Not Found'

const SHEET_ID =
  process.env.SHEET_ID || '1NgT_m-auQ622PfcLoJ2THX1uV7N5LaeElb-TFzhoTN0'
const ROW_MAP = {
  hash: 0,
  invitedList: 1,
  hotelType: 2,
  rate: 3,
  flags: 4,
  events: 5,
  email: 6,
  attendingList: 7,
  declineList: 8,
  didRSVP: 9,
  address: 10,
  attendingEvents: 11,
  roomAllocated: 12,
  roomReserved: 13,
  phone: 14
}

const logger = (...args) => {
  console.log(new Date(), ...args)
}

class Sheet {
  async init() {
    // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
    // environment variables.
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    const auth = await google.auth.getClient({
      credentials,
      // Scopes can be specified either as an array or as a single, space-delimited string.
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    this.sheets = google.sheets({ version: 'v4', auth })
  }

  get() {
    return this.sheets.spreadsheets.values
      .get({
        spreadsheetId: SHEET_ID,
        range: `${TABLE_NAME}!${FULL_RANGE}`
      })
      .catch((err) => {
        logger('GET google Sheet API error: ' + err)
        throw err
      })
      .then((gRes) => {
        return JSON.parse(gRes.data.values[0][0])
      })
  }

  save(partName) {
    return this.get()
      .then((current) => {
        current[partName] = true
        const values = [[JSON.stringify(current)]]
        logger('saving', values)

        return this.sheets.spreadsheets.values
          .update({
            spreadsheetId: SHEET_ID,
            range: `${TABLE_NAME}!${FULL_RANGE}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              range: `${TABLE_NAME}!${FULL_RANGE}`,
              values
            }
          })
          .catch((err) => {
            logger('SAVE google sheets API error: ' + err)
            throw err
          })
      })
  }

  updateRow(row, update) {
    const { people, address, events, email } = update

    if (people) {
      const attendingList = []
      const declineList = []

      Object.keys(people).forEach((person) => {
        if (people[person].isAttending === 'Yes') {
          attendingList.push(person)
        } else if (people[person].isAttending === 'No') {
          declineList.push(person)
        }
      })

      row[ROW_MAP.attendingList] = attendingList.join('|')
      row[ROW_MAP.declineList] = declineList.join('|')
    }

    if (address) {
      row[ROW_MAP.address] = !!address.street
        ? `${address.street} | ${address.city} | ${address.state} | ${address.zip} | ${address.country}`
        : ''
    }

    if (email) {
      row[ROW_MAP.email] = email
    }

    if (events) {
      row[ROW_MAP.attendingEvents] = Object.keys(events)
        .filter((key) => {
          return events[key] === 'Yes'
        })
        .join('|')
    }

    if (people && address && events) {
      row[ROW_MAP.didRSVP] = true
    }
  }

  parseRow(data) {
    return {
      id,
      people,
      hotel,
      didRSVP,
      address,
      flags,
      events,
      email
    }
  }
}

module.exports = Sheet
module.exports.NOT_FOUND = NOT_FOUND
