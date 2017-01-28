import React from 'react';

const App = ({ title, description }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <title> { title } </title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <link rel="stylesheet" href="/static/styles/style.css" />
    </head>
    <body>
      <div
        id="app"
      />
      <script src="/static/scripts/commons.js" />
      <script src="/static/scripts/main.js" />
    </body>
  </html>
 );

export default App;
