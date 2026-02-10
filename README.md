# PÓS TECH FIAP - QUARTA FASE

Bem-vindo ao projeto Educablog da quarta fase da PósTech em Full Stack Development FIAP! 

📱 Educablog Mobile – FIAP

Aplicativo mobile do Educablog, desenvolvido como parte do Tech Challenge da Pós-Tech FIAP, com foco em consumo de API, autenticação, gerenciamento de usuários e postagens educacionais.

O app permite que alunos e professores visualizem conteúdos educacionais, enquanto administradores/professores podem gerenciar postagens diretamente pelo aplicativo.

# Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- Axios
- React Navigation
- Context API
- Expo Environment Variables

# Funcionalidades

👩‍🎓 Alunos

- Visualização de postagens educacionais
- Leitura de conteúdo completo
- Interface simples e intuitiva

👨‍🏫 Professores / Admin

- Login no aplicativo
- Criar novas postagens
- Editar postagens existentes
- Excluir postagens
- Visualizar autor e prévia do conteúdo
- Atualização automática da listagem após criar/editar

# Arquitetura

O aplicativo consome uma API REST própria do projeto Educablog, utilizando variáveis de ambiente para definir dinamicamente a URL do backend, permitindo execução em:

- Emulador Android/IOS
- Dispositivo físico
- Ambiente Docker
- Diferentes redes locais

# Configuração do ambiente

1️⃣ Pré-requisitos

- Node.js (v18 ou superior)
- Expo CLI
- Backend Educablog rodando (local ou Docker)

2️⃣ Clonar os repositórios

Backend: https://github.com/wsousadev/BackEnd-Educablog.git

git clone https://github.com/wsousadev/Educablog_Mobile_FIAP.git
cd Educablog_Mobile_FIAP

3️⃣ Instalar dependências

npm install

4️⃣ Configurar variáveis de ambiente

- Crie um arquivo .env baseado no exemplo:

.env.example .env

Edite o arquivo .env:
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000

📌 Observações importantes:

Emulador Android: http://10.0.2.2:3000
Dispositivo físico: http://IP_DA_SUA_MAQUINA:3000
Backend em Docker: usar o IP da máquina host

5️⃣ Rodar o aplicativo

npx expo start

Abra no:
- Expo Go (celular)
- Emulador Android
- Emulador iOS (macOS)

# 👨‍💻 Autor

Wanderson de Sousa
📍 São Paulo – SP
🌐 https://wsousa.dev
📧 wanderson@wsousa.dev