const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://fwa:lozamaxim123@ida.qgq6c9a.mongodb.net/?retryWrites=true&w=majority";

const API_KEY_BOT = "7473987432:AAFDw1tZ_45adx4NJuJV2-xNFqnVB39AVvg";
const bot = new TelegramBot(API_KEY_BOT, {
    polling: true,
});
const app = express();
const PORT = process.env.PORT || 3001;

const dbName = "Znaydi"; 
let collectionName = "users";


async function getAllData() {
    const client = new MongoClient(uri, {});
  
    try {
      await client.connect();
  
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
  
  
      const result = await collection.find({}).toArray();
  
  
      return result;
    } catch (error) {
      console.error(error);
      throw error; 
    } finally {
      await client.close();
    }
  }


  
app.get('/get_db', async (req, res) => {
    try {
      const data = await getAllData();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  });
  
  app.post('/New', async (req, res) => {
    console.log(123123)
    await bot.sendMessage(req.body.idtg, `Учень ${req.body.nick} зареєструвався`);
  });
  
  
  
  app.put('/put_db/:id', async (req, res) => {
    const id = req.params.id;
    let updatedData = req.body;
    const client = new MongoClient(uri, {});
  
    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
      if (updatedData._id) {
            delete updatedData._id;
      }
  
  
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error});
    } finally {
      await client.close();
    }
  });
  
  
  
  app.post('/push_db', async (req, res) => {
    try {
      const database = client.db(dbName);
      const collection = database.collection(collectionName); 
      const client = new MongoClient(uri, { });
      await client.connect();
  
      const result = await collection.insertOne(req.body);
      res.status(200).json({ message: 'Дані успішно збережено в MongoDB', insertedId: result.insertedId });
      }
      catch (error) {
      console.error('Помилка при збереженні даних в MongoDB:', error);
      res.status(500).json({ message: 'Виникла помилка при збереженні даних' });
      }
      finally {
      client.close();
    }
  });


const but1 = 'Протидія насильству';

const start_key = [
    [but1],
];


const options = {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Відкрити додаток",
            web_app: { url: "https://dfc9-159-224-180-159.ngrok-free.app/" }  
          }
        ]
      ],
      resize_keyboard: true, 
      one_time_keyboard: true  
    }
  };
bot.on('text', async (nextMsg) => {
    try {
        const chatId = nextMsg.from.id;
        switch (nextMsg.text) {
            case "/start":
                bot.sendMessage(chatId, "Додаток",options);
                break;

            default:
                bot.sendMessage(chatId, "Невідомий запит. Натисніть /start для меню.");
                break;
        }
    } catch (e) {
        console.error("ERROR:", e);
    }
});



app.use(bodyParser.json());

app.get("/call", async (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});