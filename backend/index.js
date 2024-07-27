const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_KEY);

//middleware
app.use(cors());
app.use(express.json());

//database

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bc4gwnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const booksCollection = client.db('bookStore').collection('books');
    const cartCollection = client.db('bookStore').collection('carts');
    const userCollection = client.db('bookStore').collection('users');
    const paymentCollection = client.db('bookStore').collection('payments');

    //jwt

    app.post('/jwt', async (req, res) => {

      const { email } = req.body;

      if (!email) {
        return res.status(400).send({ msg: 'Email is required' });
      }

      const payload = req.body;

      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '3h',
      });
      res.send({ token });
    });

    // verify token

    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ msg: 'Unauthorized access' });
      }

      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).send('Unauthorized access');
        }

        console.log('decoedddd', decoded);
        req.decoded = decoded;
        next();
      });
    };

    // verify admin

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;

      const user = await userCollection.findOne({ email: email });

      const isAdmin = user?.role === 'admin';

      if (!isAdmin) {
        return res
          .status(401)
          .send({ msg: 'unauthorized access - for verify admin' });
      }

      next();
    };

    // admin check for routes

    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const { email } = req.params;

      if (email != req.decoded.email) {
        return res.status(401).send({ msg: 'unauthorized access' });
      }

      const query = { email: email };

      const user = await userCollection.findOne(query);
      let admin = false;

      if (user) {
        admin = user?.role === 'admin';
      }

      res.send({ admin });
    });

    //users collection

    app.get('/users', verifyToken, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const users = req.body;

      const isEmailExist = await userCollection.findOne({ email: users.email });

      if (isEmailExist) {
        return res.send({ msg: 'Already exists', insertedId: null });
      }

      try {
        const result = await userCollection.insertOne(users);
        res.status(201).send({ msg: 'inserted ' });
      } catch (error) {
        console.log(error);
      }
    });

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.patch('/users/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: 'admin',
        },
      };

      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // carts collection

    app.get('/carts', async (req, res) => {
      const email = req.query.email;
      const result = await cartCollection.find({ email: email }).toArray();
      res.send(result);
    });

    app.post('/carts', async (req, res) => {
      const result = await cartCollection.insertOne(req.body);
      res.send(result);
    });

    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const result = await cartCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.status(202).send({ msg: 'deleted' });
      } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
      }
    });

    // create a book

    app.post('/books', verifyToken, verifyAdmin, async (req, res) => {
      try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
          return res.status(400).send({ msg: 'need all required fields' });
        } else {
          const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            image: req.body.image,
            tag: req.body.tag,
            price: req.body.price,
          };

          const book = await booksCollection.insertOne(newBook);
          res.status(201).send(book);
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'error msg' });
      }
    });

    // get all books

    app.get('/books', async (req, res) => {
      try {
        const books = await booksCollection.find().toArray();
        res.status(201).send({
          count: books.length,
          data: books,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
      }
    });

    // get one book by id

    app.get('/books/:id', async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      try {
        const books = await booksCollection.findOne(query);
        res.status(201).send({
          count: books.length,
          data: books,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
      }
    });

    // update a book

    app.patch('/books/:id', verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: req.body,
      };
      try {
        const result = await booksCollection.updateOne(filter, updatedDoc);

        if (!result) {
          return res.send({ msg: 'book not found' });
        }
        res.send({ msg: 'book updated successfully' });
      } catch (error) {
        console.log(error);
      }
    });

    // Delete a book
    app.delete('/books/:id', verifyToken, verifyAdmin, async (req, res) => {
      const { id } = req.params;
      try {
        const result = await booksCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send({ msg: 'deletedd' });
      } catch (error) {
        console.log(error);
      }
    });

    // payment intent
    app.post('/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount, 'amount inside the intent');

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.get('/payments/:email', verifyToken, async (req, res) => {
      const query = { email: req.params.email };
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post('/payments', async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);

      //   delete each item from the cart
      console.log('payment info', payment);
      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };

      const deleteResult = await cartCollection.deleteMany(query);

      res.send({ paymentResult, deleteResult });
    });

    // admin stats

    app.get('/admin-stats', verifyToken, verifyAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const bookItems = await booksCollection.estimatedDocumentCount();
      const payments = await paymentCollection.estimatedDocumentCount();

      res.send({ users, bookItems, payments });
    });

    // user stats

    app.get('/user-stats/:email', async (req, res) => {
      const { email } = req.params;
      console.log(email);
      const query = { email: email };
      const cartItems = await cartCollection.countDocuments(query);
      const payments = await paymentCollection.countDocuments(query);

      res.send({ email, cartItems, payments });
    });

    // user total orders

    app.get('/user-cartIds/:email', verifyToken, async (req, res) => {
      const query = { email: req.params.email };

      if (req.params.email === !req.decoded.email) {
        return res.status(403).send({ msg: 'unauthorized access' });
      }

      try {
        const result = await paymentCollection
          .aggregate([
            { $match: query },
            {
              $group: {
                _id: null,
                totalCartIds: { $sum: { $size: '$cartIds' } },
              },
            },
          ])
          .toArray();

        res.send(result);

        if (result.length === 0) {
          return res
            .status(404)
            .send({ message: 'No payments found for the specified email' });
        }
      } catch (error) {
        console.log(error);
        res.status(403).status('Internal Server Error - cartIDs');
      }
    });

    // payment success-pending

    app.patch('/payment-succes/:id', async (req, res) => {
      const { id } = req.params;

      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: 'success',
        },
      };
      const result = await paymentCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('ookkkkkk');
});

app.listen(port, () => {
  console.log(`Porting ${port}`);
});
