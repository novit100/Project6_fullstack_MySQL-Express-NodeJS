const express = require("express");
const connection = require("./connection.js")
const bodyParser = require('body-parser');;
const router = express.Router();
const app = express();
app.use(express.json());

router.use(bodyParser.json());

router.get("/api/users", (req, res) => {
  // get all users
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Failed to retrieve users" });
      return;
    }
    res.json(results);
  });
});

// router.get("/api/users/:id", (req, res) => {
//   // get user by ID
//   const userId = req.params.id;
//   connection.query(
//     "SELECT * FROM users WHERE id = ?",
//     [userId],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing MySQL query:", err);
//         res.status(500).json({ error: "Failed to retrieve user" });
//         return;
//       }

//       if (results.length === 0) {
//         res.status(404).json({ error: "User not found" });
//         return;
//       }

//       res.json(results[0]);
//     }
//   );
// });
router.get("/api/users/:username", (req, res) => {
  // get user by username
  const username = req.params.username;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});


router.post("/api/users/login", (req, res) => {
  // get user by username and password
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE id = (SELECT id FROM passwords WHERE username = ? AND password = ?)",
    [username, password],
    (err, results) => {
      console.log(username, password);
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to retrieve user" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(results[0]);
    }
  );
});


// router.put("/api/users/:id/email", (req, res) => {
//   //update email to user
//   const userId = req.params.id;
//   const { email } = req.body;
//   connection.query(
//     "UPDATE users SET email = ? WHERE id = ?",
//     [email, userId],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing MySQL query:", err);
//         res.status(500).json({ error: "Failed to update email" });
//         return;
//       }

//       res.json({ message: "Email updated successfully" });
//     }
//   );
// });

// router.put("/api/users/:id/phone", (req, res) => {
//   // update phone to user
//   const userId = req.params.id;
//   const { phone } = req.body;
//   connection.query(
//     "UPDATE users SET phone = ? WHERE id = ?",
//     [phone, userId],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing MySQL query:", err);
//         res.status(500).json({ error: "Failed to update phone" });
//         return;
//       }

//       res.json({ message: "Phone updated successfully" });
//     }
//   );
// });

// router.put("/api/users/:id/name", (req, res) => {
//   // update name of user
//   const userId = req.params.id;
//   const { name } = req.body;
//   connection.query(
//     "UPDATE users SET name = ? WHERE id = ?",
//     [name, userId],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing MySQL query:", err);
//         res.status(500).json({ error: "Failed to update name" });
//         return;
//       }

//       res.json({ message: "Name updated successfully" });
//     }
//   );
// });

// router.put("/api/users/:id/password", (req, res) => {
//   // update password to user
//   const userId = req.params.id;
//   const { password } = req.body;
//   const { username } = req.body; // Assuming you provide the username in the request body

//   connection.query(
//     "UPDATE passwords SET password = ? WHERE username = ?",
//     [password, username],
//     (err, results) => {
//       if (err) {
//         console.error("Error executing MySQL query:", err);
//         res.status(500).json({ error: "Failed to update password" });
//         return;
//       }

//       if (results.affectedRows === 0) {
//         res.status(404).json({ error: "User not found" });
//         return;
//       }

//       res.json({ message: "Password updated successfully" });
//     }
//   );
// });
router.put("/api/users/:username/email", (req, res) => {
  // update email of user
  const username = req.params.username;
  const { email } = req.body;
  connection.query(
    "UPDATE users SET email = ? WHERE username = ?",
    [email, username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update email" });
        return;
      }

      res.json({ message: "Email updated successfully" });
    }
  );
});

router.put("/api/users/:username/phone", (req, res) => {
  // update phone of user
  const username = req.params.username;
  const { phone } = req.body;
  connection.query(
    "UPDATE users SET phone = ? WHERE username = ?",
    [phone, username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update phone" });
        return;
      }

      res.json({ message: "Phone updated successfully" });
    }
  );
});

router.put("/api/users/:username/name", (req, res) => {
  // update name of user
  const username = req.params.username;
  const { name } = req.body;
  connection.query(
    "UPDATE users SET name = ? WHERE username = ?",
    [name, username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update name" });
        return;
      }

      res.json({ message: "Name updated successfully" });
    }
  );
});

router.put("/api/users/:username/password", (req, res) => {
  // update password of user
  const username = req.params.username;
  const { password } = req.body;
  connection.query(
    "UPDATE passwords SET password = ? WHERE username = ?",
    [password, username],
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query:", err);
        res.status(500).json({ error: "Failed to update password" });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({ message: "Password updated successfully" });
    }
  );
});

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
module.exports = router;