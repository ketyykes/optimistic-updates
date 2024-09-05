import React from "react";
import useSWR, { mutate } from "swr";
import api from "./api"; // 引入你的 axios 實例

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const LikeButton2: React.FC = () => {
	const { data } = useSWR("/likes", fetcher);

	// 處理點讚功能
	const handleLike = async () => {
		try {
			api.post("/likes"); // 假設後端在點讚後會自動更新數量
			mutate("/likes", { likes: data.likes + 1 }, true); // 臨時更新本地數據
		} catch (error) {
			console.error("Failed to add like:", error);
		}
	};

	return <button onClick={handleLike}>👍 讚 {data.likes}</button>;
};

export default LikeButton2;
