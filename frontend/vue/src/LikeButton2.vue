<template>
	<button @click="handleLike">👍 讚 {{ likes }}</button>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import api from "./api"; // 引入設定好的 axios 實例

const likes = ref(0); // 使用 ref 來創建響應式變數

onBeforeMount(async () => {
	try {
		const response = await api.get("/likes"); // 使用 axios 實例發起 GET 請求
		likes.value = response.data.likes;
	} catch (error) {
		console.error("Failed to fetch likes:", error);
	}
});

const handleLike = async () => {
	likes.value += 1; // 樂觀地更新 likes 值
	try {
		api.post("/likes"); // 使用 axios 實例發起 POST 請求
	} catch (error) {
		console.error("Failed to add like:", error);
	}

	const response = await api.get("/likes");
	if (response.data.likes !== likes.value) {
		likes.value = response.data.likes; // 更新 likes 變數
		return;
	}
};
</script>
