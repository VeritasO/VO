export default function ImportPatterns() {
  const run = async () => {
    const res = await fetch("/api/thalea/import-patterns", { method: "POST" });
    alert(res.ok ? "Community RJ patterns imported." : "Import failed.");
  };
  return (
    <button onClick={run} className="px-3 py-2 border rounded">
      Import Community RJ Patterns
    </button>
  );
}
