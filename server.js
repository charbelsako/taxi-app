const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});
