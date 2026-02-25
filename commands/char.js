const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('char')
    .setDescription('Xem thông tin nhân vật')
    .addStringOption(opt =>
      opt.setName('name')
        .setDescription('Tên nhân vật')
        .setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    const char = db.prepare('SELECT * FROM characters WHERE name=?').get(name);

    if (!char) return interaction.reply({ content: '❌ Không tìm thấy nhân vật!', ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor(0xff5555)
      .setTitle(char.name)
      .setThumbnail(char.avatar || null)
      .setDescription(`
**Vai trò:** ${char.role}
**Main:** ${char.main_stat}
**Sub:** ${char.sub_stat}

**Vũ khí:** ${char.weapon}
**Vũ khí phụ:** ${char.sub_weapon || 'Không có'}

**Giáp:** ${char.armor || 'Không có'}
**Găng:** ${char.gloves || 'Không có'}
**Kit:** ${char.kit || 'Không có'}
      `)
      .setImage(char.image || null);

    interaction.reply({ embeds: [embed] });
  }
};
