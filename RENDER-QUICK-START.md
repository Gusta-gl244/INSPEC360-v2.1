# ⚡ Início Rápido - Deploy Render (5 minutos)

## 🎯 O que foi preparado

✅ Backend Node.js otimizado para Render  
✅ Frontend React compilado no build  
✅ Banco de dados SQLite automático  
✅ Configuração render.yaml pronta  
✅ Scripts build.bat e build.sh  
✅ .gitignore configurado  

---

## 🚀 3 Passos Rápidos

### 1️⃣ Colocar no GitHub
```bash
git init
git add .
git commit -m "INPEC360 v2.2"
git remote add origin https://github.com/SEU_USUARIO/inpec360.git
git branch -M main
git push -u origin main
```

### 2️⃣ Abrir Render.com
1. https://render.com
2. Sign Up → GitHub
3. Autorizar
4. Confirmar email

### 3️⃣ Deploy em 1 clique
1. **New +** → **Web Service**
2. Conectar repositório
3. **Name**: `inpec360`
4. **Build**: `npm install && npm run build && cd backend && npm install && npm run init-db`
5. **Start**: `cd backend && npm start`
6. **Plan**: Free
7. **Create** ✅

Pronto! Render faz o resto automaticamente.

---

## 📊 Seu serviço em produção:
- **URL**: https://inpec360.onrender.com
- **API**: https://inpec360.onrender.com/api
- **Status**: https://inpec360.onrender.com/api/health

---

## ⚠️ Importantes

- Fotos podem ser perdidas em restarts (disco efêmero Render free)
- Banco persiste: `/opt/render/project/data/inpec360.db`
- Primeira requisição leva ~30s (dyno "acorda")
- 750h/mês gratuito (suficiente para testes)

---

## 📖 Documentação Completa

Veja: [GUIA-RENDER-COMPLETO.md](GUIA-RENDER-COMPLETO.md)

---

## 🆘 Algo deu errado?

1. Verifique logs no Render Dashboard
2. Teste localmente:
   ```bash
   npm install && npm run build
   cd backend && npm install
   npm start
   ```
3. Leia [GUIA-RENDER-COMPLETO.md](GUIA-RENDER-COMPLETO.md) seção "Troubleshooting"

---

**Tudo pronto? Faça seu primeiro deploy!** 🎉
