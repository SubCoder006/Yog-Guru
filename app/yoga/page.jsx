import YogaCard from "@/components/YogaCard";

export default function YogaLibrary() {
  const yogaPoses = [
    { id: 1, name: "Surya Namaskar", level: "Beginner" },
    { id: 2, name: "Vrikshasana", level: "Beginner" },
    { id: 3, name: "Bhujangasana", level: "Beginner" },
    { id: 4, name: "Brahmari", level: "Beginner" },
    { id: 5, name: "Savasana", level: "Beginner" },
    { id: 11, name: "Padmasana", level: "Intermediate" },
    { id: 12, name: "Adho Mukha Svanasana", level: "Intermediate" },
    { id: 13, name: "Kapalbhati", level: "Intermediate" },
    { id: 14, name: "Trikonasana", level: "Intermediate" },
    { id: 21, name: "Dhanurasana", level: "Advanced" },
    { id: 22, name: "Halasana", level: "Advanced" },
    { id: 23, name: "Sirsasana", level: "Advanced" },
    { id: 31, name: "Nirvana", level: "Expert" },
    { id: 32, name: "Meditation", level: "Expert" },
    { id: 33, name: "Pranayama", level: "Expert" }

  ];

  return (
    <div className="p-8 bg-gradient-to-r from-green-300 via-[#6dd0bb] to-sky-400 min-h-screen">
      <h2 className="text-3xl text-blue-600 font-bold mb-6">Yoga Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {yogaPoses.map((pose) => (
          <YogaCard key={pose.id} pose={pose} />
        ))}
      </div>
    </div>
  );
}