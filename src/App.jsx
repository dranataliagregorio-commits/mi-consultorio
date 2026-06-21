import { useState, useEffect } from "react";

// ── PALETTE ──────────────────────────────────────────────────────────────────
// Blanco clínico + acento aguamarina dental + rojo suave para alertas
// Tipografía: Inter (limpia, legible, profesional sin ser fría)
const COLORS = {
  bg: "#F7FAFA",
  surface: "#FFFFFF",
  border: "#DDE8E8",
  accent: "#2A9D8F",
  accentLight: "#E8F5F3",
  accentDark: "#1F7A6E",
  danger: "#E76F51",
  dangerLight: "#FDF0EC",
  warning: "#E9C46A",
  warningLight: "#FDF8EC",
  text: "#1A2E2C",
  textMuted: "#6B8C8A",
  success: "#57CC99",
  successLight: "#EDF9F3",
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
const formatARS = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n || 0);

const today = () => new Date().toISOString().slice(0, 10);

const uid = () => Math.random().toString(36).slice(2, 9);

// Hook para persistir en localStorage
function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch { return initialValue; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, setState];
}

// ── INITIAL DATA ─────────────────────────────────────────────────────────────
const INITIAL_DEBTORS = [
  { id: uid(), nombre: "García, Laura", tratamiento: "Ortodoncia", total: 180000, pagos: [{ fecha: "2026-05-10", monto: 60000 }] },
  { id: uid(), nombre: "Rodríguez, Marcos", tratamiento: "Implante", total: 350000, pagos: [{ fecha: "2026-06-01", monto: 100000 }] },
  { id: uid(), nombre: "López, Ana", tratamiento: "Blanqueamiento", total: 45000, pagos: [] },
];

const INITIAL_STOCK = [
  // DESCARTABLES GENERALES
  { id: uid(), nombre: "Guantes nitrilo talle XS", categoria: "Descartable", cantidad: 2, minimo: 2, unidad: "cajas" },
  { id: uid(), nombre: "Guantes nitrilo talle S", categoria: "Descartable", cantidad: 2, minimo: 2, unidad: "cajas" },
  { id: uid(), nombre: "Guantes nitrilo talle M", categoria: "Descartable", cantidad: 3, minimo: 2, unidad: "cajas" },
  { id: uid(), nombre: "Barbijos quirúrgicos", categoria: "Descartable", cantidad: 4, minimo: 3, unidad: "cajas" },
  { id: uid(), nombre: "Baberos descartables", categoria: "Descartable", cantidad: 3, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Vasos descartables", categoria: "Descartable", cantidad: 5, minimo: 3, unidad: "paquetes" },
  { id: uid(), nombre: "Eyectores de saliva", categoria: "Descartable", cantidad: 4, minimo: 3, unidad: "paquetes" },
  { id: uid(), nombre: "Rollos de algodón", categoria: "Descartable", cantidad: 3, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Gasas estériles", categoria: "Descartable", cantidad: 5, minimo: 3, unidad: "paquetes" },
  { id: uid(), nombre: "Bolsas para esterilización", categoria: "Descartable", cantidad: 4, minimo: 2, unidad: "rollos" },
  { id: uid(), nombre: "Papel film / cobertura", categoria: "Descartable", cantidad: 2, minimo: 2, unidad: "rollos" },
  { id: uid(), nombre: "Alcohol en gel 500ml", categoria: "Descartable", cantidad: 3, minimo: 2, unidad: "frascos" },
  // ANESTESIA
  { id: uid(), nombre: "Lidocaína 2% con epinefrina", categoria: "Anestesia", cantidad: 20, minimo: 15, unidad: "carpules" },
  { id: uid(), nombre: "Lidocaína 2% sin epinefrina", categoria: "Anestesia", cantidad: 10, minimo: 8, unidad: "carpules" },
  { id: uid(), nombre: "Articaína 4% con epinefrina", categoria: "Anestesia", cantidad: 15, minimo: 10, unidad: "carpules" },
  { id: uid(), nombre: "Agujas carpule 27G cortas", categoria: "Anestesia", cantidad: 30, minimo: 20, unidad: "unidades" },
  { id: uid(), nombre: "Agujas carpule 30G largas", categoria: "Anestesia", cantidad: 20, minimo: 15, unidad: "unidades" },
  { id: uid(), nombre: "Anestesia tópica gel", categoria: "Anestesia", cantidad: 2, minimo: 1, unidad: "frascos" },
  // OPERATORIA
  { id: uid(), nombre: "Composite A1", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Composite A2", categoria: "Operatoria", cantidad: 3, minimo: 2, unidad: "jeringas" },
  { id: uid(), nombre: "Composite A3", categoria: "Operatoria", cantidad: 3, minimo: 2, unidad: "jeringas" },
  { id: uid(), nombre: "Composite A3.5", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Composite B1 (blanqueado)", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Adhesivo (sistema grabado total)", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "frascos" },
  { id: uid(), nombre: "Ácido fosfórico 35%", categoria: "Operatoria", cantidad: 3, minimo: 2, unidad: "jeringas" },
  { id: uid(), nombre: "Ionómero vítreo restaurador", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Hidróxido de calcio", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Cuñas interproximales plásticas", categoria: "Operatoria", cantidad: 3, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Matrices de acetato", categoria: "Operatoria", cantidad: 3, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Matrices metálicas (Tofflemire)", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "paquetes" },
  { id: uid(), nombre: "Discos de pulido Sof-Lex", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "paquetes" },
  { id: uid(), nombre: "Fresas de diamante (surtido)", categoria: "Operatoria", cantidad: 10, minimo: 5, unidad: "unidades" },
  { id: uid(), nombre: "Fresas de carburo (surtido)", categoria: "Operatoria", cantidad: 8, minimo: 4, unidad: "unidades" },
  // ENDODONCIA
  { id: uid(), nombre: "Limas K-file #15 a #40", categoria: "Endodoncia", cantidad: 5, minimo: 3, unidad: "cajas" },
  { id: uid(), nombre: "Limas H-file (surtido)", categoria: "Endodoncia", cantidad: 3, minimo: 2, unidad: "cajas" },
  { id: uid(), nombre: "Limas mecanizadas NiTi", categoria: "Endodoncia", cantidad: 4, minimo: 3, unidad: "kits" },
  { id: uid(), nombre: "Hipoclorito de sodio 5.25%", categoria: "Endodoncia", cantidad: 3, minimo: 2, unidad: "litros" },
  { id: uid(), nombre: "EDTA gel", categoria: "Endodoncia", cantidad: 3, minimo: 2, unidad: "jeringas" },
  { id: uid(), nombre: "Conos de gutapercha (surtido)", categoria: "Endodoncia", cantidad: 5, minimo: 3, unidad: "cajas" },
  { id: uid(), nombre: "Conos de papel absorbente", categoria: "Endodoncia", cantidad: 4, minimo: 3, unidad: "cajas" },
  { id: uid(), nombre: "Cemento sellador AH Plus", categoria: "Endodoncia", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Léntulos", categoria: "Endodoncia", cantidad: 2, minimo: 1, unidad: "cajas" },
  // IMPLANTES Y CIRUGÍA
  { id: uid(), nombre: "Sutura Vicryl 4-0 reabsorbible", categoria: "Cirugía / Implantes", cantidad: 6, minimo: 4, unidad: "unidades" },
  { id: uid(), nombre: "Sutura seda 3-0", categoria: "Cirugía / Implantes", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Hojas de bisturí N°15", categoria: "Cirugía / Implantes", cantidad: 8, minimo: 5, unidad: "unidades" },
  { id: uid(), nombre: "Hojas de bisturí N°12", categoria: "Cirugía / Implantes", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Membrana de colágeno", categoria: "Cirugía / Implantes", cantidad: 3, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Biomaterial / xenoinjerto óseo", categoria: "Cirugía / Implantes", cantidad: 2, minimo: 1, unidad: "frascos" },
  { id: uid(), nombre: "Tornillos de cicatrización (surtido)", categoria: "Cirugía / Implantes", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Suero fisiológico 500ml", categoria: "Cirugía / Implantes", cantidad: 4, minimo: 3, unidad: "frascos" },
  { id: uid(), nombre: "Apósito hemostático (Gelita/Surgicel)", categoria: "Cirugía / Implantes", cantidad: 3, minimo: 2, unidad: "unidades" },
  // ORTODONCIA DAMON + CUNITI
  { id: uid(), nombre: "Brackets Damon Q (surtido)", categoria: "Ortodoncia Damon", cantidad: 5, minimo: 3, unidad: "kits" },
  { id: uid(), nombre: "Tubos molares Damon doble", categoria: "Ortodoncia Damon", cantidad: 4, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Llave de apertura Damon", categoria: "Ortodoncia Damon", cantidad: 2, minimo: 1, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .014 redondo", categoria: "Ortodoncia Damon", cantidad: 8, minimo: 5, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .016 redondo", categoria: "Ortodoncia Damon", cantidad: 8, minimo: 5, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .018 redondo", categoria: "Ortodoncia Damon", cantidad: 6, minimo: 4, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .014x.025 rectangular", categoria: "Ortodoncia Damon", cantidad: 6, minimo: 4, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .016x.025 rectangular", categoria: "Ortodoncia Damon", cantidad: 6, minimo: 4, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .017x.025 rectangular", categoria: "Ortodoncia Damon", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .018x.025 rectangular", categoria: "Ortodoncia Damon", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Arco acero SS .019x.025 (finalización)", categoria: "Ortodoncia Damon", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Arco Beta-titanio TMA", categoria: "Ortodoncia Damon", cantidad: 4, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Elásticos intermaxilares (surtido)", categoria: "Ortodoncia Damon", cantidad: 6, minimo: 4, unidad: "paquetes" },
  { id: uid(), nombre: "Cadena elástica", categoria: "Ortodoncia Damon", cantidad: 4, minimo: 2, unidad: "rollos" },
  { id: uid(), nombre: "Resortes NiTi open coil", categoria: "Ortodoncia Damon", cantidad: 3, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Resortes NiTi closed coil", categoria: "Ortodoncia Damon", cantidad: 3, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Mini-tornillos TAD", categoria: "Ortodoncia Damon", cantidad: 4, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Adhesivo para brackets (Transbond)", categoria: "Ortodoncia Damon", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Cera ortodóncica", categoria: "Ortodoncia Damon", cantidad: 5, minimo: 3, unidad: "paquetes" },
  // PRÓTESIS
  { id: uid(), nombre: "Alginato (impresiones preliminares)", categoria: "Prótesis", cantidad: 3, minimo: 2, unidad: "kg" },
  { id: uid(), nombre: "Silicona por adición (impresiones)", categoria: "Prótesis", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Yeso piedra tipo IV", categoria: "Prótesis", cantidad: 3, minimo: 2, unidad: "kg" },
  { id: uid(), nombre: "Acrílico autopolimerizable", categoria: "Prótesis", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Cera rosada", categoria: "Prótesis", cantidad: 3, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Papel de articulación (varios µ)", categoria: "Prótesis", cantidad: 3, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Cemento provisorio Temp-Bond", categoria: "Prótesis", cantidad: 2, minimo: 1, unidad: "tubos" },
  { id: uid(), nombre: "Cemento de ionómero (cementado)", categoria: "Prótesis", cantidad: 2, minimo: 1, unidad: "kits" },
  // ODONTOPEDIATRÍA
  { id: uid(), nombre: "Coronas de acero inoxidable (surtido)", categoria: "Odontopediatría", cantidad: 10, minimo: 6, unidad: "unidades" },
  { id: uid(), nombre: "Formocresol", categoria: "Odontopediatría", cantidad: 2, minimo: 1, unidad: "frascos" },
  { id: uid(), nombre: "Óxido de zinc eugenol", categoria: "Odontopediatría", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Sellador de fosas y fisuras", categoria: "Odontopediatría", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Flúor barniz", categoria: "Odontopediatría", cantidad: 3, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Flúor gel tópico", categoria: "Odontopediatría", cantidad: 2, minimo: 1, unidad: "frascos" },
  { id: uid(), nombre: "Anestesia tópica sabor frutilla", categoria: "Odontopediatría", cantidad: 2, minimo: 1, unidad: "frascos" },
  // LÁSER
  { id: uid(), nombre: "Gafas protectoras (paciente)", categoria: "Láser", cantidad: 4, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Gafas protectoras (operador)", categoria: "Láser", cantidad: 2, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Tips de fibra óptica", categoria: "Láser", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Gel fotosensibilizador (TFD)", categoria: "Láser", cantidad: 2, minimo: 1, unidad: "jeringas" },
];

// ── BADGE ─────────────────────────────────────────────────────────────────────
function Badge({ children, color = COLORS.accent }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
      background: color + "22", color: color, textTransform: "uppercase"
    }}>{children}</span>
  );
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "#0008", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16
    }}>
      <div style={{
        background: COLORS.surface, borderRadius: 16, padding: 28,
        width: "100%", maxWidth: 480, boxShadow: "0 8px 40px #0003"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 17, color: COLORS.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: COLORS.textMuted }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── INPUT ─────────────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 8,
  border: `1.5px solid ${COLORS.border}`, fontSize: 14,
  color: COLORS.text, background: COLORS.bg, boxSizing: "border-box",
  outline: "none",
};

// ── BTN ───────────────────────────────────────────────────────────────────────
function Btn({ children, onClick, variant = "primary", small, disabled }) {
  const styles = {
    primary: { background: COLORS.accent, color: "#fff", border: "none" },
    secondary: { background: "transparent", color: COLORS.accent, border: `1.5px solid ${COLORS.accent}` },
    danger: { background: COLORS.danger, color: "#fff", border: "none" },
    ghost: { background: COLORS.accentLight, color: COLORS.accentDark, border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles[variant], borderRadius: 8, padding: small ? "6px 14px" : "9px 18px",
      fontSize: small ? 12 : 14, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1, transition: "opacity .15s",
    }}>{children}</button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO DEUDORES
// ══════════════════════════════════════════════════════════════════════════════
function Deudores() {
  const [debtors, setDebtors] = useLocalStorage("ng_debtors", INITIAL_DEBTORS);
  const [modal, setModal] = useState(null); // "nuevo" | {type:"pago",id} | {type:"ver",id}
  const [form, setForm] = useState({ nombre: "", tratamiento: "", total: "" });
  const [pagoForm, setPagoForm] = useState({ monto: "", fecha: today() });
  const [busqueda, setBusqueda] = useState("");

  const totalDeuda = debtors.reduce((s, d) => s + (d.total - d.pagos.reduce((a, p) => a + p.monto, 0)), 0);
  const totalCobrado = debtors.reduce((s, d) => s + d.pagos.reduce((a, p) => a + p.monto, 0), 0);

  const saldo = (d) => d.total - d.pagos.reduce((a, p) => a + p.monto, 0);

  const filtrados = debtors.filter(d =>
    d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.tratamiento.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarPaciente = () => {
    if (!form.nombre || !form.total) return;
    setDebtors(prev => [...prev, { id: uid(), nombre: form.nombre, tratamiento: form.tratamiento, total: parseFloat(form.total), pagos: [] }]);
    setForm({ nombre: "", tratamiento: "", total: "" });
    setModal(null);
  };

  const registrarPago = (id) => {
    const monto = parseFloat(pagoForm.monto);
    if (!monto || monto <= 0) return;
    setDebtors(prev => prev.map(d => d.id !== id ? d : { ...d, pagos: [...d.pagos, { fecha: pagoForm.fecha, monto }] }));
    setPagoForm({ monto: "", fecha: today() });
    setModal(null);
  };

  const eliminar = (id) => {
    if (confirm("¿Eliminar este paciente del registro?")) setDebtors(prev => prev.filter(d => d.id !== id));
  };

  const deudorActivo = modal?.id ? debtors.find(d => d.id === modal.id) : null;

  return (
    <div>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Deuda total pendiente", value: formatARS(totalDeuda), color: COLORS.danger },
          { label: "Total cobrado", value: formatARS(totalCobrado), color: COLORS.accent },
          { label: "Pacientes con deuda", value: debtors.filter(d => saldo(d) > 0).length, color: COLORS.warning },
        ].map(k => (
          <div key={k.label} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{k.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          placeholder="Buscar paciente o tratamiento…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: 180 }}
        />
        <Btn onClick={() => setModal("nuevo")}>+ Nuevo paciente</Btn>
      </div>

      {/* Lista */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtrados.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: COLORS.textMuted }}>No hay pacientes registrados</div>
        )}
        {filtrados.map(d => {
          const s = saldo(d);
          const pct = Math.round(((d.total - s) / d.total) * 100);
          const pagado = s === 0;
          return (
            <div key={d.id} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>{d.nombre}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{d.tratamiento}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {pagado
                    ? <Badge color={COLORS.success}>Pagado ✓</Badge>
                    : <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.danger }}>{formatARS(s)}</span>
                  }
                  {!pagado && <div style={{ fontSize: 11, color: COLORS.textMuted }}>de {formatARS(d.total)}</div>}
                </div>
              </div>

              {/* Barra de progreso */}
              {!pagado && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ background: COLORS.border, borderRadius: 99, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, background: COLORS.accent, height: "100%", borderRadius: 99, transition: "width .4s" }} />
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 3 }}>{pct}% cobrado</div>
                </div>
              )}

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <Btn small variant="ghost" onClick={() => setModal({ type: "ver", id: d.id })}>Ver historial</Btn>
                {!pagado && <Btn small onClick={() => { setPagoForm({ monto: "", fecha: today() }); setModal({ type: "pago", id: d.id }); }}>Registrar pago</Btn>}
                <Btn small variant="danger" onClick={() => eliminar(d.id)}>Eliminar</Btn>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal nuevo paciente */}
      {modal === "nuevo" && (
        <Modal title="Nuevo paciente" onClose={() => setModal(null)}>
          <Field label="Nombre y apellido"><input style={inputStyle} value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Ej: García, Laura" /></Field>
          <Field label="Tratamiento"><input style={inputStyle} value={form.tratamiento} onChange={e => setForm(f => ({ ...f, tratamiento: e.target.value }))} placeholder="Ej: Ortodoncia, Implante…" /></Field>
          <Field label="Monto total del tratamiento ($)"><input style={inputStyle} type="number" value={form.total} onChange={e => setForm(f => ({ ...f, total: e.target.value }))} placeholder="Ej: 150000" /></Field>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn onClick={agregarPaciente} disabled={!form.nombre || !form.total}>Guardar</Btn>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
          </div>
        </Modal>
      )}

      {/* Modal registrar pago */}
      {modal?.type === "pago" && deudorActivo && (
        <Modal title={`Registrar pago — ${deudorActivo.nombre}`} onClose={() => setModal(null)}>
          <div style={{ background: COLORS.dangerLight, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: COLORS.danger, fontWeight: 600 }}>
            Saldo pendiente: {formatARS(saldo(deudorActivo))}
          </div>
          <Field label="Monto a registrar ($)"><input style={inputStyle} type="number" value={pagoForm.monto} onChange={e => setPagoForm(f => ({ ...f, monto: e.target.value }))} placeholder="Ej: 50000" /></Field>
          <Field label="Fecha del pago"><input style={inputStyle} type="date" value={pagoForm.fecha} onChange={e => setPagoForm(f => ({ ...f, fecha: e.target.value }))} /></Field>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn onClick={() => registrarPago(modal.id)} disabled={!pagoForm.monto}>Confirmar pago</Btn>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
          </div>
        </Modal>
      )}

      {/* Modal historial */}
      {modal?.type === "ver" && deudorActivo && (
        <Modal title={`Historial — ${deudorActivo.nombre}`} onClose={() => setModal(null)}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>Tratamiento: </span>
            <span style={{ fontWeight: 600 }}>{deudorActivo.tratamiento}</span>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>Total: </span>
            <span style={{ fontWeight: 600 }}>{formatARS(deudorActivo.total)}</span>
            <span style={{ marginLeft: 12, fontSize: 13, color: COLORS.textMuted }}>Saldo: </span>
            <span style={{ fontWeight: 700, color: saldo(deudorActivo) > 0 ? COLORS.danger : COLORS.success }}>{formatARS(saldo(deudorActivo))}</span>
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Pagos registrados</div>
            {deudorActivo.pagos.length === 0
              ? <div style={{ color: COLORS.textMuted, fontSize: 13 }}>Sin pagos aún</div>
              : deudorActivo.pagos.map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 14 }}>
                  <span style={{ color: COLORS.textMuted }}>{p.fecha}</span>
                  <span style={{ fontWeight: 700, color: COLORS.accent }}>{formatARS(p.monto)}</span>
                </div>
              ))
            }
          </div>
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO STOCK
// ══════════════════════════════════════════════════════════════════════════════
function Stock() {
  const [items, setItems] = useLocalStorage("ng_stock", INITIAL_STOCK);
  const [modal, setModal] = useState(null); // "nuevo" | {type:"editar",id}
  const [form, setForm] = useState({ nombre: "", categoria: "Clínico", cantidad: "", minimo: "", unidad: "" });
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const bajoStock = items.filter(i => i.cantidad <= i.minimo);
  const categorias = ["Todos", "Descartable", "Anestesia", "Operatoria", "Endodoncia", "Cirugía / Implantes", "Ortodoncia Damon", "Prótesis", "Odontopediatría", "Láser"];

  const filtrados = items.filter(i =>
    (filtro === "Todos" || i.categoria === filtro) &&
    i.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const guardar = () => {
    if (!form.nombre || form.cantidad === "") return;
    if (modal === "nuevo") {
      setItems(prev => [...prev, { id: uid(), nombre: form.nombre, categoria: form.categoria, cantidad: parseFloat(form.cantidad), minimo: parseFloat(form.minimo) || 0, unidad: form.unidad }]);
    } else {
      setItems(prev => prev.map(i => i.id !== modal.id ? i : { ...i, ...form, cantidad: parseFloat(form.cantidad), minimo: parseFloat(form.minimo) || 0 }));
    }
    setModal(null);
  };

  const ajustar = (id, delta) => {
    setItems(prev => prev.map(i => i.id !== id ? i : { ...i, cantidad: Math.max(0, i.cantidad + delta) }));
  };

  const eliminar = (id) => {
    if (confirm("¿Eliminar este material?")) setItems(prev => prev.filter(i => i.id !== id));
  };

  const abrirEditar = (item) => {
    setForm({ nombre: item.nombre, categoria: item.categoria, cantidad: item.cantidad.toString(), minimo: item.minimo.toString(), unidad: item.unidad });
    setModal({ type: "editar", id: item.id });
  };

  const abrirNuevo = () => {
    setForm({ nombre: "", categoria: "Clínico", cantidad: "", minimo: "", unidad: "" });
    setModal("nuevo");
  };

  const estadoItem = (i) => {
    if (i.cantidad === 0) return { label: "Sin stock", color: COLORS.danger };
    if (i.cantidad <= i.minimo) return { label: "Stock bajo", color: COLORS.warning };
    return { label: "OK", color: COLORS.success };
  };

  return (
    <div>
      {/* Alerta */}
      {bajoStock.length > 0 && (
        <div style={{ background: COLORS.warningLight, border: `1.5px solid ${COLORS.warning}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13 }}>
          <span style={{ fontWeight: 700, color: "#8a6700" }}>⚠ {bajoStock.length} material{bajoStock.length > 1 ? "es" : ""} con stock bajo: </span>
          <span style={{ color: "#8a6700" }}>{bajoStock.map(i => i.nombre).join(", ")}</span>
        </div>
      )}

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Total productos", value: items.length, color: COLORS.accent },
          { label: "Stock bajo", value: bajoStock.filter(i => i.cantidad > 0).length, color: COLORS.warning },
          { label: "Sin stock", value: items.filter(i => i.cantidad === 0).length, color: COLORS.danger },
        ].map(k => (
          <div key={k.label} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          placeholder="Buscar material…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ ...inputStyle, flex: 1, minWidth: 160 }}
        />
        <Btn onClick={abrirNuevo}>+ Agregar</Btn>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {categorias.map(c => (
          <button key={c} onClick={() => setFiltro(c)} style={{
            padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid",
            borderColor: filtro === c ? COLORS.accent : COLORS.border,
            background: filtro === c ? COLORS.accentLight : COLORS.surface,
            color: filtro === c ? COLORS.accentDark : COLORS.textMuted,
            whiteSpace: "nowrap",
          }}>{c}</button>
        ))}
      </div>

      {/* Lista */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtrados.map(item => {
          const estado = estadoItem(item);
          return (
            <div key={item.id} style={{ background: COLORS.surface, border: `1px solid ${item.cantidad <= item.minimo ? estado.color + "55" : COLORS.border}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>{item.nombre}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{item.categoria} · mínimo: {item.minimo} {item.unidad}</div>
              </div>
              <Badge color={estado.color}>{estado.label}</Badge>
              {/* Contador */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => ajustar(item.id, -1)} style={{ width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${COLORS.border}`, background: COLORS.bg, cursor: "pointer", fontSize: 18, color: COLORS.text, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontWeight: 800, fontSize: 18, minWidth: 36, textAlign: "center", color: item.cantidad === 0 ? COLORS.danger : COLORS.text }}>{item.cantidad}</span>
                <span style={{ fontSize: 11, color: COLORS.textMuted }}>{item.unidad}</span>
                <button onClick={() => ajustar(item.id, 1)} style={{ width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${COLORS.border}`, background: COLORS.bg, cursor: "pointer", fontSize: 18, color: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Btn small variant="ghost" onClick={() => abrirEditar(item)}>Editar</Btn>
                <Btn small variant="danger" onClick={() => eliminar(item.id)}>×</Btn>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal nuevo / editar */}
      {modal && (
        <Modal title={modal === "nuevo" ? "Agregar material" : "Editar material"} onClose={() => setModal(null)}>
          <Field label="Nombre del material"><input style={inputStyle} value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Ej: Guantes talle M" /></Field>
          <Field label="Categoría">
            <select style={inputStyle} value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}>
              <option>Descartable</option>
              <option>Anestesia</option>
              <option>Operatoria</option>
              <option>Endodoncia</option>
              <option>Cirugía / Implantes</option>
              <option>Ortodoncia Damon</option>
              <option>Prótesis</option>
              <option>Odontopediatría</option>
              <option>Láser</option>
            </select>
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Cantidad actual"><input style={inputStyle} type="number" value={form.cantidad} onChange={e => setForm(f => ({ ...f, cantidad: e.target.value }))} /></Field>
            <Field label="Mínimo alerta"><input style={inputStyle} type="number" value={form.minimo} onChange={e => setForm(f => ({ ...f, minimo: e.target.value }))} /></Field>
          </div>
          <Field label="Unidad"><input style={inputStyle} value={form.unidad} onChange={e => setForm(f => ({ ...f, unidad: e.target.value }))} placeholder="Ej: cajas, unidades, frascos…" /></Field>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn onClick={guardar} disabled={!form.nombre || form.cantidad === ""}>Guardar</Btn>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ODONTOGRAMA
// ══════════════════════════════════════════════════════════════════════════════
const DIENTES_SUP = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const DIENTES_INF = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
const ESTADOS_DIENTE = ["Sano","Caries","Obturado","Corona","Ausente","Implante","Endodoncia","Fractura"];
const COLORES_ESTADO = {
  "Sano": COLORS.success, "Caries": COLORS.danger, "Obturado": "#4A90D9",
  "Corona": "#9B59B6", "Ausente": COLORS.textMuted, "Implante": COLORS.accent,
  "Endodoncia": COLORS.warning, "Fractura": "#E67E22"
};

function Odontograma({ estados, onChange }) {
  const [selected, setSelected] = useState(null);

  const handleDiente = (num) => setSelected(num === selected ? null : num);
  const handleEstado = (estado) => {
    if (selected) { onChange({ ...estados, [selected]: estado }); setSelected(null); }
  };

  const Diente = ({ num }) => {
    const estado = estados[num] || "Sano";
    const color = COLORES_ESTADO[estado];
    const isSelected = selected === num;
    return (
      <div onClick={() => handleDiente(num)} style={{
        width: 36, height: 44, borderRadius: 6, border: `2px solid ${isSelected ? COLORS.text : color}`,
        background: estado === "Ausente" ? COLORS.border : color + "33",
        cursor: "pointer", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 1,
        boxShadow: isSelected ? `0 0 0 2px ${COLORS.text}` : "none",
        transition: "all .15s",
      }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: COLORS.textMuted }}>{num}</span>
        <div style={{ width: 16, height: 16, borderRadius: 3, background: color, opacity: estado === "Ausente" ? 0.3 : 1 }} />
      </div>
    );
  };

  return (
    <div>
      {/* Leyenda */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {ESTADOS_DIENTE.map(e => (
          <div key={e} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORES_ESTADO[e] }} />
            <span style={{ color: COLORS.textMuted }}>{e}</span>
          </div>
        ))}
      </div>

      {/* Superior */}
      <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 4, fontWeight: 600 }}>SUPERIOR</div>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 8 }}>
        {DIENTES_SUP.map(n => <Diente key={n} num={n} />)}
      </div>
      {/* Inferior */}
      <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 4, fontWeight: 600 }}>INFERIOR</div>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 12 }}>
        {DIENTES_INF.map(n => <Diente key={n} num={n} />)}
      </div>

      {/* Selector de estado */}
      {selected && (
        <div style={{ background: COLORS.accentLight, borderRadius: 10, padding: 12, marginTop: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accentDark, marginBottom: 8 }}>
            Diente {selected} — seleccioná estado:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {ESTADOS_DIENTE.map(e => (
              <button key={e} onClick={() => handleEstado(e)} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                border: `1.5px solid ${COLORES_ESTADO[e]}`, background: COLORES_ESTADO[e] + "22",
                color: COLORES_ESTADO[e], cursor: "pointer",
              }}>{e}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO FICHAS
// ══════════════════════════════════════════════════════════════════════════════
const FICHA_VACIA = {
  apellido: "", nombre: "", dni: "", fechaNac: "", edad: "",
  domicilio: "", localidad: "", telefono: "", profesion: "", obraSocial: "",
  motivoConsulta: "", tratamiento: "", alergias: "", medicamentos: "",
  antecedentes: "", observaciones: "", odontograma: {},
};

function calcularEdad(fechaNac) {
  if (!fechaNac) return "";
  const hoy = new Date();
  const nac = new Date(fechaNac);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const m = hoy.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
  return edad;
}

function Fichas() {
  const [pacientes, setPacientes] = useLocalStorage("ng_pacientes", []);
  const [vista, setVista] = useState("lista"); // "lista" | "nueva" | "ver"
  const [fichaActual, setFichaActual] = useState(null);
  const [form, setForm] = useState(FICHA_VACIA);
  const [busqueda, setBusqueda] = useState("");
  const [seccion, setSeccion] = useState("datos"); // "datos" | "clinica" | "odontograma"

  const filtrados = pacientes.filter(p =>
    `${p.apellido} ${p.nombre}`.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.dni.includes(busqueda)
  );

  const setF = (campo, val) => setForm(f => ({
    ...f, [campo]: val,
    ...(campo === "fechaNac" ? { edad: calcularEdad(val) } : {})
  }));

  const guardar = () => {
    if (!form.apellido || !form.nombre) return;
    if (fichaActual) {
      setPacientes(prev => prev.map(p => p.id === fichaActual.id ? { ...form, id: fichaActual.id } : p));
    } else {
      setPacientes(prev => [...prev, { ...form, id: uid() }]);
    }
    setVista("lista");
    setFichaActual(null);
    setForm(FICHA_VACIA);
    setSeccion("datos");
  };

  const eliminar = (id) => {
    if (confirm("¿Eliminar esta ficha?")) setPacientes(prev => prev.filter(p => p.id !== id));
  };

  const abrirNueva = () => { setForm(FICHA_VACIA); setFichaActual(null); setSeccion("datos"); setVista("nueva"); };
  const abrirEditar = (p) => { setForm(p); setFichaActual(p); setSeccion("datos"); setVista("nueva"); };
  const abrirVer = (p) => { setFichaActual(p); setVista("ver"); };

  const secciones = [
    { id: "datos", label: "👤 Datos personales" },
    { id: "clinica", label: "🩺 Clínica" },
    { id: "odontograma", label: "🦷 Odontograma" },
  ];

  if (vista === "nueva") return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Btn variant="secondary" small onClick={() => setVista("lista")}>← Volver</Btn>
        <h2 style={{ margin: 0, fontSize: 17 }}>{fichaActual ? "Editar ficha" : "Nueva ficha"}</h2>
      </div>

      {/* Tabs secciones */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
        {secciones.map(s => (
          <button key={s.id} onClick={() => setSeccion(s.id)} style={{
            padding: "8px 16px", border: "none", background: "none", cursor: "pointer",
            fontSize: 13, fontWeight: 700,
            color: seccion === s.id ? COLORS.accent : COLORS.textMuted,
            borderBottom: seccion === s.id ? `2.5px solid ${COLORS.accent}` : "2.5px solid transparent",
          }}>{s.label}</button>
        ))}
      </div>

      {seccion === "datos" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Apellido"><input style={inputStyle} value={form.apellido} onChange={e => setF("apellido", e.target.value)} /></Field>
          <Field label="Nombre"><input style={inputStyle} value={form.nombre} onChange={e => setF("nombre", e.target.value)} /></Field>
          <Field label="DNI"><input style={inputStyle} value={form.dni} onChange={e => setF("dni", e.target.value)} /></Field>
          <Field label="Fecha de nacimiento"><input style={inputStyle} type="date" value={form.fechaNac} onChange={e => setF("fechaNac", e.target.value)} /></Field>
          <Field label="Edad"><input style={inputStyle} value={form.edad} readOnly placeholder="Se calcula sola" /></Field>
          <Field label="Teléfono"><input style={inputStyle} value={form.telefono} onChange={e => setF("telefono", e.target.value)} /></Field>
          <Field label="Domicilio"><input style={inputStyle} value={form.domicilio} onChange={e => setF("domicilio", e.target.value)} /></Field>
          <Field label="Localidad"><input style={inputStyle} value={form.localidad} onChange={e => setF("localidad", e.target.value)} /></Field>
          <Field label="Profesión"><input style={inputStyle} value={form.profesion} onChange={e => setF("profesion", e.target.value)} /></Field>
          <Field label="Obra social"><input style={inputStyle} value={form.obraSocial} onChange={e => setF("obraSocial", e.target.value)} /></Field>
        </div>
      )}

      {seccion === "clinica" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field label="Motivo de consulta"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.motivoConsulta} onChange={e => setF("motivoConsulta", e.target.value)} /></Field>
          <Field label="Tratamiento"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.tratamiento} onChange={e => setF("tratamiento", e.target.value)} /></Field>
          <Field label="Alergias"><input style={inputStyle} value={form.alergias} onChange={e => setF("alergias", e.target.value)} placeholder="Ej: Penicilina, látex…" /></Field>
          <Field label="Medicamentos actuales"><input style={inputStyle} value={form.medicamentos} onChange={e => setF("medicamentos", e.target.value)} /></Field>
          <Field label="Antecedentes médicos"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.antecedentes} onChange={e => setF("antecedentes", e.target.value)} /></Field>
          <Field label="Observaciones"><textarea style={{ ...inputStyle, minHeight: 70, resize: "vertical" }} value={form.observaciones} onChange={e => setF("observaciones", e.target.value)} /></Field>
        </div>
      )}

      {seccion === "odontograma" && (
        <Odontograma estados={form.odontograma} onChange={od => setForm(f => ({ ...f, odontograma: od }))} />
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <Btn onClick={guardar} disabled={!form.apellido || !form.nombre}>Guardar ficha</Btn>
        <Btn variant="secondary" onClick={() => setVista("lista")}>Cancelar</Btn>
      </div>
    </div>
  );

  if (vista === "ver" && fichaActual) return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Btn variant="secondary" small onClick={() => setVista("lista")}>← Volver</Btn>
        <Btn small onClick={() => abrirEditar(fichaActual)}>Editar</Btn>
      </div>
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{fichaActual.apellido}, {fichaActual.nombre}</div>
        <div style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 20 }}>DNI {fichaActual.dni} · {fichaActual.edad} años · {fichaActual.obraSocial}</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            ["Teléfono", fichaActual.telefono], ["Profesión", fichaActual.profesion],
            ["Domicilio", fichaActual.domicilio], ["Localidad", fichaActual.localidad],
            ["Fecha nac.", fichaActual.fechaNac], ["Obra social", fichaActual.obraSocial],
          ].map(([k, v]) => v ? (
            <div key={k}>
              <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>{k}</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div>
            </div>
          ) : null)}
        </div>

        {fichaActual.alergias && <div style={{ background: COLORS.dangerLight, borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 13 }}><span style={{ fontWeight: 700, color: COLORS.danger }}>⚠ Alergias: </span>{fichaActual.alergias}</div>}

        {[["Motivo de consulta", fichaActual.motivoConsulta], ["Tratamiento", fichaActual.tratamiento], ["Medicamentos", fichaActual.medicamentos], ["Antecedentes", fichaActual.antecedentes], ["Observaciones", fichaActual.observaciones]].map(([k, v]) => v ? (
          <div key={k} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{k}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>{v}</div>
          </div>
        ) : null)}

        {Object.keys(fichaActual.odontograma).length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Odontograma</div>
            <Odontograma estados={fichaActual.odontograma} onChange={() => {}} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input placeholder="Buscar por nombre o DNI…" value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: 180 }} />
        <Btn onClick={abrirNueva}>+ Nueva ficha</Btn>
      </div>

      {pacientes.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: COLORS.textMuted }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <div style={{ fontWeight: 600 }}>No hay fichas todavía</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Hacé click en "+ Nueva ficha" para empezar</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtrados.map(p => (
          <div key={p.id} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{p.apellido}, {p.nombre}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
                {p.edad ? `${p.edad} años` : ""}{p.obraSocial ? ` · ${p.obraSocial}` : ""}{p.telefono ? ` · ${p.telefono}` : ""}
              </div>
              {p.alergias && <span style={{ fontSize: 11, color: COLORS.danger, fontWeight: 700 }}>⚠ {p.alergias}</span>}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <Btn small variant="ghost" onClick={() => abrirVer(p)}>Ver ficha</Btn>
              <Btn small variant="secondary" onClick={() => abrirEditar(p)}>Editar</Btn>
              <Btn small variant="danger" onClick={() => eliminar(p.id)}>×</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("fichas");

  const tabs = [
    { id: "fichas", label: "📋 Fichas" },
    { id: "deudores", label: "💰 Cobranzas" },
    { id: "stock", label: "📦 Stock" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Inter', system-ui, sans-serif", color: COLORS.text }}>
      {/* Header */}
      <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ padding: "18px 0 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🦷</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: COLORS.text }}>Consultorio Od. Natalia Gregorio</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>Sistema de gestión odontológica</div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div style={{ display: "flex", gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "10px 20px", border: "none", background: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 700, color: tab === t.id ? COLORS.accent : COLORS.textMuted,
                borderBottom: tab === t.id ? `2.5px solid ${COLORS.accent}` : "2.5px solid transparent",
                transition: "all .15s",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>
        {tab === "fichas" ? <Fichas /> : tab === "deudores" ? <Deudores /> : <Stock />}
      </div>
    </div>
  );
}