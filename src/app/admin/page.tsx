"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.vazlina.shop";

/* TYPES */
interface OrderItem { product_name: string; quantity: number; price_per_item: number; }
interface Order {
  id: number; created_at: string; customer_name: string; customer_phone: string;
  customer_state: string; customer_city: string; customer_address: string;
  total_price: number; status: string; is_upsell_accepted: boolean; items: OrderItem[];
}
interface Metrics {
  total_orders: number; total_revenue: number; avg_order_value: number;
  conversion_rate: number; upsell_rate: number; upsell_revenue: number;
  confirmed_revenue: number; page_views: number;
  status_counts: Record<string, number>;
  daily_trend: { date: string; revenue: number }[];
  top_products: { name: string; count: number; revenue: number }[];
  top_states: { state: string; orders: number }[];
}

const STATUSES = [
  { value: "pending_confirmation", label: "Pending", color: "bg-amber-100 text-amber-800", bar: "#F59E0B" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800", bar: "#3B82F6" },
  { value: "shipped", label: "Shipped", color: "bg-purple-100 text-purple-800", bar: "#A855F7" },
  { value: "delivered", label: "Delivered", color: "bg-emerald-100 text-emerald-800", bar: "#10B981" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", bar: "#EF4444" },
];

function fmtMoney(n: number) { return `$${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`; }
function statusBadge(status: string) {
  const s = STATUSES.find((x) => x.value === status);
  return <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${s?.color ?? "bg-gray-100 text-gray-700"}`}>{s?.label ?? status}</span>;
}
function toInputDate(d: Date) { return d.toISOString().slice(0, 10); }

function KpiCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const bg = { emerald: "bg-emerald-50 text-emerald-600", blue: "bg-blue-50 text-blue-600", indigo: "bg-indigo-50 text-indigo-600", amber: "bg-amber-50 text-amber-600", orange: "bg-orange-50 text-orange-600", green: "bg-green-50 text-green-600" }[color] || "bg-gray-50 text-gray-600";
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [token, setToken] = useState<string>("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const today = new Date();
  const thirtyAgo = new Date(); thirtyAgo.setDate(today.getDate() - 29);
  const [fromDate, setFromDate] = useState(toInputDate(thirtyAgo));
  const [toDate, setToDate] = useState(toInputDate(today));

  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingMetrics, setLoadingMetrics] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [previewOrder, setPreviewOrder] = useState<Order | null>(null);
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "orders">("overview");

  useEffect(() => { const saved = localStorage.getItem("vzl_admin_token") ?? ""; if (saved) setToken(saved); }, []);
  useEffect(() => { if (!token) return; fetchMetrics(); fetchOrders(); }, [token, fromDate, toDate]);

  async function api(path: string, opts?: RequestInit) {
    const res = await fetch(`${API_URL}${path}`, { ...opts, headers: { "Content-Type": "application/json", "x-admin-key": token, ...opts?.headers } });
    if (res.status === 403) { setToken(""); localStorage.removeItem("vzl_admin_token"); throw new Error("Session expired. Please login again."); }
    if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
    return res.json();
  }

  async function fetchMetrics() { setLoadingMetrics(true); setError(""); try { const d = await api(`/admin/metrics?from=${fromDate}&to=${toDate}`); setMetrics(d); } catch (e: unknown) { setError((e as Error).message); } finally { setLoadingMetrics(false); } }
  async function fetchOrders() { setLoadingOrders(true); try { const p = new URLSearchParams(); p.set("from", fromDate); p.set("to", toDate); if (filterStatus) p.set("status", filterStatus); if (search) p.set("search", search); const d = await api(`/admin/orders?${p}`); setOrders(d); } catch (e: unknown) { setError((e as Error).message); } finally { setLoadingOrders(false); } }

  async function handleLogin() { setLoginErr(""); try { const d = await fetch(`${API_URL}/admin/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }).then((r) => r.json()); if (!d.token) throw new Error("Invalid"); localStorage.setItem("vzl_admin_token", d.token); setToken(d.token); } catch { setLoginErr("Invalid username or password"); } }
  async function updateStatus(id: number, status: string) { setUpdatingId(id); try { await api(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }); setOrders((p) => p.map((o) => (o.id === id ? { ...o, status } : o))); fetchMetrics(); } finally { setUpdatingId(null); } }
  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (!f) return; setImporting(true); setImportMsg(""); try { const fd = new FormData(); fd.append("file", f); const r = await fetch(`${API_URL}/admin/orders/import`, { method: "POST", headers: { "x-admin-key": token }, body: fd }); const d = await r.json(); setImportMsg(`âœ… ${d.imported} imported`); fetchOrders(); fetchMetrics(); } catch { setImportMsg("âŒ Failed"); } finally { setImporting(false); if (fileRef.current) fileRef.current.value = ""; } }
  function exportCsv() { const rows = [["Date","Order ID","Customer","Phone","State","City","Address","Products","Total","Status","Upsell"], ...orders.map((o) => [new Date(o.created_at).toLocaleString("en-GB"), `#${o.id}`, o.customer_name, o.customer_phone, o.customer_state, o.customer_city, o.customer_address, o.items.map((i) => `${i.product_name} x${i.quantity}`).join(", "), `$${o.total_price.toFixed(2)}`, o.status, o.is_upsell_accepted ? "Yes" : "No"])]; const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n"); const blob = new Blob([csv], { type: "text/csv" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(url); }

  const filtered = useMemo(() => { if (!search) return orders; const q = search.toLowerCase(); return orders.filter((o) => o.customer_name.toLowerCase().includes(q) || o.customer_phone.includes(q)); }, [orders, search]);

  /* LOGIN */
  if (!token) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-slate-900 rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">V</div>
          <h1 className="text-xl font-bold text-gray-900">Vazlina Admin</h1>
          <p className="text-xs text-gray-500 mt-1">COD Store Dashboard</p>
        </div>
        <div className="space-y-3">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          {loginErr && <p className="text-red-500 text-xs">{loginErr}</p>}
          <button onClick={handleLogin} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg py-2.5 text-sm transition">Sign In</button>
        </div>
      </div>
    </div>
  );

  /* DASHBOARD */
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">V</div>
            <div><h1 className="text-sm font-bold text-gray-900">Vazlina Admin</h1><p className="text-[10px] text-gray-400">COD Dashboard</p></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab("overview")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === "overview" ? "bg-slate-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Overview</button>
            <button onClick={() => setActiveTab("orders")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === "orders" ? "bg-slate-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Orders</button>
            <button onClick={() => { localStorage.removeItem("vzl_admin_token"); setToken(""); }} className="text-xs text-gray-400 hover:text-red-500 px-2 py-1 transition">Logout</button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-gray-500 uppercase">Date Range</span>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900" />
          <span className="text-gray-300 text-xs">to</span>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900" />
          <button onClick={() => { fetchMetrics(); fetchOrders(); }} className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition">Refresh</button>
          {loadingMetrics && <span className="text-xs text-gray-400 animate-pulse">Loading...</span>}
        </div>
      </div>

      {error && <div className="max-w-7xl mx-auto px-4 mt-4"><div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2.5 text-xs">{error}</div></div>}
      {activeTab === "overview" && metrics && (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <KpiCard label="Revenue" value={fmtMoney(metrics.total_revenue)} sub={`${metrics.total_orders} orders`} color="emerald" />
            <KpiCard label="Orders" value={String(metrics.total_orders)} sub={`${metrics.status_counts.delivered ?? 0} delivered`} color="blue" />
            <KpiCard label="AOV" value={fmtMoney(metrics.avg_order_value)} sub="avg order" color="indigo" />
            <KpiCard label="Conversion" value={`${metrics.conversion_rate.toFixed(1)}%`} sub={`${metrics.page_views} views`} color="amber" />
            <KpiCard label="Upsell Rate" value={`${metrics.upsell_rate.toFixed(1)}%`} sub={fmtMoney(metrics.upsell_revenue)} color="orange" />
            <KpiCard label="Confirmed" value={fmtMoney(metrics.confirmed_revenue)} sub="paid rev." color="green" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Orders by Status</h3>
              <div className="flex items-center gap-5">
                <div className="relative w-28 h-28 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                    {(() => { const total = metrics.total_orders || 1; let acc = 0; return STATUSES.map((s) => { const c = metrics.status_counts[s.value] || 0; const pct = (c / total) * 100; const el = (<circle key={s.value} cx="18" cy="18" r="15.9" fill="none" stroke={s.bar} strokeWidth="3.8" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={-acc * 3.6} />); acc += pct; return el; }); })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-base font-bold text-gray-800">{metrics.total_orders}</span></div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {STATUSES.map((s) => (
                    <div key={s.value} className="flex items-center gap-2 text-[11px]">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.bar }} />
                      <span className="text-gray-500 flex-1">{s.label}</span>
                      <span className="font-bold text-gray-800">{metrics.status_counts[s.value] || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 lg:col-span-2">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Revenue Trend</h3>
              <div className="flex items-end gap-[2px] h-36">
                {(() => { const max = Math.max(...metrics.daily_trend.map((d) => d.revenue), 1); return metrics.daily_trend.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group relative" title={`${d.date}: $${d.revenue.toFixed(0)}`}>
                    <div className="w-full bg-slate-900 rounded-t transition-all hover:bg-slate-700" style={{ height: `${(d.revenue / max) * 100}%`, minHeight: d.revenue > 0 ? 2 : 1, opacity: d.revenue > 0 ? 1 : 0.15 }} />
                  </div>
                )); })()}
              </div>
              <div className="flex justify-between text-[9px] text-gray-400 mt-2">
                <span>{metrics.daily_trend[0]?.date.slice(5)}</span>
                <span>{metrics.daily_trend[metrics.daily_trend.length - 1]?.date.slice(5)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Top Products</h3>
              <div className="space-y-3">
                {metrics.top_products.map((p) => { const max = metrics.top_products[0]?.revenue || 1; return (
                  <div key={p.name}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-gray-700 font-medium truncate max-w-[220px]">{p.name}</span>
                      <span className="text-gray-400">{p.count} sold Â· {fmtMoney(p.revenue)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-slate-900 h-1.5 rounded-full transition-all" style={{ width: `${(p.revenue / max) * 100}%` }} /></div>
                  </div>
                ); })}
                {metrics.top_products.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No product data</p>}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Top States</h3>
              <div className="space-y-3">
                {metrics.top_states.map((s) => { const max = metrics.top_states[0]?.orders || 1; return (
                  <div key={s.state}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-gray-700 font-medium">{s.state}</span>
                      <span className="text-gray-400">{s.orders} orders</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(s.orders / max) * 100}%` }} /></div>
                  </div>
                ); })}
                {metrics.top_states.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No state data</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "orders" && (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-3 flex flex-wrap gap-2 items-center">
            <input type="text" placeholder="Search name or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-xs flex-1 min-w-[160px] focus:outline-none focus:ring-1 focus:ring-slate-900" />
            <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setTimeout(fetchOrders, 0); }} className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900">
              <option value="">All</option>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <button onClick={fetchOrders} className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-2 rounded-lg transition">Refresh</button>
            <button onClick={exportCsv} className="border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium px-3 py-2 rounded-lg transition">Export CSV</button>
            <label className={`cursor-pointer border border-dashed border-slate-400 hover:bg-slate-50 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg transition ${importing ? "opacity-50" : ""}`}>
              {importing ? "Importing..." : "Import CSV"}
              <input type="file" accept=".csv" className="hidden" ref={fileRef} onChange={handleImport} />
            </label>
            {importMsg && <span className="text-xs">{importMsg}</span>}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {loadingOrders ? (
              <div className="py-12 text-center text-gray-400 text-sm">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm">No orders found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-3 py-2.5">#</th>
                      <th className="px-3 py-2.5">Date</th>
                      <th className="px-3 py-2.5">Customer</th>
                      <th className="px-3 py-2.5">Phone</th>
                      <th className="px-3 py-2.5">State</th>
                      <th className="px-3 py-2.5">Products</th>
                      <th className="px-3 py-2.5">Total</th>
                      <th className="px-3 py-2.5">Status</th>
                      <th className="px-3 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition">
                        <td className="px-3 py-2.5 font-mono text-gray-400">#{order.id}</td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">
                          {new Date(order.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                          <br /><span className="text-[10px] text-gray-400">{new Date(order.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span>
                        </td>
                        <td className="px-3 py-2.5 font-medium text-gray-900">
                          {order.customer_name}
                          {order.is_upsell_accepted && <span className="ml-1 text-[9px] bg-orange-100 text-orange-700 px-1 rounded">upsell</span>}
                        </td>
                        <td className="px-3 py-2.5 text-gray-600">{order.customer_phone}</td>
                        <td className="px-3 py-2.5 text-gray-600">{order.customer_state}</td>
                        <td className="px-3 py-2.5 text-gray-700 max-w-[200px]">
                          <div className="truncate">{order.items.map((i) => `${i.product_name} x${i.quantity}`).join(", ")}</div>
                        </td>
                        <td className="px-3 py-2.5 font-bold text-gray-900 whitespace-nowrap">${order.total_price.toFixed(2)}</td>
                        <td className="px-3 py-2.5">{statusBadge(order.status)}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setPreviewOrder(order)} className="text-[10px] text-slate-600 hover:text-slate-900 underline">View</button>
                            <select value={order.status} disabled={updatingId === order.id} onChange={(e) => updateStatus(order.id, e.target.value)} className="text-[10px] border border-gray-200 rounded px-1 py-0.5 bg-white focus:outline-none disabled:opacity-50">
                              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setPreviewOrder(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Order #{previewOrder.id}</h2>
                <p className="text-xs text-gray-400">{new Date(previewOrder.created_at).toLocaleString("en-GB")}</p>
              </div>
              <button onClick={() => setPreviewOrder(null)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Customer</p>
                  <p className="text-sm font-medium text-gray-900">{previewOrder.customer_name}</p>
                  <p className="text-xs text-gray-500">{previewOrder.customer_phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
                  <p className="text-sm text-gray-900">{previewOrder.customer_state}</p>
                  <p className="text-xs text-gray-500">{previewOrder.customer_city}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Address</p>
                <p className="text-sm text-gray-900">{previewOrder.customer_address}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Products</p>
                <div className="space-y-2">
                  {previewOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-sm text-gray-800">{item.product_name}</span>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">x{item.quantity}</span>
                        <span className="text-sm font-bold text-gray-900 ml-2">${(item.price_per_item * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Status</p>
                  <div className="mt-1">{statusBadge(previewOrder.status)}</div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Total</p>
                  <p className="text-xl font-bold text-gray-900">${previewOrder.total_price.toFixed(2)}</p>
                  {previewOrder.is_upsell_accepted && <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Upsell Accepted</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

