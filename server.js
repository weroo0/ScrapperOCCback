import express from 'express';
import cors from 'cors';



import { scrapeOCC } from './scrapperFunction.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir peticiones desde cualquier origen (puedes limitarlo a tu dominio de frontend)
app.use(cors());
app.use(express.json());

// Endpoint para hacer scraping
app.post('/scrape', async (req, res) => {
  try {
    const { searchTerm } = req.body;
    if (!searchTerm || !searchTerm.trim()) {
      return res.status(400).json({ error: 'El campo searchTerm es obligatorio' });
    }

    console.log(`🔍 Iniciando scraping para: ${searchTerm}`);
    const results = await scrapeOCC(searchTerm.trim());

    // Puedes devolver solo JSON o también URLs a archivos si los generas
    res.json({
      total: results.length,
      data: results
    });

  } catch (error) {
    console.error('❌ Error en /scrape:', error);
    res.status(500).json({ error: 'Error al realizar scraping' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ Backend OCC Scraper funcionando');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});
