"use strict";

const axios = require("axios");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar si ya existen registros
    const existing = await queryInterface.sequelize.query(
      `SELECT COUNT(*) FROM "Characters";`
    );

    const count = parseInt(existing[0][0].count, 10);
    if (count > 0) {
      console.log("Characters ya existen. Seed cancelado.");
      return;
    }

    // 1️⃣ Obtener personajes
    const { data } = await axios.get(
      "https://hp-api.onrender.com/api/characters"
    );

    // 2️⃣ Filtrar solo los que tienen imagen
    const withImage = data.filter(
      c => c.image && c.image.trim() !== ""
    );

    // 3️⃣ Construir registros con imagen en BINARIO
    const characters = [];

    for (let i = 0; i < withImage.length; i++) {
      const c = withImage[i];

      let imageBuffer = null;

      try {
        const imgResponse = await axios.get(c.image, {
          responseType: "arraybuffer",
        });
        imageBuffer = Buffer.from(imgResponse.data);
      } catch (err) {
        console.warn(`⚠️ No se pudo descargar imagen de ${c.name}`);
      }

      characters.push({
        id: i + 1,
        name: c.name,
        house: c.house || null,
        ancestry: c.ancestry || null,
        wand: c.wand ? JSON.stringify(c.wand) : null,
        image: imageBuffer,
        createdAt: new Date(),
        updatedAt: new Date(),
      });


    }

    await queryInterface.bulkInsert("Characters", characters);
    console.log(`✅ Seed completado: ${characters.length} characters`);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Characters", null, {});
  },
};
