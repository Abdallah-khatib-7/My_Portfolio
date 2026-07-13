import Reveal from "./Reveal";

const USER = "Abdallah-khatib-7";

export default function GithubStats() {
  return (
    <div id="github" className="section">
      <Reveal className="github__header">
        <div className="section-index">04</div>
        <div className="section-title">GitHub, live</div>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noreferrer"
          className="github__link"
        >
          @{USER} ↗
        </a>
      </Reveal>

      <div className="github__grid">
        <Reveal className="github__card">
          <img
            src={`https://github-readme-stats-one-iota-93.vercel.app/api?username=${USER}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0a0a0a&title_color=ef7f3f&icon_color=ef7f3f&text_color=f5efe8&rank_icon=github&cache=1`}
            alt="GitHub stats"
          />
        </Reveal>
        <Reveal delay={0.1} className="github__card">
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${USER}&theme=tokyonight&hide_border=true&background=0a0a0a&ring=ef7f3f&fire=ef7f3f&currStreakLabel=f5efe8`}
            alt="GitHub streak"
          />
        </Reveal>
      </div>

      <Reveal className="github__snake">
        <div className="github__snake-label">CONTRIBUTION SNAKE</div>
        <img
          src={`https://raw.githubusercontent.com/${USER}/${USER}/output/github-contribution-grid-snake.svg`}
          alt="Contribution snake"
        />
      </Reveal>

      <Reveal className="github__card github__activity">
        <img
          src={`https://github-readme-activity-graph.vercel.app/graph?username=${USER}&bg_color=0a0a0a&color=a89a8a&line=ef7f3f&point=f5efe8&area=true&hide_border=true`}
          alt="GitHub activity graph"
        />
      </Reveal>
    </div>
  );
}
