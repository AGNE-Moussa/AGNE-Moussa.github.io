import { useEffect, useRef, useState } from 'react'

// Squelette : indices des 13 points (tête, puis pour chaque côté : hanche, genou, cheville, épaule, coude, poignet)
const BONES = [
  [0, 4], [0, 10], [4, 10], // tête et épaules
  [4, 5], [5, 6], [10, 11], [11, 12], // bras
  [4, 1], [10, 7], [1, 7], // tronc et bassin
  [1, 2], [2, 3], [7, 8], [8, 9], // jambes
]

const rad = (d) => (d * Math.PI) / 180

function pose(phase, cx, groundY, s) {
  const a = Math.sin(phase)
  const bob = 4 * s * Math.abs(Math.cos(phase))
  const th = 58 * s, sh = 62 * s, ua = 46 * s, fa = 42 * s, torso = 78 * s, neck = 24 * s
  const hy = groundY - (th + sh) * 0.97 - bob
  const pts = [[cx + 4 * s, hy - torso - neck - 6 * s]]
  const shoulder = [cx + 2 * s, hy - torso]
  for (const [side, sg] of [[0, 1], [1, -1]]) {
    const ha = rad(24 * a * sg)
    const kb = rad(8 + 24 * Math.max(0, -a * sg) + 10 * Math.max(0, a * sg))
    const hip = [cx + (side ? 7 : -7) * s, hy + (side ? 0 : 2 * s)]
    const knee = [hip[0] + th * Math.sin(ha), hip[1] + th * Math.cos(ha)]
    const la = ha - kb
    const ankle = [knee[0] + sh * Math.sin(la), knee[1] + sh * Math.cos(la)]
    const sa = rad(-26 * a * sg)
    const sp = [shoulder[0] + (side ? 9 : -9) * s, shoulder[1] + (side ? 0 : 3 * s)]
    const el = [sp[0] + ua * Math.sin(sa), sp[1] + ua * Math.cos(sa)]
    const ea = sa + rad(30)
    const wr = [el[0] + fa * Math.sin(ea), el[1] + fa * Math.cos(ea)]
    pts.push(hip, knee, ankle, sp, el, wr)
  }
  return pts
}

export default function Walker() {
  const canvasRef = useRef(null)
  const [showBones, setShowBones] = useState(false)
  const bonesRef = useRef(false)
  useEffect(() => {
    bonesRef.current = showBones
  }, [showBones])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf, w, h, dpr
    let phase = 0.8
    let dir = 1 // 1 : vers la droite, -1 : vers la gauche
    let targetDir = 1
    let flip = 1 // interpolation du retournement
    let speed = 3.6
    let targetSpeed = 3.6
    let bonesAlpha = 0
    let last = performance.now()

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Le marcheur se tourne vers le curseur et accélère quand on s'en approche
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      const mx = e.clientX - (r.left + r.width / 2)
      const my = e.clientY - (r.top + r.height / 2)
      targetDir = mx >= 0 ? 1 : -1
      const dist = Math.hypot(mx, my)
      targetSpeed = 2.6 + Math.max(0, 1 - dist / 700) * 4.2
    }
    window.addEventListener('pointermove', onMove)

    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!reduce) {
        speed += (targetSpeed - speed) * 0.04
        phase += dt * speed
        dir = targetDir
        flip += (dir - flip) * 0.12
      }
      bonesAlpha += ((bonesRef.current ? 1 : 0) - bonesAlpha) * 0.12

      ctx.clearRect(0, 0, w, h)
      const s = Math.min(w / 190, h / 300)
      const cx = w / 2
      const groundY = h * 0.94

      // sol
      ctx.strokeStyle = 'rgba(234,241,244,0.12)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(cx - 80 * s, groundY + 4)
      ctx.lineTo(cx + 80 * s, groundY + 4)
      ctx.stroke()

      const mirror = (pts) => pts.map(([x, y]) => [cx + (x - cx) * flip, y])

      // traînée de mouvement : positions passées, de plus en plus transparentes
      if (!reduce) {
        for (let k = 3; k >= 1; k--) {
          const ghost = mirror(pose(phase - k * 0.32, cx - k * 14 * s, groundY, s))
          ctx.fillStyle = `rgba(127,196,192,${0.07 * (4 - k)})`
          for (const [x, y] of ghost) {
            ctx.beginPath()
            ctx.arc(x, y, 3.2 * s, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      const pts = mirror(pose(phase, cx, groundY, s))

      if (bonesAlpha > 0.01) {
        ctx.strokeStyle = `rgba(127,196,192,${0.55 * bonesAlpha})`
        ctx.lineWidth = 2 * s
        ctx.lineCap = 'round'
        for (const [i, j] of BONES) {
          ctx.beginPath()
          ctx.moveTo(pts[i][0], pts[i][1])
          ctx.lineTo(pts[j][0], pts[j][1])
          ctx.stroke()
        }
      }

      pts.forEach(([x, y], i) => {
        const r = (i === 0 ? 6.2 : 5) * s
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2)
        g.addColorStop(0, 'rgba(234,241,244,0.35)')
        g.addColorStop(1, 'rgba(234,241,244,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, r * 3.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#EAF1F4'
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <figure className="walker">
      <canvas
        ref={canvasRef}
        className="walker-canvas"
        role="img"
        aria-label="Animation d'un marcheur représenté uniquement par des points lumineux"
      />
      <figcaption>
        Treize points suffisent pour percevoir une marche humaine. C'est le principe des stimuli sur lesquels je travaille.
        <button type="button" className="link-btn" onClick={() => setShowBones((v) => !v)} aria-pressed={showBones}>
          {showBones ? 'Masquer le squelette' : 'Relier les points'}
        </button>
      </figcaption>
    </figure>
  )
}
