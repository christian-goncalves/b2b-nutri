import Image from "next/image";
import Link from "next/link";
import { getApprovedArticle } from "@/data/library/articles";

const foodArticle = getApprovedArticle("como-transformar-queixa-alimentar-em-perguntas-investigacao-clinica");
const magnesiumArticle = getApprovedArticle("interpretacao-do-magnesio-serico-na-avaliacao-clinica");

type ArticlePhoneProps = {
  image: string;
  modifier: string;
};

function ArticlePhone({ image, modifier }: ArticlePhoneProps) {
  return (
    <div className={`home-library__stage home-library__stage--${modifier}`} aria-hidden="true">
      <div className="home-library__crop">
        <figure className="home-solution-device-frame home-library__phone">
          <div className="home-library__status">
            <span>15:41</span>
            <span className="home-library__island" />
            <span className="home-library__status-icons">
              <svg viewBox="0 0 18 14" focusable="false"><rect x="1" y="9" width="3" height="4" rx="1" /><rect x="6" y="6.5" width="3" height="6.5" rx="1" /><rect x="11" y="3.5" width="3" height="9.5" rx="1" /><rect x="16" y="1" width="2" height="12" rx="1" /></svg>
              <svg viewBox="0 0 18 14" focusable="false"><path d="M1.4 4.8a11 11 0 0 1 15.2 0M4.1 7.6a7.1 7.1 0 0 1 9.8 0M6.9 10.4a3.1 3.1 0 0 1 4.2 0M9 12.4h.01" /></svg>
              <svg viewBox="0 0 25 14" focusable="false"><rect x="1" y="1.5" width="20" height="11" rx="3" /><rect x="3" y="3.5" width="16" height="7" rx="1.5" /><path d="M23 5v4" /></svg>
            </span>
          </div>
          <div className="home-library__screen">
            <Image src={image} alt="" width={780} height={1688} sizes="(max-width: 899px) 260px, 320px" loading="eager" />
          </div>
        </figure>
      </div>
    </div>
  );
}

export function HomeLibraryArticles() {
  if (!foodArticle || !magnesiumArticle) return null;

  return (
    <section className="home-library" aria-labelledby="library-title">
      <div className="site-container">
        <div className="home-library__row">
          <div className="home-library__copy">
            <p className="home-library__eyebrow">Biblioteca B2B Nutris</p>
            <h2 className="home-library__title" id="library-title">
              <span>Artigos para estudar</span>
              <em>e investigar com critério</em>
            </h2>
            <p className="home-library__intro">
              Artigos revisados, organizados por tema e acompanhados de referências identificáveis para aprofundar perguntas da prática nutricional.
            </p>
            <div className="home-library__feature home-library__feature--first">
              <p className="home-library__eyebrow">Comportamento alimentar</p>
              <h3>Da queixa às perguntas</h3>
              <p>Uma queixa alimentar abre a investigação. Perguntas sobre rotina, padrões e contexto ajudam a organizar hipóteses antes da conduta.</p>
              <Link href={`/biblioteca/artigos/${foodArticle.slug}`} aria-label={`Ler artigo: ${foodArticle.title}`}>Ler artigo</Link>
            </div>
          </div>
          <ArticlePhone image="/images/home/biblioteca/queixa-alimentar.png" modifier="garden" />
        </div>

        <div className="home-library__row home-library__row--inverse">
          <ArticlePhone image="/images/home/biblioteca/magnesio-serico.png" modifier="community" />
          <div className="home-library__copy home-library__copy--second">
            <p className="home-library__eyebrow">Micronutrientes</p>
            <h3>O exame não conta tudo</h3>
            <p>Um resultado dentro da referência não encerra a avaliação. Alimentação, sintomas, perdas e medicamentos ajudam a interpretar o magnésio sérico.</p>
            <Link href={`/biblioteca/artigos/${magnesiumArticle.slug}`} aria-label={`Ler artigo: ${magnesiumArticle.title}`}>Ler artigo</Link>
          </div>
        </div>

        <div className="home-library__action">
          <Link href="/biblioteca" className="btn btn--primary">Explorar a biblioteca</Link>
        </div>
      </div>
    </section>
  );
}
