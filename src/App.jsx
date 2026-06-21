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
  const [debtors, setDebtors] = useState(INITIAL_DEBTORS);
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
  const [items, setItems] = useState(INITIAL_STOCK);
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
// APP PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("deudores");

  const tabs = [
    { id: "deudores", label: "💰 Cobranzas" },
    { id: "stock", label: "📦 Stock" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'Inter', system-ui, sans-serif", color: COLORS.text }}>
      {/* Header */}
      <div style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ padding: "18px 0 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🦷</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: COLORS.text }}>Mi Consultorio</div>
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
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {tab === "deudores" ? <Deudores /> : <Stock />}
      </div>
    </div>
  );
}