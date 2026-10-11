"use client";

import {
  forwardRef,
  useMemo,
  useRef,
  useState,
  useEffect
} from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./Livro3D.module.css";

const Folha = forwardRef(function Folha(
  { children, capa = false, className = "" },
  ref
) {
  return (
    <div
      ref={ref}
      data-density={capa ? "hard" : "soft"}
      className={`${styles.folha} ${className}`}
    >
      {children}
    </div>
  );
});

export default function Livro3D({ curso }) {
  const livroRef = useRef(null);
  const containerRef = useRef(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [imagemExpandida, setImagemExpandida] = useState(null);
  const [dimensoes, setDimensoes] = useState({ largura: 450, altura: 630 });

  useEffect(() => {
    const atualizar = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 500) {
          setDimensoes({ largura: 320, altura: 450 });
        } else if (window.innerWidth < 800) {
          setDimensoes({ largura: 360, altura: 505 });
        } else {
          setDimensoes({ largura: 450, altura: 630 });
        }
      }
    };
    atualizar();
    window.addEventListener('resize', atualizar);
    return () => window.removeEventListener('resize', atualizar);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          setIsReady(true);
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Organiza todos os capítulos em páginas.
  const estrutura = useMemo(() => {
    let indice = 2; // 0 = capa, 1 = sumário

    const capitulos = curso.capitulos.map((cap, i) => {
      const inicio = indice;

      const paginas = cap.paginas.map((p, j) => {
        const atual = {
          ...p,
          capitulo: cap.titulo,
          capituloNumero: i + 1,
          numero: indice,
          chave: `${i}-${j}`,
        };

        indice++;
        return atual;
      });

      return {
        titulo: cap.titulo,
        inicio,
        paginas,
      };
    });

    const todasPaginas = capitulos.flatMap(
      (cap) => cap.paginas
    );

    // Capa, sumário, páginas, encerramento e contracapa.
    // Mantemos um número par de folhas.
    const inserirFolhaExtra =
      (todasPaginas.length + 4) % 2 !== 0;

    const total =
      todasPaginas.length + 4 +
      (inserirFolhaExtra ? 1 : 0);

    return {
      capitulos,
      todasPaginas,
      inserirFolhaExtra,
      total,
    };
  }, [curso]);

  const flip = () => livroRef.current?.pageFlip();

  const avancar = () => flip()?.flipNext();
  const voltar = () => flip()?.flipPrev();
  const irPara = (numero) => flip()?.flip(numero);

  const renderPaginas = () => {
    const paginasRenderizadas = [
      /* CAPA DURA */
      <Folha capa className={styles.capa} key="capa">
        <div className={styles.molduraCapa}>
          <div className={styles.topoCapa}>
            <span>CBM</span>
            <p>Corpo de Bombeiros Capital Morada</p>
          </div>
          <div className={styles.centroCapa}>
            <div className={styles.emblema}>✦</div>
            <div className={styles.linhaDourada} />
            <span className={styles.edicao}>Biblioteca de Formação</span>
            <h2>{curso.titulo}</h2>
            <p>{curso.subtitulo}</p>
            <div className={styles.linhaDourada} />
          </div>
          <div className={styles.rodapeCapa}>
            <span>Manual Institucional</span>
          </div>
        </div>
      </Folha>,

      /* SUMÁRIO */
      <Folha className={styles.paginaPapel} key="sumario">
        <div className={styles.interior}>
          <div className={styles.cabecalhoPagina}>
            <span>CAPITAL MORADA</span>
            <span>ÍNDICE</span>
          </div>
          <div className={styles.conteudoPagina}>
            <span className={styles.etiqueta}>Conteúdo do Manual</span>
            <h2 className={styles.tituloPagina}>Sumário</h2>
            <div className={styles.divisor} />
            <p className={styles.descricao}>
              Selecione um capítulo para acessar diretamente seu conteúdo.
            </p>
            <nav className={styles.listaSumario} aria-label="Sumário do curso">
              {estrutura.capitulos.map((cap, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => irPara(cap.inicio)}
                  className={styles.itemSumario}
                >
                  <span className={styles.numeroSumario}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.nomeSumario}>{cap.titulo}</span>
                  <span>{cap.inicio}</span>
                </button>
              ))}
            </nav>
          </div>
          <footer className={styles.rodapePagina}>
            <span>Manual de Formação</span>
            <span>01</span>
          </footer>
        </div>
      </Folha>,

      /* PÁGINAS DOS CAPÍTULOS */
      ...estrutura.todasPaginas.map((pagina) => (
        <Folha key={pagina.chave} className={styles.paginaPapel}>
          <div className={styles.interior}>
            <div className={styles.cabecalhoPagina}>
              <span>CAPITAL MORADA</span>
              <span>{curso.sigla}</span>
            </div>
            <article className={styles.conteudoPagina}>
              <span className={styles.etiqueta}>
                CAPÍTULO {String(pagina.capituloNumero).padStart(2, "0")}
              </span>
              <h2 className={styles.tituloPagina}>{pagina.titulo}</h2>
              <div className={styles.divisor} />
              {pagina.imagem && (
                <figure className={styles.fotografia} onClick={() => setImagemExpandida(pagina.imagem)}>
                  <img src={pagina.imagem} alt={pagina.titulo} draggable={false} />
                </figure>
              )}
              <div className={styles.textoPagina}>
                {pagina.texto
                  .split("\n")
                  .filter(Boolean)
                  .map((paragrafo, i) => (
                    <p key={i}>{paragrafo}</p>
                  ))}
              </div>
            </article>
            <footer className={styles.rodapePagina}>
              <span>{pagina.capitulo}</span>
              <span>{String(pagina.numero).padStart(2, "0")}</span>
            </footer>
          </div>
        </Folha>
      )),

      /* ENCERRAMENTO */
      <Folha className={styles.paginaPapel} key="encerramento">
        <div className={styles.interior}>
          <div className={styles.cabecalhoPagina}>
            <span>CAPITAL MORADA</span>
            <span>CONCLUSÃO</span>
          </div>
          <div className={styles.finalLivro}>
            <span className={styles.ornamento}>✦</span>
            <h2>Fim do Manual</h2>
            <div className={styles.divisor} />
            <p>Conhecimento, disciplina e compromisso com a missão.</p>
            <button
              type="button"
              onClick={() => irPara(1)}
              className={styles.voltarSumario}
            >
              Consultar sumário
            </button>
          </div>
          <footer className={styles.rodapePagina}>
            <span>Corpo de Bombeiros</span>
            <span>CM</span>
          </footer>
        </div>
      </Folha>,
    ];

    /* FOLHA EXTRA PARA FECHAMENTO CORRETO */
    if (estrutura.inserirFolhaExtra) {
      paginasRenderizadas.push(
        <Folha className={styles.paginaPapel} key="extra">
          <div className={styles.finalLivro}>
            <span className={styles.ornamento}>✦</span>
            <p>Capital Morada</p>
          </div>
        </Folha>
      );
    }

    /* CONTRACAPA DURA */
    paginasRenderizadas.push(
      <Folha capa className={styles.contracapa} key="contracapa">
        <div className={styles.molduraCapa}>
          <div className={styles.centroCapa}>
            <div className={styles.emblema}>✦</div>
            <h2>Capital Morada</h2>
            <p>Corpo de Bombeiros</p>
            <div className={styles.linhaDourada} />
          </div>
        </div>
      </Folha>
    );

    return paginasRenderizadas;
  };

  return (
    <section className={styles.ambiente} ref={containerRef}>
      <div className={styles.luz} aria-hidden="true" />

      <header className={styles.cabecalho}>
        <span className={styles.sobretitulo}>
          Corpo de Bombeiros Capital Morada
        </span>

        <h1>{curso.titulo}</h1>

        <p>
          Manual interativo de formação e especialização
        </p>
      </header>

      <div className={styles.areaLivro} style={{ '--capa-offset': `${dimensoes.largura / 2}px` }}>
        <div className={styles.sombraBase} />

        {isReady && (
          <HTMLFlipBook
            key={`${dimensoes.largura}-${dimensoes.altura}`}
            ref={livroRef}
            width={dimensoes.largura}
            height={dimensoes.altura}
            size="fixed"
            minWidth={280}
            maxWidth={500}
            minHeight={390}
            maxHeight={700}
            drawShadow={true}
            maxShadowOpacity={0.75}
            flippingTime={1100}
            usePortrait={true}
            showCover={true}
            mobileScrollSupport={true}
            clickEventForward={false}
            useMouseEvents={true}
            disableFlipByClick={true}
            showPageCorners={false}
            autoSize={false}
            swipeDistance={30}
            startPage={paginaAtual}
            className={`${styles.flipbook} ${paginaAtual === 0 ? styles.isCover : ''}`}
            onFlip={(e) => setPaginaAtual(e.data)}
          >
            {renderPaginas()}
          </HTMLFlipBook>
        )}
      </div>
      
      <p className={styles.instrucao} style={{ marginTop: '30px' }}>
        Arraste a folha para folhear o manual.
      </p>

      {imagemExpandida && (
        <div className={styles.modalImagem} onClick={() => setImagemExpandida(null)}>
          <img src={imagemExpandida} alt="Imagem Expandida" />
        </div>
      )}
    </section>
  );
}
