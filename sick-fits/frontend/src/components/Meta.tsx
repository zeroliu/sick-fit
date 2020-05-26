import Head from 'next/head';
import React from 'react';

export const Meta: React.FC = () => {
  return (
    <Head>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel='shortcut icon' href='favicon.png' />
      <link rel='stylesheet' type='text/css' href='nprogress.css' />
      <link rel='stylesheet' type='text/css' href='font/flaticon.css' />
      <title>Sick Fits!</title>
    </Head>
  );
};
