import type { AppWindowProps } from '@/types';
import type { OutputLine, Segment } from './shell/shell.types';
import { terminalStyles as s } from './Terminal.styles';
import { useTerminal } from './useTerminal';

function Segments({ segments }: { segments: readonly Segment[] }) {
  return (
    <>
      {segments.map((seg, i) => (
        <span key={i} className={s.tone[seg.tone ?? 'default']}>
          {seg.text}
        </span>
      ))}
    </>
  );
}

const Lines = ({ lines }: { lines: readonly OutputLine[] }) => (
  <>
    {lines.map((line) => (
      <div key={line.id} className={s.line}>
        <Segments segments={line.segments} />
      </div>
    ))}
  </>
);

// Terminal running gsh – the Gerigk Shell
export function Terminal({ windowId }: AppWindowProps) {
  const term = useTerminal(windowId);

  return (
    <div ref={term.rootRef} className={s.root} tabIndex={-1} onKeyDown={term.onKeyDown}>
      <div ref={term.scrollRef} className={s.scroll} onClick={term.focusInput} role="log" aria-live="polite">
        <Lines lines={term.lines} />
        {term.live && <Lines lines={term.live} />}
        {!term.running && (
          <label className={s.inputRow}>
            <Segments segments={term.promptSegments} />
            <input
              ref={term.inputRef}
              className={s.input}
              value={term.input}
              onChange={(e) => term.setInput(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal-Eingabe"
            />
          </label>
        )}
      </div>
    </div>
  );
}
