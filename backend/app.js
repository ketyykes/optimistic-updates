const cors = require("cors");
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json()); // 讓 express 能夠解析 JSON 請求主體
app.use(cors()); // 啟用 CORS

const likesFile = "likes.json";

// 初始化 likes.json 檔案
if (!fs.existsSync(likesFile)) {
	fs.writeFileSync(likesFile, JSON.stringify({ likes: 0 }));
}

let lastPostTime = 0; // 紀錄最後一次 POST 操作的時間戳

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// GET 路由，讀取當前的按讚數
app.get("/likes", (req, res) => {
	const currentTime = Date.now();
	if (currentTime - lastPostTime <= 5000) {
		// 如果最後一次 POST 在五秒內
		setTimeout(() => {
			fs.readFile(likesFile, (err, data) => {
				if (err) {
					res.status(500).send("Error reading likes.");
					return;
				}
				res.json(JSON.parse(data));
			});
		}, 3000); // 延遲 3 秒後回應
	} else {
		fs.readFile(likesFile, (err, data) => {
			if (err) {
				res.status(500).send("Error reading likes.");
				return;
			}
			res.json(JSON.parse(data));
		});
	}
});

// POST 路由，增加按讚數
app.post("/likes", (req, res) => {
	lastPostTime = Date.now(); // 更新最後一次 POST 的時間
	fs.readFile(likesFile, (err, data) => {
		if (err) {
			res.status(500).send("Error reading likes.");
			return;
		}
		const likesData = JSON.parse(data);
		likesData.likes += 1; // 增加按讚數

		// 20% 機率觸發錯誤
		if (Math.random() < 0.2) {
			res.status(500).send("Simulated error while saving likes.");
			return;
		}
		fs.writeFile(likesFile, JSON.stringify(likesData), (err) => {
			if (err) {
				res.status(500).send("Error saving likes.");
				return;
			}

			res.send("Like added!");
		});
	});
});

// 設定伺服器監聽的埠
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
