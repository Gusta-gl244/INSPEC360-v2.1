# 🚀 Deploy INPEC360 no Render.com

## 📋 Pré-requisitos

1. **Conta Render.com** - Criar em https://render.com (gratuito)
2. **Repositório GitHub** - Seu código deve estar em um repositório público ou privado
3. **Node.js 18+** - Para desenvolvimento local

---

## 🔧 Passo a Passo

### 1️⃣ Preparar o Repositório

```bash
# Se ainda não tem git inicializado
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Deploy inicial INPEC360"

# Fazer push para GitHub
git push -u origin main
```

### 2️⃣ Criar Conta no Render

1. Acesse https://render.com
2. Clique em **Sign Up** com GitHub
3. Autorize o Render a acessar seus repositórios
4. Confirme email

### 3️⃣ Deploy Automático

#### Opção A: Via Dashboard Render (Mais fácil)

1. No Render, clique **New +**
2. Selecione **Web Service**
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `inpec360-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run init-db`
   - **Start Command**: `npm start`
5. Clique **Deploy**

Depois, para o frontend:

1. Clique **New +** → **Static Site**
2. Conecte o mesmo repositório
3. Configure:
   - **Name**: `inpec360-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Clique **Deploy**

#### Opção B: Via render.yaml (Automático)

O arquivo `render.yaml` já está configurado. Render detectará automaticamente e criará os serviços.

---

## 🌐 Após o Deploy

Você terá:
- **Backend**: https://inpec360-backend.onrender.com
- **Frontend**: https://inpec360-frontend.onrender.com

## ⚠️ Observações Importantes

### Armazenamento de Fotos
- No Render **free**, o disco é **efêmero** (reseta a cada restart)
- Fotos uploadadas podem ser perdidas
- **Solução**: 
  - Usar Cloudinary (CDN gratuito) para armazenar fotos
  - Ou fazer upgrade para Render Pro ($7/mês) com disco persistente

### Banco de Dados
- SQLite local é criado ao iniciar
- Persiste enquanto o dyno estiver ativo
- Se precisar de dados persistentes, considere migrar para PostgreSQL (incluído no Render)

### Primeira Inicialização
- Backend leva ~30 segundos para iniciar
- Banco de dados é criado automaticamente

---

## 🔄 Deploy Contínuo

Após o primeiro deploy:
- Qualquer push para `main` no GitHub
- Render automaticamente rebuild e redeploy
- Sem ação necessária da sua parte

---

## 📊 Monitorar Deploy

No Dashboard Render:
- Logs em **Logs** → **Deploy Log** e **Runtime Log**
- Status em **Environment**
- Métricas em **Metrics**

---

## 🆘 Troubleshooting

### Backend não inicia
```
Verifique: npm install && npm start funcionam localmente
```

### Fotos não aparecem
```
Endpoint: https://inpec360-backend.onrender.com/images/inspections/{id}
```

### "Cannot find module"
```
Certifique que package.json está em backend/
Rode: npm install localmente
```

---

## 💡 Próximos Passos

1. **Após deploy funcionar**:
   - Testar criação de usuários
   - Upload de fotos
   - Sincronização de dados

2. **Para produção**:
   - Adicionar domínio customizado
   - Implementar autenticação JWT
   - Usar banco de dados externo (PostgreSQL)
   - Backup automático

---

## 📞 Dúvidas?

Render Support: https://render.com/docs
Seu backend estará em: https://inpec360-backend.onrender.com/api/health
