# Atividade: Aplicação de WorkFlows com GitHub Actions

Este repositório é um exemplo preparado para a atividade prática de aplicação de WorkFlows com GitHub Actions.

Resumo do conteúdo
- Exemplo simples em Node.js (função sum)
- Testes com Jest
- Workflow GitHub Actions para CI (`ci.yml`) que instala dependências e roda testes
- Workflow de release via tag (`release.yml`) que detecta tags do tipo `v*`, gera um log de commits e exporta o resultado

Arquivos/chaves
- `.github/workflows/ci.yml` — workflow de CI (executa em push/pull_request para branches main/master)
- `.github/workflows/release.yml` — workflow que dispara em push de tags (padrão `v*`)
- `src/` — código fonte
- `src/__tests__/` — testes

Como usar localmente

1) Instalar dependências
```powershell
cd C:\Users\Vinicius\Desktop\atividadeworkflow
npm install
```

2) Rodar testes
```powershell
npm test
```

3) Rodar o exemplo
```powershell
npm start
# ou
node src/index.js 2 3
```

Workflow CI
- O workflow `ci.yml` roda em push e pull_request nos branches `main`/`master`.
- Ele executa em matrizes Node.js (16.x e 18.x), instala dependências (`npm ci`) e executa `npm test`.

Workflow de release (tags)
- O workflow `release.yml` dispara quando você faz push de uma tag que combina com `v*` (por exemplo `v1.0.0`).
- Principais passos:
	- Faz `checkout` com `fetch-depth: 0` para obter o histórico completo e tags.
	- Mostra `GITHUB_REF` e extrai o nome da tag (exportado como output `tag`).
	- Gera um `release_log` contendo os commits entre a tag anterior e a nova. Se não houver tag anterior, gera os últimos 50 commits.
	- O log é exportado via `GITHUB_OUTPUT` como `release_log` e pode ser usado em steps subsequentes (ex.: criar Release, upload de assets, changelog automático).

Como disparar o workflow de release (exemplo)
1. Crie uma tag localmente seguindo o padrão `v...`:
```powershell
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```
Isso irá disparar o workflow `release.yml` no GitHub para essa tag.

Dicas de troubleshooting (push / remoto)
- Se `git push origin main` der "src refspec main does not match any", verifique se você tem commits locais e qual sua branch atual:
```powershell
git status
git branch --show-current
git log --oneline -n 3
```
- Se ainda não houver commits, crie o commit inicial:
```powershell
git add .
git commit -m "Initial commit"
```
- Corrija a URL do remoto se necessário (ex.: se tiver typo com `..git`):
```powershell
git remote set-url origin https://github.com/Viniciussinc/agenda-actions.git
```
- Se o repositório remoto não existir, crie-o no GitHub (ou use `gh repo create`), depois rode `git push -u origin main` ou `git push -u origin master` conforme sua branch principal.

Observações e próximos passos
- Se quiser que eu adicione um step ao `release.yml` para criar automaticamente uma Release no GitHub e fazer upload de assets, eu posso adicionar (usando `actions/create-release` + `actions/upload-release-asset`).
- Posso também validar (localmente) os testes e cobertura, gerar um badge de status e documentar como inspecionar os artefatos do workflow no GitHub Actions.

License

MIT

---
Se quiser alguma alteração no padrão de tags, formato do changelog, ou integração com npm/GitHub Releases, diga qual fluxo prefere e eu ajusto o workflow e o README.
