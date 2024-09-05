import React, { useState, useEffect } from "react";
import api from "./api"; // 引入設定好的 axios 實例

const LikeButton: React.FC = () => {
	const [likes, setLikes] = useState<number>(0); // 初始化讚數

	// 載入初始數據
	useEffect(() => {
		const fetchLikes = async () => {
			try {
				const response = await api.get("/likes"); // 使用 axios 實例發起 GET 請求
				setLikes(response.data.likes); // 假設後端回應中讚的數量在 `likes` 屬性中
			} catch (error) {
				console.error("Failed to fetch likes:", error);
			}
		};

		fetchLikes();
	}, []);

	// 處理點讚功能
	const handleLike = async () => {
		try {
			api.post("/likes"); // 使用 axios 實例發起 POST 請求
			const response = await api.get("/likes"); // 使用 axios 實例發起 GET 請求
			const likes = response.data.likes; // 假設後端回應中讚的數量在 `likes` 屬性中
			setLikes(likes); // 前端增加讚數
		} catch (error) {
			console.error("Failed to add like:", error);
		}
	};

	return <button onClick={handleLike}>👍 讚 {likes}</button>;
};

export default LikeButton;
