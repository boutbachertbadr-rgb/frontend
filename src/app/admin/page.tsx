"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.vazlina.shop";

const STATUSES = [
  { value: "pending_confirmation", label: "Pending", color: "bg-yellow-100 text-yellow-800", bar: "#EAB308" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800", bar: "#2563EB" },
  { value: "shipped", label: "Shipped", color: "bg-purple-100 text-purple-800", bar: "#9333EA" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800", bar: "#16A34A" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", bar: "#DC2626" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface OrderItem {
  product_name: string;
  quantity: number;
  price_per_item: number;
}

interface Order {
  id: number;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_state: string;
  customer_city: string;
  customer_address: string;
  total_price: number;
  status: string;
  is_upsell_accepted: boolean;
  items: OrderItem[];
}

function statusBadge(status: string) {
  const s = STATUSES.find((x) => x.value === status);
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
        s?.color ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {s?.label ?? status}
    </span>
  );
}

export default function AdminPage() {
  const [key, setKey] = useState<string>("");
  const [inputKey, setInputKey] = useState("");
  const [loginError, setLoginError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("vzl_admin_key") ?? "";
    if (saved) setKey(saved);
  }, []);

  useEffect(() => {
    if (key) fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, filterStatus]);

  async function fetchOrders() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.set("status", filterStatus);
      if (search) params.set("search", search);
      const res = await fetch(`${API_URL}/orders/?${params}`, {
        headers: { "x-admin-key": key },
      });
      if (res.status === 403) {
        setKey("");
        localStorage.removeItem("vzl_admin_key");
        setError("Wrong admin key.");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch orders");
      setOrders(await res.json());
    } catch (e: unknown) {
      setError((e as Error).message ?? "Network error");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin() {
    if (!inputKey.trim()) {
      setLoginError("Enter the admin key.");
      return;
    }
    localStorage.setItem("vzl_admin_key", inputKey.trim());
    setKey(inputKey.trim());
    setLoginError("");
  }

  async function updateStatus(orderId: number, status: string) {
    setUpdatingId(orderId);
    try {
      await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({ status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API_URL}/orders/import`, {
        method: "POST",
        headers: { "x-admin-key": key },
        body: fd,
      });
      const data = await res.json();
      setImportMsg(`✅ ${data.imported} orders imported`);
      fetchOrders();
    } catch {
      setImportMsg("❌ Import failed");
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function exportCsv() {
    const mainProd = (o: Order) =>
      o.items.filter(i => i.product_name.toLowerCase().includes("unidad"))
        .map(i => i.product_name).join(" + ") || "—";
    const upsellProd = (o: Order) =>
      o.items.filter(i => !i.product_name.toLowerCase().includes("unidad"))
        .map(i => i.product_name).join(" + ") || "No";

    const rows = [
      ["Date", "Order ID", "Customer Name", "Phone", "State", "City", "Address", "Main Product", "Upsell (Yes/No)", "Upsell Product", "Total to Collect", "Status"],
      ...orders.map((o) => [
        new Date(o.created_at).toLocaleDateString("en-GB"),
        `#${o.id}`,
        o.customer_name,
        o.customer_phone,
        o.customer_state,
        o.customer_city,
        o.customer_address,
        mainProd(o),
        o.is_upsell_accepted ? "Yes" : "No",
        upsellProd(o),
        `$${Number(o.total_price).toFixed(2)} MXN`,
        o.status,
      ]),
    ];
    const csv = rows.map((r) => r.map(String).map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vazlina-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = search
    ? orders.filter(
        (o) =>
          o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
          o.customer_phone.includes(search)
      )
    : orders;

  /* ---- ANALYTICS ---- */
  const analytics = useMemo(() => {
    const all = orders;
    const totalOrders = all.length;
    const totalRevenue = all.reduce((s, o) => s + o.total_price, 0);
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    const upsellOrders = all.filter((o) => o.is_upsell_accepted);
    const upsellRate = totalOrders ? (upsellOrders.length / totalOrders) * 100 : 0;
    const upsellRevenue = upsellOrders.reduce((s, o) => s + o.total_price, 0);

    const confirmedRevenue = all
      .filter((o) => o.status === "confirmed" || o.status === "shipped" || o.status === "delivered")
      .reduce((s, o) => s + o.total_price, 0);

    const byStatus = Object.fromEntries(
      STATUSES.map((s) => [s.value, all.filter((o) => o.status === s.value).length])
    );

    // Product breakdown
    const productStats: Record<string, { count: number; revenue: number }> = {};
    all.forEach((o) => {
      o.items.forEach((i) => {
        const name = i.product_name;
        if (!productStats[name]) productStats[name] = { count: 0, revenue: 0 };
        productStats[name].count += i.quantity;
        productStats[name].revenue += i.price_per_item * i.quantity;
      });
    });
    const topProducts = Object.entries(productStats)
      .sort((a, b) => b[1].revenue - a[1].revenue)
      .slice(0, 5);

    // Daily revenue trend (last 30 days)
    const today = new Date();
    const daily: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      daily[d.toISOString().slice(0, 10)] = 0;
    }
    all.forEach((o) => {
      const d = o.created_at.slice(0, 10);
      if (daily[d] !== undefined) daily[d] += o.total_price;
    });
    const dailyTrend = Object.entries(daily).map(([date, revenue]) => ({
      date,
      day: parseInt(date.slice(8, 10)),
      revenue,
    }));

    // Revenue by month
    const monthly: Record<string, number> = {};
    all.forEach((o) => {
      const m = o.created_at.slice(0, 7);
      monthly[m] = (monthly[m] || 0) + o.total_price;
    });
    const monthlyTrend = Object.entries(monthly)
      .sort()
      .slice(-6)
      .map(([m, revenue]) => ({
        label: MONTHS[parseInt(m.slice(5, 7)) - 1] + " '" + m.slice(2, 4),
        revenue,
      }));

    return {
      totalOrders,
      totalRevenue,
      avgOrderValue,
      upsellRate,
      upsellRevenue,
      confirmedRevenue,
      byStatus,
      topProducts,
      dailyTrend,
      monthlyTrend,
    };
  }, [orders]);

  if (!key) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Login</h1>
          <p className="text-sm text-gray-500 mb-6">Vazlina Orders Dashboard</p>
          <input
            type="password"
            placeholder="Enter admin key"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-2.5 text-sm transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Vazlina Orders</h1>
          <p className="text-xs text-gray-400">Admin Dashboard</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("vzl_admin_key");
            setKey("");
          }}
          className="text-xs text-gray-400 hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Total Revenue</p>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-lg font-bold">$</div>
            </div>
            <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toFixed(0)}</p>
            <p className="text-xs text-gray-400 mt-1">{analytics.totalOrders} orders</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Avg. Order</p>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">${analytics.avgOrderValue.toFixed(2)}</p>
            <p className="text-xs text-gray-400 mt-1">Per order</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Upsell Rate</p>
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{analytics.upsellRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-400 mt-1">+${analytics.upsellRevenue.toFixed(0)} upsell revenue</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-500 uppercase">Confirmed Rev.</p>
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">${analytics.confirmedRevenue.toFixed(0)}</p>
            <p className="text-xs text-gray-400 mt-1">Confirmed/Shipped/Delivered</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Status Donut */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Orders by Status</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                  {(() => {
                    const total = analytics.totalOrders || 1;
                    let acc = 0;
                    return STATUSES.map((s) => {
                      const count = analytics.byStatus[s.value] || 0;
                      const pct = (count / total) * 100;
                      const dash = `${pct} ${100 - pct}`;
                      const el = (
                        <circle
                          key={s.value}
                          cx="18" cy="18" r="15.9"
                          fill="none"
                          stroke={s.bar}
                          strokeWidth="3.8"
                          strokeDasharray={dash}
                          strokeDashoffset={-acc * 3.6 / 100 * 100}
                          className="transition-all"
                        />
                      );
                      acc += pct;
                      return el;
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700">{analytics.totalOrders}</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {STATUSES.map((s) => (
                  <div key={s.value} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.bar }} />
                    <span className="text-gray-600 flex-1">{s.label}</span>
                    <span className="font-semibold text-gray-900">{analytics.byStatus[s.value] || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Trend (Daily) */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 lg:col-span-2">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue Trend (Last 30 Days)</h3>
            {analytics.dailyTrend.length > 0 && (
              <div className="flex items-end gap-1 h-40">
                {(() => {
                  const max = Math.max(...analytics.dailyTrend.map((d) => d.revenue), 1);
                  return analytics.dailyTrend.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group relative">
                      <div
                        className="w-full bg-indigo-500 rounded-t transition-all hover:bg-indigo-400"
                        style={{ height: `${(d.revenue / max) * 100}%`, minHeight: d.revenue > 0 ? 4 : 1 }}
                        title={`${d.date}: $${d.revenue.toFixed(2)}`}
                      />
                      {i % 5 === 0 && (
                        <span className="text-[9px] text-gray-400 mt-1">{d.day}</span>
                      )}
                    </div>
                  ));
                })()}
              </div>
            )}
            <div className="flex justify-between text-[10px] text-gray-400 mt-2">
              <span>{analytics.dailyTrend[0]?.date}</span>
              <span>{analytics.dailyTrend[analytics.dailyTrend.length - 1]?.date}</span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Products */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Top Products</h3>
            <div className="space-y-3">
              {analytics.topProducts.map(([name, stats], i) => {
                const max = analytics.topProducts[0][1].revenue;
                return (
                  <div key={name}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium truncate max-w-[200px]">{name}</span>
                      <span className="text-gray-500">${stats.revenue.toFixed(0)} ({stats.count} sold)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${(stats.revenue / max) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {analytics.topProducts.length === 0 && (
                <p className="text-sm text-gray-400 py-4 text-center">No product data yet</p>
              )}
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue by Month</h3>
            <div className="space-y-3">
              {analytics.monthlyTrend.map((m, i) => {
                const max = Math.max(...analytics.monthlyTrend.map((x) => x.revenue), 1);
                return (
                  <div key={m.label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{m.label}</span>
                      <span className="text-gray-500">${m.revenue.toFixed(0)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${(m.revenue / max) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {analytics.monthlyTrend.length === 0 && (
                <p className="text-sm text-gray-400 py-4 text-center">No monthly data yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Compact Status Counts */}
        <div className="grid grid-cols-5 gap-3">
          {STATUSES.map((s) => (
            <div key={s.value} className="bg-white rounded-xl border border-gray-200 p-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{analytics.byStatus[s.value] || 0}</p>
              <p className="text-[10px] text-gray-500 uppercase mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchOrders()}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <button
            onClick={() => fetchOrders()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            Refresh
          </button>
          <button
            onClick={exportCsv}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Export CSV
          </button>
          <label className={`cursor-pointer border border-dashed border-indigo-400 hover:bg-indigo-50 text-indigo-600 text-sm font-medium px-4 py-2 rounded-lg transition ${importing ? "opacity-50 pointer-events-none" : ""}`}>
            {importing ? "Importing…" : "Import CSV"}
            <input
              type="file"
              accept=".csv"
              className="hidden"
              ref={fileRef}
              onChange={handleImport}
            />
          </label>
          {importMsg && <span className="text-sm">{importMsg}</span>}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-gray-400 text-sm">Loading orders…</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">No orders found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Producto Principal</th>
                    <th className="px-4 py-3">Upsell</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-mono text-gray-400 text-xs">#{order.id}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        <br />
                        <span className="text-xs text-gray-400">
                          {new Date(order.created_at).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {order.customer_name}
                        {order.is_upsell_accepted && (
                          <span className="ml-1 text-xs bg-orange-100 text-orange-700 px-1 py-0.5 rounded">upsell</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{order.customer_phone}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">
                        <div>{order.customer_state}</div>
                        {order.customer_city && <div className="text-gray-400">{order.customer_city}</div>}
                      </td>
                      <td className="px-4 py-3 text-gray-700 text-xs max-w-[180px]">
                        {order.items.filter(i => i.product_name.toLowerCase().includes("unidad")).length > 0
                          ? order.items
                              .filter(i => i.product_name.toLowerCase().includes("unidad"))
                              .map(i => (
                                <div key={i.product_name} className="font-medium">
                                  {i.product_name}
                                </div>
                              ))
                          : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-3 text-xs max-w-[150px]">
                        {order.items.filter(i => !i.product_name.toLowerCase().includes("unidad")).length > 0
                          ? order.items
                              .filter(i => !i.product_name.toLowerCase().includes("unidad"))
                              .map(i => (
                                <div key={i.product_name} className="bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded-full inline-block">
                                  ✓ {i.product_name}
                                </div>
                              ))
                          : <span className="text-gray-300 text-xs">No</span>}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                        ${Number(order.total_price).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1.5">
                          {statusBadge(order.status)}
                          <select
                            value={order.status}
                            disabled={updatingId === order.id}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className="text-xs border border-gray-200 rounded px-1.5 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-400 disabled:opacity-50"
                          >
                            {STATUSES.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
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
    </div>
  );
}
