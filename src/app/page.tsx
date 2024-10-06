"use client";

import Image from "next/image";
import "./app.css";
import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Sheet, SheetHeader, SheetContent, type Size } from "@sheet-ui/sheet";

export default function Home() {
  const [isModalOpen, setIsModal] = useState(false);
  const [size, setSize] = useState<Size>("sm");
  const toggleModal = () => setIsModal(!isModalOpen);
  const [grabber, setGrabber] = useState(true);
  return (
    <div className="grid items-center justify-items-center min-h-[100svh] p-6">
      <main className="flex flex-col max-w-3xl gap-5 sm:gap-8">
        <a
          className="mb-3"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/sheet-ui/sheet"
        >
          <h1 className="text-4xl font-bold">@sheet-ui/sheet</h1>
        </a>

        <Image
          className="invert w-full h-auto mb-2"
          src="https://docs-assets.developer.apple.com/published/4522fbbd25e9bd46fbab15496823d760/components-sheet-intro~dark@2x.png"
          alt="iOS sheet"
          width={384}
          height={216}
          sizes="100vw"
          priority
        />
        <p>
          An iOS inspired sheet for the web. Install the{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.npmjs.com/package/@sheet-ui/sheet"
            className="text-gray-50 font-semibold underline hover:text-gray-300 active:text-gray-400 transition-colors duration-100"
          >
            npm package
          </a>{" "}
          or check out{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/sheet-ui/sheet"
            className="text-gray-50 font-semibold underline hover:text-gray-300 active:text-gray-400 transition-colors duration-100"
          >
            the code
          </a>
          .
        </p>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="grabber"
            name="grabber"
            checked={grabber}
            onChange={(e) => {
              setGrabber(e.target.checked);
            }}
            className="w-4 h-4"
          />
          &nbsp;&nbsp;
          <label htmlFor="grabber">Show grabber</label>
        </div>

        <RadioGroup onChange={(value) => setSize(value as Size)} />
        <Sheet size={size} isOpen={isModalOpen} onDismiss={toggleModal}>
          <button
            onClick={toggleModal}
            className="text-lg bg-white py-3 rounded-md text-black font-semibold select-none hover:bg-gray-100 active:bg-gray-200 transition-colors duration-100"
          >
            Open
          </button>
          <SheetContent grabber={grabber} className="bg-white">
            <div
              style={{
                display: "flex",
                margin: "2px 18px",
                justifyContent: "end",
                flexDirection: "column",
                color: "#222",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: grabber ? "0" : "12px",
                }}
              >
                <button
                  onClick={toggleModal}
                  className="py-0.5 px-3 bg-gray-500 text-white select-none rounded-md hover:bg-gray-600 active:bg-gray-700 transition-colors duration-100"
                >
                  &#10005;
                </button>
              </div>
              <SheetHeader className="font-bold text-2xl">Title</SheetHeader>
              <br />
              <div>
                <p>Some content goes here!</p>
                <input type="hello world..." />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </div>
  );
}

function RadioGroup({ onChange }: { onChange: (value: string) => void }) {
  const options = [" XL", " LG", " MD", " SM"];
  const [selectedValue, setSelectedValue] = useState(options[3]);
  const radioRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleOptionChange = (event: ChangeEvent<any>) => {
    onChange(event.target.value);
    setSelectedValue(event.target.value);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    let newIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      newIndex = (index + 1) % options.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      newIndex = (index - 1 + options.length) % options.length;
    }

    if (newIndex !== index) {
      setSelectedValue(options[newIndex]);
      onChange(options[newIndex]);
      radioRefs.current[newIndex]?.focus();
    }
  };

  useEffect(() => {
    // Ensure the selected radio button is focused when the component mounts
    const selectedIndex = options.indexOf(selectedValue);
    radioRefs.current[selectedIndex]?.focus();
  }, []);

  return (
    <fieldset className="border flex justify-between sm:justify-start mb-4 p-3 sm:mb-0">
      <legend className="px-2">Select a size:</legend>
      {options.map((option, index) => (
        <div key={option} className="mr-8">
          <label>
            <input
              type="radio"
              name="radioGroup"
              value={option}
              checked={selectedValue === option}
              onChange={handleOptionChange}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(el) => {
                radioRefs.current[index] = el;
              }}
            />
            {option}
          </label>
        </div>
      ))}
    </fieldset>
  );
}
