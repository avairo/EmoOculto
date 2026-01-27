'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const ZWC = {
  ONE: '\u200B',      // U+200B Zero Width Space
  ZERO: '\u200C',     // U+200C Zero Width Non-Joiner
  SEPARATOR: '\u200D' // U+200D Zero Width Joiner
};

export default function ExtractMessage() {
  const [input, setInput] = useState('');
  const [extracted, setExtracted] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [copied, setCopied] = useState(false);

  const extractMessage = () => {
    if (!input.trim()) {
      alert('Please paste emojis or text that may contain hidden data');
      return;
    }

    try {
      let binary = '';
      let i = 0;

      while (i < input.length) {
        if (input[i] === ZWC.SEPARATOR) {
          i++;
          continue;
        }

        if (input[i] === ZWC.ONE || input[i] === ZWC.ZERO) {
          // Collect bits until we get 8 of them
          let byteStr = '';
          while (byteStr.length < 8 && i < input.length) {
            if (input[i] === ZWC.ONE) {
              byteStr += '1';
              i++;
            } else if (input[i] === ZWC.ZERO) {
              byteStr += '0';
              i++;
            } else if (input[i] === ZWC.SEPARATOR) {
              i++;
              break;
            } else {
              i++;
            }
          }

          if (byteStr.length === 8) {
            const charCode = parseInt(byteStr, 2);
            if (charCode > 0 && charCode < 127) {
              binary += String.fromCharCode(charCode);
            }
          }
        } else {
          i++;
        }
      }

      setExtracted(binary);
      setAnalyzed(true);
    } catch (error) {
      alert('Error extracting message. Make sure the input contains encoded data.');
      setAnalyzed(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extracted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAnalyze = () => {
    extractMessage();
  };

  return (
    <div className="border-2 border-primary p-6 space-y-4">
      <div className="text-primary font-mono text-sm font-bold flex items-center gap-2">
        <span>🔓</span>
        {'EXTRACT PAYLOAD (REVEAL)'}
      </div>

      <div className="border-t-2 border-primary pt-4 space-y-4">
        <div>
          <div className="text-primary font-mono text-xs font-bold mb-2">{'>> PASTE SUSPICIOUS EMOJIS:'}</div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste the emojis that contain hidden data..."
            className="w-full px-3 py-2 bg-input border border-primary text-primary font-mono text-xs placeholder:text-primary/40 focus:outline-none resize-none h-16"
          />
        </div>

        <Button
          onClick={handleAnalyze}
          className="w-full bg-primary hover:bg-primary/80 text-background font-mono text-xs font-bold py-2"
        >
          {'ANALYZE & EXTRACT >>'}
        </Button>

        {analyzed && (
          <div className="space-y-4 pt-4 border-t-2 border-primary">
            {extracted ? (
              <>
                <div className="text-primary font-mono text-xs font-bold">{'>> HIDDEN MESSAGE FOUND:'}</div>
                <div className="bg-input border border-primary p-3 font-mono text-xs text-primary break-all max-h-24 overflow-y-auto min-h-16">
                  {extracted}
                </div>
                
                <div className="text-primary font-mono text-xs opacity-60">
                  {`Message length: ${extracted.length} characters`}
                </div>

                <Button
                  onClick={copyToClipboard}
                  className="w-full bg-primary hover:bg-primary/80 text-background font-mono text-xs font-bold py-2"
                >
                  {copied ? '✓ COPIED!' : 'COPY MESSAGE >>'}
                </Button>
              </>
            ) : (
              <div className="text-primary font-mono text-xs">
                {'// NO HIDDEN MESSAGES DETECTED'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
