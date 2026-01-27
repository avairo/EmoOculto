'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ZWC = {
  ONE: '\u200B',      // U+200B Zero Width Space
  ZERO: '\u200C',     // U+200C Zero Width Non-Joiner
  SEPARATOR: '\u200D' // U+200D Zero Width Joiner
};

export default function HideMessage() {
  const [emojis, setEmojis] = useState('😀🎉🚀');
  const [secret, setSecret] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const hideMessage = () => {
    if (!secret.trim()) {
      alert('Please enter a secret message');
      return;
    }

    // Convert secret to binary
    let binary = '';
    for (let i = 0; i < secret.length; i++) {
      const code = secret.charCodeAt(i);
      const bits = code.toString(2).padStart(8, '0');
      binary += bits + ZWC.SEPARATOR;
    }

    // Inject binary into emojis
    let result = '';
    let binaryIndex = 0;
    const binaryArray = binary.split('');

    for (let i = 0; i < emojis.length; i++) {
      result += emojis[i];
      
      // Add binary characters after each emoji
      for (let j = 0; j < 8 && binaryIndex < binaryArray.length; j++) {
        if (binaryArray[binaryIndex] === ZWC.SEPARATOR) {
          result += ZWC.SEPARATOR;
          binaryIndex++;
          break;
        }
        result += binaryArray[binaryIndex] === '1' ? ZWC.ONE : ZWC.ZERO;
        binaryIndex++;
      }
    }

    setResult(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-2 border-primary p-6 space-y-4">
      <div className="text-primary font-mono text-sm font-bold flex items-center gap-2">
        <span>🔐</span>
        {'INJECT PAYLOAD (HIDE)'}
      </div>

      <div className="border-t-2 border-primary pt-4 space-y-4">
        <div>
          <div className="text-primary font-mono text-xs font-bold mb-2">{'>> 1. VISIBLE COVER (EMOJIS):'}</div>
          <input
            type="text"
            value={emojis}
            onChange={(e) => setEmojis(e.target.value)}
            placeholder="Example: 😀🍕🚀 (Paste emojis here)"
            className="w-full px-3 py-2 bg-input border border-primary text-primary font-mono text-xs placeholder:text-primary/40 focus:outline-none"
          />
        </div>

        <div>
          <div className="text-primary font-mono text-xs font-bold mb-2">{'>> 2. SECRET MESSAGE:'}</div>
          <textarea
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Example: password123"
            className="w-full px-3 py-2 bg-input border border-primary text-primary font-mono text-xs placeholder:text-primary/40 focus:outline-none resize-none h-16"
          />
        </div>

        <Button
          onClick={hideMessage}
          className="w-full bg-primary hover:bg-primary/80 text-background font-mono text-xs font-bold py-2"
        >
          {'INJECT PAYLOAD >>'}
        </Button>

        {result && (
          <>
            <div>
              <div className="text-primary font-mono text-xs font-bold mb-2">{'>> ENCODED OUTPUT:'}</div>
              <div className="w-full px-3 py-2 bg-input border border-primary text-primary font-mono text-xs word-break break-words overflow-y-auto max-h-24 min-h-16 max-w-full">
                {result}
              </div>
            </div>

            <Button
              onClick={copyToClipboard}
              className="w-full bg-primary hover:bg-primary/80 text-background font-mono text-xs font-bold py-2"
            >
              {copied ? '✓ COPIED!' : 'COPY TO CLIPBOARD >>'}
            </Button>

            <div className="text-primary font-mono text-xs opacity-60">
              {`Size: ${result.length} bytes | Visible: ${result.replace(/[\u200B\u200C\u200D]/g, '').length} chars`}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
