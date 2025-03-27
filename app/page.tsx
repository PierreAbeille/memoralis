"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { GrainOverlay } from "@/components/grain-overlay";
import { jacquard } from "@/utils/fonts";

export default function Home() {
  const [text, setText] = useState<string>(
    "Hola, estamos organizando un concurso de galletas. Puedes participar con tus amigos, hermanas o hermanos. Para participar, tienes que pagar 8 Euros por persona. El concurso tendrá lugar durante 2 días, el lunes 5 y el martes 6 de mayo de 2025. ir pastelería Colmena. dirección Plaza Angel, 12. edades permitidas oscila 12 17 años. mañanas dedicadas adolescentes 14 17 años tardes jóvenes 12 14 años. [...] afortunados ganadores ofrecerá clase chef estrella Michelin FERRAN ADRIA. dinero recaudado inscripción donará asociación española, (Federación Española de Bancos de Alimentos)."
  );
  const [maskedText, setMaskedText] = useState<string>(text);
  const [maskLevel, setMaskLevel] = useState<number>(30);

  // Function to mask words based on level
  const maskWords = (originalText: string, level: number) => {
    if (!originalText) return "";

    const words = originalText.split(/\s+/);
    const totalWords = words.length;
    const wordsToMask = Math.floor((level / 100) * totalWords);

    // Create an array of indices to mask
    let indices = Array.from({ length: totalWords }, (_, i) => i);
    indices = indices.sort(() => Math.random() - 0.5).slice(0, wordsToMask);

    return words
      .map((word, index) => {
        if (indices.includes(index)) {
          // Replace with a circle based on word length
          return `<span class="masked-word">${word}</span>`;
        }
        return word;
      })
      .join(" ");
  };

  // Apply masking when level changes
  useEffect(() => {
    setMaskedText(maskWords(text, maskLevel));
  }, [text, maskLevel]);

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setMaskLevel(value[0]);
  };

  // Handle "Trouer le texte" button click
  const handleMaskText = () => {
    setMaskedText(maskWords(text, maskLevel));
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-8 px-4 relative parchment-background">
      {/* Title with centered alignment */}
      <div className="w-full max-w-2xl flex justify-center mb-12 relative z-20">
        <h1 className={`${jacquard.className} md:text-9xl text-7xl text-text-100`}>
          Memoralis
        </h1>
      </div>

      {/* Original text display */}
      <div className="w-full max-w-2xl bg-background-100 rounded-xl shadow-lg p-6 mb-8 relative z-20">
        <textarea
          className="w-full min-h-[120px] p-3 text-text-200 bg-background-100 border-0 focus:outline-none resize-none "
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Collez votre texte ici..."
        />
      </div>

      {/* Controls */}
      <div className="w-full max-w-2xl flex items-center gap-6 mb-8 relative z-20">
        <div className="flex-1">
          <Slider
            defaultValue={[maskLevel]}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full slider-custom"
          />
        </div>
        <Button
          onClick={handleMaskText}
          className="px-6 py-2 bg-primary-100 hover:bg-primary-200 text-white  rounded-md"
        >
          Trouer le texte
        </Button>
      </div>

      {/* Masked text display */}
      <div className="w-full max-w-2xl bg-background-100 rounded-xl shadow-lg p-6 mb-6 relative z-20">
        <div
          className="text-text-200 min-h-[200px] "
          dangerouslySetInnerHTML={{ __html: maskedText }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-4 text-primary-100 hover:text-primary-200 hover:bg-background-200 rounded-full w-12 h-12"
        >
          <Download className="h-6 w-6" />
        </Button>
      </div>
      {/* Background with grain effect */}
      <GrainOverlay opacity={0.8} blendMode="color-burn" />
    </main>
  );
}
