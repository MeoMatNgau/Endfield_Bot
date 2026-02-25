const { SlashCommandBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addchar')
    .setDescription('Thêm nhân vật')
    .addStringOption(o => o.setName('name').setDescription('Tên').setRequired(true))
    .addStringOption(o => o.setName('role').setDescription('Vai trò').setRequired(true))
    .addStringOption(o => o.setName('main').setDescription('Chỉ số chính').setRequired(true))
    .addStringOption(o => o.setName('sub').setDescription('Chỉ số phụ').setRequired(true))
    .addStringOption(o => o.setName('weapon').setDescription('Vũ khí').setRequired(true)),

  async execute(interaction) {
    try {
      const d = interaction.options;

      db.prepare(`
        INSERT INTO characters 
        (name, role, main_stat, sub_stat, weapon)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        d.getString('name'),
        d.getString('role'),
        d.getString('main'),
        d.getString('sub'),
        d.getString('weapon')
      );

      interaction.reply(`✅ Đã thêm nhân vật **${d.getString('name')}**`);
    } catch (err) {
      interaction.reply('⚠️ Nhân vật đã tồn tại hoặc lỗi dữ liệu!');
    }
  }
};
