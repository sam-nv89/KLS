import React from 'react';
import type { Language, PreviewVariant } from '../types/studio';

interface WorksheetPreviewProps {
  variant: PreviewVariant;
  title?: string;
  pageIndex?: number;
  className?: string;
  compact?: boolean;
  language?: Language;
}

export const WorksheetPreview: React.FC<WorksheetPreviewProps> = ({
  variant,
  title,
  pageIndex = 0,
  className = '',
  compact = false,
  language = 'en',
}) => {
  const tr = (en: string, es: string, ru: string) => language === 'ru' ? ru : language === 'es' ? es : en;
  const backdropMap: Record<PreviewVariant, string> = {
    'coloring-dino': 'bg-[#FFF7ED]',
    'coloring-space': 'bg-[#EFF6FF]',
    'math-counting': 'bg-[#EFF6FF]',
    'math-addition': 'bg-[#F0FDF4]',
    'alphabet-tracing': 'bg-[#F0FDF4]',
    'alphabet-phonics': 'bg-[#FEFCE8]',
    'shapes-geometry': 'bg-[#FEFCE8]',
    'shapes-colors': 'bg-[#FFF7ED]',
    'puzzles-shadow': 'bg-[#F5F3FF]',
    'puzzles-maze': 'bg-[#F0F9FF]',
    'motor-scissors': 'bg-[#F0F9FF]',
    'motor-lines': 'bg-[#F5F3FF]',
    'creative-craft': 'bg-[#FDF2F8]',
    'bundle-mega': 'bg-[#EFF6FF]',
  };

  const accentMap: Record<PreviewVariant, string> = {
    'coloring-dino': '#F97316',
    'coloring-space': '#1B75E8',
    'math-counting': '#1B75E8',
    'math-addition': '#16A34A',
    'alphabet-tracing': '#16A34A',
    'alphabet-phonics': '#EAB308',
    'shapes-geometry': '#F5B700',
    'shapes-colors': '#F97316',
    'puzzles-shadow': '#7C3AED',
    'puzzles-maze': '#0284C7',
    'motor-scissors': '#0EA5E9',
    'motor-lines': '#7C3AED',
    'creative-craft': '#EC4899',
    'bundle-mega': '#1B75E8',
  };

  const accent = accentMap[variant];

  const renderSheetContent = () => {
    // Second and third page variations for multi-page resource viewer
    if (pageIndex === 1) {
      return (
        <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
          <rect x="14" y="14" width="192" height="24" rx="4" fill="#F4F2EC" />
          <text x="24" y="30" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
            {tr('Practice Sheet · Page 2', 'Ficha de práctica · Página 2', 'Лист для практики · Страница 2')}
          </text>
          <rect x="14" y="48" width="192" height="214" rx="6" fill="none" stroke="#CBD5E1" strokeDasharray="4 4" strokeWidth="1.5" />
          {/* 3 structured activity rows */}
          {[0, 1, 2].map((row) => {
            const y = 66 + row * 64;
            return (
              <g key={row}>
                <rect x="24" y={y} width="172" height="50" rx="6" fill="#F8FAFC" stroke="#E2E8F0" />
                <circle cx="46" cy={y + 25} r="14" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5" />
                <text x="41" y={y + 29} fontSize="12" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
                  {row + 1}
                </text>
                <line x1="72" y1={y + 18} x2="182" y2={y + 18} stroke="#CBD5E1" strokeDasharray="3 3" />
                <line x1="72" y1={y + 34} x2="182" y2={y + 34} stroke="#CBD5E1" strokeDasharray="3 3" />
                <path d={`M 78 ${y + 26} Q 95 ${y + 12}, 112 ${y + 26} T 146 ${y + 26}`} fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 3" />
              </g>
            );
          })}
        </svg>
      );
    }

    if (pageIndex === 2) {
      return (
        <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
          <rect x="14" y="14" width="192" height="24" rx="4" fill="#F4F2EC" />
          <text x="24" y="30" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
            {tr('Bonus Cut & Match · Page 3', 'Recorta y empareja · Página 3', 'Бонус: вырежи и найди пару · Страница 3')}
          </text>
          <g transform="translate(22, 52)">
            {[0, 1, 2, 3].map((idx) => {
              const col = idx % 2;
              const row = Math.floor(idx / 2);
              const x = col * 92;
              const y = row * 98;
              return (
                <g key={idx}>
                  <rect x={x} y={y} width="82" height="86" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeDasharray="4 3" strokeWidth="1.5" />
                  <circle cx={x + 41} cy={y + 34} r="18" fill={accent} fillOpacity="0.14" stroke={accent} strokeWidth="2" />
                  <rect x={x + 18} y={y + 64} width="46" height="8" rx="4" fill="#E2E8F0" />
                </g>
              );
            })}
          </g>
          <text x="28" y="264" fontSize="8.5" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif">
            {tr('Cut along the dotted cards & match pairs', 'Recorta por los puntos y empareja', 'Вырежи карточки по пунктиру и найди пары')}
          </text>
        </svg>
      );
    }

    switch (variant) {
      case 'coloring-dino':
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="22" rx="4" fill="#FFF7ED" />
            <text x="24" y="29" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {tr('COLOR THE FRIENDLY DINO', 'COLOREA AL DINO AMIGABLE', 'РАСКРАСЬ ДРУЖЕЛЮБНОГО ДИНОЗАВРА')}
            </text>
            {/* Clouds */}
            <path d="M 34 64 Q 42 50, 56 56 Q 68 48, 76 62 Q 86 64, 80 74 L 34 74 Z" fill="none" stroke="#0F2A5F" strokeWidth="2" />
            <circle cx="172" cy="64" r="14" fill="#FEF08A" stroke="#0F2A5F" strokeWidth="2" />
            {/* Friendly dinosaur line art */}
            <path
              d="M 55 215 Q 52 175, 76 156 Q 94 142, 114 146 Q 124 110, 128 92 Q 134 76, 152 78 Q 168 80, 168 98 Q 168 112, 148 116 Q 144 136, 146 164 Q 162 172, 160 215 L 142 215 L 142 192 L 120 192 L 120 215 L 98 215 L 98 192 L 76 192 L 76 215 Z"
              fill="#FFFFFF"
              stroke="#0F2A5F"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Tail */}
            <path d="M 58 186 Q 32 182, 26 165 Q 40 172, 56 172" fill="#FFFFFF" stroke="#0F2A5F" strokeWidth="2.5" />
            {/* Dino eye & smile */}
            <circle cx="152" cy="92" r="2.6" fill="#0F2A5F" />
            <path d="M 150 102 Q 158 106, 164 100" fill="none" stroke="#0F2A5F" strokeWidth="2" strokeLinecap="round" />
            {/* Back plates */}
            <path d="M 122 104 L 114 98 L 120 112 M 114 128 L 104 122 L 112 138 M 92 146 L 84 138 L 86 152" fill="#BBF7D0" stroke="#0F2A5F" strokeWidth="2" />
            {/* Ground line */}
            <line x1="22" y1="216" x2="198" y2="216" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" />
            <text x="58" y="252" fontSize="11" fontWeight="700" fill="#64748B" stroke="#94A3B8" strokeDasharray="2 2" fontFamily="Outfit, sans-serif">
              D - I - N - O - S - A - U - R
            </text>
          </svg>
        );

      case 'coloring-space':
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="22" rx="4" fill="#EFF6FF" />
            <text x="24" y="29" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {tr('SPACE ROCKET COLORING', 'COLOREA EL COHETE ESPACIAL', 'РАСКРАСЬ КОСМИЧЕСКУЮ РАКЕТУ')}
            </text>
            {/* Stars */}
            <polygon points="44,68 48,78 58,78 50,84 53,94 44,88 35,94 38,84 30,78 40,78" fill="#FEF08A" stroke="#0F2A5F" strokeWidth="1.8" />
            <circle cx="174" cy="84" r="16" fill="none" stroke="#0F2A5F" strokeWidth="2.2" />
            <ellipse cx="174" cy="84" rx="28" ry="7" transform="rotate(-18 174 84)" fill="none" stroke="#0F2A5F" strokeWidth="2" />
            {/* Rocket */}
            <path d="M 110 56 Q 140 96, 134 170 L 86 170 Q 80 96, 110 56 Z" fill="#FFFFFF" stroke="#0F2A5F" strokeWidth="2.8" />
            <circle cx="110" cy="115" r="14" fill="#DBEAFE" stroke="#0F2A5F" strokeWidth="2.2" />
            <path d="M 86 146 L 64 176 L 86 170 Z" fill="#FCA5A5" stroke="#0F2A5F" strokeWidth="2.2" />
            <path d="M 134 146 L 156 176 L 134 170 Z" fill="#FCA5A5" stroke="#0F2A5F" strokeWidth="2.2" />
            <path d="M 96 172 Q 110 212, 124 172" fill="#FDE047" stroke="#0F2A5F" strokeWidth="2.2" />
            <text x="58" y="246" fontSize="11" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {tr('3 · 2 · 1 · BLAST OFF!', '3 · 2 · 1 · ¡DESPEGUE!', '3 · 2 · 1 · ПУСК!')}
            </text>
          </svg>
        );

      case 'math-counting':
      case 'math-addition':
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="22" rx="4" fill="#EFF6FF" />
            <text x="24" y="29" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {variant === 'math-addition' ? tr('COUNT & ADD GROUPS', 'CUENTA Y SUMA', 'СЧИТАЙ И СКЛАДЫВАЙ') : tr('COUNT & TRACE 1–3', 'CUENTA Y TRAZA DEL 1 AL 3', 'СЧИТАЙ И ОБВОДИ 1–3')}
            </text>
            {[1, 2, 3].map((num, idx) => {
              const y = 50 + idx * 68;
              return (
                <g key={num}>
                  <rect x="16" y={y} width="188" height="56" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
                  <text x="28" y={y + 39} fontSize="30" fontWeight="800" fill="#1B75E8" fontFamily="Outfit, sans-serif">
                    {num}
                  </text>
                  {Array.from({ length: num }).map((_, itemIdx) => (
                    <g key={itemIdx} transform={`translate(${74 + itemIdx * 28}, ${y + 28})`}>
                      <circle cx="0" cy="2" r="10" fill={idx === 1 ? '#F5B700' : '#EF4444'} fillOpacity="0.88" stroke="#0F2A5F" strokeWidth="1.5" />
                      <path d="M 0 -8 Q 4 -14, 8 -10" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  ))}
                  <rect x="166" y={y + 12} width="28" height="32" rx="6" fill="#FFFFFF" stroke="#94A3B8" strokeDasharray="3 2" strokeWidth="1.5" />
                  <text x="174" y={y + 35} fontSize="18" fontWeight="700" fill="#CBD5E1" fontFamily="Outfit, sans-serif">
                    {num}
                  </text>
                </g>
              );
            })}
            <text x="24" y="264" fontSize="8.5" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif">
              {tr('Count aloud · Trace the dotted number', 'Cuenta en voz alta · Traza el número', 'Считай вслух · Обведи цифру по пунктиру')}
            </text>
          </svg>
        );

      case 'alphabet-tracing':
      case 'alphabet-phonics':
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="22" rx="4" fill="#F0FDF4" />
            <text x="24" y="29" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {variant === 'alphabet-phonics' ? tr('PHONICS & LETTER SOUNDS', 'SONIDOS Y LETRAS', 'ЗВУКИ И БУКВЫ') : tr('TRACE LETTERS A · B · C', 'TRAZA LAS LETRAS A · B · C', 'ОБВЕДИ БУКВЫ A · B · C')}
            </text>
            {[
              { letter: 'Aa', word: 'Apple', color: '#EF4444' },
              { letter: 'Bb', word: 'Ball', color: '#1B75E8' },
              { letter: 'Cc', word: 'Cat', color: '#F59E0B' },
            ].map((row, idx) => {
              const y = 50 + idx * 68;
              return (
                <g key={row.letter}>
                  <rect x="16" y={y} width="188" height="56" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                  <text x="26" y={y + 39} fontSize="28" fontWeight="800" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
                    {row.letter}
                  </text>
                  {/* Tracing guide lines */}
                  <line x1="74" y1={y + 15} x2="156" y2={y + 15} stroke="#CBD5E1" strokeWidth="1" />
                  <line x1="74" y1={y + 28} x2="156" y2={y + 28} stroke="#94A3B8" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="74" y1={y + 42} x2="156" y2={y + 42} stroke="#CBD5E1" strokeWidth="1" />
                  <text x="80" y={y + 39} fontSize="24" fontWeight="700" fill="none" stroke="#64748B" strokeDasharray="2 2" strokeWidth="1" fontFamily="Outfit, sans-serif">
                    {row.letter}  {row.letter}
                  </text>
                  <circle cx="180" cy={y + 24} r="12" fill={row.color} fillOpacity="0.2" stroke={row.color} strokeWidth="1.8" />
                  <text x="168" y={y + 48} fontSize="8" fontWeight="600" fill="#475569" fontFamily="Plus Jakarta Sans, sans-serif">
                    {row.word}
                  </text>
                </g>
              );
            })}
            <text x="24" y="264" fontSize="8.5" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif">
              {tr('Follow numbered arrows · Say each sound', 'Sigue las flechas · Pronuncia cada sonido', 'Следуй стрелкам · Произнеси каждый звук')}
            </text>
          </svg>
        );

      case 'shapes-geometry':
      case 'shapes-colors':
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="22" rx="4" fill="#FEFCE8" />
            <text x="24" y="29" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {tr('SHAPES & COLORS MATCH', 'FORMAS Y COLORES', 'ФИГУРЫ И ЦВЕТА')}
            </text>
            {/* Circle */}
            <circle cx="62" cy="86" r="28" fill="#DBEAFE" stroke="#1B75E8" strokeWidth="2.5" strokeDasharray="5 3" />
            <text x="45" y="128" fontSize="9.5" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">{tr('CIRCLE', 'CÍRCULO', 'КРУГ')}</text>
            {/* Triangle */}
            <polygon points="158,58 128,112 188,112" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" strokeDasharray="5 3" />
            <text x="134" y="128" fontSize="9.5" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">{tr('TRIANGLE', 'TRIÁNGULO', 'ТРЕУГОЛЬНИК')}</text>
            {/* Square */}
            <rect x="34" y="152" width="56" height="56" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" strokeDasharray="5 3" />
            <text x="43" y="224" fontSize="9.5" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">{tr('SQUARE', 'CUADRADO', 'КВАДРАТ')}</text>
            {/* Star */}
            <polygon points="158,150 166,170 188,170 170,183 177,204 158,191 139,204 146,183 128,170 150,170" fill="#FFEDD5" stroke="#EA580C" strokeWidth="2.2" />
            <text x="145" y="224" fontSize="9.5" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">{tr('STAR', 'ESTRELLA', 'ЗВЕЗДА')}</text>
            <text x="34" y="256" fontSize="8.5" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif">
              {tr('Trace each dashed outline & name its color', 'Traza cada contorno y di su color', 'Обведи фигуру и назови её цвет')}
            </text>
          </svg>
        );

      case 'puzzles-shadow':
      case 'puzzles-maze':
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="22" rx="4" fill="#F5F3FF" />
            <text x="24" y="29" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {variant === 'puzzles-maze' ? tr('ANIMAL GARDEN MAZE', 'LABERINTO DEL JARDÍN', 'ЛАБИРИНТ В САДУ') : tr('MATCH EACH SHADOW', 'EMPAREJA LAS SOMBRAS', 'НАЙДИ ПАРУ ТЕНИ')}
            </text>
            {variant === 'puzzles-maze' ? (
              <g>
                <rect x="26" y="54" width="168" height="176" rx="10" fill="#F8FAFC" stroke="#0F2A5F" strokeWidth="2.5" />
                <path d="M 26 96 L 130 96 L 130 140 L 70 140 L 70 185 L 154 185" fill="none" stroke="#0F2A5F" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 42 74 L 160 74 L 160 206 L 182 206" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" />
                <circle cx="42" cy="74" r="9" fill="#F97316" />
                <circle cx="180" cy="206" r="9" fill="#16A34A" />
              </g>
            ) : (
              <g>
                {[0, 1, 2].map((row) => {
                  const y = 60 + row * 62;
                  const colors = ['#F97316', '#1B75E8', '#16A34A'];
                  return (
                    <g key={row}>
                      <circle cx="48" cy={y + 20} r="18" fill={colors[row]} fillOpacity="0.22" stroke={colors[row]} strokeWidth="2" />
                      <circle cx="172" cy={y + 20} r="18" fill="#0F2A5F" />
                      <line x1="74" y1={y + 20} x2="144" y2={y + (row === 0 ? 82 : row === 1 ? -42 : 20)} stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="4 3" />
                    </g>
                  );
                })}
              </g>
            )}
            <text x="32" y="256" fontSize="8.5" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif">
              {tr('Draw a clean line to connect the matching pair', 'Une cada pareja con una línea', 'Соедини подходящие пары линией')}
            </text>
          </svg>
        );

      case 'motor-scissors':
      case 'motor-lines':
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="22" rx="4" fill="#F0F9FF" />
            <text x="24" y="29" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {tr('SCISSOR & PENCIL PATHS', 'TIJERAS Y TRAZOS', 'НОЖНИЦЫ И ЛИНИИ')}
            </text>
            {/* Path 1: Straight */}
            <circle cx="32" cy="72" r="9" fill="#0EA5E9" />
            <line x1="46" y1="72" x2="184" y2="72" stroke="#0F2A5F" strokeWidth="2.4" strokeDasharray="6 4" />
            <polygon points="186,64 196,72 186,80" fill="#F5B700" />
            {/* Path 2: Wave */}
            <circle cx="32" cy="134" r="9" fill="#16A34A" />
            <path d="M 46 134 Q 78 108, 110 134 T 178 134" fill="none" stroke="#0F2A5F" strokeWidth="2.4" strokeDasharray="6 4" />
            <polygon points="186,126 196,134 186,142" fill="#F5B700" />
            {/* Path 3: Zigzag */}
            <circle cx="32" cy="196" r="9" fill="#F97316" />
            <polyline points="46,196 74,174 102,216 130,174 158,216 184,196" fill="none" stroke="#0F2A5F" strokeWidth="2.4" strokeDasharray="6 4" />
            <polygon points="186,188 196,196 186,204" fill="#F5B700" />
            <text x="30" y="254" fontSize="8.5" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif">
              {tr('Snip or trace slowly along each dashed line', 'Recorta o traza despacio por cada línea', 'Вырезай или обводи пунктир не спеша')}
            </text>
          </svg>
        );

      case 'creative-craft':
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="22" rx="4" fill="#FDF2F8" />
            <text x="24" y="29" fontSize="10" fontWeight="700" fill="#0F2A5F" fontFamily="Outfit, sans-serif">
              {tr('RAINBOW CUT & PASTE CRAFT', 'MANUALIDAD DE ARCOÍRIS', 'РАДУЖНАЯ ПОДЕЛКА')}
            </text>
            {/* Rainbow arcs */}
            <path d="M 38 168 A 72 72 0 0 1 182 168" fill="none" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
            <path d="M 50 168 A 60 60 0 0 1 170 168" fill="none" stroke="#F59E0B" strokeWidth="10" strokeLinecap="round" />
            <path d="M 62 168 A 48 48 0 0 1 158 168" fill="none" stroke="#FACC15" strokeWidth="10" strokeLinecap="round" />
            <path d="M 74 168 A 36 36 0 0 1 146 168" fill="none" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" />
            <path d="M 86 168 A 24 24 0 0 1 134 168" fill="none" stroke="#3B82F6" strokeWidth="10" strokeLinecap="round" />
            {/* Fluffy clouds */}
            <rect x="26" y="160" width="46" height="26" rx="13" fill="#FFFFFF" stroke="#0F2A5F" strokeWidth="2" />
            <rect x="148" y="160" width="46" height="26" rx="13" fill="#FFFFFF" stroke="#0F2A5F" strokeWidth="2" />
            {/* Cut-out raindrops */}
            <circle cx="72" cy="216" r="10" fill="#DBEAFE" stroke="#1B75E8" strokeDasharray="3 2" strokeWidth="1.8" />
            <circle cx="110" cy="216" r="10" fill="#DBEAFE" stroke="#1B75E8" strokeDasharray="3 2" strokeWidth="1.8" />
            <circle cx="148" cy="216" r="10" fill="#DBEAFE" stroke="#1B75E8" strokeDasharray="3 2" strokeWidth="1.8" />
            <text x="34" y="256" fontSize="8.5" fill="#64748B" fontFamily="Plus Jakarta Sans, sans-serif">
              {tr('Cut out clouds & raindrops to assemble', 'Recorta las nubes y las gotas para montar', 'Вырежи облака и капли и собери поделку')}
            </text>
          </svg>
        );

      case 'bundle-mega':
      default:
        return (
          <svg viewBox="0 0 220 280" className="w-full h-full" aria-hidden="true">
            <rect x="14" y="14" width="192" height="46" rx="8" fill="#1B75E8" />
            <text x="26" y="34" fontSize="11.5" fontWeight="800" fill="#FFFFFF" fontFamily="Outfit, sans-serif">
              {tr('PRESCHOOL BINDER', 'CUADERNO PREESCOLAR', 'ТЕТРАДЬ ДЛЯ ДОШКОЛЬНИКОВ')}
            </text>
            <text x="26" y="49" fontSize="8.5" fontWeight="600" fill="#DBEAFE" fontFamily="Plus Jakarta Sans, sans-serif">
              {tr('120 Pages · ABC · 123 · Shapes · Logic', '120 páginas · ABC · 123 · Formas · Lógica', '120 стр. · ABC · 123 · Фигуры · Логика')}
            </text>
            {/* 4 mini module preview tiles */}
            <rect x="18" y="74" width="88" height="76" rx="8" fill="#F0FDF4" stroke="#86EFAC" />
            <text x="42" y="118" fontSize="26" fontWeight="800" fill="#16A34A" fontFamily="Outfit, sans-serif">ABC</text>

            <rect x="114" y="74" width="88" height="76" rx="8" fill="#EFF6FF" stroke="#93C5FD" />
            <text x="136" y="118" fontSize="26" fontWeight="800" fill="#1B75E8" fontFamily="Outfit, sans-serif">123</text>

            <rect x="18" y="160" width="88" height="76" rx="8" fill="#FEFCE8" stroke="#FDE047" />
            <polygon points="62,178 42,216 82,216" fill="#F5B700" />

            <rect x="114" y="160" width="88" height="76" rx="8" fill="#F5F3FF" stroke="#C4B5FD" />
            <circle cx="158" cy="198" r="18" fill="#7C3AED" fillOpacity="0.25" stroke="#7C3AED" strokeWidth="2.5" />

            <text x="28" y="258" fontSize="8.5" fontWeight="600" fill="#475569" fontFamily="Plus Jakarta Sans, sans-serif">
              {tr('5 Complete Printable Workbooks Included', 'Incluye 5 cuadernos imprimibles completos', 'В наборе 5 полных тетрадей для печати')}
            </text>
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative w-full aspect-[4/3] ${backdropMap[variant]} flex items-center justify-center overflow-hidden ${
        compact ? 'p-3' : 'p-5'
      } ${className}`}
      role="img"
      aria-label={title ? `${tr('Printable worksheet preview', 'Vista previa de la ficha', 'Предпросмотр рабочего листа')}: ${title}` : tr('Printable worksheet preview', 'Vista previa de la ficha', 'Предпросмотр рабочего листа')}
    >
      {/* Subtle stacked sheet shadow behind the main page */}
      <div
        className="absolute w-[62%] h-[86%] bg-white/80 rounded-lg border border-[#E5E2D9] translate-x-2 translate-y-1.5 rotate-[2deg]"
        aria-hidden="true"
      />
      {/* Crisp main worksheet paper */}
      <div className="relative z-10 w-[64%] h-[88%] bg-white rounded-lg border border-[#E5E2D9] shadow-sm overflow-hidden">
        {renderSheetContent()}
      </div>
    </div>
  );
};
