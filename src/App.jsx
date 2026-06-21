import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

// ── FIREBASE ──────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCUkC23z9JLJACxcSyp_vo5FvfTUzsD5Ag",
  authDomain: "consultorio-odnatalia-gregorio.firebaseapp.com",
  projectId: "consultorio-odnatalia-gregorio",
  storageBucket: "consultorio-odnatalia-gregorio.firebasestorage.app",
  messagingSenderId: "722046164883",
  appId: "1:722046164883:web:c9cf2e950ae965354d9266"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

function useFirestore(colName, seedData) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const ref = collection(db, colName);
    const unsub = onSnapshot(ref, (snap) => {
      const docs = snap.docs.map(d => ({ ...d.data(), id: d.id }));
      if (docs.length === 0 && seedData && seedData.length > 0) {
        seedData.forEach(item => setDoc(doc(db, colName, item.id), item));
      } else {
        setData(docs);
      }
      setLoading(false);
    });
    return unsub;
  }, [colName]);
  const save = (item) => setDoc(doc(db, colName, item.id), item);
  const remove = (id) => deleteDoc(doc(db, colName, id));
  return { data, loading, save, remove };
}

// ── PALETTE ───────────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#F7FAFA", surface: "#FFFFFF", border: "#DDE8E8",
  accent: "#2A9D8F", accentLight: "#E8F5F3", accentDark: "#1F7A6E",
  danger: "#E76F51", dangerLight: "#FDF0EC",
  warning: "#E9C46A", warningLight: "#FDF8EC",
  text: "#1A2E2C", textMuted: "#6B8C8A",
  success: "#57CC99", successLight: "#EDF9F3",
};

const formatARS = (n) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n || 0);
const today = () => new Date().toISOString().slice(0, 10);
const uid = () => Math.random().toString(36).slice(2, 9);

// ── INITIAL DATA ──────────────────────────────────────────────────────────────
const INITIAL_DEBTORS = [
  { id: uid(), nombre: "García, Laura", tratamiento: "Ortodoncia", total: 180000, pagos: [{ fecha: "2026-05-10", monto: 60000 }] },
  { id: uid(), nombre: "Rodríguez, Marcos", tratamiento: "Implante", total: 350000, pagos: [{ fecha: "2026-06-01", monto: 100000 }] },
  { id: uid(), nombre: "López, Ana", tratamiento: "Blanqueamiento", total: 45000, pagos: [] },
];

const INITIAL_STOCK = [
  { id: uid(), nombre: "Guantes nitrilo talle XS", categoria: "Descartable", cantidad: 2, minimo: 2, unidad: "cajas" },
  { id: uid(), nombre: "Guantes nitrilo talle S", categoria: "Descartable", cantidad: 2, minimo: 2, unidad: "cajas" },
  { id: uid(), nombre: "Guantes nitrilo talle M", categoria: "Descartable", cantidad: 3, minimo: 2, unidad: "cajas" },
  { id: uid(), nombre: "Barbijos quirúrgicos", categoria: "Descartable", cantidad: 4, minimo: 3, unidad: "cajas" },
  { id: uid(), nombre: "Baberos descartables", categoria: "Descartable", cantidad: 3, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Vasos descartables", categoria: "Descartable", cantidad: 5, minimo: 3, unidad: "bolsas x100" },
  { id: uid(), nombre: "Eyectores de saliva", categoria: "Descartable", cantidad: 4, minimo: 3, unidad: "paquetes" },
  { id: uid(), nombre: "Rollos de algodón", categoria: "Descartable", cantidad: 3, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Gasas estériles", categoria: "Descartable", cantidad: 5, minimo: 3, unidad: "paquetes" },
  { id: uid(), nombre: "Bolsas para esterilización", categoria: "Descartable", cantidad: 4, minimo: 2, unidad: "rollos" },
  { id: uid(), nombre: "Papel film / cobertura", categoria: "Descartable", cantidad: 2, minimo: 2, unidad: "rollos" },
  { id: uid(), nombre: "Alcohol en gel 500ml", categoria: "Descartable", cantidad: 3, minimo: 2, unidad: "frascos" },
  { id: uid(), nombre: "Lidocaína 2% con epinefrina", categoria: "Anestesia", cantidad: 20, minimo: 15, unidad: "carpules" },
  { id: uid(), nombre: "Lidocaína 2% sin epinefrina", categoria: "Anestesia", cantidad: 10, minimo: 8, unidad: "carpules" },
  { id: uid(), nombre: "Articaína 4% con epinefrina", categoria: "Anestesia", cantidad: 15, minimo: 10, unidad: "carpules" },
  { id: uid(), nombre: "Agujas carpule 27G cortas", categoria: "Anestesia", cantidad: 30, minimo: 20, unidad: "unidades" },
  { id: uid(), nombre: "Agujas carpule 30G largas", categoria: "Anestesia", cantidad: 20, minimo: 15, unidad: "unidades" },
  { id: uid(), nombre: "Anestesia tópica gel", categoria: "Anestesia", cantidad: 2, minimo: 1, unidad: "frascos" },
  { id: uid(), nombre: "Composite A1", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Composite A2", categoria: "Operatoria", cantidad: 3, minimo: 2, unidad: "jeringas" },
  { id: uid(), nombre: "Composite A3", categoria: "Operatoria", cantidad: 3, minimo: 2, unidad: "jeringas" },
  { id: uid(), nombre: "Composite A3.5", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Adhesivo (sistema grabado total)", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "frascos" },
  { id: uid(), nombre: "Ácido fosfórico 35%", categoria: "Operatoria", cantidad: 3, minimo: 2, unidad: "jeringas" },
  { id: uid(), nombre: "Ionómero vítreo restaurador", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Hidróxido de calcio", categoria: "Operatoria", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Fresas de diamante (surtido)", categoria: "Operatoria", cantidad: 10, minimo: 5, unidad: "unidades" },
  { id: uid(), nombre: "Limas K-file #15 a #40", categoria: "Endodoncia", cantidad: 5, minimo: 3, unidad: "cajas" },
  { id: uid(), nombre: "Limas mecanizadas NiTi", categoria: "Endodoncia", cantidad: 4, minimo: 3, unidad: "kits" },
  { id: uid(), nombre: "Hipoclorito de sodio 5.25%", categoria: "Endodoncia", cantidad: 3, minimo: 2, unidad: "litros" },
  { id: uid(), nombre: "Conos de gutapercha (surtido)", categoria: "Endodoncia", cantidad: 5, minimo: 3, unidad: "cajas" },
  { id: uid(), nombre: "Cemento sellador AH Plus", categoria: "Endodoncia", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Sutura Vicryl 4-0 reabsorbible", categoria: "Cirugía / Implantes", cantidad: 6, minimo: 4, unidad: "unidades" },
  { id: uid(), nombre: "Sutura seda 3-0", categoria: "Cirugía / Implantes", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Hojas de bisturí N°15", categoria: "Cirugía / Implantes", cantidad: 8, minimo: 5, unidad: "unidades" },
  { id: uid(), nombre: "Membrana de colágeno", categoria: "Cirugía / Implantes", cantidad: 3, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Suero fisiológico 500ml", categoria: "Cirugía / Implantes", cantidad: 4, minimo: 3, unidad: "frascos" },
  { id: uid(), nombre: "Brackets Damon Q (surtido)", categoria: "Ortodoncia Damon", cantidad: 5, minimo: 3, unidad: "kits" },
  { id: uid(), nombre: "Tubos molares Damon doble", categoria: "Ortodoncia Damon", cantidad: 4, minimo: 2, unidad: "paquetes" },
  { id: uid(), nombre: "Arco CuNiTi .014 redondo", categoria: "Ortodoncia Damon", cantidad: 8, minimo: 5, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .016 redondo", categoria: "Ortodoncia Damon", cantidad: 8, minimo: 5, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .018 redondo", categoria: "Ortodoncia Damon", cantidad: 6, minimo: 4, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .014x.025 rectangular", categoria: "Ortodoncia Damon", cantidad: 6, minimo: 4, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .016x.025 rectangular", categoria: "Ortodoncia Damon", cantidad: 6, minimo: 4, unidad: "unidades" },
  { id: uid(), nombre: "Arco CuNiTi .018x.025 rectangular", categoria: "Ortodoncia Damon", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Arco acero SS .019x.025 (finalización)", categoria: "Ortodoncia Damon", cantidad: 5, minimo: 3, unidad: "unidades" },
  { id: uid(), nombre: "Elásticos intermaxilares (surtido)", categoria: "Ortodoncia Damon", cantidad: 6, minimo: 4, unidad: "paquetes" },
  { id: uid(), nombre: "Alginato", categoria: "Prótesis", cantidad: 3, minimo: 2, unidad: "kg" },
  { id: uid(), nombre: "Silicona por adición", categoria: "Prótesis", cantidad: 2, minimo: 1, unidad: "kits" },
  { id: uid(), nombre: "Yeso piedra tipo IV", categoria: "Prótesis", cantidad: 3, minimo: 2, unidad: "kg" },
  { id: uid(), nombre: "Cemento provisorio Temp-Bond", categoria: "Prótesis", cantidad: 2, minimo: 1, unidad: "tubos" },
  { id: uid(), nombre: "Coronas de acero inoxidable (surtido)", categoria: "Odontopediatría", cantidad: 10, minimo: 6, unidad: "unidades" },
  { id: uid(), nombre: "Formocresol", categoria: "Odontopediatría", cantidad: 2, minimo: 1, unidad: "frascos" },
  { id: uid(), nombre: "Sellador de fosas y fisuras", categoria: "Odontopediatría", cantidad: 2, minimo: 1, unidad: "jeringas" },
  { id: uid(), nombre: "Flúor barniz", categoria: "Odontopediatría", cantidad: 3, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Gafas protectoras (paciente)", categoria: "Láser", cantidad: 4, minimo: 2, unidad: "unidades" },
  { id: uid(), nombre: "Tips de fibra óptica", categoria: "Láser", cantidad: 5, minimo: 3, unidad: "unidades" },
];

// ── UI HELPERS ────────────────────────────────────────────────────────────────
function Badge({ children, color = COLORS.accent }) {
  return <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, background: color + "22", color, textTransform: "uppercase" }}>{children}</span>;
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0008", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: COLORS.surface, borderRadius: 16, padding: 28, width: "100%", maxWidth: 480, boxShadow: "0 8px 40px #0003" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 17, color: COLORS.text }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: COLORS.textMuted }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = { width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: 14, color: COLORS.text, background: COLORS.bg, boxSizing: "border-box", outline: "none" };

function Btn({ children, onClick, variant = "primary", small, disabled }) {
  const styles = {
    primary: { background: COLORS.accent, color: "#fff", border: "none" },
    secondary: { background: "transparent", color: COLORS.accent, border: `1.5px solid ${COLORS.accent}` },
    danger: { background: COLORS.danger, color: "#fff", border: "none" },
    ghost: { background: COLORS.accentLight, color: COLORS.accentDark, border: "none" },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...styles[variant], borderRadius: 8, padding: small ? "6px 14px" : "9px 18px", fontSize: small ? 12 : 14, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>{children}</button>;
}

function Spinner() {
  return <div style={{ textAlign: "center", padding: 60, color: COLORS.textMuted }}>Cargando...</div>;
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO DEUDORES
// ══════════════════════════════════════════════════════════════════════════════
function Deudores() {
  const { data: debtors, loading, save, remove } = useFirestore("deudores", INITIAL_DEBTORS);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ nombre: "", tratamiento: "", total: "" });
  const [pagoForm, setPagoForm] = useState({ monto: "", fecha: today() });
  const [busqueda, setBusqueda] = useState("");

  if (loading) return <Spinner />;

  const totalDeuda = debtors.reduce((s, d) => s + (d.total - (d.pagos || []).reduce((a, p) => a + p.monto, 0)), 0);
  const totalCobrado = debtors.reduce((s, d) => s + (d.pagos || []).reduce((a, p) => a + p.monto, 0), 0);
  const saldo = (d) => d.total - (d.pagos || []).reduce((a, p) => a + p.monto, 0);

  const filtrados = debtors.filter(d =>
    d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    d.tratamiento.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarPaciente = () => {
    if (!form.nombre || !form.total) return;
    const nuevo = { id: uid(), nombre: form.nombre, tratamiento: form.tratamiento, total: parseFloat(form.total), pagos: [] };
    save(nuevo);
    setForm({ nombre: "", tratamiento: "", total: "" });
    setModal(null);
  };

  const registrarPago = (debtor) => {
    const monto = parseFloat(pagoForm.monto);
    if (!monto || monto <= 0) return;
    const actualizado = { ...debtor, pagos: [...(debtor.pagos || []), { fecha: pagoForm.fecha, monto }] };
    save(actualizado);
    setPagoForm({ monto: "", fecha: today() });
    setModal(null);
  };

  const deudorActivo = modal?.id ? debtors.find(d => d.id === modal.id) : null;

  return (
    <div>
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

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input placeholder="Buscar paciente o tratamiento…" value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: 180 }} />
        <Btn onClick={() => setModal("nuevo")}>+ Nuevo paciente</Btn>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtrados.length === 0 && <div style={{ textAlign: "center", padding: 40, color: COLORS.textMuted }}>No hay pacientes registrados</div>}
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
                  {pagado ? <Badge color={COLORS.success}>Pagado ✓</Badge> : <span style={{ fontSize: 18, fontWeight: 800, color: COLORS.danger }}>{formatARS(s)}</span>}
                  {!pagado && <div style={{ fontSize: 11, color: COLORS.textMuted }}>de {formatARS(d.total)}</div>}
                </div>
              </div>
              {!pagado && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ background: COLORS.border, borderRadius: 99, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, background: COLORS.accent, height: "100%", borderRadius: 99 }} />
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 3 }}>{pct}% cobrado</div>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <Btn small variant="ghost" onClick={() => setModal({ type: "ver", id: d.id })}>Ver historial</Btn>
                {!pagado && <Btn small onClick={() => { setPagoForm({ monto: "", fecha: today() }); setModal({ type: "pago", id: d.id }); }}>Registrar pago</Btn>}
                <Btn small variant="danger" onClick={() => { if (confirm("¿Eliminar?")) remove(d.id); }}>Eliminar</Btn>
              </div>
            </div>
          );
        })}
      </div>

      {modal === "nuevo" && (
        <Modal title="Nuevo paciente" onClose={() => setModal(null)}>
          <Field label="Nombre y apellido"><input style={inputStyle} value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} placeholder="Ej: García, Laura" /></Field>
          <Field label="Tratamiento"><input style={inputStyle} value={form.tratamiento} onChange={e => setForm(f => ({ ...f, tratamiento: e.target.value }))} /></Field>
          <Field label="Monto total ($)"><input style={inputStyle} type="number" value={form.total} onChange={e => setForm(f => ({ ...f, total: e.target.value }))} /></Field>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn onClick={agregarPaciente} disabled={!form.nombre || !form.total}>Guardar</Btn>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
          </div>
        </Modal>
      )}

      {modal?.type === "pago" && deudorActivo && (
        <Modal title={`Registrar pago — ${deudorActivo.nombre}`} onClose={() => setModal(null)}>
          <div style={{ background: COLORS.dangerLight, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: COLORS.danger, fontWeight: 600 }}>Saldo pendiente: {formatARS(saldo(deudorActivo))}</div>
          <Field label="Monto ($)"><input style={inputStyle} type="number" value={pagoForm.monto} onChange={e => setPagoForm(f => ({ ...f, monto: e.target.value }))} /></Field>
          <Field label="Fecha"><input style={inputStyle} type="date" value={pagoForm.fecha} onChange={e => setPagoForm(f => ({ ...f, fecha: e.target.value }))} /></Field>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn onClick={() => registrarPago(deudorActivo)} disabled={!pagoForm.monto}>Confirmar pago</Btn>
            <Btn variant="secondary" onClick={() => setModal(null)}>Cancelar</Btn>
          </div>
        </Modal>
      )}

      {modal?.type === "ver" && deudorActivo && (
        <Modal title={`Historial — ${deudorActivo.nombre}`} onClose={() => setModal(null)}>
          <div style={{ marginBottom: 12 }}><span style={{ fontSize: 13, color: COLORS.textMuted }}>Tratamiento: </span><span style={{ fontWeight: 600 }}>{deudorActivo.tratamiento}</span></div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>Total: </span><span style={{ fontWeight: 600 }}>{formatARS(deudorActivo.total)}</span>
            <span style={{ marginLeft: 12, fontSize: 13, color: COLORS.textMuted }}>Saldo: </span><span style={{ fontWeight: 700, color: saldo(deudorActivo) > 0 ? COLORS.danger : COLORS.success }}>{formatARS(saldo(deudorActivo))}</span>
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, marginBottom: 10, textTransform: "uppercase" }}>Pagos registrados</div>
            {(deudorActivo.pagos || []).length === 0 ? <div style={{ color: COLORS.textMuted, fontSize: 13 }}>Sin pagos aún</div>
              : (deudorActivo.pagos || []).map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 14 }}>
                  <span style={{ color: COLORS.textMuted }}>{p.fecha}</span>
                  <span style={{ fontWeight: 700, color: COLORS.accent }}>{formatARS(p.monto)}</span>
                </div>
              ))}
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
  const { data: items, loading, save, remove } = useFirestore("stock", INITIAL_STOCK);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ nombre: "", categoria: "Descartable", cantidad: "", minimo: "", unidad: "" });
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  if (loading) return <Spinner />;

  const categorias = ["Todos", "Descartable", "Anestesia", "Operatoria", "Endodoncia", "Cirugía / Implantes", "Ortodoncia Damon", "Prótesis", "Odontopediatría", "Láser"];
  const bajoStock = items.filter(i => i.cantidad <= i.minimo);
  const filtrados = items.filter(i => (filtro === "Todos" || i.categoria === filtro) && i.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const guardar = () => {
    if (!form.nombre || form.cantidad === "") return;
    const item = modal === "nuevo"
      ? { id: uid(), ...form, cantidad: parseFloat(form.cantidad), minimo: parseFloat(form.minimo) || 0 }
      : { ...form, id: modal.id, cantidad: parseFloat(form.cantidad), minimo: parseFloat(form.minimo) || 0 };
    save(item);
    setModal(null);
  };

  const ajustar = (item, delta) => save({ ...item, cantidad: Math.max(0, item.cantidad + delta) });

  const estadoItem = (i) => {
    if (i.cantidad === 0) return { label: "Sin stock", color: COLORS.danger };
    if (i.cantidad <= i.minimo) return { label: "Stock bajo", color: COLORS.warning };
    return { label: "OK", color: COLORS.success };
  };

  return (
    <div>
      {bajoStock.length > 0 && (
        <div style={{ background: COLORS.warningLight, border: `1.5px solid ${COLORS.warning}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13 }}>
          <span style={{ fontWeight: 700, color: "#8a6700" }}>⚠ {bajoStock.length} material{bajoStock.length > 1 ? "es" : ""} con stock bajo: </span>
          <span style={{ color: "#8a6700" }}>{bajoStock.map(i => i.nombre).join(", ")}</span>
        </div>
      )}
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
      <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="Buscar material…" value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: 160 }} />
        <Btn onClick={() => { setForm({ nombre: "", categoria: "Descartable", cantidad: "", minimo: "", unidad: "" }); setModal("nuevo"); }}>+ Agregar</Btn>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {categorias.map(c => (
          <button key={c} onClick={() => setFiltro(c)} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: filtro === c ? COLORS.accent : COLORS.border, background: filtro === c ? COLORS.accentLight : COLORS.surface, color: filtro === c ? COLORS.accentDark : COLORS.textMuted, whiteSpace: "nowrap" }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtrados.map(item => {
          const estado = estadoItem(item);
          return (
            <div key={item.id} style={{ background: COLORS.surface, border: `1px solid ${item.cantidad <= item.minimo ? estado.color + "55" : COLORS.border}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>{item.nombre}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{item.categoria} · mín: {item.minimo} {item.unidad}</div>
              </div>
              <Badge color={estado.color}>{estado.label}</Badge>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => ajustar(item, -1)} style={{ width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${COLORS.border}`, background: COLORS.bg, cursor: "pointer", fontSize: 18, color: COLORS.text }}>−</button>
                <span style={{ fontWeight: 800, fontSize: 18, minWidth: 36, textAlign: "center", color: item.cantidad === 0 ? COLORS.danger : COLORS.text }}>{item.cantidad}</span>
                <span style={{ fontSize: 11, color: COLORS.textMuted }}>{item.unidad}</span>
                <button onClick={() => ajustar(item, 1)} style={{ width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${COLORS.border}`, background: COLORS.bg, cursor: "pointer", fontSize: 18, color: COLORS.accent }}>+</button>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Btn small variant="ghost" onClick={() => { setForm({ nombre: item.nombre, categoria: item.categoria, cantidad: item.cantidad.toString(), minimo: item.minimo.toString(), unidad: item.unidad }); setModal({ id: item.id }); }}>Editar</Btn>
                <Btn small variant="danger" onClick={() => { if (confirm("¿Eliminar?")) remove(item.id); }}>×</Btn>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal title={modal === "nuevo" ? "Agregar material" : "Editar material"} onClose={() => setModal(null)}>
          <Field label="Nombre"><input style={inputStyle} value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} /></Field>
          <Field label="Categoría">
            <select style={inputStyle} value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}>
              {["Descartable","Anestesia","Operatoria","Endodoncia","Cirugía / Implantes","Ortodoncia Damon","Prótesis","Odontopediatría","Láser"].map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Field label="Cantidad"><input style={inputStyle} type="number" value={form.cantidad} onChange={e => setForm(f => ({ ...f, cantidad: e.target.value }))} /></Field>
            <Field label="Mínimo"><input style={inputStyle} type="number" value={form.minimo} onChange={e => setForm(f => ({ ...f, minimo: e.target.value }))} /></Field>
          </div>
          <Field label="Unidad"><input style={inputStyle} value={form.unidad} onChange={e => setForm(f => ({ ...f, unidad: e.target.value }))} /></Field>
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
const COLORES_ESTADO = { "Sano": COLORS.success, "Caries": COLORS.danger, "Obturado": "#4A90D9", "Corona": "#9B59B6", "Ausente": COLORS.textMuted, "Implante": COLORS.accent, "Endodoncia": COLORS.warning, "Fractura": "#E67E22" };

function Odontograma({ estados, onChange }) {
  const [selected, setSelected] = useState(null);
  const Diente = ({ num }) => {
    const estado = estados[num] || "Sano";
    const color = COLORES_ESTADO[estado];
    return (
      <div onClick={() => setSelected(num === selected ? null : num)} style={{ width: 34, height: 42, borderRadius: 6, border: `2px solid ${selected === num ? COLORS.text : color}`, background: estado === "Ausente" ? COLORS.border : color + "33", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1 }}>
        <span style={{ fontSize: 9, fontWeight: 700, color: COLORS.textMuted }}>{num}</span>
        <div style={{ width: 14, height: 14, borderRadius: 3, background: color, opacity: estado === "Ausente" ? 0.3 : 1 }} />
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {ESTADOS_DIENTE.map(e => <div key={e} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: COLORES_ESTADO[e] }} /><span style={{ color: COLORS.textMuted }}>{e}</span></div>)}
      </div>
      <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 4, fontWeight: 600 }}>SUPERIOR</div>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 8 }}>{DIENTES_SUP.map(n => <Diente key={n} num={n} />)}</div>
      <div style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 4, fontWeight: 600 }}>INFERIOR</div>
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 12 }}>{DIENTES_INF.map(n => <Diente key={n} num={n} />)}</div>
      {selected && (
        <div style={{ background: COLORS.accentLight, borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accentDark, marginBottom: 8 }}>Diente {selected} — seleccioná estado:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {ESTADOS_DIENTE.map(e => <button key={e} onClick={() => { onChange({ ...estados, [selected]: e }); setSelected(null); }} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: `1.5px solid ${COLORES_ESTADO[e]}`, background: COLORES_ESTADO[e] + "22", color: COLORES_ESTADO[e], cursor: "pointer" }}>{e}</button>)}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO FICHAS
// ══════════════════════════════════════════════════════════════════════════════
const FICHA_VACIA = { apellido: "", nombre: "", dni: "", fechaNac: "", edad: "", domicilio: "", localidad: "", telefono: "", profesion: "", obraSocial: "", motivoConsulta: "", tratamiento: "", alergias: "", medicamentos: "", antecedentes: "", observaciones: "", odontograma: {} };

function calcularEdad(fechaNac) {
  if (!fechaNac) return "";
  const hoy = new Date(), nac = new Date(fechaNac);
  let edad = hoy.getFullYear() - nac.getFullYear();
  if (hoy.getMonth() - nac.getMonth() < 0 || (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate())) edad--;
  return edad;
}

function Fichas() {
  const { data: pacientes, loading, save, remove } = useFirestore("fichas", []);
  const [vista, setVista] = useState("lista");
  const [fichaActual, setFichaActual] = useState(null);
  const [form, setForm] = useState(FICHA_VACIA);
  const [busqueda, setBusqueda] = useState("");
  const [seccion, setSeccion] = useState("datos");

  if (loading) return <Spinner />;

  const filtrados = pacientes.filter(p => `${p.apellido} ${p.nombre}`.toLowerCase().includes(busqueda.toLowerCase()) || (p.dni || "").includes(busqueda));
  const setF = (campo, val) => setForm(f => ({ ...f, [campo]: val, ...(campo === "fechaNac" ? { edad: calcularEdad(val) } : {}) }));

  const guardar = () => {
    if (!form.apellido || !form.nombre) return;
    save({ ...form, id: fichaActual ? fichaActual.id : uid() });
    setVista("lista"); setFichaActual(null); setForm(FICHA_VACIA); setSeccion("datos");
  };

  const secciones = [{ id: "datos", label: "👤 Datos personales" }, { id: "clinica", label: "🩺 Clínica" }, { id: "odontograma", label: "🦷 Odontograma" }];

  if (vista === "nueva") return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Btn variant="secondary" small onClick={() => setVista("lista")}>← Volver</Btn>
        <h2 style={{ margin: 0, fontSize: 17 }}>{fichaActual ? "Editar ficha" : "Nueva ficha"}</h2>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
        {secciones.map(s => <button key={s.id} onClick={() => setSeccion(s.id)} style={{ padding: "8px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: seccion === s.id ? COLORS.accent : COLORS.textMuted, borderBottom: seccion === s.id ? `2.5px solid ${COLORS.accent}` : "2.5px solid transparent" }}>{s.label}</button>)}
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
      {seccion === "odontograma" && <Odontograma estados={form.odontograma} onChange={od => setForm(f => ({ ...f, odontograma: od }))} />}
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
        <Btn small onClick={() => { setForm(fichaActual); setVista("nueva"); }}>Editar</Btn>
      </div>
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{fichaActual.apellido}, {fichaActual.nombre}</div>
        <div style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 20 }}>DNI {fichaActual.dni} · {fichaActual.edad} años · {fichaActual.obraSocial}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[["Teléfono", fichaActual.telefono], ["Profesión", fichaActual.profesion], ["Domicilio", fichaActual.domicilio], ["Localidad", fichaActual.localidad], ["Fecha nac.", fichaActual.fechaNac], ["Obra social", fichaActual.obraSocial]].map(([k, v]) => v ? <div key={k}><div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>{k}</div><div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div></div> : null)}
        </div>
        {fichaActual.alergias && <div style={{ background: COLORS.dangerLight, borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 13 }}><span style={{ fontWeight: 700, color: COLORS.danger }}>⚠ Alergias: </span>{fichaActual.alergias}</div>}
        {[["Motivo de consulta", fichaActual.motivoConsulta], ["Tratamiento", fichaActual.tratamiento], ["Medicamentos", fichaActual.medicamentos], ["Antecedentes", fichaActual.antecedentes], ["Observaciones", fichaActual.observaciones]].map(([k, v]) => v ? <div key={k} style={{ marginBottom: 12 }}><div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{k}</div><div style={{ fontSize: 14, lineHeight: 1.6 }}>{v}</div></div> : null)}
        {Object.keys(fichaActual.odontograma || {}).length > 0 && <div style={{ marginTop: 16 }}><div style={{ fontSize: 11, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Odontograma</div><Odontograma estados={fichaActual.odontograma} onChange={() => {}} /></div>}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input placeholder="Buscar por nombre o DNI…" value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: 180 }} />
        <Btn onClick={() => { setForm(FICHA_VACIA); setFichaActual(null); setSeccion("datos"); setVista("nueva"); }}>+ Nueva ficha</Btn>
      </div>
      {pacientes.length === 0 && <div style={{ textAlign: "center", padding: 60, color: COLORS.textMuted }}><div style={{ fontSize: 40, marginBottom: 12 }}>📋</div><div style={{ fontWeight: 600 }}>No hay fichas todavía</div><div style={{ fontSize: 13, marginTop: 4 }}>Hacé click en "+ Nueva ficha" para empezar</div></div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtrados.map(p => (
          <div key={p.id} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{p.apellido}, {p.nombre}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{p.edad ? `${p.edad} años` : ""}{p.obraSocial ? ` · ${p.obraSocial}` : ""}{p.telefono ? ` · ${p.telefono}` : ""}</div>
              {p.alergias && <span style={{ fontSize: 11, color: COLORS.danger, fontWeight: 700 }}>⚠ {p.alergias}</span>}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <Btn small variant="ghost" onClick={() => { setFichaActual(p); setVista("ver"); }}>Ver ficha</Btn>
              <Btn small variant="secondary" onClick={() => { setForm(p); setFichaActual(p); setSeccion("datos"); setVista("nueva"); }}>Editar</Btn>
              <Btn small variant="danger" onClick={() => { if (confirm("¿Eliminar esta ficha?")) remove(p.id); }}>×</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════════
// MÓDULO PRESUPUESTOS
// ══════════════════════════════════════════════════════════════════════════════
const LISTA_PRECIOS = [
  {tratamiento:"Primera consulta",precio:30000},
  {tratamiento:"Consulta ulterior",precio:20000},
  {tratamiento:"Urgencia / Medicación",precio:55000},
  {tratamiento:"Urgencia pulpitis aguda",precio:80000},
  {tratamiento:"Urgencia absceso",precio:64000},
  {tratamiento:"Restauración estética simple",precio:75000},
  {tratamiento:"Restauración estética compuesta",precio:95000},
  {tratamiento:"Restauración estética compleja",precio:130000},
  {tratamiento:"Reconstrucción de ángulo",precio:140000},
  {tratamiento:"Protección pulpar directa",precio:65000},
  {tratamiento:"Endodoncia 1 conducto",precio:160000},
  {tratamiento:"Endodoncia 2 conductos",precio:210000},
  {tratamiento:"Endodoncia 3 conductos",precio:300000},
  {tratamiento:"Endodoncia 4 conductos",precio:390000},
  {tratamiento:"Endodoncia parcial",precio:90000},
  {tratamiento:"Desobturación / retratamiento",precio:110000},
  {tratamiento:"Extracción simple",precio:65000},
  {tratamiento:"Extracción quirúrgica",precio:100000},
  {tratamiento:"Cirugía retenido mucosa",precio:240000},
  {tratamiento:"Cirugía retenido ósea",precio:330000},
  {tratamiento:"Frenectomía",precio:160000},
  {tratamiento:"Apicectomía",precio:310000},
  {tratamiento:"Germectomía",precio:320000},
  {tratamiento:"Colocación de implante",precio:700000},
  {tratamiento:"Regeneración ósea guiada (ROG)",precio:220000},
  {tratamiento:"Corona porcelana sobre metal",precio:580000},
  {tratamiento:"Corona porcelana sin metal",precio:800000},
  {tratamiento:"Corona acrílico",precio:250000},
  {tratamiento:"Perno preformado simple",precio:120000},
  {tratamiento:"Corona provisoria",precio:110000},
  {tratamiento:"PPR acrílico hasta 5 dientes",precio:400000},
  {tratamiento:"PPR acrílico más de 5 dientes",precio:500000},
  {tratamiento:"PPR Cromo Cobalto",precio:650000},
  {tratamiento:"Prótesis completa acrílico",precio:620000},
  {tratamiento:"Prótesis completa nylon",precio:660000},
  {tratamiento:"Primera consulta ortodoncia",precio:55000},
  {tratamiento:"Diagnóstico ortodoncia (modelos, fotos)",precio:90000},
  {tratamiento:"Ortodoncia completa Damon + CuNiTi",precio:3800000},
  {tratamiento:"Ortopedia dentición mixta / LM Activator",precio:2500000},
  {tratamiento:"Control mensual ortodoncia",precio:75000},
  {tratamiento:"Reposición de bracket",precio:20000},
  {tratamiento:"Reposición levante de mordida",precio:30000},
  {tratamiento:"Contención fija o removible",precio:250000},
  {tratamiento:"Reparación aparatología removible",precio:130000},
  {tratamiento:"Consulta pediátrica",precio:28000},
  {tratamiento:"Restauración en niños",precio:65000},
  {tratamiento:"Corona de acero inoxidable",precio:140000},
  {tratamiento:"Endodoncia parcial niños",precio:90000},
  {tratamiento:"Mantenedor de espacio fijo",precio:140000},
  {tratamiento:"Mantenedor de espacio removible",precio:160000},
  {tratamiento:"Sellado de fosas y fisuras",precio:50000},
  {tratamiento:"Topicación de flúor",precio:40000},
  {tratamiento:"Tartrectomía ambas arcadas",precio:65000},
  {tratamiento:"Tratamiento subgingival por sector",precio:85000},
  {tratamiento:"Cirugía periodontal por sector",precio:115000},
  {tratamiento:"Historia clínica periodontal",precio:55000},
  {tratamiento:"Blanqueamiento clínico por sesión",precio:420000},
  {tratamiento:"Blanqueamiento ambulatorio",precio:430000},
  {tratamiento:"Radiografía periapical",precio:28000},
  {tratamiento:"Radiografía seriada (5-7 placas)",precio:50000},
  {tratamiento:"Tratamiento láser por sesión",precio:80000},
  {tratamiento:"Otro",precio:0},
];
const FORMAS_PAGO = ["Efectivo","Transferencia","Tarjeta de débito","Tarjeta de crédito"];

function Presupuestos() {
  const { data: presupuestos, loading, save, remove } = useFirestore("presupuestos", []);
  const { data: pacientes } = useFirestore("fichas", []);
  const [vista, setVista] = useState("lista");
  const [presActual, setPresActual] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const FORM_INIT = { pacienteId:"", pacienteNombre:"", fecha:today(), items:[{id:uid(),tratamiento:"",precio:""}], descuentoPct:"", formaPago:"Efectivo", cuotas:"1", notas:"", firmado:false, firmaNombre:"" };
  const [form, setForm] = useState(FORM_INIT);

  if (loading) return <Spinner />;

  const totalBruto = (items) => items.reduce((s,i) => s + (parseFloat(i.precio)||0), 0);
  const totalFinal = (p) => { const b = totalBruto(p.items); return b - (b*(parseFloat(p.descuentoPct)||0)/100); };

  const addItem = () => setForm(f => ({...f, items:[...f.items,{id:uid(),tratamiento:"",precio:""}]}));
  const removeItem = (id) => setForm(f => ({...f, items:f.items.filter(i=>i.id!==id)}));
  const updateItem = (id,campo,val) => setForm(f => ({...f, items:f.items.map(i=>i.id!==id?i:{...i,[campo]:val})}));

  const guardar = () => {
    if (!form.pacienteNombre) return;
    save({...form, id: presActual ? presActual.id : uid(), total: totalFinal(form)});
    setVista("lista"); setPresActual(null); setForm(FORM_INIT);
  };

  const filtrados = presupuestos.filter(p =>
    p.pacienteNombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const imprimir = (p) => {
    const win = window.open("","_blank");
    const total = totalFinal(p);
    const cuotaMonto = parseInt(p.cuotas) > 1 ? total/parseInt(p.cuotas) : null;
    win.document.write(`<html><head><title>Presupuesto</title>
    <style>
      body{font-family:Arial,sans-serif;max-width:680px;margin:40px auto;color:#1A2E2C}
      h1{color:#2A9D8F;font-size:20px;margin-bottom:2px}
      .sub{color:#6B8C8A;font-size:12px;margin-bottom:20px}
      table{width:100%;border-collapse:collapse;margin:16px 0}
      th{background:#E8F5F3;padding:9px;text-align:left;font-size:12px}
      td{padding:9px;border-bottom:1px solid #DDE8E8;font-size:13px}
      .total{font-size:17px;font-weight:bold;color:#2A9D8F;text-align:right;margin:8px 0}
      .firma-line{border-top:1px solid #333;width:220px;margin-top:50px;font-size:11px;color:#6B8C8A;padding-top:4px}
      @media print{button{display:none}}
    </style></head><body>
    <h1>🦷 Consultorio Od. Natalia Gregorio</h1>
    <div class="sub">Presupuesto · ${p.fecha}</div>
    <div style="margin-bottom:12px"><strong>Paciente:</strong> ${p.pacienteNombre}</div>
    <table>
      <tr><th>Tratamiento</th><th style="text-align:right">Precio</th></tr>
      ${p.items.map(i=>`<tr><td>${i.tratamientoCustom||i.tratamiento}</td><td style="text-align:right">${new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(parseFloat(i.precio)||0)}</td></tr>`).join("")}
    </table>
    ${p.descuentoPct?`<div style="text-align:right;color:#E76F51;font-size:13px">Descuento pago contado ${p.descuentoPct}%: -${new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(totalBruto(p.items)*parseFloat(p.descuentoPct)/100)}</div>`:""}
    <div class="total">TOTAL: ${new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(total)}</div>
    ${cuotaMonto?`<div style="text-align:right;font-size:12px;color:#6B8C8A">${p.cuotas} cuotas de ${new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(cuotaMonto)}</div>`:""}
    <div style="margin-top:10px;font-size:13px"><strong>Forma de pago:</strong> ${p.formaPago}</div>
    ${p.notas?`<div style="margin-top:10px;font-size:12px;color:#6B8C8A"><strong>Notas:</strong> ${p.notas}</div>`:""}
    <div style="margin-top:50px;border-top:1px solid #ccc;padding-top:16px">
      <p style="font-size:12px">El/la paciente declara haber recibido y comprendido el presente presupuesto.</p>
      <div style="display:flex;gap:40px;margin-top:16px">
        <div class="firma-line">Firma del paciente</div>
        <div class="firma-line">Aclaración</div>
        <div class="firma-line">DNI</div>
      </div>
    </div>
    <button onclick="window.print()" style="margin-top:20px;padding:10px 20px;background:#2A9D8F;color:white;border:none;border-radius:8px;cursor:pointer">🖨️ Imprimir / Guardar PDF</button>
    </body></html>`);
    win.document.close();
  };

  if (vista === "nuevo") return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <Btn variant="secondary" small onClick={()=>setVista("lista")}>← Volver</Btn>
        <h2 style={{margin:0,fontSize:17}}>{presActual?"Editar presupuesto":"Nuevo presupuesto"}</h2>
      </div>

      <div style={{background:COLORS.surface,border:`1px solid ${COLORS.border}`,borderRadius:12,padding:20,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:COLORS.accentDark}}>Datos del paciente</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <Field label="Buscar en fichas">
            <select style={inputStyle} value={form.pacienteId} onChange={e=>{
              const p=pacientes.find(p=>p.id===e.target.value);
              setForm(f=>({...f,pacienteId:e.target.value,pacienteNombre:p?`${p.apellido}, ${p.nombre}`:""}));
            }}>
              <option value="">— Seleccionar —</option>
              {pacientes.map(p=><option key={p.id} value={p.id}>{p.apellido}, {p.nombre}</option>)}
            </select>
          </Field>
          <Field label="Nombre del paciente"><input style={inputStyle} value={form.pacienteNombre} onChange={e=>setForm(f=>({...f,pacienteNombre:e.target.value}))} placeholder="O escribí directamente" /></Field>
          <Field label="Fecha"><input style={inputStyle} type="date" value={form.fecha} onChange={e=>setForm(f=>({...f,fecha:e.target.value}))} /></Field>
        </div>
      </div>

      <div style={{background:COLORS.surface,border:`1px solid ${COLORS.border}`,borderRadius:12,padding:20,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:COLORS.accentDark}}>Tratamientos</div>
        {form.items.map((item,idx)=>(
          <div key={item.id} style={{display:"grid",gridTemplateColumns:"1fr 140px 30px",gap:8,marginBottom:8,alignItems:"end"}}>
            <Field label={idx===0?"Tratamiento":""}>
              <select style={inputStyle} value={item.tratamiento} onChange={e=>{
                const sel = LISTA_PRECIOS.find(p=>p.tratamiento===e.target.value);
                updateItem(item.id,"tratamiento",e.target.value);
                if(sel && sel.precio > 0) updateItem(item.id,"precio",sel.precio);
              }}>
                <option value="">— Seleccionar —</option>
                {LISTA_PRECIOS.map(p=><option key={p.tratamiento}>{p.tratamiento}</option>)}
              </select>
              {item.tratamiento==="Otro"&&<input style={{...inputStyle,marginTop:6}} placeholder="Describí el tratamiento" value={item.tratamientoCustom||""} onChange={e=>updateItem(item.id,"tratamientoCustom",e.target.value)} />}
            </Field>
            <Field label={idx===0?"Precio $":""}>
              <input style={inputStyle} type="number" placeholder="0" value={item.precio} onChange={e=>updateItem(item.id,"precio",e.target.value)} />
            </Field>
            <div style={{paddingBottom:14}}>
              {form.items.length>1&&<button onClick={()=>removeItem(item.id)} style={{background:"none",border:"none",color:COLORS.danger,cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>}
            </div>
          </div>
        ))}
        <Btn small variant="ghost" onClick={addItem}>+ Agregar tratamiento</Btn>

        <div style={{borderTop:`1px solid ${COLORS.border}`,marginTop:16,paddingTop:12}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
            <Field label="Descuento contado (%)"><input style={inputStyle} type="number" value={form.descuentoPct} onChange={e=>setForm(f=>({...f,descuentoPct:e.target.value}))} placeholder="Ej: 10" /></Field>
            <Field label="Forma de pago">
              <select style={inputStyle} value={form.formaPago} onChange={e=>setForm(f=>({...f,formaPago:e.target.value}))}>
                {FORMAS_PAGO.map(fp=><option key={fp}>{fp}</option>)}
              </select>
            </Field>
            <Field label="Cuotas"><input style={inputStyle} type="number" min="1" value={form.cuotas} onChange={e=>setForm(f=>({...f,cuotas:e.target.value}))} /></Field>
          </div>
          <div style={{background:COLORS.accentLight,borderRadius:10,padding:"12px 16px",marginTop:8}}>
            <div style={{fontSize:13,color:COLORS.textMuted}}>Subtotal: {formatARS(totalBruto(form.items))}</div>
            {form.descuentoPct&&<div style={{fontSize:13,color:COLORS.danger}}>Descuento {form.descuentoPct}%: -{formatARS(totalBruto(form.items)*parseFloat(form.descuentoPct)/100)}</div>}
            <div style={{fontSize:20,fontWeight:800,color:COLORS.accentDark,marginTop:4}}>TOTAL: {formatARS(totalFinal(form))}</div>
            {parseInt(form.cuotas)>1&&<div style={{fontSize:13,color:COLORS.textMuted}}>{form.cuotas} cuotas de {formatARS(totalFinal(form)/parseInt(form.cuotas))}</div>}
          </div>
        </div>
      </div>

      <div style={{background:COLORS.surface,border:`1px solid ${COLORS.border}`,borderRadius:12,padding:20,marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:14,marginBottom:12,color:COLORS.accentDark}}>Notas y firma</div>
        <Field label="Notas"><textarea style={{...inputStyle,minHeight:60,resize:"vertical"}} value={form.notas} onChange={e=>setForm(f=>({...f,notas:e.target.value}))} placeholder="Ej: Presupuesto válido por 30 días…" /></Field>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
          <input type="checkbox" id="firmado" checked={form.firmado} onChange={e=>setForm(f=>({...f,firmado:e.target.checked}))} style={{width:16,height:16}} />
          <label htmlFor="firmado" style={{fontSize:14,fontWeight:600}}>Paciente firmó el presupuesto</label>
        </div>
        {form.firmado&&<div style={{marginTop:10}}><Field label="Nombre del firmante"><input style={inputStyle} value={form.firmaNombre} onChange={e=>setForm(f=>({...f,firmaNombre:e.target.value}))} /></Field></div>}
      </div>

      <div style={{display:"flex",gap:10}}>
        <Btn onClick={guardar} disabled={!form.pacienteNombre}>Guardar presupuesto</Btn>
        <Btn variant="secondary" onClick={()=>setVista("lista")}>Cancelar</Btn>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <input placeholder="Buscar por paciente…" value={busqueda} onChange={e=>setBusqueda(e.target.value)} style={{...inputStyle,flex:1,minWidth:180}} />
        <Btn onClick={()=>{setPresActual(null);setForm(FORM_INIT);setVista("nuevo")}}>+ Nuevo presupuesto</Btn>
      </div>
      {presupuestos.length===0&&<div style={{textAlign:"center",padding:60,color:COLORS.textMuted}}><div style={{fontSize:40,marginBottom:12}}>📄</div><div style={{fontWeight:600}}>No hay presupuestos todavía</div></div>}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtrados.map(p=>(
          <div key={p.id} style={{background:COLORS.surface,border:`1px solid ${COLORS.border}`,borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontWeight:700,fontSize:15}}>{p.pacienteNombre}</div>
              <div style={{fontSize:12,color:COLORS.textMuted,marginTop:2}}>{p.fecha} · {p.items.length} tratamiento{p.items.length>1?"s":""} · {p.formaPago}</div>
              <div style={{fontSize:16,fontWeight:800,color:COLORS.accent,marginTop:4}}>{formatARS(p.total)}</div>
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              {p.firmado&&<Badge color={COLORS.success}>✓ Firmado</Badge>}
              <Btn small variant="ghost" onClick={()=>imprimir(p)}>🖨️ Imprimir</Btn>
              <Btn small variant="secondary" onClick={()=>{setForm(p);setPresActual(p);setVista("nuevo")}}>Editar</Btn>
              <Btn small variant="danger" onClick={()=>{if(confirm("¿Eliminar?"))remove(p.id)}}>×</Btn>
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
    {id:"fichas",label:"📋 Fichas"},
    {id:"presupuestos",label:"📄 Presupuestos"},
    {id:"deudores",label:"💰 Cobranzas"},
    {id:"stock",label:"📦 Stock"},
  ];
  return (
    <div style={{minHeight:"100vh",background:COLORS.bg,fontFamily:"'Inter',system-ui,sans-serif",color:COLORS.text}}>
      <div style={{background:COLORS.surface,borderBottom:`1px solid ${COLORS.border}`,padding:"0 24px"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{padding:"18px 0 12px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:COLORS.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🦷</div>
              <div>
                <div style={{fontWeight:800,fontSize:17,color:COLORS.text}}>Consultorio Od. Natalia Gregorio</div>
                <div style={{fontSize:11,color:COLORS.textMuted}}>Sistema de gestión odontológica</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",gap:4}}>
            {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"10px 16px",border:"none",background:"none",cursor:"pointer",fontSize:13,fontWeight:700,color:tab===t.id?COLORS.accent:COLORS.textMuted,borderBottom:tab===t.id?`2.5px solid ${COLORS.accent}`:"2.5px solid transparent"}}>{t.label}</button>)}
          </div>
        </div>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
        {tab==="fichas"?<Fichas/>:tab==="presupuestos"?<Presupuestos/>:tab==="deudores"?<Deudores/>:<Stock/>}
      </div>
    </div>
  );
}