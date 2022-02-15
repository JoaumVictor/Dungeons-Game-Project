// ATRIBUTOS DAS CLASSES
const atributos = {
  Barbarian: {
    principal: 'constituicao',
    forca: 3,
    destreza: 2,
    constituicao: 3,
    inteligencia: 1,
    sabedoria: 2,
    carisma: 2,
  },
  Cleric: {
    principal: 'carisma',
    forca: 2,
    destreza: 1,
    constituicao: 2,
    inteligencia: 3,
    sabedoria: 2,
    carisma: 3,
  },
  Druid: {
    principal: 'sabedoria',
    forca: 2,
    destreza: 2,
    constituicao: 3,
    inteligencia: 2,
    sabedoria: 3,
    carisma: 1,
  },
  Fighter: {
    principal: 'forca',
    forca: 3,
    destreza: 2,
    constituicao: 3,
    inteligencia: 1,
    sabedoria: 2,
    carisma: 2,
  },
  Monk: {
    principal: 'destreza',
    forca: 3,
    destreza: 3,
    constituicao: 2,
    inteligencia: 1,
    sabedoria: 2,
    carisma: 2,
  },
  Paladin: {
    principal: 'forca',
    forca: 3,
    destreza: 2,
    constituicao: 2,
    inteligencia: 1,
    sabedoria: 2,
    carisma: 3,
  },
  Ranger: {
    principal: 'constituicao',
    forca: 2,
    destreza: 3,
    constituicao: 3,
    inteligencia: 1,
    sabedoria: 2,
    carisma: 2,
  },
  Rogue: {
    principal: 'destreza',
    forca: 2,
    destreza: 3,
    constituicao: 2,
    inteligencia: 1,
    sabedoria: 2,
    carisma: 3,
  },
  Sorcerer: {
    principal: 'sabedoria',
    forca: 2,
    destreza: 2,
    constituicao: 2,
    inteligencia: 3,
    sabedoria: 3,
    carisma: 1,
  },
  Warlock: {
    principal: 'inteligencia',
    forca: 1,
    destreza: 2,
    constituicao: 2,
    inteligencia: 3,
    sabedoria: 3,
    carisma: 2,
  },
  Wizard: {
    principal: 'inteligencia',
    forca: 1,
    destreza: 2,
    constituicao: 2,
    inteligencia: 3,
    sabedoria: 2,
    carisma: 3,
  },
};
// FICHA EM BRANCO
// classeDeArmadura = 10 + constituição!
// seu atributo atual acrescenta o valor dele a proficiência!
const fichaEmBranco = {
  nome: '',
  vidaMaxima: 0,
  vida: 0,
  mana: 3,
  raça: 'humanoide',
  classe: '',
  dadoDeVida: '',
  classeDeArmadura: 0,
  proficiencia: 1,
  atributos: {
    principal: '',
    forca: 0,
    destreza: 0,
    constituicao: 0,
    inteligencia: 0,
    sabedoria: 0,
    carisma: 0,
  },
  skills: {
    ataqueBasico: true,
    truque: 0,
    habilidade: 0,
  },
};

// FUNÇÕES GENERICAS
const d = (number) => Math.floor(Math.random() * number + 1);
const checaSeTemMana = (p1) => p1.mana > 0;
const checaSeAcertou = (alvo, rolagem) => rolagem >= alvo.classeDeArmadura;
const checaSeCritou = (rolagem) => rolagem > 19;
const checaSeZerou = (alvo) => alvo.vida <= 0;

const habilidades = {
  ataqueBasico: (p1, alvo) => {
    if (checaSeZerou(alvo)) return 'Não tem como atacar um inimigo sem vida...';
    const rolagem = d(20) + p1.atributos.forca;
    let rolagemDano = d(6) + p1.atributos.forca;
    const msgErrou = `Vocẽ tirou ${rolagem} e errou seu ataque!`;
    let msgDano = `Você tirou ${rolagem}, e seu inimigo recebeu ${rolagemDano} pontos de dano!`;
    if (!checaSeAcertou(alvo, rolagem)) return msgErrou;
    if (checaSeCritou(rolagem)) {
      rolagemDano *= 2;
      msgDano = `Você tirou ${rolagem}, e seu inimigo recebeu ${rolagemDano} pontos de dano!`;
    }
    alvo.vida -= rolagemDano;
    if (checaSeZerou(alvo)) {
      alvo.vida = 0;
      msgDano = `${msgDano} Seu inimigo vai ao chão...`;
    }
    return msgDano;
  },
  habilidadeCurar: (meuPersonagem) => {
    if (!checaSeTemMana(meuPersonagem)) return 'Você não tem mana suficiente!';
    const rolagem = d(20);
    meuPersonagem.mana -= 1;
    if (rolagem <= 2) return 'Você não se concentrou o suficiente...';
    const cura = d(6) + meuPersonagem.atributos.sabedoria;
    if (rolagem === 20) {
      meuPersonagem.mana += 1;
      const curaCritica = cura * 2;
      meuPersonagem.vida += curaCritica;
      return `No ápice da concentração você curou ${curaCritica} pontos de vida!`;
    }
    meuPersonagem.vida += cura;
    return `Você curou ${cura} pontos de vida!`;
  },
  bolaDeFogo: (meuPersonagem, alvo) => {
    const dano = d(10) + meuPersonagem.atributos.inteligencia;
    const danoCritico = dano * 2;
    const msgDanoNormal = `Você conjurou FireBall e causou ${dano} pontos de dano!`;
    const msgDanoCritico = `Você conjurou FireBall com maestria! e causou ${danoCritico} pontos de dano!`;
    if (!checaSeTemMana(meuPersonagem)) return 'Você não tem mana pra conjurar essa habilidade!';
    const rolagem = d(20);
    meuPersonagem.mana -= 1;
    if (!checaSeAcertou(alvo, rolagem)) return 'Você errou sua habilidade!';
    if (checaSeCritou(rolagem)) {
      alvo.vida -= danoCritico;
      if (checaSeZerou(alvo)) return `${msgDanoCritico}  Seu inimigo vai ao chão!`;
      return msgDanoCritico;
    }
    alvo.vida -= dano;
    if (checaSeZerou(alvo)) return `${msgDanoNormal} Seu inimigo vai ao chão!`;
    return msgDanoNormal;
  },
};

export { fichaEmBranco, atributos, habilidades };
