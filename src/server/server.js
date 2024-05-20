const express = require("express");
const nodemailer = require("nodemailer");

const server = express();

server.use(express.static(__dirname + '/public'));
server.use(express.json());

const cors = require('cors');
server.use(cors());

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'dataBase.db');
const sqlite3 = require('sqlite3').verbose();

if (!fs.existsSync(dbPath)) {
  fs.openSync(dbPath, 'w');
  const db = new sqlite3.Database(dbPath);
  const sql = fs.readFileSync('./src/server/schema.sql').toString();
  db.exec(sql);
  db.close();
}

const db = new sqlite3.Database(dbPath);

const sql = fs.readFileSync('./src/server/schema.sql').toString();

db.exec(sql);

const generateVerifyCode = () => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  return code
}

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

server.post('/api/submitReview', (req, res) => {
  const { email, review } = req.body;
  const date = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  db.run('INSERT INTO reviews (email, review, date) VALUES (?, ?, ?)', [email, review, date], function (err) {
    if (err) {
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }
    return res.status(200).send({ status: 200, message: "Review submitted successfully" });
  });
});

server.get('/api/getReviews', (req, res) => {
  db.all('SELECT * FROM reviews ORDER BY date DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }
    return res.status(200).send({ status: 200, reviews: rows });
  });
});



server.post('/api/newLogin', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userId = req.body.userId;

  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (email, password, userId) VALUES (?, ?, ?)', [email, hashedPassword, userId], function (err) {
    if (err) {
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }
  });
})

server.post('/api/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }
    if (row) {
      const isMatch = await bcrypt.compare(password, row.password);
      if (!isMatch) {
        return res.status(400).send({ status: 400, message: "Incorrect password" });
      } else {
        return res.status(200).send({ status: 200, message: "Login successful" });
      }
    } else {
      const verifyCode = generateVerifyCode();
      let responseSent = false;
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.yandex.ru",
          port: 465,
          secure: true,
          auth: {
            user: "SoftSeason@yandex.ru",
            pass: "tlrozowdvoqzkmpu",
          },
        });
        await transporter.sendMail({
          from: "SoftSeason@yandex.ru",
          to: `${email}`,
          subject: "SoftSeason",
          text: `Ваш код для проверки: ${verifyCode}`,
          html: `<p>Ваш логин для входа: ${email} на сайте SoftSeason</p>
                          <p>Пароль: ${password}</p>
                          <p>Код для проверки: ${verifyCode}</p>
                          <p></p>
                          <p>Если вы ввели какие-либо данные некорректно, то можете заново пройти регистрацию на сайте</p>
                          <p>в случае, если это сообщение ничего вам не говорит, то игнорируйте.</p>`,
        });
        const token = jwt.sign({ code: verifyCode }, 'shhhhhhared-secret', { expiresIn: '1h' });
        if (!responseSent) {
          responseSent = true;
          return res.status(200).send({ status: 200, message: "Success", token: token });
        }
      } catch (e) {
        if (!responseSent) {
          responseSent = true;
          return res.status(500).send({ status: 500, message: "Internal server error" });
        }
      }
    }
  });
});

server.post('/api/changePasswordCode', async (req, res) => {
  const email = req.body.email;
  const verifyCode = generateVerifyCode();
  let responseSent = false;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: "SoftSeason@yandex.ru",
        pass: "tlrozowdvoqzkmpu",
      },
    });
    await transporter.sendMail({
      from: "SoftSeason@yandex.ru",
      to: `${email}`,
      subject: "SoftSeason",
      text: `Ваш код для смены пароля: ${verifyCode}`,
      html: `<p>Ваш логин: ${email}</p>
              <p>Код для проверки: ${verifyCode} на сайте SoftSeason</p>
              <p></p>
              <p>в случае, если это сообщение ничего вам не говорит, то игнорируйте.</p>`,
    });
    const token = jwt.sign({ code: verifyCode }, 'shhhhhhared-secret', { expiresIn: '1h' });
    if (!responseSent) {
      responseSent = true;
      return res.status(200).send({ status: 200, message: "Success", token: token });
    }
  } catch (e) {
    console.error('Ошибка при отправке кода на почту:', e);
    if (!responseSent) {
      responseSent = true;
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }
  }
});



server.post('/api/changePassword', async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }
    if (!row) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.run('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], function (err) {
      if (err) {
        return res.status(500).send({ status: 500, message: "Internal server error" });
      }
      return res.status(200).send({ status: 200, message: "Password updated successfully" });
    });
  });
});

server.post('/api/submit', async (req, res) => {
  const email = req.body.email;
  const ip = req.body.ip;
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const message = req.body.message;
  const order = req.body.order;
  const userId = req.body.userId;

  let responseSent = false;

  db.run('INSERT INTO orders (userId, date, message, phone, "order") VALUES (?, ?, ?, ?, ?)', [userId, new Date().toISOString(), message, phone, order], function (err) {
    if (err) {
      responseSent = true;
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }

    if (!responseSent) {
      responseSent = true;
      return res.status(200).send({ status: 200, message: "Success" });
    }
  });

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: "SoftSeason@yandex.ru",
        pass: "tlrozowdvoqzkmpu",
      },
    });

    await transporter.sendMail({
      from: "SoftSeason@yandex.ru",
      to: "SoftSeason@yandex.ru",
      subject: `${name} (${phone})`,
      text: name,
      html: `
          <p>${name}</p>
          <p>${phone}</p>
          <p>${address}</p>
          <p>${message}</p>
          <p>${order}</p>
          <p>${ip}</p>
          <div>personal data</div>
          <p>${email}</p>
          `,
    });

    if (!responseSent) {
      responseSent = true;
      return res.status(200).send({ status: 200, message: "Success" });
    }
  } catch (e) {
    if (!responseSent) {
      responseSent = true;
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }
  }
});


server.post('/api/sendMail', async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const message = req.body.message;
  const order = req.body.order;
  const userId = req.body.userId;
  const orderJson = JSON.stringify(order);

  let responseSent = false;

  db.run('INSERT INTO orders (userId, date, message, phone, address, "order", email) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, new Date().toISOString(), message, phone, address, orderJson, email], function (err) {
    if (err) {
      responseSent = true;
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }

    if (!responseSent) {
      responseSent = true;
      return res.status(200).send({ status: 200, message: "Success" });
    }
  });

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: "SoftSeason@yandex.ru",
        pass: "tlrozowdvoqzkmpu",
      },
    });

    await transporter.sendMail({
      from: "SoftSeason@yandex.ru",
      to: `${email}`,
      subject: `${name} (${phone}) вы оформили заказ`,
      text: `${name} вы оформили заказ на сайте SoftSeason`,
      html: `
      <div style={{ background: '#ffffff46' }}>
          <p>Добрый день ${name}!</p>
          <p>Вы оформили заказ на сайте SoftSeason. В случае если это были не вы игнорируйте данное сообщение.</p>
          <p style="color: red;">В случае если вы ввели какие либо данные неккоректно, вы можете заново переоформить заказ на сайте до момента совершения оплаты товара.</p>
          <p style="color: red;">Обращаем Ваше внимание, продажа товара осуществляется дистанционным способом в соответствии с действующем законодательством. Товар надлежащего качества возврату не подлежит, швейные и трикотажные изделия обмену не подлежат.<p>
          <p>Ваш email: ${email}</p>
          <p>Ваш номер телефона: ${phone}</p>
          <p>Адрес для доставки: ${address}</p>
          <p>Ваше текстовое сообщение(коментарий): ${message}</p>
          <p>Артикул вашего товара на сайте: ${order}</p>
          <p>Для оплаты заказа вы можете перейти по ссылке ниже, ввести номер карты вручную, а так же можно оплатить по qr-коду.</p>
          <p>БАНК ПЕРЕВОДА ПОЛУЧАТЕЛЯ ПЕРЕВОДА - ТИНЬКОФФ</p>
          <p>https://www.tinkoff.ru/rm/ryabtsev.nikita32/nkBEn67312</p>
          <p>Номер счета банка получателя: 5536 9141 6496 9754</p>
          <p>QR-код для оплаты.</p>
          <img src='https://i.postimg.cc/bvph2TbY/photo-2024-05-04-11-50-01.jpg' border='0' alt='photo-2024-05-04-11-50-01'/>
          <p style="color: red;">В случае неверно указанных данных, или в случае перевода денег неизвестным лицам(не по указанным данным), ответсвенности не несем.</p>
          <p>Вопросы по поводу товара писать на почту - softseason.refusal@yandex.ru</p>
          </div>
          `
    });

    if (!responseSent) {
      responseSent = true;
      return res.status(200).send({ status: 200, message: "Success" });
    }
  } catch (e) {
    if (!responseSent) {
      responseSent = true;
      return res.status(500).send({ status: 500, message: "Internal server error" });
    }
  }
});

server.listen(2000, () => {
  console.log(`App listening on port 2000:`);
});
