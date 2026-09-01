/*
  Ordem das categorias importa: o site se apresenta como engenharia de dados,
  então Dados vem primeiro e Front-end fica por último, como histórico.

  Cada descrição deve dizer o problema resolvido, não a stack: a stack já aparece
  em `tags`. O campo aceita { en, pt }; sem uma das chaves, cai no inglês.

  A lista é curada, não é histórico completo: clones de tutorial e projetos de
  bootcamp ficaram de fora. O que saiu continua no GitHub e no histórico do git.
*/

import proffyPoster from '../assets/img/project-2-poster.jpg';
import proffyWebm from '../assets/img/project-2.webm';
import proffyMp4 from '../assets/img/project-2.mp4';
import ncc from '../assets/img/project-3.jpg';
import salaDeAula from '../assets/img/project-4.jpg';
import dbtProject from '../assets/img/dbt-project.jpg';
import googleAds from '../assets/img/google-ads.png';

// o rótulo sai do dicionário em src/i18n/ui.js, chave projects.cat.<id>
export const categories = [{ id: 'dados' }, { id: 'backend' }, { id: 'frontend' }];

export const projects = [
  {
    category: 'dados',
    title: 'Google Analytics Custom Reporting',
    description: {
      en: 'dbt models that turn the raw Google Analytics export into report-ready tables.',
      pt: 'Modelagem em dbt que transforma o export bruto do Google Analytics em tabelas prontas para relatório.',
    },
    tags: ['dbt', 'SQL'],
    image: dbtProject,
    url: 'https://github.com/fsnovais/google_analytics_dbt',
  },
  {
    category: 'backend',
    title: 'Google Ads Custom Snowflake Connector',
    description: {
      en: 'Custom Python connector that loads Google Ads data into Snowflake, covering a source with no native integration.',
      pt: 'Conector próprio em Python que carrega dados do Google Ads no Snowflake, cobrindo uma fonte sem integração nativa.',
    },
    tags: ['Python', 'Snowflake', 'AWS Lambda'],
    image: googleAds,
    url: 'https://github.com/fsnovais/public_files/blob/main/handler.py',
  },
  {
    category: 'frontend',
    title: 'Proffy',
    description: {
      en: 'Online teaching platform, built with React and Node.js.',
      pt: 'Plataforma de ensino online, desenvolvida com React e Node.js.',
    },
    tags: ['React'],
    image: proffyPoster,
    video: [
      { src: proffyWebm, type: 'video/webm' },
      { src: proffyMp4, type: 'video/mp4' },
    ],
    url: 'https://github.com/fsnovais/Proffy',
  },
  {
    category: 'frontend',
    title: 'NCC',
    description: {
      en: 'Site for the Competitive Computing Group at the University of Brasília, built with React and Node.js.',
      pt: 'Página do Núcleo de Computação Competitiva da Universidade de Brasília, desenvolvida com React e Node.js.',
    },
    tags: ['React'],
    image: ncc,
    url: 'https://github.com/fsnovais/NCC-2021',
  },
  {
    category: 'frontend',
    title: 'Sala de aula online',
    description: {
      en: 'Online classroom built during the pandemic to keep teachers and students in touch and hold remote classes.',
      pt: 'Plataforma de ensino online desenvolvido durante a pandemia para auxiliar professores e alunos a manterem contato e realizarem aulas remotas.',
    },
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: salaDeAula,
    url: 'https://github.com/fsnovais/sala-de-aula-online',
  },
];
