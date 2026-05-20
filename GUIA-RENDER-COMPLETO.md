# 🚀 Deploy INPEC360 no Render.com

## 📋 Pré-requisitos

1. **Conta Render.com** - Criar em https://render.com (gratuito)
2. **Repositório GitHub** - Seu código deve estar em um repositório público ou privado
3. **Node.js 18+** - Para desenvolvimento local (opcional, mas recomendado)

---

## 🔧 Passo a Passo

### ✅ Passo 1: Preparar o Repositório Local

Na raiz do projeto (`c:\INPEC360 V2`):

```bash
# Inicializar git (se não estiver)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Deploy inicial INPEC360 v2.2"

# Adicionar origem remota (substitua pelo seu repo)
git remote add origin https://github.com/SEU_USUARIO/inpec360.git

# Fazer push
git branch -M main
git push -u origin main
```

**Estrutura esperada no GitHub:**
```
inpec360/
  ├── backend/
  │   ├── src/
  │   ├── package.json
  │   └── ...
  ├── src/
  ├── public/
  ├── package.json
  ├── vite.config.ts
  ├── render.yaml         ✅ (criado)
  ├── .gitignore          ✅ (criado)
  ├── build.sh / build.bat ✅ (criado)
  └── ...
```

### ✅ Passo 2: Criar Conta no Render

1. Acesse https://render.com
2. Clique em **Sign Up**
3. Escolha: **Continue with GitHub** (recomendado)
4. Autorize o Render a acessar seus repositórios
5. Confirme email

### ✅ Passo 3: Deploy Automático

#### Opção A: Via Dashboard Render (RECOMENDADO)

1. No Render Dashboard, clique **New +**
2. Selecione **Web Service**
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `inpec360`
   - **Root Directory**: (deixe em branco)
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build && cd backend && npm install && npm run init-db`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free
5. Clique **Create Web Service**

O deploy será automático! 🎉

#### Opção B: Via render.yaml (Automático)

Render detectará o arquivo `render.yaml` automaticamente e criará os serviços.

### ✅ Passo 4: Monitorar o Deploy

1. No Dashboard, vá para seu serviço
2. Abra a aba **Logs**
3. Acompanhe o build e inicialização

**Logs esperados:**
```
📦 Carregando sql.js...
🆕 Criando novo banco de dados...
✅ Banco criado: /opt/render/project/data/inpec360.db
🚀 INSPEC360 v2.2 - Backend Iniciado
📡 Server em: http://localhost:3000
```

---

## 🌐 Após o Deploy

### URLs da sua aplicação:
- **Frontend**: https://inpec360.onrender.com
- **API Backend**: https://inpec360.onrender.com/api
- **Health Check**: https://inpec360.onrender.com/api/health

### Testar a aplicação:
1. Abra https://inpec360.onrender.com no navegador
2. Faça login (dados padrão no banco)
3. Comece seus testes de piloto

---

## ⚠️ Considerações Importantes

### 1️⃣ Armazenamento de Fotos (IMPORTANTE!)

**No Render free, o disco é efêmero:**
- Fotos uploadadas podem ser perdidas após restart
- Banco de dados persiste em `/opt/render/project/data`

**Soluções:**
- **Curto prazo**: Aceitar perda de fotos em testes
- **Médio prazo**: Usar Cloudinary (free) para fotos
- **Longo prazo**: Upgrade Render Pro ($7/mês) com disco persistente

### 2️⃣ Performance

**Gratuito no Render:**
- 750 horas/mês de execução (suficiente)
- CPU limitado
- Primeira requisição pode ser lenta (~30s)
- Ativa automaticamente na primeira requisição

### 3️⃣ Limite de Dados

**SQLite local:**
- Limite prático: ~500MB
- Para mais dados: migrar para PostgreSQL
- Render oferece PostgreSQL gratuito também

### 4️⃣ Banco de Dados Persistente (Opcional)

Se quiser dados que persistem entre restarts:

1. No Render, crie um novo serviço: **PostgreSQL**
2. Ajuste o backend para usar `postgresql://...`
3. Migre o banco SQLite para PostgreSQL

---

## 🔄 Deploy Contínuo

Após o primeiro deploy:

1. **Modificar código localmente**
2. **Fazer commit**: `git commit -m "descrição"`
3. **Fazer push**: `git push origin main`
4. **Render automaticamente redeploy** ✅

Sem ação necessária!

---

## 📊 Monitorar e Gerenciar

### No Dashboard Render:

**Logs:**
- **Deploy Log**: Veja se o build passou
- **Runtime Log**: Erros em tempo de execução

**Métricas:**
- **CPU / Memory**: Uso de recursos
- **Requests**: Requisições por segundo

**Configurações:**
- **Settings**: Alterar variáveis de ambiente
- **Deploys**: Histórico de deployments
- **Events**: Alertas e notificações

---

## 🆘 Troubleshooting

### ❌ "Build failed"

**Solução:**
```bash
# Teste localmente
npm install
npm run build
cd backend && npm install && npm run init-db
cd backend && npm start
```

Se funciona localmente, o erro é no Render (verifique logs).

### ❌ "Health check failed"

**Solução:**
- Backend está falhando ao iniciar
- Verifique: `/api/health` retorna status 200
- Confira logs do backend

### ❌ "Cannot find module"

**Solução:**
- Um `package.json` está faltando dependências
- Rode `npm install` em `frontend` e `backend` localmente
- Faça commit de `package-lock.json`

### ❌ "Database error"

**Solução:**
- Diretório `/data` não tem permissão de escrita
- Render.yaml configura disco em `/opt/render/project/data`
- Reinicie o serviço no Dashboard

---

## 📱 Testar no Celular

1. Pegue a URL: `https://inpec360.onrender.com`
2. Abra no navegador do celular
3. Pode adicionar à tela inicial: Menu → Adicionar à tela de início

---

## 💡 Próximos Passos Recomendados

1. **Após teste bem-sucedido**:
   - Adicionar domínio customizado
   - Implementar autenticação JWT robusta
   - Adicionar backup de dados

2. **Para produção**:
   - Upgradar para Render Pro
   - Usar PostgreSQL em vez de SQLite
   - Configurar HTTPS/SSL
   - Adicionar monitoramento

3. **Melhorias**:
   - Usar Cloudinary para armazenar fotos
   - Implementar sincronização offline melhorada
   - Adicionar logging centralizado

---

## 📞 Suporte

- **Render Docs**: https://render.com/docs
- **Seu serviço**: https://inpec360.onrender.com
- **API Health**: https://inpec360.onrender.com/api/health
- **Diagnostics**: https://inpec360.onrender.com/api/diagnostics/database

---

## ✅ Checklist Pós-Deploy

- [ ] Frontend carregando em HTTPS
- [ ] API respondendo em `/api/health`
- [ ] Login funcionando
- [ ] Upload de fotos funcionando
- [ ] Dados persistindo entre requisições
- [ ] Celular consegue acessar e usar

Tudo OK? 🎉 **Deploy bem-sucedido!**
