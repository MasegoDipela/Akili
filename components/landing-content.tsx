"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Masego Dipela",
    avatar: "M",
    title: "Software Engineer",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Tshegofatso Mogotsi",
    avatar: "T",
    title: "Designer",
    description: "I use this daily for generating new design inspiration",
  },
  {
    name: "Emmanuel Ayisi",
    avatar: "E",
    title: "Author",
    description: "As a writer, I was skeptical about an AI app assisting with text generation. But this app pleasantly surprised me with its ability to understand my style and suggest brilliant phrases.",
  },
  {
    name: "Marie Van Vyk",
    avatar: "M",
    title: "CFO",
    description: "A.I. magic at its finest! This app has saved me hours of brainstorming. It's like having a personal creative genie ready to fulfill my content wishes.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}