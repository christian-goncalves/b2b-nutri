const historyMoments = [
  {
    title: "Quando a teoria encontrou a prática",
    description: "Ao começar a atuar na Nutrição, percebi que o conhecimento adquirido na faculdade era apenas uma parte daquilo que eu precisava para construir minha rotina profissional.",
  },
  {
    title: "Entre escolhas, erros e aprendizados",
    description: "Investi em cursos, materiais e ferramentas. Acumulei informações, perdi tempo procurando conteúdos e fiz escolhas que, com a experiência de hoje, faria de outra maneira.",
  },
  {
    title: "A solução que eu procurava",
    description: "Comecei a desenvolver os materiais que gostaria de ter encontrado: conhecimento organizado, visual, acessível, fácil de recordar e conectado à prática profissional. Assim nasceu a B2B Nutris.",
  },
  {
    title: "Um caminho que queremos compartilhar",
    description: "Agora, queremos ir além dos materiais digitais. Aproximar profissionais, compartilhar experiências, reunir conhecimentos e construir um espaço onde nutricionistas possam aprender umas com as outras.",
  },
] as const;

export function HomeHistorySection() {
  return (
    <section className="home-section home-history" aria-labelledby="home-history-title">
      <div className="site-container">
        <header className="home-solution__heading">
          <p className="home-solution__eyebrow">A história por trás da B2B</p>
          <h2 className="home-solution__title" id="home-history-title">
            <span>Começou com uma necessidade minha.</span>
            <em>Hoje, quero facilitar o caminho de outras nutricionistas.</em>
          </h2>
        </header>

        <ol className="home-solution-practice__stages home-history__moments">
          {historyMoments.map((moment, index) => (
            <li className="home-solution-practice__stage" key={moment.title}>
              <span className="home-solution-practice__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </li>
          ))}
        </ol>

        <p className="home-solution-practice__note">
          O que uma nutricionista aprendeu pode facilitar o caminho de muitas outras.
        </p>
      </div>
    </section>
  );
}
