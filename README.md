# PokemonChallengeAngular

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 17.3.2.

## Sobre o Projeto

Este aplicativo é uma interface para a API [Pokemon TCG](https://api.pokemontcg.io/v2), que permite aos usuários "comprar" boosters de cartas e montar um deck de cartas Pokémon. Os usuários podem explorar e colecionar cartas para construir decks personalizados para uso em jogos (futuro) ou coleção.

## Instalação

Antes de executar o projeto, certifique-se de ter [Node.js](https://nodejs.org/) instalado. 

Após clonar o repositório, navegue até o diretório do projeto e instale as dependências:

```bash
npm install
```
Servidor de desenvolvimento:
```bash
npm run start
```
 Execute o código acima para um servidor de desenvolvimento. Navegue para http://localhost:4200/. O aplicativo será recarregado automaticamente se você alterar algum dos arquivos de origem.

## Rotas da Aplicação
A aplicação inclui várias rotas que são gerenciadas pelo Router do Angular. Aqui está uma visão geral das rotas:
```bash
'/home': A página inicial da aplicação, protegida por AuthGuard.
'/shop': Uma página de loja para a compra de pacotes de reforço, protegida por AuthGuard.
'/decks': Gerencie seus decks de Pokémon, protegida por AuthGuard.
'/login': Página de login para autenticação.
'/404': Página não encontrada.
'*': Redireciona para a página não encontrada para quaisquer rotas não correspondidas.
```
## Recomendações finais
Esse projeto foi desenvolvido com muito carinho e espero que vocês goste treinador!
