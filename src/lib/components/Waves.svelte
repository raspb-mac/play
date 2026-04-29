<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    /**
     * Variant determines geometry + sizing.
     * - 'right-accent': tall narrow vertical accent placed at right edge between sections.
     * - 'divider':      full-width horizontal hairline waves used to separate blocks.
     * - 'block':        large square-ish block of layered waves for backdrops.
     * - 'hero-bg':      atmospheric hero-side background, very subtle.
     */
    variant?: 'right-accent' | 'divider' | 'block' | 'hero-bg';
    /** Number of stacked wave paths */
    count?: number;
    /** Stroke color base */
    color?: string;
    /** Opacity multiplier for the whole svg */
    opacity?: number;
    /** Custom additional classes */
    class?: string;
  }

  let {
    variant = 'right-accent',
    count = 12,
    color = 'var(--brand-turquoise)',
    opacity = 1,
    class: className = ''
  }: Props = $props();

  // Track the current theme so we can boost stroke contrast in light mode,
  // where the turquoise lines otherwise wash out against the cream background.
  let isLight = $state(false);
  // Observed multiplier applied to per-path stroke-opacity.
  const opacityBoost = $derived(isLight ? 1.55 : 1);

  // Per-variant geometry. amplitude + wavelength stay CONSTANT across all stacked
  // lines — only the y-offset (and tiny phase shift between lines) changes.
  // This produces true parallel waves.
  const geometry = $derived.by(() => {
    if (variant === 'right-accent') {
      return { vbW: 800, vbH: 1200, amplitude: 60, wavelength: 320 };
    }
    if (variant === 'divider') {
      return { vbW: 1600, vbH: 160, amplitude: 24, wavelength: 360 };
    }
    if (variant === 'hero-bg') {
      return { vbW: 1200, vbH: 1400, amplitude: 90, wavelength: 380 };
    }
    return { vbW: 900, vbH: 700, amplitude: 70, wavelength: 320 };
  });

  /**
   * Build a smooth sine-like path using alternating quadratic Bézier segments.
   * Each Q segment spans half a wavelength from baseline to baseline, with the
   * control point at the peak/trough. This is the standard SVG sine-wave pattern.
   */
  function buildWavePath(yBase: number, vbW: number, amp: number, wl: number, phaseX: number): string {
    const startX = -wl - phaseX;
    const half = wl / 2;
    let d = `M ${startX.toFixed(1)} ${yBase.toFixed(2)}`;
    let direction = 1;
    let x = startX;
    while (x < vbW + wl) {
      const cx = x + half / 2;
      const cy = yBase - amp * direction;
      const ex = x + half;
      d += ` Q ${cx.toFixed(1)} ${cy.toFixed(2)} ${ex.toFixed(1)} ${yBase.toFixed(2)}`;
      x = ex;
      direction *= -1;
    }
    return d;
  }

  const paths = $derived.by(() => {
    const { vbW, vbH, amplitude, wavelength } = geometry;
    const arr: { d: string; opacity: number }[] = [];
    const padding = vbH * 0.1;
    const usable = vbH - padding * 2;
    const safeCount = Math.max(1, count);
    for (let i = 0; i < safeCount; i++) {
      const t = safeCount === 1 ? 0.5 : i / (safeCount - 1);
      const yBase = padding + t * usable;
      // Tiny phase offset between adjacent lines so the stack reads as flowing,
      // not as N copies of the exact same curve.
      const phase = i * (wavelength * 0.06);
      // Bell curve of opacity: faded at top/bottom, brightest in the middle band.
      const baseOp = 0.18 + Math.sin(t * Math.PI) * 0.7;
      const op = Math.min(1, baseOp * opacityBoost);
      arr.push({ d: buildWavePath(yBase, vbW, amplitude, wavelength, phase), opacity: op });
    }
    return arr;
  });

  let svgEl = $state<SVGSVGElement | null>(null);

  onMount(() => {
    // Sync the theme flag with <html data-theme="...">. Both ThemeToggle
    // instances flip this attribute, so any component watching it stays in
    // sync without a shared store.
    const syncTheme = () => {
      if (typeof document === 'undefined') return;
      isLight = document.documentElement.getAttribute('data-theme') === 'light';
    };
    syncTheme();
    const themeObs = new MutationObserver(syncTheme);
    if (typeof document !== 'undefined') {
      themeObs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }

    if (!svgEl) return () => themeObs.disconnect();
    if (typeof IntersectionObserver === 'undefined') {
      svgEl.querySelectorAll<SVGPathElement>('.wave-stroke').forEach((p) => p.classList.add('is-drawn'));
      return () => themeObs.disconnect();
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && svgEl) {
            const pathsList = svgEl.querySelectorAll<SVGPathElement>('.wave-stroke');
            pathsList.forEach((p, idx) => {
              setTimeout(() => p.classList.add('is-drawn'), idx * 70);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    obs.observe(svgEl);
    return () => {
      obs.disconnect();
      themeObs.disconnect();
    };
  });

  const gradId = `waveGrad-${Math.random().toString(36).slice(2, 9)}`;
</script>

<svg
  bind:this={svgEl}
  class="waves waves--{variant} {className}"
  viewBox={`0 0 ${geometry.vbW} ${geometry.vbH}`}
  preserveAspectRatio={variant === 'right-accent' ? 'xMaxYMid slice' : 'xMidYMid slice'}
  xmlns="http://www.w3.org/2000/svg"
  role="presentation"
  aria-hidden="true"
  style="opacity: {opacity};"
>
  <defs>
    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color={color} stop-opacity="0" />
      <stop offset="40%" stop-color={color} stop-opacity="0.95" />
      <stop offset="100%" stop-color={color} stop-opacity="0" />
    </linearGradient>
  </defs>
  {#each paths as p, i (i)}
    <path
      d={p.d}
      fill="none"
      stroke="url(#{gradId})"
      stroke-width="1"
      stroke-linecap="round"
      stroke-opacity={p.opacity}
      pathLength="1"
      class="wave-stroke"
      style="--draw-delay: {i * 70}ms;"
    />
  {/each}
</svg>

<style lang="postcss">
  @reference '../../app.css';

  .waves {
    @apply pointer-events-none block;
  }

  .waves--right-accent {
    @apply absolute right-0 top-1/2 -translate-y-1/2;
    width: clamp(280px, 32vw, 520px);
    height: 130%;
  }

  .waves--divider {
    @apply w-full;
    height: clamp(60px, 6vw, 110px);
  }

  .waves--hero-bg {
    @apply absolute inset-0 w-full h-full;
  }

  .waves--block {
    @apply w-full h-full;
  }

  /* Self-draw animation; pathLength="1" lets us treat each path as 0..1. */
  .waves :global(.wave-stroke) {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--draw-delay, 0ms);
  }

  .waves :global(.wave-stroke.is-drawn) {
    stroke-dashoffset: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .waves :global(.wave-stroke) {
      stroke-dashoffset: 0;
      transition: none;
    }
  }
</style>
