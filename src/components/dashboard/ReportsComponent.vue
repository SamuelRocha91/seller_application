<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartOptions,
  type ChartData

} from 'chart.js';
import { useStoreActive } from '@/store/storeActive';
import { AnalysisService } from '@/api/analysisService';
import Swal from 'sweetalert2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const storeActive = useStoreActive().storeActive;
const analisys = new AnalysisService();
const src = ref('');
const URL_API = import.meta.env.VITE_BASE_URL;
const chartData = ref<ChartData<'bar', number[], unknown>>({
  labels: [],
  datasets: []
});
const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Average Revenue by Day of the Week'
    }
  }
});

onMounted(() => {
  analisys.getAnalysisProductSalesByDayOfWeek(storeActive.id, (data: any) => {
    src.value = `${URL_API}${data.plot_image}`;
  }).catch((error) => {
    console.log(error);
    Swal.fire('Erro ao carregar a imagem');
  });
  analisys.getAnalysisBilingDayOfTheWeek(storeActive.id, (data: any) => {
    chartData.value = {
      labels: [...Object.keys(data.result)],
      datasets: [
        {
          label: 'Average Revenue by Day of the Week',
          data: Object.values(data.result).map(value => Number(value)),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  }).catch((error) => {
    console.log(error);
    Swal.fire('Erro ao carregar a imagem');
  });
});
</script>
<template>
  <div class="container reports">
    <div class="row justify-content-center mb-4">
      <div class="col text-center">
        <h1>Análise dos últimos 30 dias</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 mb-4">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Média de faturamento por dia da semana</h2>
          </div>
          <div class="card-body">
            <Bar v-if="chartOptions && chartData" :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Relatório de saída de produtos por dia da semana</h2>
          </div>
          <div class="card-body text-center">
            <div v-if="src">
              <img class="img-fluid img-graphs" :src="src" alt="média de venda de produtos por dia">
            </div>
            <div v-else>
              <h2>Carregando...</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.reports {
  background-color: #f8f9fa; 
  padding: 2rem;
  border-radius: 0.25rem;
}

.card {
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0;
}

.img-graphs {
  max-width: 100%;
  height: auto;
}

.text-center h2 {
  font-size: 1.25rem;
}
</style>
