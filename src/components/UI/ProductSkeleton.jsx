
export default function ProductSkeleton() {
  return (
    <div className="p-3 bg-white rounded-4 shadow-sm">
      <div
        className="placeholder-glow mb-3"
        style={{ height: "180px", background: "#e9ecef", borderRadius: "10px" }}
      ></div>

      <p className="placeholder col-6"></p>
      <p className="placeholder col-8"></p>
      <p className="placeholder col-4"></p>
    </div>
  );
}
