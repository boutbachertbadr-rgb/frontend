"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.vazlina.shop";

const STATUSES = [
  { value: "pending_confirmation", label: "Pending", color: "bg-yellow-100 text-yellow-800", bar: "bg-yellow-400" },
  { value: "confirmed", label: "Confirmed", color: "bg-blue-100 text-blue-800", bar: "bg-blue-400" },
  { value: "shipped", label: "Shipped", color: "bg-purple-100 text-purple-800", bar: "bg-purple-400" },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800", bar: "bg-green-400" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800", bar: "bg-red-400" },
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
  total_price: number;
  status: string;
  is_upsell_accepted: boolean;
  items: OrderItem[];
}

export default function StatsPage() {
  const [key, setKey] = useState<string>("");
  const [inputKey, setInputKey] = useState("");
  const [loginError, setLoginError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("vzl_stats_key") ?? "";
    if (saved) setKey(saved);
  }, []);

  useEffect(() => {
    if (key) fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  async function fetchOrders() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/orders/`, {
        headers: { "x-admin-key": key },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setOrders(data);
    } catch {
      setError("Failed to load orders");
      localStorage.removeItem("vzl_stats_key");
      setKey("");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!inputKey.trim()) return;
    setLoginError("");
    localStorage.setItem("vzl_stats_key", inputKey.trim());
    setKey(inputKey.trim());
  }

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + Number(o.total_price), 0);
    const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const upsellCount = orders.filter((o) => o.is_upsell_accepted).length;
    const upsellRate = totalOrders > 0 ? Math.round((upsellCount / totalOrders) * 100) : 0;

    const statusCounts: Record<string, number> = {};
    STATUSES.forEach((s) => (statusCounts[s.value] = 0));
    orders.forEach((o) => {
      if (statusCounts[o.status] !== undefined) statusCounts[o.status]++;
      else statusCounts["pending_confirmation"]++;
    });

    const productCounts: Record<string, number> = {};
    orders.forEach((o) => {
      o.items.forEach((i) => {
        const name = i.product_name;
        productCounts[name] = (productCounts[name] ?? 0) + i.quantity;
      });
    });
    const topProducts = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const stateCounts: Record<string, number> = {};
    orders.forEach((o) => {
      stateCounts[o.customer_state] = (stateCounts[o.customer_state] ?? 0) + 1;
    });
    const topStates = Object.entries(stateCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const today = new Date().toDateString();
    const todayOrders = orders.filter((o) => new Date(o.created_at).toDateString() === today);
    const todayRevenue = todayOrders.reduce((s, o) => s + Number(o.total_price), 0);

    return {
      totalOrders,
      totalRevenue,
      avgOrder,
      upsellCount,
      upsellRate,
      statusCounts,
      topProducts,
      topStates,
      todayOrders: todayOrders.length,
      todayRevenue,
    };
  }, [orders]);

  if (!key) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">Vazlina Stats</h1>
          <p className="text-sm text-gray-400 text-center mb-6">Private analytics dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter stats key..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm animate-pulse">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Vazlina Analytics</h1>
            <p className="text-sm text-gray-400 mt-1">Business performance overview</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("vzl_stats_key");
              setKey("");
            }}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 bg-white rounded-lg border border-gray-200 transition"
          >
            Logout
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Orders" value={stats.totalOrders.toString()} icon="📦" color="bg-blue-50 text-blue-600" />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(0)}`}
            icon="💰"
            color="bg-green-50 text-green-600"
          />
          <StatCard
            title="Avg Order"
            value={`$${stats.avgOrder.toFixed(0)}`}
            icon="📊"
            color="bg-purple-50 text-purple-600"
          />
          <StatCard
            title="Upsell Rate"
            value={`${stats.upsellRate}%`}
            icon="🚀"
            color="bg-orange-50 text-orange-600"
          />
        </div>

        {/* Today + Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today's stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Today</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Orders</span>
                <span className="text-xl font-bold text-gray-800">{stats.todayOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Revenue</span>
                <span className="text-xl font-bold text-green-600">${stats.todayRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Upsells</span>
                <span className="text-xl font-bold text-orange-600">
                  {orders.filter((o) => o.is_upsell_accepted && new Date(o.created_at).toDateString() === new Date().toDateString()).length}
                </span>
              </div>
            </div>
          </div>

          {/* Status breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Order Status</h3>
            <div className="space-y-3">
              {STATUSES.map((s) => {
                const count = stats.statusCounts[s.value] ?? 0;
                const pct = stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0;
                return (
                  <div key={s.value} className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${s.color}`}>
                      {s.label}
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${s.bar} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-700 w-8 text-right">{count}</span>
                    <span className="text-xs text-gray-400 w-10 text-right">{Math.round(pct)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upsell details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Upsell Performance</h3>
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="text-orange-500"
                    strokeDasharray={`${stats.upsellRate}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">{stats.upsellRate}%</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>With Upsell: <strong className="text-gray-800">{stats.upsellCount}</strong></span>
              <span>Without: <strong className="text-gray-800">{stats.totalOrders - stats.upsellCount}</strong></span>
            </div>
          </div>

          {/* Top products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Top Products</h3>
            {stats.topProducts.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No data yet</p>
            ) : (
              <div className="space-y-3">
                {stats.topProducts.map(([name, count], idx) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      idx === 0 ? "bg-yellow-100 text-yellow-700" :
                      idx === 1 ? "bg-gray-200 text-gray-600" :
                      idx === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="flex-1 text-sm text-gray-700 truncate">{name}</span>
                    <span className="text-sm font-bold text-gray-800">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top states + Recent orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Top States</h3>
            {stats.topStates.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No data yet</p>
            ) : (
              <div className="space-y-3">
                {stats.topStates.map(([state, count]) => (
                  <div key={state} className="flex items-center gap-3">
                    <span className="flex-1 text-sm text-gray-700">{state}</span>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-400 rounded-full"
                        style={{ width: `${stats.totalOrders > 0 ? (count / stats.totalOrders) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-800 w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Recent Orders</h3>
            {orders.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No orders yet</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {orders.slice(0, 10).map((o) => (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <span className="text-sm font-semibold text-gray-700">#{o.id}</span>
                      <span className="text-xs text-gray-400 ml-2">{o.customer_name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-800">${Number(o.total_price).toFixed(0)}</span>
                      {o.is_upsell_accepted && (
                        <span className="ml-1 text-[10px] bg-orange-100 text-orange-700 px-1 rounded">+Upsell</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className={`text-2xl md:text-3xl font-bold ${color.split(" ")[1]}`}>{value}</div>
      <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{title}</div>
    </div>
  );
}
