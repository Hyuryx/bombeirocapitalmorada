const pagina = (titulo, texto, imagem = null) => ({ titulo, texto, imagem });

export const cursos = {
  coer: {
    titulo: "Curso de COER",
    subtitulo: "Comando de Operações de Emergência e Resgate",
    sigla: "COER",
    descricao: "Formação tática avançada.",
    imagemCapa: "assets/cursos/coer/capa.png",
    capitulos: [
      {
        titulo: "Apresentação",
        paginas: [
          pagina(
            "O Curso COER",
            "O Curso de Operador de Embarcação de Resgate — COER é uma formação destinada à preparação do bombeiro para a condução segura e eficiente de embarcações empregadas em operações de emergência, salvamento e apoio operacional.\n\nCapacitar o bombeiro militar a conduzir embarcações de resgate em condições diversas, garantindo aproximações corretas, estabilidade durante o embarque de vítimas e navegação segura.",
            "assets/cursos/coer/capa.png"
          ),
          pagina(
            "Requisitos",
            "• Ter 18 anos ou mais e estar em boas condições de saúde;\n• Saber nadar e possuir segurança no meio aquático;\n• Possuir aptidão para condução de veículos motores;\n• Demonstrar equilíbrio emocional e noção espacial."
          )
        ],
      },
      {
        titulo: "Fase I",
        paginas: [
          pagina(
            "Técnicas e Manobras",
            "Objetivo: Desenvolver habilidade na condução da embarcação.\n\n• Passo 1: Leitura da água e identificação de riscos;\n• Passo 2: Controle de direção e velocidade;\n• Passo 3: Técnicas de atracação e desatracação;\n• Passo 4: Manobras de emergência;\n• Passo 5: Operação em espaços confinados.",
            "assets/cursos/coer/2.png"
          ),
        ],
      },
      {
        titulo: "Fase II",
        paginas: [
          pagina(
            "Busca e Resgate",
            "Objetivo: Preparar o operador para atuar em missões reais.\n\n• Passo 1: Aproximação de vítimas na água;\n• Passo 2: Estabilidade durante o embarque;\n• Passo 3: Padrões de busca aquática;\n• Passo 4: Navegação noturna com visibilidade reduzida;\n• Passo 5: Resgate em águas agitadas.",
            "assets/cursos/coer/3.png"
          ),
        ],
      },
      {
        titulo: "Critérios de Aprovação",
        paginas: [
          pagina(
            "Critérios Eliminatórios",
            "• Desobedecer orientações do instrutor;\n• Executar manobras de forma negligente;\n• Ignorar as limitações da embarcação;\n• Colocar a tripulação ou a vítima em risco."
          ),
          pagina(
            "Manutenção e Preparação",
            "• Inspeção e manutenção preventiva;\n• Verificação de combustível e motor;\n• Organização dos materiais de resgate."
          ),
        ],
      },
      {
        titulo: "Certificação",
        paginas: [
          pagina(
            "Conclusão",
            "Ao concluir o COER, o bombeiro estará preparado para atuar na condução de embarcações empregadas em operações de resgate e apoio operacional.\n\n“Controle, técnica e responsabilidade para conduzir onde poucos conseguem navegar.”",
            "assets/cursos/coer/4.png"
          ),
        ],
      },
    ],
  },
  tripulante: {
    titulo: "Curso de Tripulante",
    subtitulo: "Formação de Tripulante para Operações de Resgate Aéreo",
    sigla: "TRIPULANTE",
    descricao: "Formação e especialização operacional.",
    imagemCapa: "assets/cursos/tripulantes/capa.png",
    capitulos: [
      {
        titulo: "Apresentação",
        paginas: [
          pagina(
            "O Curso de Tripulante",
            "O Curso de Tripulante é uma formação destinada à preparação do bombeiro para atuar como integrante de uma equipe de operações aéreas, exercendo funções de apoio ao piloto, comunicação, segurança operacional e participação direta em missões de resgate realizadas com helicóptero.\n\nPreparar o bombeiro para atuar em operações de resgate com helicóptero, desenvolvendo conhecimentos técnicos e comportamento operacional compatível com missões aéreas.",
            "assets/cursos/tripulantes/capa.png"
          ),
          pagina(
            "Requisitos",
            "• Ter 18 anos ou mais e estar em boas condições de saúde;\n• Saber nadar e possuir segurança no meio aquático;\n• Demonstrar equilíbrio emocional e seguir instruções;\n• Possuir noções básicas de primeiros socorros."
          )
        ],
      },
      {
        titulo: "Fase I",
        paginas: [
          pagina(
            "Resgate na Água",
            "Objetivo: Preparar o tripulante para realizar o resgate de uma vítima em ambiente aquático e coordenar sua retirada.\n\n• Passo 1: Resgate da vítima e condução;\n• Passo 2: Solicitação de autorização ao piloto;\n• Passo 3: Embarque organizado da vítima;\n• Passo 4: Embarque do tripulante;\n• Passo 5: Busca por local seguro.",
            "assets/cursos/tripulantes/1.png"
          ),
        ],
      },
      {
        titulo: "Fase II",
        paginas: [
          pagina(
            "Resgate em Altura",
            "Objetivo: Preparar o tripulante para atuar em operação de resgate aéreo envolvendo estrutura elevada de difícil acesso.\n\n• Passo 1: Localização da vítima e avaliação de riscos;\n• Passo 2: Aproximação, resgate e condução;\n• Passo 3: Movimentação para o helicóptero;\n• Passo 4: Embarque do tripulante;\n• Passo 5: Pouso em área segura.",
            "assets/cursos/tripulantes/2.png"
          )
        ],
      },
      {
        titulo: "Critérios de Aprovação",
        paginas: [
          pagina(
            "Critérios Eliminatórios",
            "• Desobedecer orientações ou manobra não autorizada;\n• Aproximar-se da aeronave sem autorização;\n• Colocar vítima ou equipe em risco imprudente;\n• Ignorar um risco evidente."
          ),
          pagina(
            "Comunicação e Modulação",
            "• Transmitir informações de forma objetiva;\n• Confirmar comandos recebidos e informar riscos;\n• Auxiliar o piloto nas condições externas;\n• Evitar comunicações desnecessárias."
          )
        ],
      },
      {
        titulo: "Certificação",
        paginas: [
          pagina(
            "Conclusão",
            "Ao concluir o curso, o militar estará preparado para integrar equipes de operações aéreas, atuando como tripulante em missões de resgates.\n\n“Quando o acesso termina, a missão continua pelo ar — e uma tripulação preparada transforma distância em possibilidade de resgate.”",
            "assets/cursos/tripulantes/3.png"
          )
        ],
      },
    ],
  },
  piloto: {
    titulo: "Curso de Piloto",
    subtitulo: "Manual de Formação Aérea",
    sigla: "PILOTO",
    descricao: "Formação especializada em resgate aéreo.",
    imagemCapa: "assets/cursos/aereo/1.png",
    capitulos: [
      {
        titulo: "Apresentação",
        paginas: [
          pagina(
            "O Curso de Resgate Aéreo",
            "É uma das especializações mais prestigiadas do Corpo de Bombeiros, destinada aos militares que desejam atuar em operações de alta complexidade utilizando aeronaves como principal meio de resposta.\n\nA formação prepara o operador para realizar resgates em locais de difícil acesso, prestar apoio em grandes ocorrências, transportar vítimas em estado crítico e atuar em conjunto com pilotos e equipes terrestres. Cada missão exige disciplina, preparo técnico, comunicação eficiente e total comprometimento com a segurança operacional.",
            "assets/cursos/aereo/1.png"
          ),
          pagina(
            "Requisitos e Objetivo",
            "Objetivo do Curso:\nCapacitar o militar para atuar em operações aéreas de salvamento, desenvolvendo conhecimentos técnicos, habilidades práticas e capacidade de tomada de decisão em ambientes de alta complexidade.\n\nRequisitos:\n• Curso de Paraquedismo;\n• Curso de Resgate Aquático;\n• Curso de Resgate em Montanha;\n• Aspirante: Treinamento com autorização;\n• Tenente 2: Pode prestar a prova."
          ),
        ],
      },
      {
        titulo: "Fase I — Solo",
        paginas: [
          pagina(
            "Qualificação em Resgate Urbano",
            "Objetivo: Apresentar ao aluno todos os fundamentos necessários para atuação em operações aéreas.\n\nConteúdo:\n• Introdução ao Resgate Aéreo;\n• Normas de segurança operacional;\n• Equipamentos utilizados;\n• Comunicação entre piloto e operador;\n• Procedimentos de embarque e desembarque;\n• Organização da equipe durante a missão.",
            "assets/cursos/aereo/2.png"
          ),
        ],
      },
      {
        titulo: "Fase II — Asas",
        paginas: [
          pagina(
            "Qualificação Aquática",
            "Após concluir a etapa de fundamentos, o militar inicia o treinamento prático em operações aéreas, enfrentando cenários que exigem precisão na pilotagem, estabilidade da aeronave e perfeita coordenação entre piloto e operador.\n\nNesta fase, o foco é desenvolver a confiança em voo e preparar a equipe para atuar em ambientes complexos, principalmente sobre áreas aquáticas e regiões de difícil acesso.\n\nDurante esta etapa serão realizados treinamentos como:\n• Procedimentos de comunicação e tomada de decisão sob pressão.",
            "assets/cursos/aereo/3.png"
          ),
        ],
      },
      {
        titulo: "Fase III — Águia",
        paginas: [
          pagina(
            "Qualificação em Montanha",
            "A última fase representa uma operação completa. O aluno será colocado diante de diferentes cenários de emergência onde deverá aplicar todos os conhecimentos adquiridos durante o curso.\n\nAs ocorrências poderão envolver:\n• Acidentes em áreas de difícil acesso;\n• Resgates em montanhas;\n• Evacuação aeromédica;\n• Transporte emergencial de vítimas.\n\nA pessoa será avaliada como um piloto profissional, será avaliado todos os tipos de comportamento.",
            "assets/cursos/aereo/4.png"
          ),
        ],
      },
      {
        titulo: "Critérios de Aprovação",
        paginas: [
          pagina(
            "Critérios Avaliados",
            "O militar deverá obter desempenho satisfatório em todas as fases para receber sua certificação, sendo avaliado em:\n• Disciplina e Trabalho em equipe;\n• Comunicação e Segurança operacional;\n• Conhecimento técnico e Cumprimento dos protocolos;\n• Controle emocional e Tomada de decisão."
          ),
          pagina(
            "Competências Desenvolvidas",
            "• Liderança operacional;\n• Comunicação eficiente;\n• Trabalho em equipe e Gestão de riscos;\n• Rapidez na tomada de decisões;\n• Precisão técnica e Organização operacional;\n• Controle emocional em situações críticas."
          ),
        ],
      },
      {
        titulo: "Certificação",
        paginas: [
          pagina(
            "Após a Certificação",
            "Ao concluir o Curso de Resgate Aéreo, o militar estará autorizado a integrar oficialmente a equipe, participar de operações com aeronaves, apoiar ocorrências complexas, realizar transporte aeromédico e auxiliar outras equipes especializadas.\n\nImportância da Especialização:\nO Resgate Aéreo representa uma das áreas mais estratégicas da corporação. Sua atuação possibilita alcançar locais inacessíveis por vias terrestres, reduzir significativamente o tempo de resposta e aumentar as chances de sucesso em operações de salvamento.\n\n“Voamos acima dos obstáculos para chegar onde a esperança ainda precisa pousar.”",
            "assets/cursos/aereo/5.png"
          ),
        ],
      },
    ],
  },
  aquatico: {
    titulo: "Resgate Aquático",
    subtitulo: "Manual de Especialização Aquática",
    sigla: "AQUATICO",
    descricao: "Especialização operacional aquática.",
    imagemCapa: "assets/cursos/aquatico/capa.png",
    capitulos: [
      {
        titulo: "Apresentação",
        paginas: [
          pagina(
            "O Curso de Resgate Aquático",
            "É destinado aos militares que desejam atuar em operações de salvamento em rios, lagos, represas, cachoeiras, áreas alagadas e regiões costeiras.\n\nDurante a formação, o militar desenvolverá técnicas de navegação, busca, salvamento e extração de vítimas em ambientes aquáticos, aprendendo a atuar com rapidez, segurança e eficiência mesmo diante de fortes correntezas e cenários de difícil acesso.\n\nA especialização exige excelente preparo físico, controle emocional, raciocínio rápido e domínio das técnicas de resgate em água.",
            "assets/cursos/aquatico/capa.png"
          ),
          pagina(
            "Requisitos e Objetivo",
            "Objetivo do Curso:\nCapacitar o militar para executar operações de busca, salvamento e resgate em ambientes aquáticos, utilizando embarcações, técnicas de navegação, procedimentos de mergulho e protocolos de atendimento a vítimas.\n\nRequisitos:\n• Estar devidamente ativo na corporação;\n• Demonstrar disciplina e comprometimento;\n• Possuir bom condicionamento físico;\n• Estar apto para atividades em ambiente aquático;\n• Possuir autorização da coordenação de cursos."
          ),
        ],
      },
      {
        titulo: "Fase I",
        paginas: [
          pagina(
            "Navegação (Controle da Embarcação)",
            "A primeira fase é destinada ao domínio da embarcação. O militar aprenderá técnicas de pilotagem, controle e navegação em ambientes de difícil acesso, desenvolvendo precisão nas manobras e segurança durante as operações.\n\nObjetivo: Avaliar a capacidade do militar em controlar a embarcação com segurança, precisão e estabilidade, preparando-o para conduzir equipes de resgate.",
            "assets/cursos/aquatico/fase1.png"
          ),
          pagina(
            "Treinamentos",
            "• Pilotagem de embarcação de resgate;\n• Navegação em rios e lagos;\n• Aproximação segura em áreas rochosas;\n• Manobras em cachoeiras e corredeiras;\n• Controle da embarcação em espaços reduzidos;\n• Posicionamento para operações de salvamento;\n• Técnicas de infiltração em locais de difícil acesso."
          ),
        ],
      },
      {
        titulo: "Fase II",
        paginas: [
          pagina(
            "Correnteza (Resgate Operacional)",
            "Após dominar a navegação, o militar inicia os treinamentos de salvamento em correntezas e áreas de alto risco. Nesta etapa serão simuladas ocorrências onde será necessário localizar, alcançar e retirar vítimas presas em ambientes aquáticos hostis.\n\nObjetivo: Atuar como um teste especializado onde os bombeiros devem desenvolver habilidades de subir correntezas longas, localizar a vítima, achar um local seguro e controlar os mecanismos de resgate.",
            "assets/cursos/aquatico/fase2.png"
          ),
          pagina(
            "Treinamentos",
            "• Resgate de vítimas em correntezas;\n• Extração de vítimas presas entre rochas;\n• Salvamento em áreas de cachoeira;\n• Resgate de vítimas presas em árvores ou obstáculos;\n• Transporte seguro da vítima até zona de segurança;\n• Não utiliza barco e nem helicóptero (apenas para locomoção);\n• Atendimento sob pressão e gerenciamento de riscos."
          ),
        ],
      },
      {
        titulo: "Fase III",
        paginas: [
          pagina(
            "Profundezas (Busca e Recuperação)",
            "A última fase representa a certificação operacional do militar. O aluno deverá realizar operações completas de busca subaquática, empregando técnicas de localização, mergulho e resgate de vítimas em ambientes de baixa visibilidade.\n\nDurante a avaliação, o militar deverá demonstrar capacidade para localizar sobreviventes em áreas submersas e conduzi-los com segurança até a superfície.",
            "assets/cursos/aquatico/fase3.png"
          ),
          pagina(
            "Critérios Avaliados",
            "• Resgate da vítima;\n• Trabalho em equipe;\n• Montagem de estratégia;\n• Atenção no perímetro;\n• Dedução de onde está a vítima;\n• Comunicação com a aeronave."
          ),
        ],
      },
      {
        titulo: "Critérios de Aprovação",
        paginas: [
          pagina(
            "Critérios e Competências",
            "Critérios Avaliados:\n• Disciplina e Condicionamento físico;\n• Controle emocional e Pilotagem da embarcação;\n• Técnicas de resgate e Trabalho em equipe;\n• Comunicação e Segurança operacional;\n• Cumprimento dos protocolos e Precisão.\n\nCompetências Desenvolvidas:\n• Pilotagem de embarcações e Navegação;\n• Busca subaquática e Técnicas de mergulho;\n• Gestão de riscos e Trabalho em equipe;\n• Resistência física e Precisão."
          ),
        ],
      },
      {
        titulo: "Certificação",
        paginas: [
          pagina(
            "Após a Certificação",
            "Ao concluir o Curso de Resgate Aquático, o militar estará habilitado para integrar oficialmente a equipe, pilotar embarcações, atuar em resgates aquáticos, buscas subaquáticas, apoiar enchentes e atuar em operações integradas.\n\nImportância:\nO Resgate Aquático desempenha um papel essencial nas operações da corporação, permitindo a atuação em ambientes onde o acesso terrestre é limitado ou inexistente.\n\n“Onde a correnteza desafia a esperança, o especialista em Resgate Aquático encontra o caminho para salvar vidas.”",
            "assets/cursos/aquatico/certificado.png"
          ),
        ],
      },
    ],
  },
  montanha: {
    titulo: "Resgate em Montanha",
    subtitulo: "Manual de Especialização",
    sigla: "MONTANHA",
    descricao: "Formação especializada.",
    imagemCapa: "assets/cursos/montanha/capa.png",
    capitulos: [
      {
        titulo: "Apresentação",
        paginas: [
          pagina(
            "Conheça o Curso",
            "É destinado aos militares que desejam atuar em operações de busca e salvamento em áreas montanhosas, encostas e terrenos acidentados de difícil acesso.\n\nO militar aprenderá técnicas de progressão em terreno irregular, transposição de obstáculos, sistema de vantagem mecânica e evacuação de vítimas em locais onde viaturas e embarcações não podem chegar.",
            "assets/cursos/montanha/capa.png"
          ),
          pagina(
            "Requisitos e Objetivo",
            "Objetivo do Curso:\nCapacitar o militar a realizar buscas e salvamentos em áreas remotas e de difícil acesso, utilizando técnicas verticais de resgate.\n\nRequisitos:\n• Estar devidamente ativo na corporação;\n• Demonstrar disciplina e comprometimento;\n• Possuir condicionamento físico adequado;\n• Ser apto para operações em altura;\n• Possuir autorização da coordenação."
          ),
        ],
      },
      {
        titulo: "Fase I",
        paginas: [
          pagina(
            "Resgate Terrestre e Ascensão",
            "O bombeiro deverá iniciar a operação a partir de um local seguro, realizando a descida da montanha a pé, de maneira cautelosa e prestando atenção máxima à segurança para evitar escorregamentos e acidentes.\n\nApós alcançar a vítima, o bombeiro deverá realizar a imobilização e o transporte manual cuidadoso, retornando ao ponto seguro inicial. A fase avaliará a capacidade de progressão em terreno perigoso e força física para transposição.",
            "assets/cursos/montanha/1.png"
          ),
        ],
      },
      {
        titulo: "Fase II",
        paginas: [
          pagina(
            "Localização e Resgate Aéreo",
            "A equipe deverá realizar uma operação de busca utilizando uma aeronave de resgate. Após localizar a vítima, o bombeiro deverá realizar o desembarque em um ponto seguro para efetuar o atendimento imediato.\n\nFeito isso, será acionado o resgate com corda ou cesto, e o militar deverá coordenar o embarque seguro da vítima e de si mesmo enquanto o helicóptero se mantém em voo pairado.",
            "assets/cursos/montanha/2.png"
          ),
        ],
      },
      {
        titulo: "Fase III",
        paginas: [
          pagina(
            "Desembarque Tático em Altitude",
            "A vítima estará localizada em uma região montanhosa de difícil acesso. A equipe deverá realizar a aproximação com a aeronave e executar um desembarque tático de precisão.\n\nAo concluir o atendimento, o bombeiro deverá solicitar a extração. O helicóptero retornará para realizar o embarque tático aéreo em uma área restrita, onde qualquer erro de posicionamento pode comprometer a aeronave.",
            "assets/cursos/montanha/4.png"
          ),
        ],
      },
      {
        titulo: "Critérios de Aprovação",
        paginas: [
          pagina(
            "Critérios Avaliados",
            "• Disciplina e Condicionamento físico;\n• Controle emocional e Trabalho em equipe;\n• Comunicação e Segurança nas operações verticais;\n• Conhecimento de equipamentos (cordas, mosquetões e sistemas de vantagem mecânica);\n• Agilidade e Cumprimento dos protocolos."
          ),
        ],
      },
      {
        titulo: "Certificação",
        paginas: [
          pagina(
            "Conclusão",
            "O bombeiro certificado estará apto a conduzir missões de alto risco em regiões acidentadas, dominando técnicas verticais de salvamento.\n\nA especialização em Resgate em Montanha exige não apenas força, mas cálculo preciso e mente inabalável.\n\n“Nas alturas, a coragem e a técnica se encontram para salvar vidas onde poucos ousam chegar.”",
            "assets/cursos/montanha/certificado.png"
          ),
        ],
      },
    ],
  },
  paraquedismo: {
    titulo: "Curso de Paraquedismo",
    subtitulo: "Manual de Especialização",
    sigla: "PARAQUEDISMO",
    descricao: "Formação especializada.",
    imagemCapa: "assets/cursos/paraquedismo/capa.png",
    capitulos: [
      {
        titulo: "Apresentação",
        paginas: [
          pagina(
            "O Curso de Paraquedismo",
            "É destinado aos militares que desejam atuar em operações especiais de inserção aérea, acesso rápido a áreas remotas e apoio a missões de alta complexidade.\n\nDurante a formação, o militar aprenderá técnicas de salto operacional, controle em queda livre, navegação sob velame, precisão de pouso e procedimentos de emergência.",
            "assets/cursos/paraquedismo/capa.png"
          ),
          pagina(
            "Etapas do Curso",
            "• Etapa 1 - Cercado: Orientações e entendimento.\n• Etapa 2 - Aquático: Salto com pouso em barco ou caminhão guincho.\n• Etapa 3 - Verticais: Salto com agilidade.\n• Etapa 4 - Eólica: Soma do trabalho anterior."
          ),
        ],
      },
      {
        titulo: "Módulos Iniciais",
        paginas: [
          pagina(
            "Módulo I — Salto Livre",
            "Domínio sobre a saída da aeronave, estabilidade em queda livre e abertura do paraquedas.",
            "assets/cursos/paraquedismo/1.png"
          ),
          pagina(
            "Módulo II — Ambientes Verticais",
            "Inserções sobre ambientes verticais, abertura em baixa altitude e precisão de pouso.",
            "assets/cursos/paraquedismo/2.png"
          ),
        ],
      },
      {
        titulo: "Missões de Alta Complexidade",
        paginas: [
          pagina(
            "Módulo III — Eólica",
            "A última etapa simula missões de alta complexidade em áreas restritas.\n\n• Precisão de pouso;\n• Aproximação em zonas restritas;\n• Controle sob condições adversas;\n• Missão operacional completa.",
            "assets/cursos/paraquedismo/3.png"
          ),
        ],
      },
      {
        titulo: "Critérios de Aprovação",
        paginas: [
          pagina(
            "Requisitos e Avaliação",
            "Requisitos:\n• Estar ativo na corporação;\n• Excelente condicionamento físico;\n• Sem restrições para altura.\n\nCritérios Avaliados:\n• Disciplina e Controle emocional;\n• Controle do equipamento e segurança;\n• Precisão nos pousos;\n• Cumprimento dos protocolos."
          ),
        ],
      },
      {
        titulo: "Certificação",
        paginas: [
          pagina(
            "Conclusão",
            "Concedida após a realização de saltos avaliados e cumprimento rigoroso das medidas de segurança. O militar se torna qualificado para operações aerotransportadas e habilitado para integrar a Equipe de Paraquedismo.\n\n“Antes mesmo de tocar o solo, a missão de salvar vidas já começou.”",
            "assets/cursos/paraquedismo/certificado.png"
          ),
        ],
      },
    ],
  },
};
