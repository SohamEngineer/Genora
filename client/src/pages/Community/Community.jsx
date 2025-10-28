"use client";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import ImageCard from "../../components/imageCard";
import api from "../../api";

function Community() {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const [hovered, setHovered] = useState(null);


  // ✅ Fetch all community creations
  const getCommunity = async () => {
    setLoading(true);
    const toastId = toast.loading("Loading community creations...");
    try {
      const token = await getToken();
      const { data } = await api.get("/api/user/getuserPublication", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCreations(data.creations);
        toast.success("Creations loaded successfully!");
      } else {
        toast.error(data.message || "Failed to load creations.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching data.", error);
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  // ✅ Like/unlike creation
  const toggleLike = async (id) => {
    try {
      const token = await getToken();
      const { data } = await api.post(
        "/api/user/getuserLike",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setCreations((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  likes: item.likes.includes(user?.id)
                    ? item.likes.filter((u) => u !== user?.id)
                    : [...item.likes, user?.id],
                }
              : item
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while liking the post.", error);
    }
  };

  useEffect(() => {
    getCommunity();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-300">Fetching creations...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 h-full flex flex-col gap-4 p-6 text-white">
          <h2 className="text-2xl font-bold mb-3">Community Creations</h2>

          {creations.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              No creations found yet. Be the first to share!
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full pr-2">
              {creations.map((card, index) => (
                <ImageCard
                  key={card.id}
                  card={card}
                  index={index}
                  hovered={hovered}
                  setHovered={setHovered}
                  user={user}
                  toggleLike={toggleLike}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Community;
