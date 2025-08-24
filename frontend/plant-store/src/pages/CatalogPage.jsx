import { useEffect, useMemo, useState } from "react";
import { fetchPlants } from "../lib/api.js";
import SearchBar from "../ui/SearchBar.jsx";
import FilterDropdown from "../ui/FilterDropdown.jsx";
import ToggleGroup from "../ui/ToggleGroup.jsx";
import PlantGrid from "../ui/PlantGrid.jsx";
import Pagination from "../ui/Pagination.jsx";
import Loader from "../ui/Loader.jsx";
import ErrorBanner from "../ui/ErrorBanner.jsx";

const CATEGORIES = ["Indoor", "Outdoor", "Succulent", "Air Purifying", "Home Decor"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(""); 
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [sort, setSort] = useState("name_asc");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [data, setData] = useState({ data: [], total: 0, page: 1, limit });

  
  const debouncedSearch = useDebouncedValue(search, 300);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setErr("");
      try {
        const res = await fetchPlants({
          search: debouncedSearch || undefined,
          category: category || undefined,
          available: available || undefined,
          page,
          limit,
          sort
        });
        if (!cancelled) setData(res);
      } catch (e) {
        if (!cancelled) setErr(e?.response?.data?.message || "Failed to load plants");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [debouncedSearch, category, available, page, limit, sort]);


  
useEffect(() => {
  setPage(1);
}, [debouncedSearch, category, available, sort]);





  const totalPages = useMemo(() => Math.ceil((data.total || 0) / limit), [data.total, limit]);

  return (
    <div className="stack gap-16">
      <section className="toolbar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or category…" />
        <FilterDropdown value={category} onChange={setCategory} options={CATEGORIES} placeholder="All categories" />
        <ToggleGroup
          label="Availability"
          value={available}
          onChange={setAvailable}
          options={[
            { value: "", label: "All" },
            { value: "true", label: "In Stock" },
            { value: "false", label: "Out of Stock" },
          ]}
        />
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name_asc">Name ↑</option>
          <option value="name_desc">Name ↓</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="created_desc">Newest</option>
          <option value="created_asc">Oldest</option>
        </select>
      </section>

      {loading && <Loader count={8} />}

      {!loading && err && (
        <ErrorBanner message={err} onRetry={() => setPage((p) => p)} />
      )}

      {!loading && !err && (
        <>
          {data.data.length === 0 ? (
            <div className="empty">
              No plants found{search ? ` for “${search}”` : ""}{category ? ` in “${category}”` : ""}.
              <button className="btn" onClick={() => { setSearch(""); setCategory(""); setAvailable(""); setSort("name_asc"); setPage(1); }}>Clear filters</button>
            </div>
          ) : (
            <>
              <PlantGrid items={data.data} />
              {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

function useDebouncedValue(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}
