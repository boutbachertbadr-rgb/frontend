"use client";

import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.vazlina.shop";

const STATUSES = [
  { value: "pending_confirmation", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800" },
  { value: "shipped", label: "Shipped", color: "bg-purple-100 text-purple-800" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
];

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
    const rows = [
      ["ID", "Date", "Name", "Phone", "State", "City", "Address", "Products", "Total", "Status", "Upsell"],
      ...orders.map((o) => [
        o.id,
        new Date(o.created_at).toLocaleDateString(),
        o.customer_name,
        o.customer_phone,
        o.customer_state,
        o.customer_city,
        o.customer_address,
        o.items.map((i) => `${i.product_name}(x${i.quantity})`).join(" | "),
        o.total_price,
        o.status,
        o.is_upsell_accepted ? "yes" : "no",
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

  const totalRevenue = filtered.reduce((s, o) => s + o.total_price, 0);
  const byStatus = Object.fromEntries(
    STATUSES.map((s) => [s.value, filtered.filter((o) => o.status === s.value).length])
  );

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
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-gray-400">{filtered.length} orders</p>
          </div>
          {STATUSES.map((s) => (
            <div key={s.value} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900">{byStatus[s.value] ?? 0}</p>
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
                    <th className="px-4 py-3">Products</th>
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
                      <td className="px-4 py-3 text-gray-700 text-xs max-w-[200px]">
                        {order.items.length > 0
                          ? order.items.map((i) => (
                              <div key={i.product_name}>
                                {i.product_name} <span className="text-gray-400">×{i.quantity}</span>
                              </div>
                            ))
                          : <span className="text-gray-400">—</span>}
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
