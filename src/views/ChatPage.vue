<script setup lang="ts"> 
import { onBeforeMount, onMounted, ref } from 'vue';
import consumer from '../utils/cable'; 

const messages = ref([]);
const newMessage = defineModel('newMessage', {default: ''});
const sendMessage = () => {
  if (newMessage.value.trim() === '') return;
  subscription.perform('speak', { message: newMessage.value });
  newMessage.value = '';
};

let subscription;
  
onMounted(() => {
  subscription = consumer.subscriptions.create(

    { channel: 'ChatChannel', room: 'public' },

    {

      connected: () => {

        console.log('Connected to chat channel');

      },

      disconnected: () => {

        console.log('Disconnected from chat channel');

      },

      received: (data) => {
        messages.value.push(data);
      },

    }

  );
}); 

onBeforeMount(() => {
  if (subscription) {
    consumer.subscriptions.remove(subscription);
  }
});

</script> 
<template> 
  <div class="chat-room"> 
    <div class="area-text">
      <h1>Chat Room</h1>
      <div id="messages">
        <p v-for="(message, index) in messages" :key="index">{{ message }}</p>
      </div>
    </div>
    <div class="message-send">
      <input
        v-model="newMessage"
       @keyup.enter="sendMessage"
       placeholder="Type a message...">
      <button @click.prevent="sendMessage">Send</button>
    </div>
  </div> 

</template>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  border: 1px solid black;
}

.area-text {
  height: 90vh;
  border: 1px solid black;
  height: 90vh;
  width: 100%;
  justify-content: center;
  display: flex;
}

.message-send {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10vh;
}

.message-send input {
  width: 100%;
  height: 50%;
  flex-direction: column;
  padding: 15px;
}

.message-send button {
  width: 100%;
  height: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

  
