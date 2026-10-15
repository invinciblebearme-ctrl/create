import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, BookOpen, Bot, Check, ChevronDown, ExternalLink, Menu, MessageSquare, Search, Sparkles, X } from 'lucide-react';
import { contents, chatbotConfig } from './content';
import './style.css';

const filters = [{ id: 'all', label: '전체 보기', icon: '✨' }, { id: 'ebook', label: '전자책', icon: '📖' }, { id: 'tool', label: '수업 지원', icon: '🧩' }, { id: 'media', label: '영상', icon: '🎬' }];

function App() {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [menu, setMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const shown = contents.filter(c => (filter === 'all' || c.group === filter) && [c.title, c.subtitle, c.description, c.type].join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) };
  const open = (c) => { if (c.url) { window.open(c.url, c.url.startsWith('http') ? '_blank' : '_self', c.url.startsWith('http') ? 'noopener,noreferrer' : undefined) } else setSelected(c) };

  const openChatUrl = () => {
    if (chatbotConfig.url) {
      window.open(chatbotConfig.url, chatbotConfig.url.startsWith('http') ? '_blank' : '_self', 'noopener,noreferrer');
    } else {
      setSelected({
        title: chatbotConfig.name,
        icon: '🤖',
        number: 'AI',
        description: '현재 AI 챗봇 연결을 준비하고 있습니다. 연결 주소가 등록되면 이곳에서 바로 이용하실 수 있습니다.'
      });
    }
  };

  return <>
    <div className="top-line" aria-hidden="true">✦　✧　✦　✧　✦</div>
    <header className="site-header shell">
      <button className="brand" onClick={() => go('top')} aria-label="맨 위로">
        <span className="brand-icon">✳</span>
        <span><strong>AI DIGITAL</strong><small>RESEARCH SCHOOL</small></span>
      </button>
      <nav className={menu ? 'nav open' : 'nav'} aria-label="주 메뉴">
        <button onClick={() => go('top')}>홈</button>
        <button onClick={() => go('library')}>자료 둘러보기</button>
        <button onClick={() => go('about')}>이용 안내</button>
        <button className="nav-chatbot-btn" onClick={() => { openChatUrl(); setShowTooltip(false); setMenu(false); }}>
          <Bot size={15} /> AI 챗봇
        </button>
      </nav>
      <button className="mobile-menu" aria-label="메뉴 열기" aria-expanded={menu} onClick={() => setMenu(!menu)}>
        {menu ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>

    <main id="top" className="shell">
      <section className="hero">
        <span className="floating f1" aria-hidden="true">✏️</span>
        <span className="floating f2" aria-hidden="true">📚</span>
        <span className="floating f3" aria-hidden="true">✨</span>
        <div className="hero-inner">
          <span className="eyebrow">✦ CREATE RESEARCH SCHOOL ✦</span>
          <h1>함께 설계하고,<br /><span>배움을 CREATE하다</span></h1>
          <p>CREATE 모형의 수업 설계 자료부터 LEMONADE 프로그램 실천 사례까지<br className="desktop-break" /> 연구학교의 배움을 한곳에서 만나보세요.</p>
          <div className="hero-actions">
            {/* <button className="primary-btn" onClick={() => go('library')}>자료 둘러보기 <ArrowRight size={18} /></button> */}
            <button className="secondary-hero-btn" onClick={() => { openChatUrl(); setShowTooltip(false); }}>
              <Bot size={17} /> <span>AI 챗봇 질문하기</span>
            </button>
          </div>
        </div>
        <div className="hero-chips">
          <span>📘 단원 설계</span>
          <span>🎨 교수학습 자료</span>
          <span>📖 실증수업</span>
          <span>🤖 AI 수업 도우미</span>
        </div>
      </section>

      <section className="intro-strip" aria-label="플랫폼 소개">
        <div>
          <span className="intro-icon">🌱</span>
          <div>
            <strong>설계에서 실천까지</strong>
            <p>연구학교의 다양한 자료를 쉽고 편리하게 공유합니다.</p>
          </div>
        </div>
        <div className="intro-count">
          <strong>06</strong>
          <span>콘텐츠 영역</span>
        </div>
      </section>

      <section className="library" id="library">
        <div className="section-top">
          <div>
            <span className="kicker">EXPLORE CONTENTS</span>
            <h2>연구학교 자료 둘러보기 <span className="sparkle">✦</span></h2>
            <p>필요한 자료를 골라 편리하게 살펴보세요.</p>
          </div>
          <span className="section-badge">6개의 자료 영역</span>
        </div>
        <div className="controls">
          <div className="filter-list" aria-label="자료 유형 선택">
            {filters.map(f => <button key={f.id} className={'filter ' + (filter === f.id ? 'active' : '')} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}><span>{f.icon}</span>{f.label}</button>)}
          </div>
          <label className="search">
            <Search size={18} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="찾고 싶은 자료를 검색하세요" aria-label="자료 검색" />
            {query && <button aria-label="검색어 지우기" onClick={() => setQuery('')}><X size={16} /></button>}
          </label>
        </div>
        <div className="results-label">
          <span>전체 <strong>{shown.length}</strong>개 콘텐츠</span>
          {(filter !== 'all' || query) && <button onClick={() => { setFilter('all'); setQuery('') }}>필터 초기화 ↺</button>}
        </div>
        {shown.length ? (
          <div className="card-grid">
            {shown.map(c => (
              <article key={c.id} className={'content-card ' + c.color} onClick={() => open(c)} style={{ cursor: 'pointer' }} tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') open(c) }}>
                <div className="card-top">
                  <span className="card-emoji" aria-hidden="true">{c.icon}</span>
                  <span className="type-tag">{c.type}</span>
                </div>
                <div className="card-no">CONTENT {c.number}</div>
                <h3>{c.title}</h3>
                <p className="subtitle">{c.subtitle}</p>
                <p className="card-desc">{c.description}</p>
                <div className="card-bottom">
                  <span className={'status ' + (c.url ? 'ready' : 'planned')}>{c.url ? <><Check size={13} /> 바로 이용</> : '콘텐츠 준비 중'}</span>
                  <button onClick={(e) => { e.stopPropagation(); open(c) }} aria-label={`${c.title} ${c.url ? '열기' : '상세 보기'}`}>
                    {c.url ? '자료 열기' : '자세히 보기'} <ArrowUpRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <span>🔎</span>
            <h3>검색 결과가 없어요</h3>
            <p>다른 검색어를 입력하거나 필터를 초기화해 주세요.</p>
            <button onClick={() => { setFilter('all'); setQuery('') }}>전체 자료 보기</button>
          </div>
        )}
      </section>

      <section className="about" id="about">
        <div className="about-icon">💡</div>
        <div>
          <span className="kicker">HOW TO USE</span>
          <h2>이렇게 이용해 보세요!</h2>
          <p>원하는 콘텐츠를 선택해 자료를 확인하세요. PDF 전자책, 웹앱, 교수학습 자료실과 홍보 영상은 각 콘텐츠가 준비되는 대로 연결됩니다.</p>
        </div>
        <button onClick={() => go('library')}>콘텐츠 보기 <ArrowRight size={17} /></button>
      </section>
    </main>

    <footer>
      <div className="shell footer-inner">
        <div>
          <strong>✳ 2026 교육부 요청 전북특별자치도교육청지정 AI 디지털 활용 연구학교 군산초등학교</strong>
          <p>수업의 성장과 배움의 나눔을 위한 성과 공유 공간</p>
        </div>
        <span>© CREATE Research School</span>
      </div>
    </footer>

    {/* 플로팅 챗봇 바로가기 */}
    <aside className="chatbot-floating" aria-label="CREATE AI 챗봇">
      {showTooltip && (
        <div className="chat-tooltip" role="tooltip" onClick={() => { openChatUrl(); setShowTooltip(false); }} title="CREATE AI 수업 챗봇 열기">
          <span className="tooltip-sparkle">✨</span>
          <div className="tooltip-text">
            <strong>궁금한 점이 있으신가요?</strong>
            <p>CREATE AI 수업 챗봇에게 물어보세요!</p>
          </div>
          <button
            className="tooltip-close"
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            aria-label="안내 말풍선 닫기"
          >
            <X size={13} />
          </button>
        </div>
      )}

      <button
        className="chatbot-fab"
        onClick={() => { openChatUrl(); setShowTooltip(false); }}
        aria-label="CREATE AI 수업 챗봇 바로가기 (새 탭)"
        title="CREATE AI 수업 챗봇 바로가기"
      >
        <div className="fab-icon-wrap">
          <Bot size={28} />
        </div>
        <span className="fab-badge">AI</span>
      </button>
    </aside>

    {selected && <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) setSelected(null) }}><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button className="dialog-close" onClick={() => setSelected(null)} aria-label="닫기"><X size={21} /></button><span className="dialog-icon">{selected.icon}</span><span className="kicker">CONTENT {selected.number}</span><h2 id="dialog-title">{selected.title}</h2><p>{selected.description}</p><div className="dialog-note">현재 콘텐츠 연결을 준비하고 있습니다. 추후 자료 주소가 등록되면 이곳에서 바로 이용할 수 있습니다.</div><button className="primary-btn" onClick={() => setSelected(null)}>확인 <Check size={16} /></button></section></div>}
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
