import db from "./db";

import React from 'react'

const test = async () => {
  const users = await db.prepare('SELECT * FROM sessions').all()
    console.log(users)
}

export default test

