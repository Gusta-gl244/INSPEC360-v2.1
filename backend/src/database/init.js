import { initDb, runSQL } from './connection.js';

export async function initializeDatabase() {
  console.log('🔧 Inicializando banco de dados...');

  await initDb();
  console.log('✅ Conexão estabelecida');

  // ✅ helper para executar SQL sem travar fluxo
  async function exec(sql, params = []) {
    try {
      await runSQL(sql, params);
    } catch (err) {
      console.error('Erro SQL:', err.message);
    }
  }

  // ─────────────────────────────────────────
  // TABELAS
  // ─────────────────────────────────────────

  await exec(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('tecnico', 'supervisor', 'superadm')),
    status TEXT NOT NULL CHECK(status IN ('active', 'inactive')),
    lastLogin TEXT,
    avatar TEXT,
    phone TEXT,
    createdAt TEXT NOT NULL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS structures (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    classe TEXT,
    coordX REAL NOT NULL,
    coordY REAL NOT NULL,
    progressiva REAL NOT NULL,
    deflexao REAL,
    alturaUtil REAL,
    vanFrente REAL,
    cotaCentro REAL,
    lt TEXT NOT NULL,
    voltage TEXT NOT NULL,
    cadeiaCondutor TEXT,
    qtdCadeias INTEGER,
    cadeiaParaRaios TEXT,
    qtdCadeiasPR INTEGER,
    estruturaCritica INTEGER DEFAULT 0,
    status TEXT NOT NULL,
    observation TEXT,
    createdBy TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS componentRules (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    description TEXT,
    anomalies TEXT NOT NULL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS serviceOrders (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    structureId TEXT NOT NULL,
    structureName TEXT NOT NULL,
    supervisorId TEXT NOT NULL,
    supervisorName TEXT NOT NULL,
    technicianId TEXT,
    technicianName TEXT,
    status TEXT NOT NULL,
    startDate TEXT,
    endDate TEXT,
    priority TEXT,
    description TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS inspectionRecords (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    estruturaId TEXT NOT NULL,
    estruturaNome TEXT NOT NULL,
    supervisorId TEXT NOT NULL,
    supervisorNome TEXT NOT NULL,
    tecnicoId TEXT NOT NULL,
    tecnicoNome TEXT NOT NULL,
    dataHoraAbertura TEXT NOT NULL,
    dataHoraFim TEXT,
    status TEXT NOT NULL,
    observacoesGerais TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS componentInspections (
    id TEXT PRIMARY KEY,
    inspectionId TEXT NOT NULL,
    componentId TEXT NOT NULL,
    componentName TEXT NOT NULL,
    status TEXT NOT NULL,
    notes TEXT,
    createdAt TEXT NOT NULL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS anomalies (
    id TEXT PRIMARY KEY,
    componentInspectionId TEXT NOT NULL,
    inspectionId TEXT NOT NULL,
    anomalyName TEXT NOT NULL,
    severity TEXT,
    phase TEXT,
    isEmenda INTEGER DEFAULT 0,
    safetyRisk TEXT,
    operationalRisk TEXT,
    requiresShutdown INTEGER DEFAULT 0,
    isRecurrent INTEGER DEFAULT 0,
    observation TEXT,
    photoId TEXT,
    createdAt TEXT NOT NULL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS inspectionPhotos (
    id TEXT PRIMARY KEY,
    inspectionId TEXT NOT NULL,
    componentId TEXT,
    componentName TEXT,
    anomalyId TEXT,
    anomalyName TEXT,
    filePath TEXT NOT NULL,
    storagePath TEXT,
    caption TEXT,
    timestamp TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    accuracy REAL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS pauseHistory (
    id TEXT PRIMARY KEY,
    inspectionId TEXT NOT NULL,
    pausedAt TEXT NOT NULL,
    resumedAt TEXT,
    motivo TEXT,
    userId TEXT NOT NULL,
    userName TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )`);

  await exec(`CREATE TABLE IF NOT EXISTS executionRecords (
    id TEXT PRIMARY KEY,
    orderId TEXT NOT NULL,
    estruturaId TEXT NOT NULL,
    estruturaNome TEXT NOT NULL,
    supervisorId TEXT NOT NULL,
    supervisorNome TEXT NOT NULL,
    tecnicoId TEXT NOT NULL,
    tecnicoNome TEXT NOT NULL,
    dataHoraAbertura TEXT NOT NULL,
    dataHoraFim TEXT,
    status TEXT NOT NULL,
    observacoesGerais TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )`);

  // ─────────────────────────────────────────
  // DADOS INICIAIS
  // ─────────────────────────────────────────

  const usuarios = [
    ['admin@inspec360.com', 'Administrador', 'admin123', 'superadm', 'active'],
    ['supervisor@inspec360.com', 'Supervisor Valdez', 'sup123', 'supervisor', 'active'],
    ['tecnico@inspec360.com', 'Técnico Silva', 'tec123', 'tecnico', 'active']
  ];

  for (let i = 0; i < usuarios.length; i++) {
    const u = usuarios[i];
    await exec(
      `INSERT OR IGNORE INTO users 
      (id, email, name, password, role, status, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [`usr_${i}`, u[0], u[1], u[2], u[3], u[4], new Date().toISOString()]
    );
  }

  const components = [
    ['isoladores', 'Isoladores', '🔌', 'Isoladores', JSON.stringify(['Trinca'])],
    ['ferragens', 'Ferragens', '🔩', 'Ferragens', JSON.stringify(['Corrosão'])],
    ['estrutura', 'Estrutura', '🏗️', 'Estrutura', JSON.stringify(['Fissura'])]
  ];

  for (const component of components) {
    await exec(
      `INSERT OR IGNORE INTO componentRules 
      (id, name, icon, description, anomalies) 
      VALUES (?, ?, ?, ?, ?)`,
      component
    );
  }

  console.log('✅ Banco de dados inicializado com sucesso!');
}

export default initializeDatabase;
