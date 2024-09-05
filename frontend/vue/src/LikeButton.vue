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
		console.log(response.data.likes);
		likes.value = response.data.likes;
	} catch (error) {
		console.error("Failed to fetch likes:", error);
	}
});

const handleLike = async () => {
	try {
		api.post("/likes"); // 使用 axios 實例發起 POST 請求
		const response = await api.get("/likes"); // 使用 axios 實例發起 GET 請求
		likes.value = response.data.likes; // 更新 likes 變數
	} catch (error) {
		console.error("Failed to add like:", error);
	}
};
</script>
