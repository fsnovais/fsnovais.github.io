/*
  Texto da página Sobre, nos dois idiomas.

  Esta página é sobre a pessoa, não sobre o cargo. O lado profissional fica no
  currículo em `public/arquivos/felipe-novais-cv.pdf`, gerado de
  `cv/curriculo.html`, e nos projetos.

  Use {blog}, {devlog} e {projetos} no lugar de endereços fixos: o prefixo do
  idioma entra sozinho na hora de renderizar.
*/

export const about = {
  en: {
    destaque:
      'I am Felipe. I live in Brasília, I work with data, and I spend most of my free time reading, playing something, or chasing down whatever question got stuck in my head that week.',
    blocos: [
      {
        titulo: 'Where I come from',
        paragrafos: [
          'I have liked technology for as long as I can remember. I was the kid who opened the computer case just to see what was inside, put it back together, broke it, and put it back together again. Maths and the exact sciences were the subjects I never had to force myself into, and writing code turned out to be the same hobby by another name.',
          'Studying something new became a habit. It does not have to be about work. If a subject grabs me, I keep pulling at it until it makes sense.',
        ],
      },
      {
        titulo: 'Books, RPGs and old castles',
        paragrafos: [
          'I read a lot. I also have an old weakness for anything medieval: castles, swords, sieges, hand-drawn maps, the politics of small kingdoms. From there to tabletop RPGs was a very short walk.',
          'What I enjoy in an RPG is not only the story. It is the character sheet, the rules, the maths under the dice. Same instinct as taking the case apart, only with a rulebook instead of a screwdriver.',
        ],
      },
      {
        titulo: 'What keeps my attention',
        paragrafos: [
          'New tech, films and games. If someone is patiently explaining how a thing works underneath, I will watch to the end.',
          'And finances. I track my own spending with more care than strictly necessary, I like knowing where every bit of it goes, and I have a postgraduate degree in financial management. Finance and investing are what I study hardest outside work.',
        ],
      },
      {
        titulo: 'The work part',
        paragrafos: [
          'I am a data engineer, which is where half of what I write here comes from. If that is what brought you, the <a href="/arquivos/felipe-novais-cv.pdf">CV in PDF</a> has the dates and the stack, and the <a href="{projetos}">projects</a> page has what I built.',
        ],
      },
      {
        titulo: 'This site',
        paragrafos: [
          'I write about tech, finances and whatever else catches my eye. Longer pieces go to the <a href="{blog}">blog</a>, short notes to the <a href="{devlog}">devlog</a>. I write it for myself six months from now. If it is useful to someone else, even better.',
        ],
      },
    ],
  },

  pt: {
    destaque:
      'Sou o Felipe. Moro em Brasília, trabalho com dados e passo boa parte do tempo livre lendo, jogando alguma coisa ou atrás de uma pergunta que entrou na minha cabeça e não saiu.',
    blocos: [
      {
        titulo: 'De onde eu venho',
        paragrafos: [
          'Gosto de tecnologia desde que me entendo por gente. Eu era o moleque que abria o gabinete só para ver o que tinha ali dentro, montava, estragava e montava de novo. Matemática e as matérias de exatas eram as únicas que eu não precisava me obrigar a estudar, e escrever código acabou sendo o mesmo passatempo com outro nome.',
          'Estudar coisa nova virou costume. Não precisa ter nada a ver com trabalho. Se o assunto me pega, eu fico puxando o fio até entender.',
        ],
      },
      {
        titulo: 'Livros, RPG e castelo velho',
        paragrafos: [
          'Leio bastante. E tenho uma queda antiga por tudo que é medieval: castelo, espada, cerco, mapa desenhado à mão, intriga de reino pequeno. Daí para RPG de mesa foi um pulo curto.',
          'O que me diverte no RPG não é só a história. É a ficha, as regras, a conta por trás do dado. É a mesma vontade de abrir o gabinete, só que com livro de regras no lugar da chave de fenda.',
        ],
      },
      {
        titulo: 'O que me prende a atenção',
        paragrafos: [
          'Tecnologia nova, filme e jogo. Se tem alguém explicando com calma como uma coisa funciona por dentro, eu assisto até o fim.',
          'E Finanças. Controlo meus gastos com mais cuidado do que seria necessário, gosto de saber para onde foi cada real e sou pós-graduado em gestão financeira. Finanças e investimento são o que eu mais estudo fora do trabalho.',
        ],
      },
      {
        titulo: 'A parte do trabalho',
        paragrafos: [
          'Sou engenheiro de dados, e é daí que vem metade do que escrevo por aqui. Se foi isso que te trouxe, o <a href="/arquivos/felipe-novais-cv.pdf">currículo em PDF</a> tem as datas e a stack, e a página de <a href="{projetos}">projetos</a> tem o que eu construí.',
        ],
      },
      {
        titulo: 'Este site',
        paragrafos: [
          'Escrevo sobre tecnologia, dinheiro e o que mais me der na telha. Texto mais longo vai para o <a href="{blog}">blog</a>, nota curta para o <a href="{devlog}">devlog</a>. Escrevo primeiro para mim daqui a seis meses. Se servir para mais alguém, melhor ainda.',
        ],
      },
    ],
  },
};
