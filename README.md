# 🎅 BabboNataleSegretoBe

Backend leggero e funzionale per il tuo **Secret Santa**.  
Tre endpoint principali:

1. **GET** lista delle persone
2. **POST** creazione accoppiamento
3. **POST** estrazione del nome

---

## 🚀 Installazione e Avvio

1. Clona il progetto e installa le dipendenze:

```bash
npm install
```

2. Avvia il backend in modalità sviluppo:

```bash
npm run start:dev
```

Il backend partirà sulla porta 3000.

## Esporre la porta per il frontend

Puoi rendere il backend accessibile da qualsiasi dispositivo.

# Opzione 1 – Cloudflare Tunnel (consigliata, gratuita)

Installa cloudflared:

```bash
brew install cloudflare/cloudflare/cloudflared
```

Avvia il tunnel:

```bash
cloudflared tunnel --url http://localhost:3000
```

Ti verrà fornito un URL pubblico del tipo https://random-string.trycloudflare.com da usare nel frontend.

# Opzione 2 – Ngrok

```bash
http ngrok 3000
```

Ti darà un link pubblico temporaneo (limitato alla sessione) per il frontend.

## Generazione token

Per generare i token:
Vai nella cartella src:

```bash
cd src
```

Esegui il comando:

```bash
npx ts-node generate-tokens.ts
```

⚠️ Importante: salva i token generati, ti serviranno per l’autenticazione.
