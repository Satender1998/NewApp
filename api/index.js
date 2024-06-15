// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const path = require("path")
// const dotenv = require("dotenv")

// // dotenv.config();
// dotenv.config()

// const app = express();
// const PORT = process.env.PORT || 3001;
// console.log(process.env.PORT);
// console.log(PORT);

// // const __dirname = path.resolve();

// // Use CORS middleware
// app.use(cors());

// // Helper function to get story details
// const getStoryDetails = async (id) => {
//   const response = await axios.get(
//     `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
//   );
//   return response.data;
// };

// // Top Stories API
// app.get("/topstories", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
//     );
//     const storyIds = response.data.slice(0, 10); // Fetching top 10 stories for example
//     const stories = await Promise.all(
//       storyIds.map((id) => getStoryDetails(id))
//     );
//     res.json({ stories });
//   } catch (error) {
//     res.status(500).send("Error fetching top stories");
//   }
// });

// // Best Stories API
// app.get("/beststories", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
//     );
//     const storyIds = response.data.slice(0, 10); // Fetching top 10 stories for example
//     const stories = await Promise.all(
//       storyIds.map((id) => getStoryDetails(id))
//     );
//     res.json({ stories });
//   } catch (error) {
//     res.status(500).send("Error fetching best stories");
//   }
// });

// // New Stories API
// app.get("/newstories", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
//     );
//     const storyIds = response.data.slice(0, 10); // Fetching top 10 stories for example
//     const stories = await Promise.all(
//       storyIds.map((id) => getStoryDetails(id))
//     );
//     res.json({ stories });
//   } catch (error) {
//     res.status(500).send("Error fetching new stories");
//   }
// });



// // // Serving static files from the 'client/dist' directory
// // app.use(express.static(path.join(__dirname, '/client/dist')));

// // app.get('*', (req, res) => {
// //     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// // })


// // Serving static files from the 'client/dist' directory
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors());

// Helper function to get story details
const getStoryDetails = async (id) => {
  const response = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  );
  return response.data;
};

// Top Stories API
app.get("/topstories", async (req, res) => {
  try {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );
    const storyIds = response.data.slice(0, 10);
    const stories = await Promise.all(
      storyIds.map((id) => getStoryDetails(id))
    );
    res.json({ stories });
  } catch (error) {
    res.status(500).send("Error fetching top stories");
  }
});

// Best Stories API
app.get("/beststories", async (req, res) => {
  try {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
    );
    const storyIds = response.data.slice(0, 10);
    const stories = await Promise.all(
      storyIds.map((id) => getStoryDetails(id))
    );
    res.json({ stories });
  } catch (error) {
    res.status(500).send("Error fetching best stories");
  }
});

// New Stories API
app.get("/newstories", async (req, res) => {
  try {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    );
    const storyIds = response.data.slice(0, 10);
    const stories = await Promise.all(
      storyIds.map((id) => getStoryDetails(id))
    );
    res.json({ stories });
  } catch (error) {
    res.status(500).send("Error fetching new stories");
  }
});

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
