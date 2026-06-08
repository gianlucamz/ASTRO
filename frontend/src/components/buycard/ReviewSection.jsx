import { useState, useEffect, useCallback } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import StarDisplay from "../shared/StarDisplay";

function StarInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  function getStarValue(e, star) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    return x < rect.width / 2 ? star - 0.5 : star;
  }

  const display = hovered || value;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseMove={(e) => setHovered(getStarValue(e, star))}
          onMouseLeave={() => setHovered(0)}
          onClick={(e) => onChange(getStarValue(e, star))}
          className="cursor-pointer relative w-7 h-7"
        >
          <FaStar className="text-2xl text-gray-200 absolute inset-0" />
          {display >= star ? (
            <FaStar className="text-2xl text-purple-600 absolute inset-0" />
          ) : display >= star - 0.5 ? (
            <FaStarHalfAlt className="text-2xl text-purple-600 absolute inset-0" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

export default function ReviewSection({
  productId,
  onLoginRequest,
  onStatsChange,
}) {
  const { isAuthenticated } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [userReview, setUserReview] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchReviews = useCallback(
    async (skip = 0, limit = 3, append = false) => {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${productId}?skip=${skip}&limit=${limit}`,
        { headers },
      );
      const data = await res.json();

      setAverage(data.average);
      setTotal(data.total);
      setUserReview(data.userReview);
      onStatsChange?.(data.average, data.total);

      const othersTotal = data.total - (data.userReview ? 1 : 0);

      if (append) {
        setReviews((prev) => {
          const merged = [...prev, ...data.reviews];
          setHasMore(merged.length < othersTotal);
          return merged;
        });
      } else {
        setReviews(data.reviews);
        setHasMore(data.reviews.length < othersTotal);
      }
    },
    [productId, onStatsChange],
  );

  useEffect(() => {
    fetchReviews(0, 3, false);
  }, [fetchReviews]);

  async function handleLoadMore() {
    setLoadingMore(true);
    await fetchReviews(reviews.length, 10, true);
    setLoadingMore(false);
  }

  async function handleSubmit() {
    if (!rating) return setError("Selecione uma nota");
    if (!comment.trim()) return setError("Escreva um comentário");

    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const url = editing
        ? `${import.meta.env.VITE_API_URL}/reviews/${userReview.id}`
        : `${import.meta.env.VITE_API_URL}/reviews`;

      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, rating, comment }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      setRating(0);
      setComment("");
      setEditing(false);
      fetchReviews(0, 3, false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/reviews/${userReview.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setConfirmDelete(false);
    setUserReview(null);
    fetchReviews(0, 3, false);
  }

  function handleEdit() {
    setRating(userReview.rating);
    setComment(userReview.comment);
    setEditing(true);
  }

  function handleCancelEdit() {
    setRating(0);
    setComment("");
    setEditing(false);
    setError("");
  }

  const showForm = isAuthenticated && (!userReview || editing);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h2 className="text-lg font-bold uppercase">Avaliações</h2>

      <div className="flex items-center gap-3">
        <span className="text-5xl font-bold">
          {average > 0 ? average : "—"}
        </span>
        <div className="flex flex-col gap-1">
          <StarDisplay rating={average} size="text-lg" />
          <span className="text-sm text-gray-500">
            {total} avaliação{total !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {userReview && !editing && (
        <div className="border border-purple-200 bg-purple-50 rounded-lg p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">
                {userReview.user.name}
              </span>
              <StarDisplay rating={userReview.rating} />
              <span className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-0.5 rounded-full">
                Sua avaliação
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="text-xs text-purple-600 hover:underline cursor-pointer"
              >
                Editar
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-xs text-red-500 hover:underline cursor-pointer"
              >
                Apagar
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-700">{userReview.comment}</p>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">
              Apagar avaliação
            </h2>
            <p className="text-sm text-gray-600">
              Tem certeza que deseja apagar sua avaliação? Você poderá escrever
              uma nova depois.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg cursor-pointer"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
          <p className="text-sm font-semibold text-gray-700">
            {editing ? "Editar avaliação" : "Avaliar produto"}
          </p>
          <StarInput value={rating} onChange={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva sua avaliação..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-purple-400"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            {editing && (
              <button
                onClick={handleCancelEdit}
                className="flex-1 border border-gray-300 text-gray-600 text-sm font-semibold py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 rounded-lg disabled:opacity-60 cursor-pointer"
            >
              {submitting
                ? "Enviando..."
                : editing
                  ? "Salvar alterações"
                  : "Enviar avaliação"}
            </button>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <p className="text-sm text-gray-500">
          <span
            onClick={onLoginRequest}
            className="text-purple-600 cursor-pointer hover:underline"
          >
            Faça login
          </span>{" "}
          para deixar uma avaliação.
        </p>
      )}

      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col gap-1 pb-3 border-b border-gray-100 last:border-0"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{review.user.name}</span>
            <StarDisplay rating={review.rating} />
          </div>
          <p className="text-sm text-gray-700">{review.comment}</p>
        </div>
      ))}

      {hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="text-purple-600 text-sm cursor-pointer hover:underline text-left disabled:opacity-60"
        >
          {loadingMore ? "Carregando..." : "Ver mais"}
        </button>
      )}
    </div>
  );
}
