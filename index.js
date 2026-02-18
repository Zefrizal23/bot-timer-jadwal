require('dotenv').config(); // Panggil token dari .env
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

// Setup Client dengan izin yang diperlukan
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// --- KONFIGURASI ID ---
const CHANNEL_ID = '1341576966507073578'; // Ganti dengan ID Channel
const ROLE_ID = '1473667840136581303';    // Ganti dengan ID Role

client.once('ready', () => {
    console.log(`Bot sudah online sebagai ${client.user.tag}!`);

    // --- SETUP JADWAL (CRON JOB) ---
    // Format Cron: "Detik Menit Jam Tanggal Bulan Hari"
    // Contoh: "0 0 8 * * *" artinya setiap jam 08:00:00 pagi setiap hari
    
    cron.schedule('0 0 21 * * *', () => {
        const channel = client.channels.cache.get(CHANNEL_ID);
        
        if (channel) {
            // Mengirim pesan dan tag role
            channel.send(`Halo <@&${ROLE_ID}>! 📢\nSudah jam 20:10, waktunya kegiatan dimulai! Jangan lupa absen ya.`);
            console.log('Pesan jadwal berhasil dikirim.');
        } else {
            console.log('Channel tidak ditemukan/bot tidak punya akses.');
        }
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta" // PENTING: Sesuaikan zona waktu WIB
    });
});


client.login(process.env.TOKEN);


