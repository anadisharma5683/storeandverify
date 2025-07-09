const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🛣️ Route used here
app.use('/api', userRoutes);


// ✅ Use only MongoDB Atlas OR Localhost, not both

mongoose.connect('mongodb+srv://admin:admin123@usercluster.r0jyxz2.mongodb.net/?retryWrites=true&w=majority&appName=UserCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas connected');
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
})
.catch((err) => {
  console.error('❌ MongoDB error:', err);
});




