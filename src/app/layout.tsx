'use client'

import './styles/global.css';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Turners Car Insurance App</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default layout;
