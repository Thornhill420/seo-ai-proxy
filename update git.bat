@echo off
cd /d "C:\Users\Mike\Music\SEO Product Generator\openrouter-proxy"
git add .
git commit -m "Update SEO generator files"
git push origin main
npm run deploy
pause

