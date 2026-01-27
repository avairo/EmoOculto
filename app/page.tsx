'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'hide' | 'reveal'>('hide');
  const [emojiInput, setEmojiInput] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [pasteInput, setPasteInput] = useState('');
  const [result, setResult] = useState('');
  const [extracted, setExtracted] = useState('');
  const [copied, setCopied] = useState(false);

  const encodeToUnicode = (text: string) => {
    let encoded = '';
    for (let char of text) {
      const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
      for (let bit of binary) {
        encoded += bit === '1' ? '\u200B' : '\u200C';
      }
      encoded += '\u200D';
    }
    return encoded;
  };

  const decodeFromUnicode = (text: string) => {
    let decoded = '';
    let byte = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (char === '\u200D') {
        if (byte.length === 8) {
          const charCode = parseInt(byte, 2);
          if (charCode > 0) {
            decoded += String.fromCharCode(charCode);
          }
          byte = '';
        }
      } else if (char === '\u200B') {
        byte += '1';
      } else if (char === '\u200C') {
        byte += '0';
      }
    }
    
    if (byte.length === 8) {
      const charCode = parseInt(byte, 2);
      if (charCode > 0) {
        decoded += String.fromCharCode(charCode);
      }
    }
    
    return decoded;
  };

  const encodeMessage = () => {
    if (!emojiInput || !secretInput) return;
    const encoded = encodeToUnicode(secretInput);
    const result_text = emojiInput + encoded;
    setResult(result_text);
  };

  const decodeMessage = () => {
    if (!pasteInput) return;
    const decoded = decodeFromUnicode(pasteInput);
    setExtracted(decoded);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyExtractedToClipboard = () => {
    navigator.clipboard.writeText(extracted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="grid-overlay"></div>
      <div className="container">
        <header>
          <div className="status-bar">
            <div>MODULE: STEGANOGRAPHY</div>
            <div>SYSTEM: ONLINE</div>
            <div>V.2.0 (STABLE)</div>
          </div>

          <h1>
            EMO <span className="highlight">OCULTO</span>
          </h1>

          <div className="subtitle">MODULE: EMOJI STEGANOGRAPHY & SMUGGLING</div>

          <nav className="main-nav">
            <a 
              href="#" 
              className={activeTab === 'hide' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('hide');
              }}
            >
              [ HIDE_MESSAGE ]
            </a>
            <a 
              href="#"
              className={activeTab === 'reveal' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('reveal');
              }}
            >
              [ REVEAL_MESSAGE ]
            </a>
          </nav>
        </header>

        <main>
          <section className="instructions-panel">
            <div className="panel-header">INFO_PROTOCOL</div>
            <div className="steps-grid">
              <div className="step">
                <div style={{ fontSize: '2rem', color: '#00ff41', marginBottom: '15px' }}>🔒</div>
                <h4>HIDE MESSAGE</h4>
                <p>Encode secret text into emojis using zero-width Unicode characters</p>
              </div>
              <div className="step">
                <div style={{ fontSize: '2rem', color: '#00ff41', marginBottom: '15px' }}>🔑</div>
                <h4>EXTRACT DATA</h4>
                <p>Paste suspicious emoji text to reveal hidden messages</p>
              </div>
              <div className="step">
                <div style={{ fontSize: '2rem', color: '#00ff41', marginBottom: '15px' }}>⚙️</div>
                <h4>STEGANOGRAPHY</h4>
                <p>Uses invisible Unicode joiners as binary separators</p>
              </div>
            </div>
          </section>

          <div style={{ display: activeTab === 'hide' ? 'block' : 'none', marginBottom: '40px' }}>
            {/* HIDE SECTION */}
            <section className="input-section">
              <div className="corner-decor top-left"></div>
              <div className="corner-decor top-right"></div>
              <div className="corner-decor bottom-left"></div>
              <div className="corner-decor bottom-right"></div>

              <label>🔐 INJECT PAYLOAD (HIDE)</label>

              <div style={{ marginTop: '20px' }}>
                <label style={{ fontSize: '0.9rem' }}>1. VISIBLE COVER (EMOJIS):</label>
                <div className="input-wrapper">
                  <span className="prefix">{'> '}</span>
                  <input
                    type="text"
                    value={emojiInput}
                    onChange={(e) => setEmojiInput(e.target.value)}
                    placeholder="💀💀💀 (Paste emojis here)"
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label style={{ fontSize: '0.9rem' }}>2. SECRET MESSAGE:</label>
                <div className="input-wrapper">
                  <span className="prefix">{'> '}</span>
                  <input
                    type="text"
                    value={secretInput}
                    onChange={(e) => setSecretInput(e.target.value)}
                    placeholder="password123"
                  />
                </div>
              </div>

              <button className="scan-btn" onClick={encodeMessage}>
                INJECT PAYLOAD &gt;&gt;
              </button>

              {result && (
                <div className="query-box">
                  <span className="query-label">ENCODED:</span>
                  <code>{result}</code>
                  <button id="copy-btn" onClick={copyToClipboard}>
                    {copied ? '✓ COPIED' : 'COPY'}
                  </button>
                </div>
              )}
            </section>
          </div>

          <div style={{ display: activeTab === 'reveal' ? 'block' : 'none', marginBottom: '40px' }}>
            {/* EXTRACT SECTION */}
            <section className="input-section">
              <div className="corner-decor top-left"></div>
              <div className="corner-decor top-right"></div>
              <div className="corner-decor bottom-left"></div>
              <div className="corner-decor bottom-right"></div>

              <label>🔓 EXTRACT PAYLOAD (REVEAL)</label>

              <div style={{ marginTop: '20px' }}>
                <label style={{ fontSize: '0.9rem' }}>PASTE SUSPICIOUS EMOJIS:</label>
                <div className="input-wrapper">
                  <span className="prefix">{'> '}</span>
                  <input
                    type="text"
                    value={pasteInput}
                    onChange={(e) => setPasteInput(e.target.value)}
                    placeholder="Paste the emojis that contain hidden data..."
                  />
                </div>
              </div>

              <button className="scan-btn" onClick={decodeMessage}>
                ANALYZE & EXTRACT &gt;&gt;
              </button>

              {extracted && (
                <div className="query-box">
                  <span className="query-label">REVEALED:</span>
                  <code>{extracted}</code>
                  <button id="copy-btn" onClick={copyExtractedToClipboard}>
                    {copied ? '✓ COPIED' : 'COPY'}
                  </button>
                </div>
              )}
            </section>
          </div>

          <section className="info-section">
            <h2>HOW IT WORKS</h2>
            <p style={{ marginBottom: '20px', color: '#888' }}>
              Emoji Smuggling uses three invisible Unicode characters to encode binary data between visible emojis:
            </p>
            <ul className="operators-list">
              <li>
                <strong>U+200B (Zero Width Space)</strong> = Binary 1
              </li>
              <li>
                <strong>U+200C (Zero Width Non-Joiner)</strong> = Binary 0
              </li>
              <li>
                <strong>U+200D (Zero Width Joiner)</strong> = Byte Separator
              </li>
            </ul>
          </section>

          <section className="faq-section" style={{ marginTop: '40px' }}>
            <h2>FAQ</h2>
            <details>
              <summary>What is Steganography?</summary>
              <p>
                Steganography is the practice of hiding information within other non-secret data or media. Unlike cryptography, which hides the meaning of a message, steganography hides the existence of the message itself.
              </p>
            </details>
            <details>
              <summary>Is this tool legal?</summary>
              <p>This tool is for educational and research purposes only. Misuse for bypassing security controls or violating terms of service is prohibited.</p>
            </details>
            <details>
              <summary>How much data can I hide?</summary>
              <p>You can theoretically hide unlimited text, but practical limits depend on platform message size restrictions. Each character requires 8 bytes of Unicode separators plus 1 separator byte.</p>
            </details>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-container">
            <div className="footer-section">
              <h3>EMOOCULTO</h3>
              <p>A steganography tool for educational research and pentesting knowledge.</p>
              <a href="#" className="contact-btn">
                DOCUMENTATION
              </a>
            </div>
            <div className="footer-section">
              <h3>RESOURCES</h3>
              <ul className="operators-list">
                <li>Unicode Reference</li>
                <li>Steganography Guide</li>
                <li>Security Best Practices</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>FOLLOW US</h3>
              <div className="social-links">
                <a href="#">TWITTER</a>
                <a href="#">GITHUB</a>
                <a href="#">DISCORD</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">© 2024 EMOOCULTO | Educational Steganography Tool | v2.0</div>
        </footer>
      </div>
    </>
  );
}
