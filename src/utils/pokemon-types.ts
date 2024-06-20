const pokemonTypes = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ee676dbf2e12cecd0997d2e22b6ef233583dbc827a375940867230c23015e79e?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Poison type icon", type: "poison", className: "bg-purple" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6880152879fd945210557237d798ac5badbd1f0c94876b7163a6829fc8c2e3fe?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Grass type icon", type: "grass", className: "bg-green-400" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8ef41ce8679157089825bc623749e08c487038c86831e4f9374f0c8d4bfb61aa?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Fire type icon", type: "fire", className: "bg-orange-600" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9ce5e4d1fcc84651b1dd2b913b510a5be9448634d0bd20d22dc4e207993b3a22?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Flying type icon", type: "flying", className: "bg-slate-500" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d1b9ac49c73cb7af9b7dea78349dc4d6ee2b35260fd6cb966149d5f1cb55d17f?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Water type icon", type: "water", className: "bg-sky-400" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/01116dc137c22e2dd2de42c898ceaa4a1a0fade9d0ddcab6e5ef57c7e9862e0e?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Bug type icon", type: "bug", className: "bg-lime-800" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb435919de055bbc34303a6436b2972d46b015195fda32620ace2850032d206d?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Normal type icon", type: "normal", className: "bg-zinc-500" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb0c1ad50101c289fc5cf1e9afc66b82004f841f36df0b44d95c25fd201d77e2?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Dark type icon", type: "dark", className: "bg-zinc-600" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/71521ef23619d2541ea0f669f344be97a78eb9c9e0aedec8e932c2b73c21a196?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Dragon type icon", type: "dragon", className: "bg-sky-600" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d75a5fb28ef716bf3482d488463cec16dfdd723017bfab1da2956c71d2196acb?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Electric type icon", type: "electric", className: "bg-amber-300" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/734cd46695274875e87dc44bf1c939a7e77eaad3352c42ccbc3554b7ca8f2465?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Fairy type icon", type: "fairy", className: "bg-fuchsia-400" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e06cde2aae35c025ae5dad3cdf4e5156ef097dfa99842c3105fc950951cef8c4?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Fighting type icon", type: "fighting", className: "bg-pink-600" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e0c6e9ef35e59f755ad0e518294df25199087fc1489de37c19d702e0a997c41c?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Ghost type icon", type: "ghost", className: "bg-slate-500" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b43fd1aef91a9a9f2b9f947366b1a76286f47308749b8c1ae3e0347096200520?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Ground type icon", type: "ground", className: "bg-orange-400" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/15a7193651a769f70a4f3d389b5b721093e29ff14a6bfb3d69dcc5667e44f7be?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Ice type icon", type: "ice", className: "bg-emerald-300" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7f696379f4519f500c467720c047dfa1f0aa01d66aaabd46bed55c6e213b1e91?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Psychic type icon", type: "psychic", className: "bg-red-400" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5070c3a47b9adddb0634354ee4d89538c316b0bc055bfd84ed5d95869da3692c?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Rock type icon", type: "rock", className: "bg-stone-400" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6355d5f335b619eeba547fd93e9d3d7ac2e30ce434b6f4591e846e829faae730?apiKey=e927c07e8fef4d7ca2883325d20e65a2&", alt: "Steel type icon", type: "steel", className: "bg-zinc-400" },
];
export default pokemonTypes;

export function getTypeColor(type: string) {
  switch (type) {
      case 'grass':
          return '#4CAF50'; // verde
      case 'fire':
          return '#FF5733'; // laranja
      case 'water':
          return '#2196F3'; // azul
      case 'bug':
          return '#8BC34A'; // verde claro
      case 'normal':
          return '#9E9E9E'; // cinza
      case 'poison':
          return '#9C27B0'; // roxo
      case 'electric':
          return '#FFEB3B'; // amarelo claro
      case 'ground':
          return '#795548'; // marrom
      case 'fairy':
          return '#E91E63'; // rosa
      case 'fighting':
          return '#FF9800'; // laranja claro
      case 'psychic':
          return '#FF4081'; // rosa claro
      case 'rock':
          return '#FF5722'; // laranja escuro
      case 'ghost':
          return '#673AB7'; // roxo escuro
      case 'ice':
          return '#00BCD4'; // azul claro
      case 'dragon':
          return '#3F51B5'; // azul escuro
      case 'dark':
          return '#607D8B'; // cinza azulado
      case 'steel':
          return '#607D8B'; // cinza azulado
      case 'flying':
          return '#03A9F4'; // azul claro
      default:
          return 'gray'; // Cor padrão
  }
}
