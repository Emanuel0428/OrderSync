const express = require('express');
const Log = require('../models/Log');
const router = express.Router();

// POST: /logs
router.post('/', async (req, res) => {
  try {    
    // Validar campos requeridos
    const { mensaje, modulo, nivel } = req.body;
    if (!mensaje || !modulo) {
      return res.status(400).json({ 
        error: 'Campos requeridos: mensaje y modulo' 
      });
    }

    const log = new Log(req.body);
    const saved = await log.save();
    
    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Error al guardar log:', error);
    res.status(400).json({ 
      error: 'Error al guardar log', 
      details: error.message 
    });
  }
});

// GET: /logs
router.get('/', async (req, res) => {
  try {
    const { modulo, nivel, limit = 100 } = req.query;
    
    // Construir filtros
    const filters = {};
    if (modulo) filters.modulo = modulo;
    if (nivel) filters.nivel = nivel;

    const logs = await Log.find(filters)
      .sort({ fecha: -1 })
      .limit(parseInt(limit));
    
    res.json(logs);
  } catch (error) {
    console.error('❌ Error al obtener logs:', error);
    res.status(500).json({ 
      error: 'Error al obtener logs', 
      details: error.message 
    });
  }
});

// GET: /logs/health - Endpoint de salud
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'log-service'
  });
});

module.exports = router;
