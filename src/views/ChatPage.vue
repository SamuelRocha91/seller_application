<script setup lang="ts"> 
import { onBeforeMount, onMounted, ref } from 'vue';
import consumer from '../utils/cable'; 
let subscription: any;

const messages = ref([]);
const newMessage = defineModel('newMessage', {default: ''});
const sendMessage = () => {
  if (newMessage.value.trim() === '') return;
  subscription.perform('speak', { message: newMessage.value });
  newMessage.value = '';
};

  
onMounted(() => {
  subscription = consumer.subscriptions.create(

    { channel: 'ChatChannel', order_id: 'public' },
    // tenho que recuperar esse id pra criar a sala de chat
    {

      connected: () => {

        console.log('Connected to chat channel');

      },

      disconnected: () => {

        console.log('Disconnected from chat channel');

      },

      received: (data) => {
        console.log(data);
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
  <div class="container chat-room"> 
    <div class="area-text">
      <h1 class="text-center my-3">Chat Room</h1>
      <div id="messages" class="border rounded p-3 mb-3 overflow-auto" style="height: 70vh;">
        <div v-for="(data, index) in messages" :key="index" class="mb-2">
          <p class="mb-1 font-weight-bold">{{ data.user }}</p>
          <p class="mb-1">{{ data.message }}</p>
        </div>
      </div>
    </div>
    <div class="message-send">
      <div class="input-group">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
          class="form-control"
        >
        <div class="input-group-append">
          <button @click.prevent="sendMessage" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.area-text {
  flex: 1;
  width: 100%;
}

.message-send {
  width: 100%;
}
</style>
