const express = require("express");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Inizializzazione di express
const app = express();

// Attivazione di cors
app.use(cors());

// Routes
app.get("/api/search/:query", (req, res) => {
	try {
		const query = req.params.query;
		console.log(query);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.listen(PORT, () => console.log("app avviata alla porta: " + PORT));
